import { Layout } from 'antd'

const { Footer } = Layout
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
export function FooterView() {
  const fixedFooterStyle = useRecoilValue(useFixedFooterStyle)
  return (
    <Footer
      className='text-center baseAnimation'
      style={{
        ...fixedFooterStyle,
      }}
    >
      Ant Design ©2023 Created by Ant UED
    </Footer>
  )
}
