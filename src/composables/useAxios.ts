import type { AxiosResponse, CancelTokenSource } from 'axios'
import axios from 'axios'

// const codeMessage = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。',
// }
export const instance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})
interface baseResType<T = unknown> {
  msg: string
  code: number
  data: T
}
// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const { headers } = config
    config.headers = {
      Authorization: 'userToken',
      ...headers,
    } as any
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
instance.interceptors.response.use(
  (response: AxiosResponse<baseResType>) => {
    const { data, status } = response
    // const { code } = data
    if (status !== 200)
      return Promise.reject(data)
    // if (code !== 200)
    //   return Promise.reject(data)
    return data as any
  },
  (error) => {
    console.log(error)
    if (error.code === 'ECONNABORTED') {
      // createMsg('请求超时', { type: 'error' })
      return Promise.reject(new Error('请求超时'))
    }
    return Promise.reject(error)
  },
)
type methodType = 'get' | 'post' | 'put' | 'delete'
interface baseOptions<D = any> {
  url: string
  params?: Record<string, any>
  manual?: boolean
  onBefore?: () => void
  onSuccess?: (data: D,) => void
  onError?: (e: Error,) => void
  onFinally?: (params: any[], data?: D, e?: Error) => void
}

export type useAxiosOptions<D = any, M extends methodType = methodType> = M extends 'get' ? baseOptions<D> & {
  method?: M
} : baseOptions<D> & {
  method?: M
  data?: Record<string, any>
}
export function useAxios<D = any, M extends methodType = methodType>(options: useAxiosOptions<D, M>) {
  const { url, method = 'get', params, data, manual = false, onBefore, onSuccess, onError, onFinally } = options as useAxiosOptions & { data: Record<string, any> }
  const [updateCancelToken, setUpdateCancelToken] = useState(0)
  const cancelTokenSource = useCreation(() => axios.CancelToken.source, [])
  const cancelToken: CancelTokenSource = useCreation(() => cancelTokenSource(), [updateCancelToken])

  const abort = (message?: string | number) => {
    setUpdateCancelToken(v => v + 1)
    cancelToken.cancel(String(message))
  }
  const _useRequest = useRequest((options?: any) => {
    const { params: _params, data: _data } = options || {}
    abort(updateCancelToken)
    console.log(cancelToken)
    // const Promise=()
    return instance({
      url,
      method,
      params: _params ?? params,
      data: _data ?? data,
      cancelToken: cancelToken.token,
    })
  }, {
    manual,
    onSuccess,
    onError,
    onBefore,
    onFinally,
    cacheKey: url,
    debounceWait: 300,
  }, [
    () => {
      return {
        onCancel: () => {
          console.log('cancel')
          abort('cancel')
        },
      }
    },
  ])
  return {
    ..._useRequest,
    run: _useRequest.run as (options: {
      params?: Record<string, any>
      data?: Record<string, any>
    }) => void,
  }
}
