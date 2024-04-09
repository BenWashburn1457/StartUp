import { defineConfig } from 'vite';

export default defineConfig({
  root: './', // Set the root directory of the project
  build: {
    outDir: 'dist', // Set the output directory for build artifacts
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
      '/ws': {
        target: 'ws://localhost:3000',
        ws: true,
      },
    },
  },
});