// ─── Single source of truth for site-wide SEO ────────────────────────────────
// Consumed at runtime by <Seo /> and at build time by scripts/generate-sitemap.mjs
// and scripts/prerender.mjs. Keep every route the router serves listed here.

export const SITE_URL = 'https://bytesmonks.com';
export const SITE_NAME = 'Bytes Monks';
export const SITE_LOCALE = 'en_US';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
export const CONTACT_EMAIL = 'contact@bytesmonks.com';

/** Loaded only on routes with `hand: true`. Kept as its own request so the
 *  other seven routes do not pay for a face they never render. */
export const HAND_FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap';

/** Fallback so every route emits the tag — otherwise <Seo> would leave the
 *  previous route's keywords in the head on client-side navigation. */
export const DEFAULT_KEYWORDS =
  'Bytes Monks, software development agency, AI systems, tech talent sourcing, Tunis, remote engineering team';

export const SOCIAL_PROFILES = [
  'https://www.linkedin.com/company/bytes-monks/',
  'https://github.com/bytes-monks',
];

export interface Crumb {
  name: string;
  path: string;
}

export interface RouteMeta {
  /** Router path, always with a leading slash and no trailing slash (except '/'). */
  path: string;
  title: string;
  description: string;
  keywords?: string;
  /** Absolute URL. Falls back to the site-wide OG image. */
  image?: string;
  imageAlt?: string;
  ogType?: 'website' | 'article' | 'profile';
  /** Omit the crumb for the home page; every other route lists its full trail. */
  breadcrumb?: Crumb[];
  /** Whether this route uses the .hand (Caveat) face. The stylesheet is
   *  ~73 KB and is loaded per route rather than site-wide. */
  hand?: boolean;
  /** Source module of this route's lazy chunk, used by scripts/prerender.mjs
   *  to emit a modulepreload so hydration does not wait on a second round trip. */
  entry?: string;
  noindex?: boolean;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const ROUTES: RouteMeta[] = [
  {
    path: '/',
    title: 'Software & AI Development Company in Tunis | Bytes Monks',
    description:
      'Software and AI development from Tunis: web apps, AI agents, data pipelines and managed cloud. We also source engineers, and goods from China.',
    keywords:
      'software development company Tunis, AI development company, custom software, machine learning, data engineering, DevOps, managed hosting',
    ogType: 'website',
    changefreq: 'weekly',
    priority: 1.0,
  },
  {
    path: '/talent-sourcing',
    entry: 'src/pages/TalentSourcing.tsx',
    hand: true,
    title: 'Tech Talent Sourcing | Hire Vetted Engineers · Bytes Monks',
    description:
      'AI, software, data and DevOps engineers, found and vetted by engineers who do the work. Hire permanent, on contract, or as a squad.',
    keywords:
      'tech talent sourcing, IT recruitment agency, hire AI engineers, hire software developers, staff augmentation, dedicated development team, vetted engineers, technical recruiting, nearshore engineering talent',
    image: `${SITE_URL}/og-talent-sourcing.png`,
    imageAlt: 'Bytes Monks talent sourcing — we find the hands',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Talent Sourcing', path: '/talent-sourcing' },
    ],
    changefreq: 'weekly',
    priority: 0.9,
  },
  {
    path: '/product-sourcing',
    title: 'China Product Sourcing & Import Agent | Bytes Monks',
    description:
      'We source products from China: supplier search, samples, price negotiation, QC inspection, freight and customs. Inspected before you pay the balance.',
    keywords:
      'product sourcing China, China sourcing agent, import from China, supplier verification, factory audit, QC inspection China, private label manufacturing, freight and customs, sourcing agent Tunisia',
    image: `${SITE_URL}/og-product-sourcing.png`,
    imageAlt: 'Bytes Monks product sourcing — we go and see the factory floor',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Product Sourcing', path: '/product-sourcing' },
    ],
    entry: 'src/pages/ProductSourcing.tsx',
    hand: true,
    changefreq: 'weekly',
    priority: 0.9,
  },
  {
    path: '/pricing',
    entry: 'src/pages/Pricing.tsx',
    title: 'Managed Hosting & Engineering Retainer Pricing | Bytes Monks',
    description:
      'Prices for managed hosting plans and monthly engineering retainers, plus our own products. Talent and product sourcing are quoted per brief.',
    keywords:
      'software development pricing, engineering retainer, managed platform plans, SaaS pricing, development agency rates',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Pricing', path: '/pricing' },
    ],
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    path: '/hiring',
    entry: 'src/pages/Hiring.tsx',
    title: 'Remote Marketing & Business Internships | Bytes Monks',
    description:
      'Remote internships at a small software company in Tunis. Marketing and business development roles, working directly with the founders.',
    keywords:
      'Bytes Monks careers, remote internships, tech startup jobs, social media manager intern, business developer intern',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Careers', path: '/hiring' },
    ],
    changefreq: 'weekly',
    priority: 0.8,
  },
  {
    path: '/terms',
    entry: 'src/pages/TermsOfService.tsx',
    title: 'Terms of Service | Bytes Monks',
    description:
      'Scope, payment, intellectual property, warranties and liability for work with Bytes Monks.',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Terms of Service', path: '/terms' },
    ],
    changefreq: 'yearly',
    priority: 0.3,
  },
  {
    path: '/privacy',
    entry: 'src/pages/PrivacyPolicy.tsx',
    title: 'Privacy Policy | Bytes Monks',
    description:
      'What Bytes Monks collects, why, how long we keep it, and how to ask us to delete it.',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Privacy Policy', path: '/privacy' },
    ],
    changefreq: 'yearly',
    priority: 0.3,
  },
  {
    path: '/refund',
    entry: 'src/pages/RefundPolicy.tsx',
    title: 'Refund Policy | Bytes Monks',
    description:
      'When Bytes Monks refunds a payment, when it does not, and how to ask.',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Refund Policy', path: '/refund' },
    ],
    changefreq: 'yearly',
    priority: 0.3,
  },
  {
    path: '/cosmo-eat-stars/privacy',
    entry: 'src/pages/CosmoEatStarsPrivacy.tsx',
    title: 'Cosmo Eat Stars — Privacy Policy | Bytes Monks',
    description:
      'What the Cosmo Eats Stars game collects, how ads work for children, and how to reach us about your data.',
    ogType: 'website',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Cosmo Eat Stars', path: '/cosmo-eat-stars/privacy' },
    ],
    changefreq: 'yearly',
    priority: 0.2,
  },
];

export function getRouteMeta(path: string): RouteMeta {
  const clean = path.length > 1 ? path.replace(/\/+$/, '') : '/';
  return ROUTES.find((r) => r.path === clean) ?? ROUTES[0];
}

export function absoluteUrl(path: string): string {
  if (path === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
