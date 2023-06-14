import type { MenuProps } from 'antd'
import { Layout, Menu } from 'antd'
import { SvgIcon } from '@/component/SvgIcon'
import { useLayoutStore } from '@/store/useLayoutStore'

const { Header, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}
const items: MenuItem[] = [
  getItem('Option 1', '1', <SvgIcon lineIcon={'line-md:align-center'} />),
  getItem('Option 2', '2', <SvgIcon lineIcon={'line-md:align-center'} />),
  getItem('User', 'sub1', <SvgIcon lineIcon={'line-md:align-center'} />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <SvgIcon lineIcon={'line-md:align-center'} />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <SvgIcon lineIcon={'line-md:align-center'} />),
]
export function SiderView() {
  const [{ isCollapsed, isCollapsedWidth, isSiderWidth }, setLayoutStore] = useRecoilState(useLayoutStore)
  return (
    <Sider collapsible
      className='bottom-0 left-0 top-0 overflow-auto !fixed'
      collapsed={isCollapsed}
      collapsedWidth={isCollapsedWidth}
      width={isSiderWidth}
      onCollapse={isCollapsed => setLayoutStore(e => ({
        ...e,
        isCollapsed,
      }))}>
      <Header className='px-0 text-center'>123</Header>
      <Menu defaultSelectedKeys={['1']}
        items={items}
        mode="inline"
        theme="dark" />
    </Sider>
  )
}
