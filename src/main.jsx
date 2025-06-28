import React from "react"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Honeybadger, HoneybadgerErrorBoundary } from "@honeybadger-io/react"

// Configure Honeybadger
const config = {
  apiKey: "hbp_JFYJaE6peRdLTBklrj9ULr3kKjpG261HiORK",
  environment: "production"
}

const honeybadger = Honeybadger.configure(config)

// Use only createRoot (modern React 18 API)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HoneybadgerErrorBoundary honeybadger={honeybadger}>
      <App />
    </HoneybadgerErrorBoundary>
  </StrictMode>,
)