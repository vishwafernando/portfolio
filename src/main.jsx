import React from "react"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Honeybadger, HoneybadgerErrorBoundary } from "@honeybadger-io/react"

// Configure Honeybadger
const config = {
   apiKey: import.meta.env.VITE_HONEYBADGER_API_KEY || "development-key",
    environment: import.meta.env.VITE_ENVIRONMENT || "development",
    debug: import.meta.env.DEV // Enable debug in development
}

const honeybadger = Honeybadger.configure(config)

// Only render error boundary if API key is properly configured
const renderApp = () => {
  if (import.meta.env.VITE_HONEYBADGER_API_KEY) {
    return (
      <StrictMode>
        <HoneybadgerErrorBoundary honeybadger={honeybadger}>
          <App />
        </HoneybadgerErrorBoundary>
      </StrictMode>
    );
  } else {
    // Fallback without error boundary in development without API key
    console.warn('Honeybadger API key not configured. Error tracking disabled.');
    return (
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
};

// Use only createRoot (modern React 18 API)
createRoot(document.getElementById('root')).render(renderApp())

