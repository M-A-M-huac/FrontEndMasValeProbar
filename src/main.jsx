import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import './index.css'
import App from './App.jsx'

axios.defaults.baseURL = 'https://recetariobackend-g6a9.onrender.com'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
