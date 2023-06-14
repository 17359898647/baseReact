import AutoImport from 'unplugin-auto-import/vite'
import type { PluginOption } from 'vite'

export function autoImport(): PluginOption {
  return AutoImport({
    imports: ['react', 'ahooks', 'recoil'],
    dts: './src/types/auto-import.d.ts',
    dirs: ['./src/composables', './src/utils', './src/store'],
    eslintrc: {
      enabled: true,
      filepath: 'src/types/.eslintrc-auto-import.json',
      globalsPropValue: 'readonly',
    },
    vueTemplate: true,
    include: [/\.vue\??/, /\.tsx?$/],
  })
}
