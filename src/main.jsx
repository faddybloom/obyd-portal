import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Amplify } from 'aws-amplify'

// Configure Amplify - outputs will be injected by Amplify Gen 2
try {
  const outputs = await import('../amplify_outputs.json')
  Amplify.configure(outputs.default || outputs)
} catch {
  // Fallback configuration will be provided by Amplify Gen 2
  console.log('Using Amplify Gen 2 auto-configuration')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
