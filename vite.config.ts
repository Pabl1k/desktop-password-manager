import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import svgr from 'vite-plugin-svgr';
import { version } from './package.json';

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr(), viteCompression()],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist-react'
  },
  server: {
    port: 1234,
    strictPort: true
  },
  define: {
    __APP_VERSION__: JSON.stringify(version)
  }
});
