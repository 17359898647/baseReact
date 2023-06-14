import { Layout, theme } from 'antd'
import { SiderView } from '@/layout/SiderView'

const { Header, Footer, Content } = Layout
const useAnimationStyle = selector({
  key: 'animationStyle',
  get: ({ get }): React.CSSProperties => {
    const { isCollapsed, isCollapsedWidth, isSiderWidth } = get(useLayoutStore)
    return isCollapsed
      ? {
        marginLeft: isCollapsedWidth,
      }
      : {
        marginLeft: isSiderWidth,
      }
  },
})

const useFixedHeaderStyle = selector({
  key: 'fixedHeaderStyle',
  get: ({ get }): React.CSSProperties => {
    const { isFixedHeader, isHeaderHeight, isCollapsed, isCollapsedWidth, isSiderWidth } = get(useLayoutStore)
    const animationStyle = get(useAnimationStyle)
    return isFixedHeader
      ? {
        height: isHeaderHeight,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        marginLeft: isCollapsed ? isCollapsedWidth : isSiderWidth,
        ...animationStyle,
      }
      : {
        height: isHeaderHeight,
      }
  },
})

const useFixedFooterStyle = selector({
  key: 'fixedFooterStyle',
  get: ({ get }): React.CSSProperties => {
    const { isFixedFooter, isFooterHeight, isCollapsed, isCollapsedWidth, isSiderWidth } = get(useLayoutStore)
    const animationStyle = get(useAnimationStyle)
    return isFixedFooter
      ? {
        height: isFooterHeight,
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        marginLeft: isCollapsed ? isCollapsedWidth : isSiderWidth,
        ...animationStyle,
      }
      : {
        height: isFooterHeight,
      }
  },
})

const useContentStyle = selector({
  key: 'contentStyle',
  get: ({ get }): React.CSSProperties => {
    const { isFixedHeader, isHeaderHeight, isFixedFooter, isFooterHeight, isContentMargin } = get(useLayoutStore)
    return {
      marginTop: isFixedHeader ? isHeaderHeight + isContentMargin : isContentMargin,
      marginBottom: isFixedFooter ? isFooterHeight + isContentMargin : isContentMargin,
      marginLeft: isContentMargin,
      marginRight: isContentMargin,
    }
  },
})

export function RootLayout({ children }: {
  children: React.ReactNode | React.ReactNode[]
}) {
  const {
    token: { colorText, colorBgContainer },
  } = theme.useToken()
  const animationStyle = useRecoilValue(useAnimationStyle)
  const fixedHeaderStyle = useRecoilValue(useFixedHeaderStyle)
  const fixedFooterStyle = useRecoilValue(useFixedFooterStyle)
  const ContentStyle = useRecoilValue(useContentStyle)
  return (
    <Layout
      className='min-h-screen w-screen'
      hasSider={true}
    >
      <SiderView />
      <Layout
        className='relative min-h-full'
        style={{
          ...animationStyle,
        }}
      >
        <Header
          className=''
          style={{
            ...fixedHeaderStyle,
          }}
        >
          <span>header</span>
        </Header>
        <Content
          className='mx-6 my-4 p-4'
          style={{
            color: colorText,
            backgroundColor: colorBgContainer,
            ...ContentStyle,
          }}
        >
          {children && children}
        </Content>
        <Footer
          className='text-center'
          style={{
            ...fixedFooterStyle,
          }}
        >Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}
