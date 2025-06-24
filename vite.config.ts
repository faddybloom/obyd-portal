// @ts-ignore
import { defineConfig } from 'vite'
// @ts-ignore
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    rollupOptions: {
      external: [
        '@aws-amplify/backend',
        '@aws-amplify/backend-cli', 
        '@aws-amplify/backend-auth',
        '@aws-amplify/backend-data',
        '@aws-amplify/backend-storage',
        '@aws-amplify/backend-function',
        'aws-cdk',
        'aws-cdk-lib',
        'constructs'
      ]
    }
  }
})
