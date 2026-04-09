import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Check,
  Minus,
  ArrowLeft,
  ArrowRight,
  Zap,
  Layers,
  Rocket,
  Clock,
  Users,
  Shield,
  ChevronDown,
  BadgeCheck,
  CreditCard,
  RefreshCw,
  Wand2,
  FileInput,
  ExternalLink,
  Gauge,
} from 'lucide-react';

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
  icon: React.ElementType;
  gradient: string;
  features: PlanFeature[];
  cta: string;
  highlight: boolean;
}

interface RetainerPlan {
  name: string;
  price: number;
  hours: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
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
  modelColor: string;
  icon?: React.ElementType;
  logoImg?: string;
  gradient: string;
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
    icon: Zap,
    gradient: 'from-blue-500 to-cyan-500',
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
    icon: Layers,
    gradient: 'from-violet-500 to-purple-600',
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
    icon: Rocket,
    gradient: 'from-orange-500 to-pink-500',
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
    icon: Clock,
    gradient: 'from-blue-500 to-cyan-500',
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
    icon: Users,
    gradient: 'from-violet-500 to-purple-600',
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
    icon: Shield,
    gradient: 'from-orange-500 to-pink-500',
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
    modelColor: 'text-amber-400 bg-amber-400/10',
    icon: Wand2,
    gradient: 'from-amber-500 to-orange-500',
    freeTrial: '10 free AI credits on signup',
    url: 'https://genify.bytesmonks.com',
    tiers: [
      { name: 'Free',    price: '$0',    unit: 'unlimited file conversions', highlight: false },
      { name: 'Starter', price: '$4.99', unit: '/ mo — 100 AI credits',      highlight: false },
      { name: 'Pro',     price: '$9.99', unit: '/ mo — 300 AI credits',      highlight: true  },
    ],
  },
  {
    name: 'Cosmo Eats Stars',
    tagline: 'One-Touch Arcade Survival Game',
    description:
      'Pilot a neon spacecraft through a thickening asteroid field, consuming glowing stars for energy. The more stars you devour, the faster the chaos — master precise maneuvers, collect rare Supernova orbs to go invincible, and chase the high score.',
    model: 'Free to Play',
    modelColor: 'text-violet-400 bg-violet-400/10',
    logoImg: '/logos/cosmoeatsstars.webp',
    gradient: 'from-violet-500 to-indigo-600',
    freeTrial: null,
    url: 'https://play.google.com/store/apps/details?id=com.bytesmonks.CosmoEatStar',
    cta: 'Play Now',
    tiers: [
      { name: 'Free', price: '$0', unit: 'Full game — no paywalls', highlight: true },
    ],
  },
  {
    name: 'Form Temple',
    tagline: 'Serverless Form Backend & Spam Protection',
    description:
      'Generate secure API endpoints for any HTML form in seconds — no backend required. Built-in spam protection, file uploads, webhook notifications, and a submission analytics dashboard.',
    model: 'Subscription',
    modelColor: 'text-emerald-400 bg-emerald-400/10',
    icon: FileInput,
    gradient: 'from-emerald-500 to-teal-500',
    freeTrial: 'Free forever for your first form',
    url: 'https://formtemple.bytesmonks.com',
    tiers: [
      { name: 'Free',  price: '$0',   unit: '1 form, 100 submissions / mo',  highlight: false },
      { name: 'Pro',   price: '$12',  unit: '/ mo — 10 forms, unlimited',    highlight: true  },
      { name: 'Team',  price: '$29',  unit: '/ mo — unlimited + team access', highlight: false },
    ],
  },
];

