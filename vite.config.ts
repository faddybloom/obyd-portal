// @ts-ignore
import { defineConfig } from 'vite'
// @ts-ignore
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext'
  },
  resolve: {
    alias: {
      // Prevent any accidental imports from amplify directory
      'amplify': false
    }
  }
})
