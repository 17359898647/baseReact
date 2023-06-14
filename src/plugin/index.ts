import type { PluginOption } from 'vite'
import { autoImport } from './autoImport'
import { createIcon } from './createIcon'
import { enhanceLog } from './enhanceLog'
import { inspectorServer } from './inspectorServer'
import { unoCssInstall } from './unoCssInstall'

export function pluginInstall(): PluginOption[] {
  return [
    enhanceLog(),
    unoCssInstall(),
    autoImport(),
    createIcon(),
    inspectorServer(),
  ]
}
