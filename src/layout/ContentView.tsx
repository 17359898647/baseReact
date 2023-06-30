import { Layout, theme } from 'antd'

const useContentStyle = selector({
    key: 'contentStyle',
    get: ({ get }): React.CSSProperties => {
        const { isFixedHeader, isHeaderHeight, isTagHeight, isFixedFooter, isFooterHeight, isContentMargin } = get(useLayoutStore)
        return {
            marginTop: isFixedHeader ? isHeaderHeight + isContentMargin + isTagHeight : isContentMargin,
            marginBottom: isFixedFooter ? isFooterHeight + isContentMargin : isContentMargin,
            marginLeft: isContentMargin,
            marginRight: isContentMargin,
        }
    },
})
const { Content } = Layout

export function ContentView({ children }: {
    children: React.ReactNode | React.ReactNode[]
}) {
    const {
        token: { colorText, colorBgContainer },
    } = theme.useToken()
    const ContentStyle = useRecoilValue(useContentStyle)
    return (
        <Content
            className='flex flex-col p-4 baseAnimation'
            style={{
                color: colorText,
                backgroundColor: colorBgContainer,
                ...ContentStyle,
            }}
        >
            {children}
        </Content>
    )
}
