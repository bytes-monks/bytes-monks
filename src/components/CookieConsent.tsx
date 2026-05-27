import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const CONSENT_KEY = 'bm_cookie_consent';
const GA_ID = 'G-J4PKM3BBT1';

function loadGtag() {
  if (typeof window.gtag === 'function') return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) { window.dataLayer.push(args); };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      setVisible(true);
    } else if (stored === 'granted') {
      loadGtag();
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'granted');
    loadGtag();
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, 'denied');
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          style={{ position: 'fixed', bottom: 20, left: 16, right: 16, zIndex: 100, maxWidth: 420, marginLeft: 'auto' }}
        >
          <div style={{ background: 'var(--bg)', border: '1px solid var(--ink)', boxShadow: '4px 4px 0 var(--ink)', padding: '20px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
              <div className="seal" style={{ width: 40, height: 40, fontSize: 16, flexShrink: 0 }}>⁂</div>
              <div style={{ flex: 1 }}>
                <p className="serif italic" style={{ fontSize: 18, color: 'var(--vermillion)', marginBottom: 6 }}>A note on cookies</p>
                <p className="sans" style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.55 }}>
                  We keep a small ledger of analytics cookies to understand how you read our pages and
                  improve the scriptorium. No personal data is sold or shared.
                </p>
              </div>
              <button onClick={decline} aria-label="Dismiss" style={{ background: 'transparent', border: 'none', color: 'var(--ink-faint)', cursor: 'pointer', flexShrink: 0 }}>
                <X size={16} />
              </button>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={decline} className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center', padding: '10px 14px' }}>Decline</button>
              <button onClick={accept} className="btn" style={{ flex: 1, justifyContent: 'center', padding: '10px 14px' }}>Accept All</button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
