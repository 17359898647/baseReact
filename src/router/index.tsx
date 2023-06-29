import { isString, map } from 'lodash-es'
import { Suspense } from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import type { RouterType } from './getRouter'
import { createAllRouter, lazyFn, router } from './getRouter'

function RenderRouter({
  router,
  userToken,
}: {
  router: RouterType[]
  userToken: string | null
}) {
  const allRouter = createAllRouter()
  return map(router, ({ element, path, children, needLogin: isLogin }) => {
    const needLogin = (!userToken && isLogin === undefined)
    const Component = needLogin
      ? (
        <Navigate
          replace={true}
          to={'/login'}
        />
      )
      : (isString(element) ? lazyFn(allRouter[element]) : element)
    return (
      <Route
        key={path}
        element={Component}
        path={path}
      >
        {(children && children.length > 0) && RenderRouter({
          router: children,
          userToken,
        })}
      </Route>
    )
  })
}

function Routers() {
  const { userToken } = useRecoilValue(useUserStore)
  return (
    <Router>
      <Suspense fallback={<div>
        loading...
      </div>}
      >
        <Routes>
          {RenderRouter({
            router,
            userToken,
          })}
        </Routes>
      </Suspense>
    </Router>
  )
}
export const MemoRouters = memo(Routers)