const faqs: FaqItem[] = [
  {
    q: 'How does billing work?',
    a: 'All plans are billed monthly or annually in advance. You will receive a tax-compliant invoice automatically after each payment.',
  },
  {
    q: 'Can I switch plans at any time?',
    a: 'Yes. You can upgrade or downgrade your platform plan at any time from your billing dashboard. Upgrades take effect immediately (prorated for the remainder of the cycle). Downgrades take effect at the start of the next billing cycle.',
  },
  {
    q: 'Is there a free trial?',
    a: "The Growth platform plan includes a 14-day free trial with no credit card required. IT service retainers do not include a trial period but can be cancelled with 14 days' notice before your next billing date.",
  },
  {
    q: 'What is your refund policy?',
    a: "Platform plan subscriptions cancelled within 48 hours of the start of a new billing cycle are eligible for a full refund of that cycle's payment. After 48 hours, the subscription remains active until the end of the period — no partial refunds are issued. See our full Refund Policy for details.",
  },
  {
    q: 'Who handles my payment data?',
    a: 'Bytes Monks never stores your payment card details. All payment processing is handled by a PCI-DSS Level 1 certified payment provider. You will receive a compliant invoice after every payment.',
  },
  {
    q: 'Are prices inclusive of tax?',
    a: 'Displayed prices are exclusive of applicable taxes (VAT, GST, sales tax). The tax amount applicable to your location will be calculated and shown at checkout before you confirm payment.',
  },
  {
    q: 'Can I cancel at any time?',
    a: "Yes. Platform subscriptions can be cancelled at any time via the billing dashboard — your access continues until the end of the current paid period. IT retainer contracts require 14 days written notice before the next billing date.",
  },
  {
    q: 'Do you offer custom enterprise pricing?',
    a: 'Yes. For large teams, custom infrastructure requirements, or multi-year contracts, contact us at contact@bytesmonks.com to discuss a tailored plan.',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  inView,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className="mb-12"
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="w-8 h-px bg-primary" />
        <span className="text-primary text-xs tracking-widest uppercase font-medium">{eyebrow}</span>
      </div>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white">{title}</h2>
        {subtitle && (
          <p className="text-gray-600 max-w-md text-sm">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
}

function FaqRow({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-b border-gray-800/50 last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="text-gray-300 group-hover:text-white transition-colors font-medium text-sm md:text-base">
          {item.q}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-600 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-primary' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <p className="text-gray-500 text-sm leading-relaxed pb-5">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const platformRef = useRef(null);
  const retainerRef = useRef(null);
  const saasRef = useRef(null);
  const platformInView = useInView(platformRef, { once: true, margin: '-80px' });
  const retainerInView = useInView(retainerRef, { once: true, margin: '-80px' });
  const saasInView = useInView(saasRef, { once: true, margin: '-80px' });

  return (
    <div className="bg-dark min-h-screen">

      {/* ── Sticky nav ── */}
      <div className="border-b border-gray-800/60 bg-dark-200/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container-custom px-4 md:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative w-7 h-7">
              <div className="absolute inset-0 rounded-full border border-primary/60" />
              <div className="absolute inset-[4px] rounded-full bg-gradient-to-br from-primary to-accent-purple" />
            </div>
            <span className="font-display text-base font-bold">
              <span className="text-white">Bytes</span>
              <span className="gradient-text">Monks</span>
            </span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* ── Hero ── */}
      <div className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-primary/8 to-accent-purple/8 rounded-full blur-3xl" />
        </div>
        <div className="container-custom px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-px bg-primary" />
              <span className="text-primary text-xs tracking-widest uppercase font-medium">Transparent Pricing</span>
            </div>
            <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-end">
              <div>
                <h1
                  className="font-display font-bold leading-tight mb-5"
                  style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
                >
                  Simple Plans,{' '}
                  <span className="gradient-text">Real Value</span>
                </h1>
                <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
                  Two product lines — a fully managed SaaS infrastructure platform and
                  flexible IT service retainers. No surprises, no lock-in.
                </p>
              </div>

              {/* Billing toggle */}
              <div className="flex-shrink-0">
                <p className="text-xs text-gray-600 uppercase tracking-widest mb-3 text-center">Billing cycle</p>
                <div className="inline-flex items-center gap-1 glass rounded-xl p-1 border border-gray-800/60">
                  <button
                    onClick={() => setAnnual(false)}
                    className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                      !annual
                        ? 'bg-gradient-to-r from-primary to-accent-purple text-white shadow'
                        : 'text-gray-500 hover:text-white'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setAnnual(true)}
                    className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      annual
                        ? 'bg-gradient-to-r from-primary to-accent-purple text-white shadow'
                        : 'text-gray-500 hover:text-white'
                    }`}
                  >
                    Annual
                    <span className="text-xs bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-md font-semibold">
                      −17%
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Platform plans ── */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-dark-200" ref={platformRef}>
        <div className="container-custom">
          <SectionHeader
            eyebrow="SaaS Running Platform"
            title="Managed Infrastructure Plans"
            subtitle="We host, monitor, and operate your application infrastructure so you can focus on building product."
            inView={platformInView}
          />

          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {platformPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 28 }}
                animate={platformInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-primary to-accent-purple text-white text-xs font-bold px-4 py-1.5 rounded-full shadow whitespace-nowrap">
                      {plan.badge}
                    </span>
                  </div>
                )}
                <div
                  className={`glass rounded-2xl p-7 h-full flex flex-col transition-all duration-300 ${
                    plan.highlight
                      ? 'border border-primary/40 shadow-lg shadow-primary/10'
                      : 'hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center`}>
                      <plan.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-white">{plan.name}</p>
                      <p className="text-gray-600 text-xs">{plan.description}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-end gap-1">
                      <span className="text-gray-600 text-base">$</span>
                      <motion.span
                        key={annual ? 'annual' : 'monthly'}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-5xl font-bold text-white"
                      >
                        {annual ? plan.annualPrice : plan.monthlyPrice}
                      </motion.span>
                      <span className="text-gray-600 text-sm mb-1">/ mo</span>
                    </div>
                    {annual && (
                      <p className="text-green-400 text-xs mt-1">
                        Billed annually — ${plan.annualPrice * 12} / yr
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 flex-1 mb-7">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm">
                        {f.included ? (
                          <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        ) : (
                          <Minus className="w-4 h-4 text-gray-800 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={f.included ? 'text-gray-300' : 'text-gray-700'}>
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    onClick={() => { window.location.href = '/'; }}
                    className={`w-full text-center py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      plan.highlight
                        ? 'bg-gradient-to-r from-primary to-accent-purple text-white hover:opacity-90 hover:shadow-lg hover:shadow-primary/20'
                        : 'border border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white'
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={platformInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-6 text-xs text-gray-600"
          >
            <span className="flex items-center gap-2"><BadgeCheck className="w-3.5 h-3.5 text-primary" /> No setup fees</span>
            <span className="flex items-center gap-2"><RefreshCw className="w-3.5 h-3.5 text-primary" /> Cancel any time</span>
            <span className="flex items-center gap-2"><CreditCard className="w-3.5 h-3.5 text-primary" /> Secure payments — VAT invoices included</span>
          </motion.div>
        </div>
      </section>

      {/* ── IT Service Retainers ── */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-dark relative" ref={retainerRef}>
        <div className="absolute inset-0 bg-gradient-radial from-accent-purple/5 via-transparent to-transparent" />
        <div className="container-custom relative z-10">
          <SectionHeader
            eyebrow="IT Services"
            title="Engineering Retainers"
            subtitle="Dedicated engineering hours billed monthly. Scope the work you need, pause or cancel with 14 days' notice."
            inView={retainerInView}
          />

          <div className="grid md:grid-cols-3 gap-5">
            {retainerPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 28 }}
                animate={retainerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`glass rounded-2xl p-7 flex flex-col transition-all duration-300 ${
                  plan.highlight
                    ? 'border border-primary/40 shadow-lg shadow-primary/10'
                    : 'hover:border-gray-700'
                }`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center`}>
                    <plan.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-white">{plan.name}</p>
                    <p className="text-gray-600 text-xs">{plan.hours}</p>
                  </div>
                </div>

                <p className="text-gray-500 text-sm mb-6 leading-relaxed">{plan.description}</p>

                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <span className="text-gray-600 text-base">$</span>
                    <span className="font-display text-5xl font-bold text-white">
                      {plan.price.toLocaleString()}
                    </span>
                    <span className="text-gray-600 text-sm mb-1">/ mo</span>
                  </div>
                  <p className="text-gray-700 text-xs mt-1">Billed monthly · cancel with 14 days' notice</p>
                </div>

                <ul className="space-y-3 flex-1 mb-6">
                  {plan.services.map((s, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-gray-400">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      {s}
                    </li>
                  ))}
                </ul>

                <div className="mb-6 flex items-center gap-2 bg-dark rounded-lg px-4 py-3 border border-gray-800/60">
                  <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-gray-500 text-xs">
                    Response SLA: <span className="text-white font-medium">{plan.sla}</span>
                  </span>
                </div>

                <Link
                  to="/#contact"
                  className={`w-full text-center py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-primary to-accent-purple text-white hover:opacity-90 hover:shadow-lg hover:shadow-primary/20'
                      : 'border border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white'
                  }`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={retainerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-6 text-sm text-gray-700"
          >
            Need a custom scope or a one-off project?{' '}
            <Link to="/#contact" className="text-primary hover:text-primary-light transition-colors">Talk to us</Link>{' '}
            — we'll put together a tailored proposal.
          </motion.p>
        </div>
      </section>

      {/* ── SaaS Products ── */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-dark-200 relative" ref={saasRef}>
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
        <div className="container-custom relative z-10">
          <SectionHeader
            eyebrow="Live Products"
            title="Our Running SaaS Projects"
            subtitle="Beyond client work, we build and operate our own products — each with transparent, usage-based or subscription pricing."
            inView={saasInView}
          />

          <div className="grid md:grid-cols-2 gap-6">
            {saasProducts.map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 28 }}
                animate={saasInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass rounded-2xl p-7 flex flex-col hover:border-gray-700 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0">
                      {product.logoImg ? (
                        <img src={product.logoImg} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-r ${product.gradient} flex items-center justify-center`}>
                          {(() => { const Icon = product.icon; return Icon ? <Icon className="w-5 h-5 text-white" /> : null; })()}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-display font-bold text-white text-lg leading-tight">{product.name}</p>
                      <p className="text-gray-600 text-xs">{product.tagline}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg flex-shrink-0 ${product.modelColor}`}>
                    {product.model}
                  </span>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-6">{product.description}</p>

                <div className={`grid gap-2 mb-5 ${product.tiers.length === 1 ? 'grid-cols-1' : product.tiers.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {product.tiers.map((tier) => (
                    <div
                      key={tier.name}
                      className={`rounded-xl px-3 py-3 text-center ${
                        tier.highlight
                          ? 'bg-gradient-to-b from-primary/20 to-accent-purple/10 border border-primary/30'
                          : 'bg-dark border border-gray-800'
                      }`}
                    >
                      <p className={`text-xs font-medium mb-1 ${tier.highlight ? 'text-primary' : 'text-gray-600'}`}>
                        {tier.name}
                      </p>
                      <p className="font-display font-bold text-white text-lg leading-none mb-1">{tier.price}</p>
                      <p className="text-gray-700 text-[11px] leading-tight">{tier.unit}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-3 mt-auto pt-2">
                  {product.freeTrial ? (
                    <span className="flex items-center gap-1.5 text-green-400 text-xs">
                      <Gauge className="w-3.5 h-3.5" />
                      {product.freeTrial}
                    </span>
                  ) : (
                    <span />
                  )}
                  <div className="flex items-center gap-3">
                    <a
                      href={product.url}
                      className="flex items-center gap-1 text-gray-600 hover:text-white transition-colors text-xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Learn more
                    </a>
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 bg-gradient-to-r ${product.gradient} text-white hover:opacity-90 hover:shadow-lg`}
                    >
                      {product.cta ?? 'Get Started'}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Billing trust strip ── */}
      <section className="py-12 px-4 md:px-8 bg-dark border-y border-gray-800/40">
        <div className="container-custom">
          <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-800/40">
            {[
              {
                icon: CreditCard,
                title: 'Secure Payments',
                body: 'PCI-DSS Level 1 certified processing. Your card data never touches our servers.',
              },
              {
                icon: BadgeCheck,
                title: 'Tax-Compliant Invoicing',
                body: 'VAT, GST, and sales tax calculated by location. Compliant invoice after every payment.',
              },
              {
                icon: RefreshCw,
                title: 'Flexible Cancellation',
                body: 'Cancel any time from your billing dashboard. Access continues until the period ends.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-start gap-4 py-8 sm:px-8 first:pl-0 last:pr-0"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm mb-1">{item.title}</p>
                  <p className="text-gray-600 text-xs leading-relaxed">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-dark">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-primary" />
              <span className="text-primary text-xs tracking-widest uppercase font-medium">FAQ</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Common Questions</h2>
          </motion.div>

          <div className="max-w-3xl">
            {faqs.map((item, i) => (
              <FaqRow key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-dark-200 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-primary/12 to-accent-purple/12 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10">
          <div className="glass rounded-3xl border border-gray-800/60 overflow-hidden">
            <div className="grid md:grid-cols-[1fr_auto] gap-0 items-stretch">
              <div className="p-10 md:p-14">
                <p className="text-xs text-gray-600 uppercase tracking-widest font-medium mb-5">Not sure which plan fits?</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  Book a free 30-minute<br />
                  <span className="gradient-text">strategy call.</span>
                </h2>
                <p className="text-gray-500 max-w-lg leading-relaxed">
                  We'll recommend the right combination for your stage and budget — no commitment required.
                </p>
              </div>
              <div className="bg-dark-100/50 border-l border-gray-800/60 p-10 md:p-12 flex flex-col justify-center gap-4 min-w-[260px]">
                <Link
                  to="/#contact"
                  className="btn-primary inline-flex items-center justify-center gap-2 group"
                >
                  Book a Free Call
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <p className="text-xs text-gray-700 text-center">24h response · No obligation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer strip ── */}
      <div className="border-t border-gray-800/40 py-8 px-4 md:px-8">
        <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-700">
          <span>© {new Date().getFullYear()} Bytes Monks. All rights reserved.</span>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/refund" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>

    </div>
  );
}
