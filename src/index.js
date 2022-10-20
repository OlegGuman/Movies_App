import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import ErrorLine from './components/ErrorLine'
import App from './components/App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ErrorLine />
  </StrictMode>
)
