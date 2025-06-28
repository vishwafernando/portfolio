import React from "react"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Use only createRoot (modern React 18 API)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)

