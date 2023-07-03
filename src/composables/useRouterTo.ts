export function useRouterTo() {
  const to = useNavigate()
  return (path: string) => {
    console.log(path)
    // 判断是不是外链
    if (path.startsWith('http'))
      return window.open(path)

    to(path)
  }
}
