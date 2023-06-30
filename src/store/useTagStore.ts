import { filter } from 'lodash-es'
import { type RouterType, flatRouter } from '@/router/getRouter'

export interface ITagStore {
  tagList: RouterType[]
}
export const useTagStore = atom<ITagStore>({
  key: 'useTagStore',
  default: {
    tagList: filter(flatRouter, router => router.isFixed) as RouterType[],
  },
  effects_UNSTABLE: [
    useRecoilKeepAlive(),
  ],
})
