import { forEach } from 'lodash-es'
import { createElement } from 'react'

type LazyType = Parameters<typeof lazy>[0]
type ComponentType = Record<string, LazyType>

function getFileName(path: string) {
  const reg = /\/src\/pages(.*)\.(tsx|ts)/
  const result = path.match(reg)
  return result ? result[1] : ''
}

export function createAllRouter() {
  const allRouter = import.meta.glob('@/pages/**/*.{ts,tsx}') as ComponentType
  const result: ComponentType = {}
  forEach(allRouter, (value, key) => {
    const name = getFileName(key)
    result[name] = value
  })
  return result
}
export const lazyFn = (fn: LazyType) => createElement(lazy(fn))

export interface RouterType {
  path: string
  element?: string | JSX.Element
  children?: RouterType[]
  title?: string
  /**
   * @description: 是否需要登录
   * @default: true
   */
  needLogin?: false
  /**
   * @description: 路由图标 本地优先
   */
  lineIcon?: string
  localIcon?: string
  hidden?: boolean
  /**
   * @description: 路由排序 越小越靠前
   * @default: 0
   */
  isSort?: number
}

export const MenuList: RouterType[] = [
  {
    path: '/',
    element: '/HomeView',
    title: '首页',
    lineIcon: 'material-symbols:android-google-home',
  },
  {
    path: '/about',
    title: '关于',
    element: '/AboutView',
  },
]

function createFlatRouter(router: RouterType[], result: RouterType[] = []) {
  forEach(router, (item) => {
    if (item.children && item.children.length > 0)
      createFlatRouter(item.children, result)
    else
      result.push(item)
  })
  return result
}

export const router: RouterType[] = [
  {
    path: '/',
    element: lazyFn(() => import('@/layout/RootLayout')),
    needLogin: false,
    children: [
      ...createFlatRouter(MenuList),
      {
        path: '*',
        element: '/NotFound',
        hidden: true,
      },
    ],
  },
  {
    path: '/login',
    needLogin: false,
    title: '登录',
    element: lazyFn(() => import('@/pages/Login')),
  },
]
