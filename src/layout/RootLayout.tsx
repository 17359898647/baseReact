import { Layout } from 'antd'
import { ContentView } from './ContentView'
import { FooterView } from './FooterView'
import { HeaderView } from './HeaderView'
import { SiderView } from '@/layout/SiderView'

export function RootLayout({ children }: {
  children: React.ReactNode | React.ReactNode[]
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
          {children && children}
        </ContentView>
        <FooterView />
      </Layout>
    </Layout>
  )
}
