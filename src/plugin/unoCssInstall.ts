import UnoCSS from 'unocss/vite'
import type { PluginOption } from 'vite'

export function unoCssInstall(): PluginOption {
  return UnoCSS()
}
