export function useRouterTo() {
  const to = useNavigate()
  return (path: string) => {
    console.log(path)
    to(path)
  }
}
