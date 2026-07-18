import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base 設為相對路徑，production build 可直接以任意靜態路徑開啟。
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
