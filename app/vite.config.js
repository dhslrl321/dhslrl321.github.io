import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/" // GitHub Pages 루트 도메인 (username.github.io)용
})
