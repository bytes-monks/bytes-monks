import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

const CONSENT_KEY = 'bm_cookie_consent';

type ConsentValue = 'granted' | 'denied';

function updateGtagConsent(value: ConsentValue) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('consent', 'update', {
    analytics_storage: value,
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
  });
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      setVisible(true);
    } else {
      updateGtagConsent(stored as ConsentValue);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'granted');
    updateGtagConsent('granted');
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, 'denied');
    updateGtagConsent('denied');
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
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-50"
        >
          <div className="glass rounded-2xl p-5 shadow-2xl border border-white/10">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center">
                <Cookie size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm mb-1">We use cookies</p>
                <p className="text-gray-400 text-xs leading-relaxed">
                  We use analytics cookies to understand how you interact with our site and improve
                  your experience. No personal data is sold or shared with third parties.
                </p>
              </div>
              <button
                onClick={decline}
                className="flex-shrink-0 text-gray-500 hover:text-gray-300 transition-colors"
                aria-label="Dismiss"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex gap-3">
              <button
                onClick={decline}
                className="flex-1 text-xs font-medium py-2 px-4 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="flex-1 text-xs font-medium py-2 px-4 rounded-lg bg-gradient-to-r from-primary to-accent-purple text-white hover:opacity-90 transition-opacity"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
