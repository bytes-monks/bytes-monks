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
  Brain,
  GitBranch,
  MonitorDot,
  MessageSquare,
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
  model: 'Subscription' | 'Usage-based' | 'Subscription + Usage';
  modelColor: string;
  icon: React.ElementType;
  gradient: string;
  tiers: SaasTier[];
  freeTrial: string | null;
  url: string;
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
    name: 'HireAI',
    tagline: 'AI-Powered Recruitment Automation',
    description:
      'Automatically screen, rank, and match candidates to job descriptions using large language models. Integrates with your existing ATS in minutes.',
    model: 'Subscription + Usage',
    modelColor: 'text-violet-400 bg-violet-400/10',
    icon: Brain,
    gradient: 'from-violet-500 to-purple-600',
    freeTrial: '14-day free trial',
    url: '#',
    tiers: [
      { name: 'Free',     price: '$0',   unit: '50 CV scans / mo',       highlight: false },
      { name: 'Pro',      price: '$49',  unit: '500 scans / mo',         highlight: true  },
      { name: 'Business', price: '$149', unit: 'Unlimited + API access', highlight: false },
    ],
  },
  {
    name: 'PipelineOS',
    tagline: 'Visual Data Pipeline Builder',
    description:
      'Drag-and-drop interface to build, schedule, and monitor ETL/ELT data pipelines across any cloud. No infrastructure setup required.',
    model: 'Usage-based',
    modelColor: 'text-cyan-400 bg-cyan-400/10',
    icon: GitBranch,
    gradient: 'from-cyan-500 to-teal-500',
    freeTrial: '1,000 free runs on signup',
    url: '#',
    tiers: [
      { name: 'Pay-as-you-go', price: '$0.03',  unit: 'per pipeline run',              highlight: false },
      { name: 'Growth',        price: '$79',    unit: '/ mo — 3,000 runs included',    highlight: true  },
      { name: 'Enterprise',    price: 'Custom', unit: 'unlimited runs + dedicated SLA', highlight: false },
    ],
  },
  {
    name: 'DeployMate',
    tagline: 'One-Click Cloud Deployment & Monitoring',
    description:
      'Push code and go live in seconds. DeployMate handles containerisation, SSL, custom domains, auto-scaling, and real-time uptime monitoring.',
    model: 'Subscription',
    modelColor: 'text-orange-400 bg-orange-400/10',
    icon: MonitorDot,
    gradient: 'from-orange-500 to-pink-500',
    freeTrial: '14-day free trial',
    url: '#',
    tiers: [
      { name: 'Starter', price: '$29',  unit: '/ mo — 3 projects',       highlight: false },
      { name: 'Pro',     price: '$79',  unit: '/ mo — 15 projects',      highlight: true  },
      { name: 'Team',    price: '$199', unit: '/ mo — unlimited projects', highlight: false },
    ],
  },
  {
    name: 'ChatBase',
    tagline: 'Custom AI Chatbot Builder',
    description:
      'Train a GPT-powered chatbot on your own documents, website, or database. Embed it anywhere with one line of code — no ML expertise needed.',
    model: 'Subscription + Usage',
    modelColor: 'text-blue-400 bg-blue-400/10',
    icon: MessageSquare,
    gradient: 'from-blue-500 to-cyan-500',
    freeTrial: '7-day free trial',
    url: '#',
    tiers: [
      { name: 'Basic',    price: '$39',  unit: '/ mo — 1 bot, 1k chats',    highlight: false },
      { name: 'Pro',      price: '$99',  unit: '/ mo — 5 bots, 10k chats',  highlight: true  },
      { name: 'Scale',    price: '$299', unit: '/ mo — unlimited bots',      highlight: false },
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
    a: 'Yes. For large teams, custom infrastructure requirements, or multi-year contracts, contact us at hello@bytesmonks.com to discuss a tailored plan.',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FaqRow({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="border-b border-gray-800 last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="text-white font-medium text-sm md:text-base">{item.q}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="text-gray-400 text-sm leading-relaxed pb-5">{item.a}</p>
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

      {/* ── Nav bar ── */}
      <div className="border-b border-gray-800 bg-dark-200 sticky top-0 z-40 backdrop-blur-md">
        <div className="container-custom px-4 md:px-8 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 rounded-full border-2 border-primary" />
              <div className="absolute inset-2 rounded-full border border-accent-purple" />
              <div className="absolute inset-[9px] rounded-full bg-gradient-to-r from-primary to-accent-purple" />
            </div>
            <span className="font-display text-lg font-bold">
              <span className="text-white">Bytes</span>
              <span className="gradient-text">Monks</span>
            </span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* ── Hero ── */}
      <div className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-primary/10 to-accent-purple/10 rounded-full blur-3xl" />
        </div>
        <div className="container-custom px-4 md:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-primary font-medium text-sm mb-4 block">Transparent Pricing</span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Simple Plans,{' '}
              <span className="gradient-text">Real Value</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Two product lines — a fully managed SaaS infrastructure platform and
              flexible IT service retainers. No surprises, no lock-in.
            </p>

            {/* Billing toggle */}
            <div className="inline-flex items-center gap-3 glass rounded-full px-2 py-2">
              <button
                onClick={() => setAnnual(false)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  !annual
                    ? 'bg-gradient-to-r from-primary to-accent-purple text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  annual
                    ? 'bg-gradient-to-r from-primary to-accent-purple text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Annual
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-semibold">
                  Save 17%
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Platform plans ── */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-dark-200" ref={platformRef}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={platformInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <span className="text-primary font-medium text-sm block mb-3">SaaS Running Platform</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
              Managed Infrastructure Plans
            </h2>
            <p className="text-gray-400 max-w-xl">
              We host, monitor, and operate your application infrastructure so you can focus on building product.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {platformPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={platformInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="relative"
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-primary to-accent-purple text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                      {plan.badge}
                    </span>
                  </div>
                )}
                <div
                  className={`glass rounded-2xl p-7 h-full flex flex-col transition-all duration-300 hover:border-primary/30 ${
                    plan.highlight ? 'border border-primary/40 shadow-lg shadow-primary/10' : ''
                  }`}
                >
                  {/* Icon + name */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center`}>
                      <plan.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-white">{plan.name}</p>
                      <p className="text-gray-500 text-xs">{plan.description}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-end gap-1">
                      <span className="text-gray-400 text-lg">$</span>
                      <motion.span
                        key={annual ? 'annual' : 'monthly'}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-5xl font-bold text-white"
                      >
                        {annual ? plan.annualPrice : plan.monthlyPrice}
                      </motion.span>
                      <span className="text-gray-500 text-sm mb-1">/ mo</span>
                    </div>
                    {annual && (
                      <p className="text-green-400 text-xs mt-1">
                        Billed annually — ${plan.annualPrice * 12} / year
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 flex-1 mb-7">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm">
                        {f.included ? (
                          <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                        ) : (
                          <Minus className="w-4 h-4 text-gray-700 flex-shrink-0" />
                        )}
                        <span className={f.included ? 'text-gray-300' : 'text-gray-600'}>
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href="#contact"
                    onClick={() => window.location.href = '/'}
                    className={`w-full text-center py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      plan.highlight
                        ? 'bg-gradient-to-r from-primary to-accent-purple text-white hover:opacity-90 hover:shadow-lg hover:shadow-primary/30'
                        : 'border border-gray-700 text-gray-300 hover:border-primary/50 hover:text-white'
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Platform notes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={platformInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-6 text-sm text-gray-500"
          >
            <span className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-primary" /> No setup fees</span>
            <span className="flex items-center gap-2"><RefreshCw className="w-4 h-4 text-primary" /> Cancel any time</span>
            <span className="flex items-center gap-2"><CreditCard className="w-4 h-4 text-primary" /> Secure payments — VAT invoices included</span>
          </motion.div>
        </div>
      </section>

      {/* ── IT Service Retainers ── */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-dark relative" ref={retainerRef}>
        <div className="absolute inset-0 bg-gradient-radial from-accent-purple/5 via-transparent to-transparent" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={retainerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <span className="text-primary font-medium text-sm block mb-3">IT Services</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
              Engineering Retainers
            </h2>
            <p className="text-gray-400 max-w-xl">
              Dedicated engineering hours billed monthly. Scope the work you need, pause or cancel with 14 days' notice.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {retainerPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={retainerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className={`glass rounded-2xl p-7 flex flex-col transition-all duration-300 hover:border-primary/30 ${
                  plan.highlight ? 'border border-primary/40 shadow-lg shadow-primary/10' : ''
                }`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center`}>
                    <plan.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-white">{plan.name}</p>
                    <p className="text-xs text-gray-500">{plan.hours}</p>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-5 leading-relaxed">{plan.description}</p>

                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <span className="text-gray-400 text-lg">$</span>
                    <span className="font-display text-5xl font-bold text-white">
                      {plan.price.toLocaleString()}
                    </span>
                    <span className="text-gray-500 text-sm mb-1">/ mo</span>
                  </div>
                  <p className="text-gray-600 text-xs mt-1">Billed monthly · cancel with 14 days' notice</p>
                </div>

                {/* Services list */}
                <ul className="space-y-3 flex-1 mb-6">
                  {plan.services.map((s, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      {s}
                    </li>
                  ))}
                </ul>

                {/* SLA badge */}
                <div className="mb-6 flex items-center gap-2 bg-dark-100 rounded-lg px-4 py-2.5 border border-gray-800">
                  <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-gray-400 text-xs">Response SLA: <span className="text-white font-medium">{plan.sla}</span></span>
                </div>

                <Link
                  to="/#contact"
                  className={`w-full text-center py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-primary to-accent-purple text-white hover:opacity-90 hover:shadow-lg hover:shadow-primary/30'
                      : 'border border-gray-700 text-gray-300 hover:border-primary/50 hover:text-white'
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
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 text-sm text-gray-600"
          >
            Need a custom scope or a one-off project?{' '}
            <Link to="/#contact" className="text-primary hover:underline">Talk to us</Link> — we'll put together a tailored proposal.
          </motion.p>
        </div>
      </section>

      {/* ── SaaS Products ── */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-dark-200 relative" ref={saasRef}>
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
        <div className="container-custom relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={saasInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <span className="text-primary font-medium text-sm block mb-3">Live Products</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
              Our Running SaaS Projects
            </h2>
            <p className="text-gray-400 max-w-xl">
              Beyond client work, we build and operate our own products. Each runs its own
              subscription or usage-based pricing — pick the plan that fits your team.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {saasProducts.map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                animate={saasInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass rounded-2xl p-7 flex flex-col hover:border-primary/30 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-r ${product.gradient} flex items-center justify-center flex-shrink-0`}>
                      <product.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-white text-lg leading-tight">{product.name}</p>
                      <p className="text-gray-500 text-xs">{product.tagline}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${product.modelColor}`}>
                    {product.model}
                  </span>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-6">{product.description}</p>

                {/* Tiers */}
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {product.tiers.map((tier) => (
                    <div
                      key={tier.name}
                      className={`rounded-xl px-3 py-3 text-center transition-all ${
                        tier.highlight
                          ? 'bg-gradient-to-b from-primary/20 to-accent-purple/10 border border-primary/30'
                          : 'bg-dark-100 border border-gray-800'
                      }`}
                    >
                      <p className={`text-xs font-medium mb-1 ${tier.highlight ? 'text-primary' : 'text-gray-500'}`}>
                        {tier.name}
                      </p>
                      <p className="font-display font-bold text-white text-lg leading-none mb-1">
                        {tier.price}
                      </p>
                      <p className="text-gray-600 text-[11px] leading-tight">{tier.unit}</p>
                    </div>
                  ))}
                </div>

                {/* Footer row */}
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
                      className="flex items-center gap-1 text-gray-500 hover:text-white transition-colors text-xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Learn more
                    </a>
                    <a
                      href={product.url}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 bg-gradient-to-r ${product.gradient} text-white hover:opacity-90 hover:shadow-lg`}
                    >
                      Get Started
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={saasInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-sm text-gray-600"
          >
            Subscriptions can be managed and cancelled from your product dashboard at any time.
          </motion.p>
        </div>
      </section>

      {/* ── Billing clarity strip ── */}
      <section className="py-14 px-4 md:px-8 bg-dark-200 border-y border-gray-800">
        <div className="container-custom">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: CreditCard,
                title: 'Secure Payments',
                body: 'All transactions are processed by a PCI-DSS Level 1 certified payment provider. Your card data never touches our servers.',
              },
              {
                icon: BadgeCheck,
                title: 'Tax-Compliant Invoicing',
                body: 'VAT, GST, and sales tax are calculated based on your location. You receive a fully compliant invoice after every payment.',
              },
              {
                icon: RefreshCw,
                title: 'Flexible Cancellation',
                body: 'Cancel your subscription at any time from your billing dashboard. You keep access until the end of the current paid period — no questions asked.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-accent-purple flex items-center justify-center mb-1">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <p className="font-semibold text-white text-sm">{item.title}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{item.body}</p>
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
            className="mb-12 text-center"
          >
            <span className="text-primary font-medium text-sm block mb-3">FAQ</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              Common Questions
            </h2>
          </motion.div>

          <div className="max-w-2xl mx-auto glass rounded-2xl px-6 md:px-8 divide-y-0">
            {faqs.map((item, i) => (
              <FaqRow key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 md:px-8 bg-dark-200 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-primary/15 to-accent-purple/15 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
              Not sure which plan fits?
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book a free 30-minute strategy call and we'll recommend the right combination for your stage and budget.
            </p>
            <Link
              to="/#contact"
              className="btn-primary inline-flex items-center gap-2 group"
            >
              Book a Free Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Footer strip ── */}
      <div className="border-t border-gray-800 py-8 px-4 md:px-8">
        <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
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
