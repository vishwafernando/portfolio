import React from "react"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Honeybadger, HoneybadgerErrorBoundary } from "@honeybadger-io/react"
 
// Configure Honeybadger
const config = { 
   apiKey: import.meta.env.VITE_HONEYBADGER_API_KEY,
    environment: import.meta.env.VITE_ENVIRONMENT || "production",
    debug: import.meta.env.DEV // Enable debug in development
}

// Only configure Honeybadger if API key is available
const honeybadger = config.apiKey ? Honeybadger.configure(config) : null

// Use only createRoot (modern React 18 API)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {honeybadger ? (
      <HoneybadgerErrorBoundary honeybadger={honeybadger}>
        <App />
      </HoneybadgerErrorBoundary>
    ) : (
      <App />
    )}
  </StrictMode>
)

  