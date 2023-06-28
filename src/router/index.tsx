import { forEach } from 'lodash-es'
import { createElement } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

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
const RootLayout = lazy(() => import('@/layout/RootLayout'))
export function CreateRouter() {
  const allRouter = createAllRouter()
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<RootLayout />}
          path='/'
        >
          <Route
            element={lazyFn(allRouter['/HomeView'])}
            path='/'
          />
          <Route
            element={lazyFn(() => import('@/pages/AboutView'))}
            path='/about'
          />
          <Route
            element={lazyFn(() => import('@/pages/NotFound'))}
            path='*'
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
