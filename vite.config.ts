import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: (id, importer) => {
        // Only exclude backend packages when imported from src/ directory
        if (importer && importer.includes('/src/')) {
          return id.includes('@aws-amplify/backend') || 
                 id.includes('aws-cdk') || 
                 id.includes('constructs')
        }
        return false
      }
    }
  }
})
