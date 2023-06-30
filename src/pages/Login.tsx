import { Button, Card, Form, Input, Layout } from 'antd'
import { random } from 'lodash-es'

const { Item } = Form
function Login() {
  const navTo = useNavigate()
  const { setToken } = setUserToken()
  const [loading, setloading] = useState(false)
  const onFinish = async (values: any) => {
    setToken('123456')
    setloading(true)
    await sleep(random(1000, 3000))
    console.log('Success:', values)
    navTo('/')
  }
  return (
    <Layout className="h-screen w-screen flex-center">
      <Card
        style={{
          width: 600,
        }}
        title='登录'
      >
        <Form
          layout='vertical'
          onFinish={onFinish}
        >
          <Item
            label='账号'
            name={'userName'}
          >
            <Input />
          </Item>
          <Item
            label='密码'
            name={'password'}
          >
            <Input />
          </Item>
          <Item>
            <Button
              htmlType='submit'
              loading={loading}
            >
              登录
            </Button>
          </Item>
        </Form>
      </Card>
    </Layout>
  )
}
export default Login
