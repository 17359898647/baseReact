import { Button, ConfigProvider, theme } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { random } from 'lodash-es'
import { BrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/layout/RootLayout'

export function App() {
  const { isDarkMode } = useRecoilValue(useLayoutStore)
  const { run, cancel, loading, data } = useAxios({
    url: '/get',
  })
  return (
    <BrowserRouter>
      <ConfigProvider
        locale={zhCN}
        theme={{
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        <RootLayout>
          <div  className='h-100% red'
          >
            <div className='h-64px flex-1 gap-4'>
              <Button
                onClick={() => {
                  const number = random(1, 100)
                  console.log(number)
                  run({
                    params: {
                      number,
                    },
                  })
                }}
              >
                触发请求
              </Button>
              <Button
                onClick={() => cancel()}
              >
                取消请求
              </Button>
            </div>
            <div>
              <div>
                {loading ? 'loading' : 'loaded'}
              </div>
              <div>
                <pre>
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </RootLayout>
      </ConfigProvider>
    </BrowserRouter>
  )
}
