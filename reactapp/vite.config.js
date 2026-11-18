import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/CodePerspective/',
  build: {
    outDir: '../docs',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        chunkFileNames: (chunkInfo) => {
          const cleanName = chunkInfo.name.replace(/^_+|_+$/g, '');
          return `assets/${cleanName}-[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          const parsed = path.parse(assetInfo.name || '');
          const cleanName = parsed.name.replace(/^_+|_+$/g, '');
          return `assets/${cleanName}-[hash]${parsed.ext}`;
        },
      },
    },
  },
});
