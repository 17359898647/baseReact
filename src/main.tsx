import { ConfigProvider, theme } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import React from 'react'
import type { InspectParams } from 'react-dev-inspector'
import { Inspector } from 'react-dev-inspector'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import { setupAssets } from './plugin/setupAssets'
import { App } from '@/App.tsx'

setupAssets()
const isDev = import.meta.env.DEV
type editorNameType = 'vscode' | 'webstorm' | 'vscode-insiders'
const editorName: editorNameType = 'vscode-insiders'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <ConfigProvider locale={zhCN}
        theme={{
          algorithm: theme.darkAlgorithm,
        }}>
        <App />
      </ConfigProvider>
    </RecoilRoot>
    {
      isDev && (
        <Inspector
          disableLaunchEditor
          keys={['command', 'a']}
          onClickElement={({ codeInfo }: InspectParams) => {
            const { absolutePath, columnNumber, lineNumber } = codeInfo || {}
            if (!absolutePath)
              return
            // console.log(`${editorName}://file/${absolutePath}:${lineNumber}:${columnNumber}`)
            window.open(`${editorName}://file/${absolutePath}:${lineNumber}:${columnNumber}`)
          }}
        />
      )
    }
  </React.StrictMode>,
)
