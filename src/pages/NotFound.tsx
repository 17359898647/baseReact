import { Button, Result } from 'antd'
import { useRouterTo } from '@/composables/useRouterTo'

export default function NotFound() {
  const naivgateTo = useRouterTo()
  return (
    <Result
      extra={
        <Button
          type="primary"
          onClick={
            () => naivgateTo('/', {
              replace: true,
            })
          }
        >
          返回上一页
        </Button>}
      status="404"
      subTitle="未找到页面"
      title="404"
    />
  )
}
