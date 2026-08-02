import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // 1. Array of specific allowed hostnames
    allowedHosts: [
    ],
    proxy: {'/imagesURL': 'http://localhost:3000',
            '/images' : 'http://localhost:3000',
            '/signup': 'http://localhost:3000',
            '/login' : 'http://localhost:3000',
            '/logout' : 'http://localhost:3000'
    }
  }
})
