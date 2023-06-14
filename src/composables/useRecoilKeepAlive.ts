import type { AtomEffect } from 'recoil'
import { DefaultValue } from 'recoil'

export function useRecoilKeepAlive<T = any>(options?: {
  localStoringKey?: string
  isLocalStorage?: boolean
}): AtomEffect<T> {
  const { isLocalStorage = true, localStoringKey } = options || {}
  return ({ setSelf, onSet, node: { key } }) => {
    key = localStoringKey ?? key
    const localStorage = isLocalStorage ? window.localStorage : window.sessionStorage
    const savedValue = localStorage.getItem(key)
    if (savedValue != null)
      setSelf(JSON.parse(savedValue))

    onSet((newValue) => {
      if (newValue instanceof DefaultValue)
        localStorage.removeItem(key)
      else
        localStorage.setItem(key, JSON.stringify(newValue))
    })
  }
}
