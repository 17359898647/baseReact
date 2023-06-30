import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { map } from 'lodash-es'
import { SvgIcon } from '@/component/SvgIcon'
import { MenuList, type RouterType } from '@/router/getRouter'

type MenuItem = Required<MenuProps>['items'][number]
interface createItemParams {
  title?: string
  key: React.Key
  localIcon?: string
  lineIcon?: string
  children?: MenuItem[]
}
function createItem({
  title, key, localIcon, lineIcon, children,
}: createItemParams): MenuItem {
  // 如果localIcon和lineIcon都没有，就显示默认的
  if (!localIcon && !lineIcon)
    lineIcon = 'material-symbols:disabled-by-default-rounded'

  return {
    key,
    icon: (
      <SvgIcon
        lineIcon={lineIcon}
        localIcon={localIcon}
        size={18}
      />
    ),
    children,
    label: title,
  }
}

function deepSotrRouter(router: RouterType[]): RouterType[] {
  return map(router.sort((a, b) => (a.isSort || 0) - (b.isSort || 0)), ({ children, ...item }) => {
    if (children && children.length > 0) {
      return {
        ...item,
        children,
      }
    }
    return item
  })
}

function deepCreateMenu(router: RouterType[]) {
  return map(deepSotrRouter(router), ({ title, path, lineIcon, localIcon, children, hidden }) => {
    if (hidden)
      return null
    const item = createItem({
      title,
      key: path,
      lineIcon,
      localIcon,
      children: children && deepCreateMenu(children),
    })
    return item
  })
}

function _MenuView() {
  const navTo = useRouterTo()
  const MenuClick = (path: string) => {
    navTo(path)
  }
  return (
    <Menu
      defaultSelectedKeys={['1']}
      items={deepCreateMenu(MenuList)}
      mode="inline"
      theme={'dark'}
      onClick={({ key }) => {
        MenuClick(key)
      }}
    />
  )
}
export const MenuView = memo(_MenuView)
