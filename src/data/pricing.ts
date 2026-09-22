// ─── Published pricing ───────────────────────────────────────────────────────
// Rendered by src/pages/Pricing.tsx and emitted as Service + AggregateOffer
// structured data by src/lib/pageSchema.ts. Changing a price here changes both,
// which is the point — structured data that disagrees with the visible page is
// a manual-action risk, not just a missed rich result.


export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface Plan {
  name: string;
  badge?: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  numeral: string;
  features: PlanFeature[];
  cta: string;
  highlight: boolean;
}

export interface RetainerPlan {
  name: string;
  price: number;
  hours: string;
  description: string;
  numeral: string;
  services: string[];
  sla: string;
  highlight: boolean;
}

export interface SaasTier {
  name: string;
  price: string;
  unit: string;
  highlight: boolean;
}

export interface SaasProduct {
  name: string;
  tagline: string;
  description: string;
  model: 'Subscription' | 'Usage-based' | 'Subscription + Usage' | 'Free to Play';
  logoImg?: string;
  tiers: SaasTier[];
  freeTrial: string | null;
  url: string;
  cta?: string;
  /** 'paused' hides the outbound link and the price tiers. Set it whenever the
   *  product's host stops answering — a dead link next to plans that sell
   *  uptime monitoring costs more trust than the listing earns. */
  status?: 'live' | 'paused';
}

export const platformPlans: Plan[] = [
  {
    name: 'Starter',
    monthlyPrice: 299,
    annualPrice: 249,
    description: 'For early products. We host it and keep deploys working.',
    numeral: 'I',
    highlight: false,
    cta: 'Get Started',
    features: [
      { text: 'Up to 2 deployed services', included: true },
      { text: '50 GB managed storage', included: true },
      { text: 'CI/CD pipeline (GitHub Actions)', included: true },
      { text: 'SSL & custom domain', included: true },
      { text: 'Basic uptime monitoring (5-min checks)', included: true },
      { text: 'Email support (48 h response)', included: true },
      { text: 'Auto-scaling', included: false },
      { text: 'Dedicated Slack channel', included: false },
      { text: 'SLA guarantee', included: false },
    ],
  },
  {
    name: 'Growth',
    badge: 'Recommended',
    monthlyPrice: 799,
    annualPrice: 665,
    description: 'For products in production. Real monitoring, faster answers.',
    numeral: 'II',
    highlight: true,
    cta: 'Request the Trial',
    features: [
      { text: 'Up to 10 deployed services', included: true },
      { text: '500 GB managed storage', included: true },
      { text: 'CI/CD pipeline (GitHub Actions)', included: true },
      { text: 'SSL & custom domain', included: true },
      { text: 'Advanced monitoring (1-min checks + alerts)', included: true },
      { text: 'Priority email + Slack support (8 h response)', included: true },
      { text: 'Auto-scaling (up to 10 instances)', included: true },
      { text: 'Dedicated Slack channel', included: true },
      { text: 'SLA guarantee', included: false },
    ],
  },
  {
    name: 'Scale',
    monthlyPrice: 1999,
    annualPrice: 1665,
    description: 'Dedicated resources and a 99.9% uptime SLA.',
    numeral: 'III',
    highlight: false,
    cta: 'Contact Sales',
    features: [
      { text: 'Unlimited deployed services', included: true },
      { text: '2 TB managed storage', included: true },
      { text: 'CI/CD pipeline (GitHub Actions)', included: true },
      { text: 'SSL & custom domain', included: true },
      { text: 'Full observability stack (logs, metrics, traces)', included: true },
      { text: '24 / 7 phone + Slack support (1 h response)', included: true },
      { text: 'Unlimited auto-scaling', included: true },
      { text: 'Dedicated Slack channel', included: true },
      { text: '99.9% uptime SLA guarantee', included: true },
    ],
  },
];

export const retainerPlans: RetainerPlan[] = [
  {
    name: 'Essential',
    price: 2500,
    hours: '20 hrs / month',
    description: 'Someone to fix things and make small changes each month.',
    numeral: 'I',
    highlight: false,
    sla: 'Next business day',
    services: [
      'Bug fixes & maintenance',
      'Minor feature additions',
      'Dependency & security updates',
      'Monthly health report',
      'Code review',
    ],
  },
  {
    name: 'Professional',
    price: 5000,
    hours: '40 hrs / month',
    description: 'Steady engineering time for a product that keeps shipping.',
    numeral: 'II',
    highlight: true,
    sla: '4 business hours',
    services: [
      'Everything in Essential',
      'New feature development',
      'Architecture consultation',
      'Performance optimisation',
      'Bi-weekly strategy calls',
      'Dedicated Slack channel',
    ],
  },
  {
    name: 'Dedicated',
    price: 9500,
    hours: 'Full-time equivalent',
    description: 'A team that works on your product and nothing else.',
    numeral: 'III',
    highlight: false,
    sla: '1 hour',
    services: [
      'Everything in Professional',
      'Full-stack product development',
      'DevOps & infrastructure management',
      'AI/ML integration',
      'Weekly roadmap planning',
      'On-demand video calls',
      'Custom SLA available',
    ],
  },
];

export const saasProducts: SaasProduct[] = [
  {
    name: 'Genify',
    tagline: 'File Conversion & AI Content Generation',
    description:
      'Convert videos, images, and PDFs without signing up. AI image and music generation runs on credits, and you start free.',
    model: 'Subscription + Usage',
    freeTrial: '10 free AI credits on signup',
    url: 'https://genify.bytesmonks.com',
    // Host returned Cloudflare 523 on 2026-09-22. Flip back to 'live' once it answers.
    status: 'paused',
    tiers: [
      { name: 'Free', price: '$0', unit: 'unlimited file conversions', highlight: false },
      { name: 'Starter', price: '$4.99', unit: '/ mo — 100 AI credits', highlight: false },
      { name: 'Pro', price: '$9.99', unit: '/ mo — 300 AI credits', highlight: true },
    ],
  },
  {
    name: 'Cosmo Eats Stars',
    tagline: 'One-Touch Arcade Survival Game',
    description:
      'Fly a neon ship through an asteroid field and eat the stars. The more you eat, the faster it gets — grab a Supernova orb to go briefly invincible.',
    model: 'Free to Play',
    logoImg: '/logos/cosmoeatsstars.webp',
    freeTrial: null,
    url: 'https://play.google.com/store/apps/details?id=com.bytesmonks.CosmoEatStar',
    cta: 'Play Now',
    tiers: [{ name: 'Free', price: '$0', unit: 'Full game — no paywalls', highlight: true }],
  },
  {
    name: 'Form Temple',
    tagline: 'Serverless Form Backend & Spam Protection',
    description:
      'Point any HTML form at a secure endpoint and skip the backend. Spam filtering, file uploads, webhooks, and a submissions dashboard come with it.',
    model: 'Subscription',
    freeTrial: 'Free forever for your first form',
    url: 'https://formtemple.bytesmonks.com',
    // Host refused connections on 2026-09-22. Flip back to 'live' once it answers.
    status: 'paused',
    tiers: [
      { name: 'Free', price: '$0', unit: '1 form, 100 submissions / mo', highlight: false },
      { name: 'Pro', price: '$12', unit: '/ mo — 10 forms, unlimited', highlight: true },
      { name: 'Team', price: '$29', unit: '/ mo — unlimited + team access', highlight: false },
    ],
  },
];
