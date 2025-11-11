import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/geist-mono/100.css'
import '@fontsource/geist-mono/200.css'
import '@fontsource/geist-mono/300.css'
import '@fontsource/geist-mono/400.css'
import '@fontsource/geist-mono/500.css'
import '@fontsource/geist-mono/600.css'
import '@fontsource/geist-mono/700.css'
import '@fontsource/geist-mono/800.css'
import '@fontsource/geist-mono/900.css'
import './index.css'
import './styles/main.scss'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
