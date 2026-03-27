import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    caseSensitive: false
  },
  server: {
    watch: {
      usePolling: true,
      interval: 100
    },
    hmr: true
  },

  cacheDir: false
})
