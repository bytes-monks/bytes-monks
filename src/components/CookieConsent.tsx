import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { CONSENT_OPEN_EVENT, installClickTracking } from '../lib/track';

const CONSENT_KEY = 'bm_cookie_consent';
const GA_ID = 'G-J4PKM3BBT1';

// Storage can be blocked (private mode, strict site-data settings). An
// unguarded access throws inside an effect and blanked the whole home page.
function readConsent(): string | null {
  try { return localStorage.getItem(CONSENT_KEY); } catch { return null; }
}
function writeConsent(value: 'granted' | 'denied'): void {
  try { localStorage.setItem(CONSENT_KEY, value); } catch { /* the choice still holds for this visit */ }
}

function loadGtag() {
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = false;
  if (typeof window.gtag === 'function') return;
  window.dataLayer = window.dataLayer || [];
  // gtag.js only processes Arguments objects. A rest-parameter array is
  // silently ignored, which is why no hit was recorded from April 2026 on.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  // The notice promises analytics only, so Google signals (ad audiences) stay off.
  window.gtag('config', GA_ID, { allow_google_signals: false, allow_ad_personalization_signals: false });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
  installClickTracking();
}

/** Withdrawing consent: stop sending hits and drop the GA cookies. */
function disableGtag() {
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = true;
  const host = window.location.hostname.replace(/^www\./, '');
  for (const name of document.cookie.split(';').map((c) => c.split('=')[0].trim())) {
    if (name === '_ga' || name.startsWith('_ga_')) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${host}`;
      document.cookie = `${name}=; Max-Age=0; path=/`;
    }
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const stored = readConsent();
    if (!stored) {
      setVisible(true);
    } else if (stored === 'granted') {
      loadGtag();
    }
    const reopen = () => setVisible(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  // While the notice is up: Escape declines, and focused controls near the
  // bottom of the page scroll clear of it instead of hiding behind it.
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') decline(); };
    document.addEventListener('keydown', onKey);
    const h = panelRef.current?.offsetHeight ?? 0;
    document.documentElement.style.scrollPaddingBottom = `${h + 24}px`;
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.scrollPaddingBottom = '';
    };
  }, [visible]);

  function accept() {
    writeConsent('granted');
    loadGtag();
    setVisible(false);
  }

  function decline() {
    const wasGranted = readConsent() === 'granted';
    writeConsent('denied');
    if (wasGranted) disableGtag();
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          ref={panelRef}
          aria-label="Cookie notice"
          className="cookie-notice"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          style={{ position: 'fixed', bottom: 20, left: 16, right: 16, zIndex: 100, maxWidth: 420, marginLeft: 'auto' }}
        >
          <div className="cookie-body" style={{ background: 'var(--bg)', border: '1px solid var(--ink)', boxShadow: '4px 4px 0 var(--ink)', padding: '20px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
              <div className="seal cookie-seal" aria-hidden style={{ width: 40, height: 40, fontSize: 16, flexShrink: 0 }}>⁂</div>
              <div style={{ flex: 1 }}>
                <p className="serif italic cookie-title" style={{ fontSize: 18, color: 'var(--vermillion)', marginBottom: 6 }}>A note on cookies</p>
                <p className="sans" style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.55 }}>
                  Analytics cookies only, to see which pages get read. We don't sell your data.{' '}
                  <Link to="/privacy" className="link-ink">Privacy policy</Link>
                </p>
              </div>
              <button onClick={decline} aria-label="Decline and close" style={{ background: 'transparent', border: 'none', color: 'var(--ink-faint)', cursor: 'pointer', flexShrink: 0, padding: 6, margin: -6 }}>
                <X size={16} aria-hidden />
              </button>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={decline} className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center', padding: '10px 14px' }}>Decline</button>
              <button onClick={accept} className="btn" style={{ flex: 1, justifyContent: 'center', padding: '10px 14px' }}>Accept</button>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
