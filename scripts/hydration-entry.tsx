import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppShell from '../src/AppShell'

const w = window as unknown as { __HYDRATION_ERRORS__: string[] }
w.__HYDRATION_ERRORS__ = []

hydrateRoot(
  document.getElementById('root')!,
  (
    <React.StrictMode>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </React.StrictMode>
  ),
  {
    onRecoverableError: (err: unknown) => {
      w.__HYDRATION_ERRORS__.push(String((err as Error)?.message ?? err))
    },
  }
)
