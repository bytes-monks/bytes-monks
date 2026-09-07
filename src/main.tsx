import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppShell from './AppShell'
import './index.css'

const tree = (
  <React.StrictMode>
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  </React.StrictMode>
)

const container = document.getElementById('root')!

// Pages are prerendered at build time (scripts/prerender.mjs), so attach to the
// existing markup rather than throwing it away — unless the container is empty,
// which happens in `vite dev` and anywhere the HTML was not prerendered.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
