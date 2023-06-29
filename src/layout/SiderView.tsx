import { Layout } from 'antd'
import { MenuView } from './MenuView'
import { useLayoutStore } from '@/store/useLayoutStore'

const { Header, Sider } = Layout

export function SiderView() {
  const [{ isCollapsed, isCollapsedWidth, isSiderWidth }, setLayoutStore] = useRecoilState(useLayoutStore)
  return (
    <Sider
      className='bottom-0 left-0 top-0 overflow-auto !fixed'
      collapsed={isCollapsed}
      collapsedWidth={isCollapsedWidth}
      collapsible={true}
      trigger={null}
      width={isSiderWidth}
      onCollapse={isCollapsed => setLayoutStore(e => ({
        ...e,
        isCollapsed,
      }))}
    >
      <Header
        className='p-0 text-center text-[rgba(255,255,255,0.85)]'
      >
        123
      </Header>
      <MenuView />
    </Sider>
  )
}
