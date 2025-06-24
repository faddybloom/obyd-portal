import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        '@aws-amplify/backend',
        '@aws-amplify/backend-cli',
        'aws-cdk',
        'aws-cdk-lib',
        'constructs'
      ]
    }
  }
})
