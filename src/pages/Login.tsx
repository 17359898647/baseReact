import { Button, Card, Form, Input, Layout } from 'antd'

const { Item } = Form
function Login() {
  const navTo = useNavigate()
  const { setToken } = setUserToken()
  const onFinish = (values: any) => {
    console.log(values)
    setToken('123456')
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
            <Button htmlType='submit'>
              登录
            </Button>
          </Item>
        </Form>
      </Card>
    </Layout>
  )
}
export default Login
