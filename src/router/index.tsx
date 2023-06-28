import { forEach, isString, map } from 'lodash-es'
import { Suspense, createElement } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

type LazyType = Parameters<typeof lazy>[0]
type ComponentType = Record<string, LazyType>

function getFileName(path: string) {
  const reg = /\/src\/pages(.*)\.(tsx|ts)/
  const result = path.match(reg)
  return result ? result[1] : ''
}

function createAllRouter() {
  const allRouter = import.meta.glob('@/pages/**/*.{ts,tsx}', {
    // import: 'default',
  }) as ComponentType
  const result: ComponentType = {}
  forEach(allRouter, (value, key) => {
    const name = getFileName(key)
    result[name] = value
  })
  return result
}
const lazyFn = (fn: LazyType) => createElement(lazy(fn))

interface RouterType {
  path: string
  element: string | JSX.Element
  children?: RouterType[]
}

const router: RouterType[] = [
  {
    path: '/',
    element: lazyFn(() => import('@/layout/RootLayout')),
    children: [
      {
        path: '/',
        element: '/HomeView',
      },
      {
        path: '/about',
        element: '/AboutView',
      },
      {
        path: '*',
        element: '/NotFound',
      },
    ],
  },
  {
    path: '/login',
    element: (
      <div>
        <h1>
          登录
        </h1>
      </div>
    ),
  },
]
const allRouter = createAllRouter()

function RenderRouter(router: RouterType[]) {
  return map(router, ({ element, path, children }) => {
    return (
      <Route
        key={path}
        element={isString(element) ? lazyFn(allRouter[element]) : element}
        path={path}
      >
        {(children && children.length > 0) && RenderRouter(children)}
      </Route>
    )
  })
}

function Routers() {
  return (
    <Router>
      <Suspense fallback={<div>
        loading...
      </div>}
      >
        <Routes>
          {RenderRouter(router)}
        </Routes>
      </Suspense>
    </Router>
  )
}
export const MemoRouters = memo(Routers)
