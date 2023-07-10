import { Button, Card, Input } from 'antd'
import { useImmer } from 'use-immer'
import { KeepAliveContext } from '@/component/KeepAlive'

export function Component() {
  const { setToken } = setUserToken()
  const [value, setValue] = useImmer<string>('')
  const { destroy, isActive } = useContext(KeepAliveContext)
  useEffect(() => {
    console.log('页面激活', isActive)
  }, [isActive])
  const update = useUpdate()
  return (
    <Card
      className='size-full'
      title='关于'
    >
      <Button
        onClick={() => {
          setToken(null)
        }}
      >
        退出登录
      </Button>
      <Button
        onClick={() => destroy('/about')}
      >
        销毁缓存
      </Button>
      <Button
        onClick={() => update()}
      >
        刷新
      </Button>
      <Input
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />
      <div>
        Time:
        {' '}
        {Date.now()}
      </div>
    </Card>
  )
}
export default memo(Component)
