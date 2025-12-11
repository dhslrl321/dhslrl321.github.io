import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "" // ⚠️ repo 이름으로 변경해야 함
})
