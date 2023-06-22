import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    fs: {
      // Allow serving files from the output directory
      allow: ['..']
    },
    // Enable SPA fallback
    proxy: {
      // Proxy all requests to index.html
      '/': {
        target: '/index.html',
        bypass: () => '/index.html'
      }
    }
  }
})
