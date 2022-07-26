import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { viteCommonjs, esbuildCommonjs } from '@originjs/vite-plugin-commonjs'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'
  const alias = {
    '@': path.join(__dirname, 'src'),
  }
  if (!isDev) {
    Object.assign(alias, {})
  }
  return {
    envPrefix: ['VITE_'],
    define: {
      __DEV__: isDev,
    },
    plugins: [
      vue({
        // reactivityTransform: true,
      }),
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
      viteCommonjs(),
    ],
    optimizeDeps: {
      esbuildOptions: {
        plugins: [esbuildCommonjs(['ant-design-vue'])],
      },
    },
    resolve: {
      alias,
    },
    server: {
      host: '0.0.0.0',
      port: 3080,
    },
  }
})
