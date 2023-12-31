import { theme } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { find, map } from 'lodash-es'
import { SvgIcon } from '@/component/SvgIcon'
import type { RouterType } from '@/router/getRouter'
import { findRouter } from '@/router/getRouter'
import { useTagStore } from '@/store/useTagStore'

const useTagViewStyle = selector({
  key: 'useTagViewStyle',
  get: ({ get }): React.CSSProperties => {
    const { isFixedHeader, isHeaderHeight, isCollapsed, isContentPadding, isCollapsedWidth, isSiderWidth, isTagHeight } = get(useLayoutStore)
    const animationStyle = get(useAnimationStyle)
    return isFixedHeader
      ? {
        height: isTagHeight,
        position: 'fixed',
        top: isHeaderHeight,
        left: 0,
        right: 0,
        paddingLeft: isContentPadding,
        paddingRight: isContentPadding,
        marginLeft: isCollapsed ? isCollapsedWidth : isSiderWidth,
        ...animationStyle,
      }
      : {
        height: isTagHeight,
      }
  },
})

const Tag = memo(({
  tagContent: {
    path, title, localIcon, lineIcon,
  },
}: {
  tagContent: RouterType
  key: React.Key
}) => {
  if (!localIcon && !lineIcon)
    lineIcon = 'material-symbols:disabled-by-default-rounded'
  const { pathname: currentPath } = useLocation()
  const navTo = useRouterTo()
  const MenuClick = (path: string) => {
    navTo(path)
  }
  return (
    <div
      className={
        `h-60% px-1 flex-center cursor-pointer gap-1 ${path === currentPath ? 'red' : ''} text-center `
      }
      onClick={() => {
        MenuClick(path)
      }}
    >
      <SvgIcon
        lineIcon={lineIcon}
        localIcon={localIcon}
      />
      <span>
        {title}
      </span>
    </div>
  )
})

function actionTagList() {
  const [{ tagList }, setTagStore] = useRecoilState(useTagStore)
  const setTagList = useMemoizedFn((tag: RouterType) => {
    if (!find(tagList, tag)) {
      setTagStore((draft) => {
        return {
          ...draft,
          tagList: [
            ...draft.tagList,
            tag,
          ],
        }
      })
    }
  })
  return {
    tagList,
    setTagList,
  }
}

function tagListStore() {
  const { pathname: currentPath } = useLocation()
  const prePath = useRef(currentPath)
  const { setTagList, tagList } = actionTagList()
  useEffect(() => {
    const tag = findRouter(currentPath)
    setTagList(tag)
    return () => {
      prePath.current = currentPath
    }
  }, [currentPath, setTagList])
  return {
    tagList,
    currentPath,
    setTagList,
  }
}
export const TagView = memo(() => {
  const TagViewStyle = useRecoilValue(useTagViewStyle)
  const {
    token: { colorText, colorBgBase },
  } = theme.useToken()
  const { tagList } = tagListStore()
  return (
    <Header
      className="flex items-center gap-2 p-0 baseAnimation"
      style={{
        ...TagViewStyle,
        color: colorText,
        backgroundColor: colorBgBase,
      }}
    >
      {
        map(tagList, (tag) => {
          return (
            <Tag
              key={tag.path}
              tagContent={tag}
            />
          )
        })
      }
    </Header>
  )
})
