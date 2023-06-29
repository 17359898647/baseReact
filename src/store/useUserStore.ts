export interface IUserStore {
  userToken: string | null
}
export const useUserStore = atom<IUserStore>({
  key: 'useUserStore',
  default: {
    userToken: localStorage.getItem('token'),
  },
  effects_UNSTABLE: [
    useRecoilKeepAlive(),
  ],
})
export function setUserToken() {
  const [{ userToken }, setUserStore] = useRecoilState(useUserStore)
  const setToken = (value: string) => {
    localStorage.setItem('token', value)
    setUserStore(e => ({
      ...e,
      userToken: value,
    }))
  }
  return {
    userToken,
    setToken,
  }
}
