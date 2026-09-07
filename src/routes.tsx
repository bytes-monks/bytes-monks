import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';

// The home page stays in the main chunk — it is the most-requested route and
// eagerly importing it keeps its hydration on the critical path. Everything
// else is a separate chunk, so a visitor to / no longer downloads the pricing
// tables, the job modal and four legal pages they will never open.
const TalentSourcing = lazy(() => import('./pages/TalentSourcing'));
const ProductSourcing = lazy(() => import('./pages/ProductSourcing'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Hiring = lazy(() => import('./pages/Hiring'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'));
const CosmoEatStarsPrivacy = lazy(() => import('./pages/CosmoEatStarsPrivacy'));

/**
 * Every path the router serves. scripts/prerender.mjs asserts this matches
 * ROUTES in src/lib/site.ts — adding a route to one and not the other fails
 * the build instead of shipping a blank prerendered page.
 */
export const ROUTE_PATHS = [
  '/',
  '/talent-sourcing',
  '/product-sourcing',
  '/pricing',
  '/hiring',
  '/terms',
  '/privacy',
  '/refund',
  '/cosmo-eat-stars/privacy',
] as const;

const CHUNKS: Record<string, () => Promise<unknown>> = {
  '/talent-sourcing': () => import('./pages/TalentSourcing'),
  '/product-sourcing': () => import('./pages/ProductSourcing'),
  '/pricing': () => import('./pages/Pricing'),
  '/hiring': () => import('./pages/Hiring'),
  '/terms': () => import('./pages/TermsOfService'),
  '/privacy': () => import('./pages/PrivacyPolicy'),
  '/refund': () => import('./pages/RefundPolicy'),
  '/cosmo-eat-stars/privacy': () => import('./pages/CosmoEatStarsPrivacy'),
};

/**
 * Warm a route's chunk on hover or focus. A first-load visitor gets the chunk
 * via the modulepreload the prerender emits; this covers client-side
 * navigation, where the chunk is otherwise only requested after the click and
 * the Suspense fallback is blank. Dynamic imports are idempotent, so repeated
 * calls cost nothing.
 */
export function prefetchRoute(to: string): void {
  CHUNKS[to.split('#')[0]]?.().catch(() => {
    /* a failed prefetch must never surface — the real navigation will retry */
  });
}

export default function AppRoutes() {
  return (
    // fallback={null} is only ever reached on a client-side navigation to a
    // not-yet-downloaded chunk. On first load the route is prerendered, and
    // React keeps that HTML on screen while the chunk arrives.
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/talent-sourcing" element={<TalentSourcing />} />
      <Route path="/product-sourcing" element={<ProductSourcing />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/hiring" element={<Hiring />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/refund" element={<RefundPolicy />} />
        <Route path="/cosmo-eat-stars/privacy" element={<CosmoEatStarsPrivacy />} />
      </Routes>
    </Suspense>
  );
}
