import { inspectorServer as _inspectorServer } from 'react-dev-inspector/plugins/vite'
import type { PluginOption } from 'vite'

export function inspectorServer(): PluginOption {
  return _inspectorServer()
}
