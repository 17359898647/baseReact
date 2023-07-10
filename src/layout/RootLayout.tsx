import { Layout } from 'antd'
import { Suspense } from 'react'
import { ContentView } from './ContentView'
import { FooterView } from './FooterView'
import { HeaderView } from './HeaderView'
import { TagView } from './TagView'
import { KeepAlive } from '@/component/KeepAlive'
import { SiderView } from '@/layout/SiderView'

export function RootLayout() {
  const animationStyle = useRecoilValue(useAnimationStyle)
  const Outlet = useOutlet()
  return (
    <Layout
      className='min-h-screen w-screen'
      hasSider={true}
    >
      <SiderView />
      <Layout
        className='relative baseAnimation'
        style={{
          ...animationStyle,
        }}
      >
        <HeaderView />
        <TagView />
        <ContentView >
          <Suspense fallback={<div className='bg-red-600'>
            loading
          </div>}
          >
            <KeepAlive include={['/about']} >
              {Outlet}
            </KeepAlive>
          </Suspense>
        </ContentView>
        <FooterView />
      </Layout>
    </Layout>
  )
}
export default RootLayout
