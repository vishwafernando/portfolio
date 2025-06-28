import React from "react"
import ReactDOM from "react-dom"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Honeybadger, HoneybadgerErrorBoundary } from "@honeybadger-io/react"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

const config = {
  apiKey: "hbp_JFYJaE6peRdLTBklrj9ULr3kKjpG261HiORK",
  environment: "production"
}

const honeybadger = Honeybadger.configure(config)

ReactDOM.render(<HoneybadgerErrorBoundary honeybadger={honeybadger}><App /></HoneybadgerErrorBoundary>, document.getElementById("root"))