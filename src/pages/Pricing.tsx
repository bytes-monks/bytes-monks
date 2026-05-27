import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Minus, ChevronDown, ExternalLink } from 'lucide-react';
import Navigation from '../components/Navigation';

// ─── Types ────────────────────────────────────────────────────────────────────

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
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

interface RetainerPlan {
  name: string;
  price: number;
  hours: string;
  description: string;
  numeral: string;
  services: string[];
  sla: string;
  highlight: boolean;
}

interface FaqItem {
  q: string;
  a: string;
}

interface SaasTier {
  name: string;
  price: string;
  unit: string;
  highlight: boolean;
}

interface SaasProduct {
  name: string;
  tagline: string;
  description: string;
  model: 'Subscription' | 'Usage-based' | 'Subscription + Usage' | 'Free to Play';
  logoImg?: string;
  tiers: SaasTier[];
  freeTrial: string | null;
  url: string;
  cta?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const platformPlans: Plan[] = [
  {
    name: 'Starter',
    monthlyPrice: 299,
    annualPrice: 249,
    description: 'Managed cloud infrastructure and tooling for early-stage products.',
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
    badge: 'Most Popular',
    monthlyPrice: 799,
    annualPrice: 665,
    description: 'Production-grade platform with observability and priority support.',
    numeral: 'II',
    highlight: true,
    cta: 'Start Free Trial',
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
    description: 'Enterprise-ready infrastructure with dedicated resources and SLA.',
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

const retainerPlans: RetainerPlan[] = [
  {
    name: 'Essential',
    price: 2500,
    hours: '20 hrs / month',
    description: 'Ongoing technical support and small-scope development for growing teams.',
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
    description: 'Dedicated engineering bandwidth for continuous product development.',
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
    description: 'A fully embedded engineering team working exclusively on your product.',
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

const saasProducts: SaasProduct[] = [
  {
    name: 'Genify',
    tagline: 'File Conversion & AI Content Generation',
    description:
      'Instantly convert videos, images, and PDFs — no sign-up needed. Unlock AI-powered image and music generation with a credit-based subscription. Fast, private, and free to start.',
    model: 'Subscription + Usage',
    freeTrial: '10 free AI credits on signup',
    url: 'https://genify.bytesmonks.com',
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
      'Pilot a neon spacecraft through a thickening asteroid field, consuming glowing stars for energy. The more stars you devour, the faster the chaos — master precise maneuvers, collect rare Supernova orbs to go invincible, and chase the high score.',
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
      'Generate secure API endpoints for any HTML form in seconds — no backend required. Built-in spam protection, file uploads, webhook notifications, and a submission analytics dashboard.',
    model: 'Subscription',
    freeTrial: 'Free forever for your first form',
    url: 'https://formtemple.bytesmonks.com',
    tiers: [
      { name: 'Free', price: '$0', unit: '1 form, 100 submissions / mo', highlight: false },
      { name: 'Pro', price: '$12', unit: '/ mo — 10 forms, unlimited', highlight: true },
      { name: 'Team', price: '$29', unit: '/ mo — unlimited + team access', highlight: false },
    ],
  },
];

const faqs: FaqItem[] = [
  { q: 'How does billing work?', a: 'All plans are billed monthly or annually in advance. You will receive a tax-compliant invoice automatically after each payment.' },
  { q: 'Can I switch plans at any time?', a: 'Yes. You can upgrade or downgrade your platform plan at any time from your billing dashboard. Upgrades take effect immediately (prorated for the remainder of the cycle). Downgrades take effect at the start of the next billing cycle.' },
  { q: 'Is there a free trial?', a: "The Growth platform plan includes a 14-day free trial with no credit card required. IT service retainers do not include a trial period but can be cancelled with 14 days' notice before your next billing date." },
  { q: 'What is your refund policy?', a: "Platform plan subscriptions cancelled within 48 hours of the start of a new billing cycle are eligible for a full refund of that cycle's payment. After 48 hours, the subscription remains active until the end of the period — no partial refunds are issued. See our full Refund Policy for details." },
  { q: 'Who handles my payment data?', a: 'Bytes Monks never stores your payment card details. All payment processing is handled by a PCI-DSS Level 1 certified payment provider. You will receive a compliant invoice after every payment.' },
  { q: 'Are prices inclusive of tax?', a: 'Displayed prices are exclusive of applicable taxes (VAT, GST, sales tax). The tax amount applicable to your location will be calculated and shown at checkout before you confirm payment.' },
  { q: 'Can I cancel at any time?', a: 'Yes. Platform subscriptions can be cancelled at any time via the billing dashboard — your access continues until the end of the current paid period. IT retainer contracts require 14 days written notice before the next billing date.' },
  { q: 'Do you offer custom enterprise pricing?', a: 'Yes. For large teams, custom infrastructure requirements, or multi-year contracts, contact us at contact@bytesmonks.com to discuss a tailored plan.' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      style={{ marginBottom: 48, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}
    >
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="serif" style={{ fontSize: 'clamp(34px, 4.5vw, 64px)', lineHeight: 0.98, marginTop: 16, fontWeight: 500, letterSpacing: '-0.02em' }}>{title}</h2>
      </div>
      {subtitle && <p className="serif italic" style={{ fontSize: 17, color: 'var(--ink-soft)', maxWidth: 360 }}>{subtitle}</p>}
    </motion.div>
  );
}

function FaqRow({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--rule-soft)' }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '22px 0', textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit' }}>
        <span className="serif" style={{ fontSize: 21, color: 'var(--ink)' }}>{item.q}</span>
        <ChevronDown className="w-4 h-4" style={{ color: open ? 'var(--vermillion)' : 'var(--ink-faint)', flexShrink: 0, transition: 'transform 0.3s', transform: open ? 'rotate(180deg)' : 'none' }} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} style={{ overflow: 'hidden' }}>
            <p className="serif" style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-soft)', paddingBottom: 22, paddingLeft: 4 }}>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function planCardStyle(highlight: boolean): React.CSSProperties {
  return {
    border: `1px solid ${highlight ? 'var(--ink)' : 'var(--rule)'}`,
    background: highlight ? 'color-mix(in oklch, var(--vermillion) 4%, var(--bg))' : 'var(--bg)',
    boxShadow: highlight ? '6px 6px 0 var(--vermillion)' : 'none',
    padding: '32px 30px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navigation />

      {/* Hero */}
      <section className="section" style={{ paddingTop: 160, paddingBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 36, flexWrap: 'wrap' }}>
          <span className="eyebrow">The Tariff of the Order</span>
          <span style={{ flex: 1, minWidth: 40, height: 1, background: 'var(--rule-soft)' }} />
          <Link to="/" className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--ink-faint)', textTransform: 'uppercase', textDecoration: 'none' }}>← Return to the scriptorium</Link>
        </div>
        <div className="cta-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'end' }}>
          <div>
            <h1 className="serif" style={{ fontSize: 'clamp(44px, 7vw, 100px)', lineHeight: 0.9, fontWeight: 500, letterSpacing: '-0.025em' }}>
              Simple plans, <span className="italic" style={{ color: 'var(--vermillion)' }}>real value</span>.
            </h1>
            <p className="serif italic" style={{ fontSize: 22, color: 'var(--ink-soft)', maxWidth: 600, lineHeight: 1.5, marginTop: 24 }}>
              Two product lines — a fully managed SaaS infrastructure platform and flexible IT
              service retainers. No surprises, no lock-in.
            </p>
          </div>

          {/* Billing toggle */}
          <div style={{ flexShrink: 0 }}>
            <p className="mono" style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 10, textAlign: 'center' }}>Billing cycle</p>
            <div style={{ display: 'inline-flex', border: '1px solid var(--ink)' }}>
              <button onClick={() => setAnnual(false)} className="mono" style={{ padding: '12px 20px', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: !annual ? 'var(--ink)' : 'transparent', color: !annual ? 'var(--bg)' : 'var(--ink-soft)', border: 'none', cursor: 'pointer' }}>Monthly</button>
              <button onClick={() => setAnnual(true)} className="mono" style={{ padding: '12px 20px', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', background: annual ? 'var(--ink)' : 'transparent', color: annual ? 'var(--bg)' : 'var(--ink-soft)', border: 'none', borderLeft: '1px solid var(--ink)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                Annual <span style={{ color: annual ? 'var(--gilt)' : 'var(--sage)' }}>−17%</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Platform plans */}
      <section className="section" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <SectionHeader
          eyebrow="I. SaaS Running Platform"
          title={<>Managed infrastructure <span className="italic" style={{ color: 'var(--vermillion)' }}>plans</span></>}
          subtitle="We host, monitor, and operate your application infrastructure so you can focus on building product."
        />

        <div className="pricing-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 32 }}>
          {platformPlans.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} style={{ position: 'relative' }}>
              <div style={planCardStyle(plan.highlight)}>
                {plan.badge && (
                  <span className="mono" style={{ position: 'absolute', top: -11, left: 24, background: 'var(--vermillion)', color: 'var(--bg)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '4px 12px' }}>{plan.badge}</span>
                )}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 6 }}>
                  <span className="serif italic" style={{ fontSize: 30, color: 'var(--vermillion)', lineHeight: 1 }}>{plan.numeral}</span>
                  <p className="serif" style={{ fontSize: 26, fontWeight: 500, color: 'var(--ink)' }}>{plan.name}</p>
                </div>
                <p className="sans" style={{ fontSize: 13, color: 'var(--ink-faint)', lineHeight: 1.5, marginBottom: 24 }}>{plan.description}</p>

                <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid var(--rule-soft)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
                    <span className="serif" style={{ fontSize: 22, color: 'var(--ink-faint)' }}>$</span>
                    <span className="serif italic" style={{ fontSize: 56, fontWeight: 500, lineHeight: 0.9, color: 'var(--ink)' }}>{annual ? plan.annualPrice : plan.monthlyPrice}</span>
                    <span className="mono" style={{ fontSize: 11, color: 'var(--ink-faint)', marginBottom: 8 }}>/ mo</span>
                  </div>
                  {annual && <p className="mono" style={{ fontSize: 10, color: 'var(--sage)', marginTop: 6, letterSpacing: '0.06em' }}>Billed annually — ${plan.annualPrice * 12} / yr</p>}
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14 }}>
                      {f.included ? <Check className="w-4 h-4" style={{ color: 'var(--sage)', flexShrink: 0, marginTop: 2 }} /> : <Minus className="w-4 h-4" style={{ color: 'var(--ink-trace)', flexShrink: 0, marginTop: 2 }} />}
                      <span className="sans" style={{ color: f.included ? 'var(--ink)' : 'var(--ink-trace)' }}>{f.text}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/#contact" className={plan.highlight ? 'btn' : 'btn btn-ghost'} style={{ justifyContent: 'center' }}>{plan.cta}</Link>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <span>⁜ No setup fees</span>
          <span>⁜ Cancel any time</span>
          <span>⁜ Secure payments — VAT invoices included</span>
        </p>
      </section>

      {/* Retainers */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 80, background: 'color-mix(in oklch, var(--bg-deep) 40%, var(--bg))', maxWidth: 'unset' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', paddingTop: 80 }}>
          <SectionHeader
            eyebrow="II. IT Services"
            title={<>Engineering <span className="italic" style={{ color: 'var(--vermillion)' }}>retainers</span></>}
            subtitle="Dedicated engineering hours billed monthly. Scope the work you need, pause or cancel with 14 days' notice."
          />

          <div className="pricing-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {retainerPlans.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }}>
                <div style={planCardStyle(plan.highlight)}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 6 }}>
                    <span className="serif italic" style={{ fontSize: 30, color: 'var(--vermillion)', lineHeight: 1 }}>{plan.numeral}</span>
                    <div>
                      <p className="serif" style={{ fontSize: 26, fontWeight: 500, color: 'var(--ink)' }}>{plan.name}</p>
                      <p className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginTop: 4 }}>{plan.hours}</p>
                    </div>
                  </div>
                  <p className="sans" style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.55, margin: '14px 0 20px' }}>{plan.description}</p>

                  <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid var(--rule-soft)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4 }}>
                      <span className="serif" style={{ fontSize: 22, color: 'var(--ink-faint)' }}>$</span>
                      <span className="serif italic" style={{ fontSize: 56, fontWeight: 500, lineHeight: 0.9, color: 'var(--ink)' }}>{plan.price.toLocaleString()}</span>
                      <span className="mono" style={{ fontSize: 11, color: 'var(--ink-faint)', marginBottom: 8 }}>/ mo</span>
                    </div>
                    <p className="mono" style={{ fontSize: 10, color: 'var(--ink-faint)', marginTop: 6, letterSpacing: '0.04em' }}>Billed monthly · cancel with 14 days' notice</p>
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                    {plan.services.map((s, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14 }}>
                        <Check className="w-4 h-4" style={{ color: 'var(--sage)', flexShrink: 0, marginTop: 2 }} />
                        <span className="sans" style={{ color: 'var(--ink)' }}>{s}</span>
                      </li>
                    ))}
                  </ul>

                  <div style={{ marginBottom: 24, padding: '12px 16px', borderLeft: '2px solid var(--vermillion)', background: 'color-mix(in oklch, var(--bg-deep) 40%, transparent)' }}>
                    <span className="mono" style={{ fontSize: 11, color: 'var(--ink-soft)', letterSpacing: '0.04em' }}>Response SLA: <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{plan.sla}</span></span>
                  </div>

                  <Link to="/#contact" className={plan.highlight ? 'btn' : 'btn btn-ghost'} style={{ justifyContent: 'center' }}>Get Started</Link>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="serif italic" style={{ marginTop: 28, fontSize: 17, color: 'var(--ink-soft)' }}>
            Need a custom scope or a one-off project? <Link to="/#contact" className="link-ink">Talk to us</Link> — we'll put together a tailored proposal.
          </p>
        </div>
      </section>

      {/* SaaS products */}
      <section className="section" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <SectionHeader
          eyebrow="III. Live Products"
          title={<>Our running <span className="italic" style={{ color: 'var(--vermillion)' }}>SaaS projects</span></>}
          subtitle="Beyond client work, we build and operate our own products — each with transparent, usage-based or subscription pricing."
        />

        <div className="pricing-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {saasProducts.map((product, i) => (
            <motion.div key={product.name} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }}>
              <div style={{ border: '1px solid var(--rule)', background: 'var(--bg)', padding: '30px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 44, height: 44, border: '1px solid var(--rule)', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-deep)' }}>
                      {product.logoImg ? <img src={product.logoImg} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span className="serif italic" style={{ color: 'var(--vermillion)', fontSize: 18 }}>{product.name[0]}</span>}
                    </div>
                    <div>
                      <p className="serif" style={{ fontSize: 22, fontWeight: 500, color: 'var(--ink)', lineHeight: 1.1 }}>{product.name}</p>
                      <p className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginTop: 4 }}>{product.tagline}</p>
                    </div>
                  </div>
                  <span className="mono" style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--vermillion)', border: '1px solid var(--vermillion)', padding: '4px 8px', flexShrink: 0 }}>{product.model}</span>
                </div>

                <p className="sans" style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-soft)', marginBottom: 24 }}>{product.description}</p>

                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${product.tiers.length}, 1fr)`, gap: 10, marginBottom: 20 }}>
                  {product.tiers.map((tier) => (
                    <div key={tier.name} style={{ border: `1px solid ${tier.highlight ? 'var(--vermillion)' : 'var(--rule)'}`, background: tier.highlight ? 'color-mix(in oklch, var(--vermillion) 5%, var(--bg))' : 'var(--bg)', padding: '12px', textAlign: 'center' }}>
                      <p className="mono" style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: tier.highlight ? 'var(--vermillion)' : 'var(--ink-faint)', marginBottom: 6 }}>{tier.name}</p>
                      <p className="serif italic" style={{ fontSize: 22, fontWeight: 500, color: 'var(--ink)', lineHeight: 1, marginBottom: 6 }}>{tier.price}</p>
                      <p className="sans" style={{ fontSize: 10, color: 'var(--ink-faint)', lineHeight: 1.3 }}>{tier.unit}</p>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 'auto', paddingTop: 8 }}>
                  {product.freeTrial ? <span className="mono" style={{ fontSize: 10, letterSpacing: '0.04em', color: 'var(--sage)' }}>⁜ {product.freeTrial}</span> : <span />}
                  <a href={product.url} target="_blank" rel="noopener noreferrer" className="link-ink serif italic" style={{ fontSize: 15, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    {product.cta ?? 'Visit'} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Billing trust strip */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 80 }}>
        <div className="pricing-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
          {[
            { title: 'Secure Payments', body: 'PCI-DSS Level 1 certified processing. Your card data never touches our servers.' },
            { title: 'Tax-Compliant Invoicing', body: 'VAT, GST, and sales tax calculated by location. Compliant invoice after every payment.' },
            { title: 'Flexible Cancellation', body: 'Cancel any time from your billing dashboard. Access continues until the period ends.' },
          ].map((item, i) => (
            <div key={i} style={{ padding: '32px', borderRight: i < 2 ? '1px solid var(--rule)' : 'none' }}>
              <div className="serif italic" style={{ fontSize: 22, color: 'var(--vermillion)', marginBottom: 10 }}>{['α', 'β', 'γ'][i]}</div>
              <p className="serif" style={{ fontSize: 20, fontWeight: 500, color: 'var(--ink)', marginBottom: 8 }}>{item.title}</p>
              <p className="sans" style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.6 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 80 }}>
        <div style={{ marginBottom: 40 }}>
          <span className="eyebrow">Common Questions</span>
          <h2 className="serif" style={{ fontSize: 'clamp(34px, 4.5vw, 64px)', lineHeight: 0.98, marginTop: 16, fontWeight: 500, letterSpacing: '-0.02em' }}>
            Answered <span className="italic" style={{ color: 'var(--vermillion)' }}>plainly</span>.
          </h2>
        </div>
        <div style={{ maxWidth: 820 }}>
          {faqs.map((item, i) => <FaqRow key={i} item={item} />)}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 100 }}>
        <div style={{ border: '1px solid var(--ink)', background: 'color-mix(in oklch, var(--bg-deep) 30%, var(--bg))' }}>
          <div className="cta-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto' }}>
            <div style={{ padding: 'clamp(32px, 5vw, 56px)' }}>
              <span className="eyebrow">Not sure which plan fits?</span>
              <h2 className="serif" style={{ fontSize: 'clamp(32px, 4.5vw, 60px)', lineHeight: 0.95, marginTop: 18, fontWeight: 500, letterSpacing: '-0.02em' }}>
                Book a free 30-minute<br /><span className="italic" style={{ color: 'var(--vermillion)' }}>strategy call.</span>
              </h2>
              <p className="serif italic" style={{ fontSize: 19, color: 'var(--ink-soft)', marginTop: 20, maxWidth: 520, lineHeight: 1.5 }}>
                We'll recommend the right combination for your stage and budget — no commitment required.
              </p>
            </div>
            <div className="cta-side" style={{ borderLeft: '1px solid var(--rule)', background: 'color-mix(in oklch, var(--bg-deep) 50%, var(--bg))', padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14, minWidth: 280 }}>
              <Link to="/#contact" className="btn" style={{ justifyContent: 'center' }}>Book a Free Call →</Link>
              <p className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-faint)', textAlign: 'center' }}>XXIV-hour response · no obligation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer strip */}
      <footer style={{ borderTop: '1px solid var(--rule)', padding: '32px 48px', maxWidth: 1320, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <span className="mono" style={{ fontSize: 10, color: 'var(--ink-faint)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>© {new Date().getFullYear()} Ordo Bytorum</span>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <Link to="/privacy" className="link-ink serif" style={{ fontSize: 14 }}>Privacy</Link>
          <Link to="/terms" className="link-ink serif" style={{ fontSize: 14 }}>Terms</Link>
          <Link to="/refund" className="link-ink serif" style={{ fontSize: 14 }}>Refund</Link>
        </div>
      </footer>
    </div>
  );
}
