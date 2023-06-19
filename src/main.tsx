import type { InspectParams } from 'react-dev-inspector'
import { Inspector } from 'react-dev-inspector'
import ReactDOM from 'react-dom/client'
import { RecoilRoot, useRecoilSnapshot } from 'recoil'
import { setupAssets } from './plugin/setupAssets'
import { App } from '@/App.tsx'

setupAssets()
const isDev = import.meta.env.DEV
type editorNameType = 'vscode' | 'webstorm' | 'vscode-insiders'
const editorName: editorNameType = 'vscode'
function DebugObserver() {
  const snapshot = useRecoilSnapshot()
  useEffect(() => {
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true, isInitialized: true })) {
      console.debug('修改:', {
        key: node.key,
        value: snapshot.getLoadable(node).contents,
      })
    }
  }, [snapshot])
  return null
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  < >
    <RecoilRoot>
      {import.meta.env.DEV && <DebugObserver />}
      <App />
    </RecoilRoot>
    {
      isDev && (
        <Inspector
          disableLaunchEditor={true}
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
  </>,
)
