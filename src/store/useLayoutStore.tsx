export interface useLayoutStoreType {
  isCollapsed: boolean
  isSiderWidth: number
  isCollapsedWidth: number
  isHeaderHeight: number
  isFooterHeight: number
  isTagHeight: number
  isFixedHeader: boolean
  isFixedFooter: boolean
  isContentPadding: number
  isContentMargin: number
  isDarkMode: boolean
}
export const useLayoutStore = atom<useLayoutStoreType>({
  key: 'useLayoutStore',
  default: {
    isCollapsed: false,
    isSiderWidth: 180,
    isCollapsedWidth: 100,
    isHeaderHeight: 64,
    isFooterHeight: 48,
    isTagHeight: 48,
    isFixedHeader: true,
    isFixedFooter: true,
    isContentPadding: 24,
    isContentMargin: 14,
    isDarkMode: true,
  },
  effects_UNSTABLE: [
    useRecoilKeepAlive(),
  ],
})
export const useAnimationStyle = selector({
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
