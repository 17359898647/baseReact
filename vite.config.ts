import * as path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { pluginInstall } from './src/plugin'

export default defineConfig(() => {
  return {
    server: {
      port: 3333,
    },
    plugins: [pluginInstall(), react()],
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
  }
})
