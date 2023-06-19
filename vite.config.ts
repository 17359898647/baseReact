import * as path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { pluginInstall } from './src/plugin'

export default defineConfig(() => {
  return {
    server: {
      port: 3333,
      proxy: {
        '/api': {
          target: 'https://httpbin.org',
          changeOrigin: true,
          rewrite: (path) => {
            console.log(path)
            return path.replace(/^\/api/, '')
          },
        },
      },
    },
    plugins: [pluginInstall(), react()],
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    build: {
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: false,
        },
      },
      minify: 'terser',
      sourcemap: true,
    },
  }
})
