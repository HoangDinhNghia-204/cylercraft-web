import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    preview: {
      port: 4173, // Giữ nguyên cổng bạn đang dùng
      strictPort: true,
      // THÊM KHỐI NÀY VÀO
      allowedHosts: ['.ngrok-free.app'],
    },
    port: 4173, // Giữ nguyên cổng bạn đang dùng
    strictPort: true,
  },
})