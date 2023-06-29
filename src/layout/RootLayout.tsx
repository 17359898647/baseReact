import { Layout } from 'antd'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { ContentView } from './ContentView'
import { FooterView } from './FooterView'
import { HeaderView } from './HeaderView'
import { SiderView } from '@/layout/SiderView'

export function RootLayout({ children }: {
  children?: React.ReactNode | React.ReactNode[]
}) {
  const animationStyle = useRecoilValue(useAnimationStyle)
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
        <ContentView>
          <Suspense fallback={<div className='bg-red-600'>
            loading
          </div>}
          >
            {children || <Outlet />}
          </Suspense>
        </ContentView>
        <FooterView />
      </Layout>
    </Layout>
  )
}
export default RootLayout
