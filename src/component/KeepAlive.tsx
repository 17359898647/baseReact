import { useUpdate } from 'ahooks'
import { filter, findIndex, includes, isNil, map } from 'lodash-es'
import type {
  JSXElementConstructor,
  ReactElement,
  RefObject,
} from 'react'
import {
  createContext,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react'
import ReactDOM from 'react-dom'
import { useLocation } from 'react-router-dom'

type Children = ReactElement<any, string | JSXElementConstructor<any>> | null
interface context {
  destroy: (params: string, render?: boolean) => void
  isActive: boolean
}
export const KeepAliveContext = createContext<context>({ destroy: () => { }, isActive: false })
interface Props {
  activeName?: string
  include?: Array<string>
  exclude?: Array<string>
  maxLen?: number
  children: Children
}
function _KeepAlive({ children, exclude, include, maxLen = 5 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const components = useRef<Array<{ name: string; ele: Children }>>([])
  const { pathname } = useLocation()
  const update = useUpdate()
  const isActive = findIndex(components.current, ({ name }) => name === pathname)
  if (isNil(exclude) && isNil(include)) {
    components.current = [
      {
        name: pathname,
        ele: children,
      },
    ]
  }
  else {
    // 缓存超过上限的 干掉第一个缓存
    if (components.current.length >= maxLen)
      components.current = components.current.slice(1)
    components.current = filter(
      components.current,
      ({ name }) => {
        if (exclude && includes(exclude, name))
          return false

        if (include)
          return includes(include, name)

        return true
      },
    )
    const component = components.current.find(res => res.name === pathname)
    if (isNil(component)) {
      components.current = [
        ...components.current,
        {
          name: pathname,
          ele: children,
        },
      ]
    }
  }
  // 销毁缓存的路由
  function destroy(params: string, render = false) {
    components.current = filter(components.current, ({ name }) => name !== params)
    // 是否需要立即刷新 一般是不需要的
    if (render)
      update()
  }
  const context = {
    destroy,
    isActive: isActive !== -1,
  }
  return (
    <>
      <div
        ref={containerRef}
        className="keep-alive"
      />
      <KeepAliveContext.Provider value={context}>
        {
          map(
            components.current,
            ({ name, ele }) => (

              <Component
                key={name}
                active={name === pathname}
                name={name}
                renderDiv={containerRef}
              >
                {ele}
              </Component>
            ),
          )
        }
      </KeepAliveContext.Provider >
    </>
  )
}
interface ComponentProps {
  active: boolean
  children: Children
  name: string
  renderDiv: RefObject<HTMLDivElement>
}
// 渲染 当前匹配的路由 不匹配的 利用createPortal 移动到 document.createElement('div') 里面
function Component({ active, children, name, renderDiv }: ComponentProps) {
  console.log('update')
  const [targetElement] = useState(() => document.createElement('div'))
  const activatedRef = useRef(false)
  activatedRef.current = activatedRef.current || active
  useEffect(() => {
    if (active) { // 渲染匹配的组件
      if (renderDiv.current?.firstChild)
        renderDiv.current?.replaceChild(targetElement, renderDiv.current?.firstChild)

      else
        renderDiv.current?.appendChild(targetElement)
    }
  })
  useEffect(() => { // 添加一个id 作为标识 并没有什么太多作用
    targetElement.setAttribute('id', name)
  })
  // 把vnode 渲染到document.createElement('div') 里面
  return (
    <>
      {activatedRef.current && ReactDOM.createPortal(children, targetElement)}
    </>
  )
}
export const KeepAliveComponent = memo(Component)
export const KeepAlive = memo(_KeepAlive)
