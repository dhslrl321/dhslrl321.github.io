import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // GitHub Pages 루트 도메인 (username.github.io)용
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'styled-vendor': ['styled-components'],
        },
      },
    },
    // 분할 임계값 조정 (500KB)
    chunkSizeWarningLimit: 500,
    // 코드 압축
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // console.log 제거
        drop_debugger: true,
      },
    },
  },
  // 서버 설정
  server: {
    open: true,
  },
});
