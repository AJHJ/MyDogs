import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // 1. Array of specific allowed hostnames
    allowedHosts: [
      'mydogs.onrender.com',
    ],
  }
})
