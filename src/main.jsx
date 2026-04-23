import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import App from './App.jsx'

// Recarrega a página automaticamente quando um novo SW assume o controle
registerSW({ immediate: true, onRegisteredSW() {}, onOfflineReady() {} })

navigator.serviceWorker?.addEventListener('controllerchange', () => {
  window.location.reload()
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
