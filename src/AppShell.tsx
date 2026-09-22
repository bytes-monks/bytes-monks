import { useEffect, useRef } from 'react';
import { MotionConfig } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import AppRoutes from './routes';
import CookieConsent from './components/CookieConsent';

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;
}

function RouteChange() {
  const { pathname, hash } = useLocation();
  const firstRun = useRef(true);
  useEffect(() => {
    // A full page load already starts at the top with focus on the document,
    // so the skip link is the first Tab stop. Moving focus into <main> here
    // made keyboard users skip the skip link and the whole nav.
    const initial = firstRun.current;
    firstRun.current = false;
    const behavior: ScrollBehavior = prefersReducedMotion() ? 'auto' : 'smooth';

    if (hash) {
      const id = hash.slice(1);
      const t = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior });
        else window.scrollTo(0, 0);
      }, 60);
      return () => clearTimeout(t);
    }

    if (initial) return;
    window.scrollTo(0, 0);
    // A client-side route change replaces the whole page with no announcement
    // and leaves focus where it was. Moving it to <main> restores the reading
    // position a full page load would have given.
    const main = document.getElementById('main');
    main?.focus({ preventScroll: true });
  }, [pathname, hash]);
  return null;
}

/**
 * Everything inside the router, shared by src/main.tsx and src/entry-server.tsx.
 * The two entries must render an IDENTICAL component tree — useId derives its
 * values from tree position, so an extra wrapper on one side alone would change
 * every generated SVG id and break hydration.
 */
export default function AppShell() {
  return (
    // reducedMotion="user" makes every framer-motion component on the site
    // honour the OS setting; the CSS side is already handled in index.css.
    <MotionConfig reducedMotion="user">
      <RouteChange />
      <AppRoutes />
      <CookieConsent />
    </MotionConfig>
  );
}
