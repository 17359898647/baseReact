import { useRecoilSnapshot } from 'recoil'
import { RootLayout } from '@/layout/RootLayout'

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
export function App() {
  return (
    <RootLayout>
      {import.meta.env.DEV && <DebugObserver />}
      <div
        className='min-h-full red'
      >
        <div
          className='h-200vh red'
        >123</div>
      </div>
    </RootLayout>
  )
}
