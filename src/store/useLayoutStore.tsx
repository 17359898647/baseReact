export interface useLayoutStoreType {
  isCollapsed: boolean
  isSiderWidth: number
  isCollapsedWidth: number
  isHeaderHeight: number
  isFooterHeight: number
  isFixedHeader: boolean
  isFixedFooter: boolean
  isContentPadding: number
  isContentMargin: number
}
export const useLayoutStore = atom<useLayoutStoreType>({
  key: 'useLayoutStore',
  default: {
    isCollapsed: false,
    isSiderWidth: 300,
    isCollapsedWidth: 100,
    isHeaderHeight: 64,
    isFooterHeight: 48,
    isFixedHeader: true,
    isFixedFooter: true,
    isContentPadding: 24,
    isContentMargin: 14,
  },
  effects_UNSTABLE: [
    useRecoilKeepAlive(),
  ],
})
