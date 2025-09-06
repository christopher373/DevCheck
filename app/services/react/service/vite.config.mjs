import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    host: '0.0.0.0', // Allow external connections
    port: parseInt(process.env.FRONTEND_PORT) || 3000,
    watch: {
      usePolling: true, // Enable polling for Docker
      interval: 1000,   // Poll every 1 second
    },
    hmr: {
      port: parseInt(process.env.FRONTEND_PORT) || 3000,
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
  },
});
