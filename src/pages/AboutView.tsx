import { Button, Card } from 'antd'

export function Component() {
  const { setToken } = setUserToken()
  return (
    <Card
      className='size-full'
      title='关于'
    >
      <Button
        onClick={() => setToken(null)}
      >
        退出登录
      </Button>
    </Card>
  )
}
export default Component
