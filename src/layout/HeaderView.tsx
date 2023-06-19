import { Button, Layout } from 'antd'
import { SvgIcon } from '@/component/SvgIcon'

const { Header } = Layout
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
export function HeaderView() {
  const fixedHeaderStyle = useRecoilValue(useFixedHeaderStyle)
  const [{ isHeaderHeight, isCollapsed }, setLayoutStore] = useRecoilState(useLayoutStore)
  return (
    <Header
      className='flex items-center p-0 text-[rgba(255,255,255,0.85)] baseAnimation'
      style={{
        ...fixedHeaderStyle,
      }}
    >
      <Button
        className='text-[rgba(255,255,255,.85)] !hover:text-[rgba(255,255,255,.85)]'
        icon={(
          <SvgIcon
            lineIcon={isCollapsed ? 'line-md:menu-fold-right' : 'line-md:menu-fold-left'}
            size={24}
          />
        )}
        style={{
          width: isHeaderHeight / 2,
          height: isHeaderHeight / 2,
        }}
        type='text'
        onClick={() => {
          setLayoutStore((e) => {
            return {
              ...e,
              isCollapsed: !isCollapsed,
            }
          })
        }}
      />
    </Header>
  )
}
