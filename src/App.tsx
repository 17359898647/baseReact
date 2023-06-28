import { ConfigProvider, theme } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { CreateRouter } from './router'

export function App() {
  const { isDarkMode } = useRecoilValue(useLayoutStore)
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <CreateRouter />
    </ConfigProvider>
  )
}
