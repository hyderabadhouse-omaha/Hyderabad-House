import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Split vendor code into a separate chunk so page-specific JS stays small
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    // Smaller inline threshold so large-ish assets stay external and cacheable
    assetsInlineLimit: 2048,
    // Modern browsers only, smaller bundle
    target: 'es2020',
  },
})
