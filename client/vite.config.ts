import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/app/',
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3100',
        changeOrigin: true,
        secure: false,
      },
      '/r': {
        target: 'http://localhost:3100',
        changeOrigin: true,
        secure: false,
      },
    },
  }
})
