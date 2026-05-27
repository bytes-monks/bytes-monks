import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import App from './App'
import TermsOfService from './pages/TermsOfService'
import PrivacyPolicy from './pages/PrivacyPolicy'
import RefundPolicy from './pages/RefundPolicy'
import Pricing from './pages/Pricing'
import Hiring from './pages/Hiring'
import CosmoEatStarsPrivacy from './pages/CosmoEatStarsPrivacy'
import './index.css'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      const t = setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        else window.scrollTo(0, 0)
      }, 60)
      return () => clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/refund" element={<RefundPolicy />} />
        <Route path="/hiring" element={<Hiring />} />
        <Route path="/cosmo-eat-stars/privacy" element={<CosmoEatStarsPrivacy />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
