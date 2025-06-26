import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  define: {
    global: 'globalThis'
  },
  plugins: [react()],
  build: {
    commonjsOptions: {
      strictRequires: true,
      transformMixedEsModules: true
    },
    rollupOptions: {
      external: [
        '@aws-amplify/backend',
        '@aws-amplify/backend-cli',
        '@aws-amplify/backend-auth',
        '@aws-amplify/backend-data',
        '@aws-amplify/backend-storage',
        '@aws-amplify/backend-function',
        '@aws-amplify/data-schema-types',
        '@aws-amplify/data-schema',
        'aws-cdk',
        'aws-cdk-lib',
        'constructs',
        'aws-cdk-lib/aws-lambda-nodejs',
      ],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          amplify: ['aws-amplify']
        }
      },
    },
    chunkSizeWarningLimit: 1000
  },
  resolve: {
    alias: {
      url: 'rollup-plugin-node-polyfills/polyfills/url',
      path: 'rollup-plugin-node-polyfills/polyfills/path',
      os: 'rollup-plugin-node-polyfills/polyfills/os',
      module: 'rollup-plugin-node-polyfills/polyfills/module'
    },
    mainFields: ['browser', 'module', 'main']
  },
  optimizeDeps: {
    exclude: [
      '@aws-amplify/backend',
      '@aws-amplify/backend-cli',
      '@aws-amplify/backend-auth',
      '@aws-amplify/backend-data',
      '@aws-amplify/backend-storage',
      '@aws-amplify/backend-function',
      '@aws-amplify/data-schema-types',
      '@aws-amplify/data-schema',
      'aws-cdk',
      'aws-cdk-lib',
      'constructs',
      'aws-cdk-lib/aws-lambda-nodejs',
    ]
  }
})
