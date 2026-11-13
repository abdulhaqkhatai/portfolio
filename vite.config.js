import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable source maps in production for security
    minify: 'terser', // Enable minification for smaller bundle
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  // Performance optimization
  preview: {
    port: 4173,
  },
})
