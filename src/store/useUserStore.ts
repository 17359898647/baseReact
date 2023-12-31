export interface IUserStore {
  userToken: string | null
}
export const useUserStore = atom<IUserStore>({
  key: 'useUserStore',
  default: {
    userToken: null,
  },
  effects_UNSTABLE: [
    useRecoilKeepAlive(),
  ],
})
export function setUserToken() {
  const [{ userToken }, setUserStore] = useRecoilState(useUserStore)
  const navTo = useRouterTo()
  const setToken = (value: string | null) => {
    setUserStore(e => ({
      ...e,
      userToken: value,
    }))
    navTo('/login')
  }
  return {
    userToken,
    setToken,
  }
}
