// ─── Analytics events ─────────────────────────────────────────────────────────
// Every call is a no-op until the visitor accepts analytics cookies: gtag only
// exists after CookieConsent loads it.

/** Re-opens the cookie notice; CookieConsent listens for this event. */
export const CONSENT_OPEN_EVENT = 'bm:consent-open';

export function track(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

let clickTrackingInstalled = false;

/**
 * One delegated listener for the clicks GA4 enhanced measurement does not
 * record: mailto links, and any element tagged with data-cta="<name>".
 */
export function installClickTracking(): void {
  if (clickTrackingInstalled || typeof document === 'undefined') return;
  clickTrackingInstalled = true;
  document.addEventListener('click', (e) => {
    const el = (e.target as Element | null)?.closest?.('a, button');
    if (!el) return;
    const href = el.getAttribute('href') ?? '';
    if (href.startsWith('mailto:')) {
      track('email_click', { page: window.location.pathname });
    }
    const cta = (el as HTMLElement).dataset?.cta;
    if (cta) track('cta_click', { cta, page: window.location.pathname });
  }, { capture: true });
}
