import { defineConfig, loadEnv } from 'vite'
import path from 'path'

import { wrapperEnv, createProxy } from './build/utils'
import { createVitePlugins } from './build/plugin'
import { OUTPUT_DIR } from './build/constant'

export default defineConfig(({ command, mode }) => {
  const root = process.cwd()
  const isBuild = command === 'build'

  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv
  
  console.log('proxy',createProxy(VITE_PROXY))
  // console.log('viteEnv',viteEnv)
  return {
    root,
    base: VITE_PUBLIC_PATH || '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    css: {
      preprocessorOptions: {
        //define global scss variable
        scss: {
          additionalData: `@import '@/styles/variables.scss';`,
        },
      },
    },
    server: {
      open: false,
      base:'./',
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
      // proxy:{
      //   '^/moa':{
      //     target: "http://114.115.136.191:8088",
      //     changeOrigin: true,
      //     rewrite: path => path.replace(/^\/moa/, '')
      //   }
      // }
    },
    build: {
      target: 'es2015',
      outDir: OUTPUT_DIR,
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
  }
})
