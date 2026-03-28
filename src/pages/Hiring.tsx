import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Clock,
  Briefcase,
  Users,
  Megaphone,
  TrendingUp,
  ChevronDown,
  Send,
  Star,
  Globe,
  Zap,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface JobOffer {
  id: string;
  title: string;
  type: string;
  location: string;
  department: string;
  commitment: string;
  badge?: string;
  icon: React.ElementType;
  gradient: string;
  tagline: string;
  about: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  perks: string[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const jobs: JobOffer[] = [
  {
    id: 'social-media-manager-intern',
    title: 'Social Media Manager',
    type: 'Internship',
    location: 'Remote',
    department: 'Marketing',
    commitment: 'Part-time · 20 hrs / week',
    badge: 'Now Hiring',
    icon: Megaphone,
    gradient: 'from-pink-500 to-rose-500',
    tagline: 'Shape our voice online and grow a community around what we build.',
    about:
      'Bytes Monks is looking for a creative and driven Social Media Manager Intern to own our presence across LinkedIn, Twitter/X, and Instagram. You will craft content that showcases our products (Genify, FormGuard) and our agency work, engage our community, and help us grow from a niche dev studio into a recognisable tech brand.',
    responsibilities: [
      'Plan and publish 4–6 posts per week across LinkedIn, Twitter/X, and Instagram',
      'Write engaging copy that bridges technical topics with a broader audience',
      'Respond to comments, DMs, and brand mentions in a timely, on-brand manner',
      'Track performance metrics (reach, engagement, follower growth) and report weekly',
      'Collaborate with the dev team to promote product launches and feature releases',
      'Research trending topics in tech, AI, and SaaS to fuel content ideas',
      'Assist in creating short-form video scripts and visual content briefs',
    ],
    requirements: [
      'Currently enrolled in or recently graduated from a Marketing, Communications, or related programme',
      'Strong written English — clear, concise, and engaging',
      'Genuine interest in technology, startups, or SaaS products',
      'Familiarity with LinkedIn, Twitter/X, and Instagram content formats',
      'Ability to work independently and meet deadlines without micromanagement',
      'Available for at least 20 hours per week',
    ],
    niceToHave: [
      'Experience with Canva, Figma, or Adobe Express for visual content',
      'Basic understanding of SEO and content marketing',
      'Prior internship or freelance social media work',
      'Passion for AI or developer tools',
    ],
    perks: [
      'Fully remote & flexible hours',
      'Letter of recommendation upon successful completion',
      'Mentorship from experienced product and marketing leads',
      'Early access to all Bytes Monks products',
      'Potential conversion to paid role based on performance',
    ],
  },
  {
    id: 'business-developer',
    title: 'Business Developer',
    type: 'Full-time',
    location: 'Remote',
    department: 'Growth',
    commitment: 'Full-time · 40 hrs / week',
    icon: TrendingUp,
    gradient: 'from-violet-500 to-purple-600',
    tagline: 'Drive partnerships, close deals, and fuel the next chapter of our growth.',
    about:
      'We are growing fast and need a sharp Business Developer to identify new client opportunities, nurture strategic partnerships, and help scale our agency and SaaS revenue. You will work directly with the founders, own the full sales cycle from prospecting to close, and have a direct impact on company direction.',
    responsibilities: [
      'Identify and qualify new business opportunities through outbound prospecting (LinkedIn, cold email, events)',
      'Manage the end-to-end sales cycle: discovery calls, proposals, negotiations, and closing',
      'Build and maintain relationships with prospects, clients, and strategic partners',
      'Collaborate with the tech team to scope and price custom development projects accurately',
      'Track pipeline activity in CRM and report progress on weekly revenue targets',
      'Represent Bytes Monks at online and in-person tech / startup events',
      'Identify upsell and cross-sell opportunities within the existing client base',
      'Gather market feedback to inform product roadmap and positioning',
    ],
    requirements: [
      '2+ years of experience in business development, sales, or a client-facing role — ideally in tech or digital services',
      'Proven track record of hitting or exceeding revenue targets',
      'Excellent communication and negotiation skills — you are comfortable running calls with CTOs and founders',
      'Strong self-starter mindset: you thrive with autonomy and minimal hand-holding',
      'Proficiency with CRM tools (HubSpot, Pipedrive, or similar)',
      'Fluent written and spoken English',
    ],
    niceToHave: [
      'Experience selling software development, SaaS, or managed services',
      'Existing network in the startup or SME ecosystem',
      'Understanding of web technologies or SaaS business models',
      'Experience working in a remote-first team',
    ],
    perks: [
      'Competitive base salary + uncapped commission',
      'Fully remote with flexible working hours',
      'Equity / profit-share scheme (after probation)',
      'Direct access to the founding team and real ownership of your role',
      'Budget for courses, conferences, and professional development',
      'Early access to all Bytes Monks products and internal tools',
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function JobCard({ job, onOpen }: { job: JobOffer; onOpen: (id: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="glass rounded-2xl p-7 flex flex-col hover:border-primary/30 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${job.gradient} flex items-center justify-center flex-shrink-0`}>
            <job.icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="font-display font-bold text-white text-xl">{job.title}</h3>
              {job.badge && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-500/15 text-green-400">
                  {job.badge}
                </span>
              )}
            </div>
            <p className="text-gray-500 text-sm">{job.department}</p>
          </div>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${job.gradient} text-white flex-shrink-0`}>
          {job.type}
        </span>
      </div>

      <p className="text-gray-400 text-sm leading-relaxed mb-6 italic">"{job.tagline}"</p>

      {/* Meta pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="flex items-center gap-1.5 text-xs text-gray-400 bg-dark-100 border border-gray-800 px-3 py-1.5 rounded-full">
          <MapPin className="w-3.5 h-3.5 text-primary" /> {job.location}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-400 bg-dark-100 border border-gray-800 px-3 py-1.5 rounded-full">
          <Clock className="w-3.5 h-3.5 text-primary" /> {job.commitment}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-400 bg-dark-100 border border-gray-800 px-3 py-1.5 rounded-full">
          <Briefcase className="w-3.5 h-3.5 text-primary" /> {job.department}
        </span>
      </div>

      {/* Perks preview */}
      <div className="flex flex-wrap gap-2 mb-7">
        {job.perks.slice(0, 3).map((perk, i) => (
          <span key={i} className="flex items-center gap-1 text-xs text-primary/80">
            <Star className="w-3 h-3" /> {perk}
          </span>
        ))}
      </div>

      <button
        onClick={() => onOpen(job.id)}
        className={`mt-auto w-full py-3 rounded-lg text-sm font-semibold transition-all duration-300 bg-gradient-to-r ${job.gradient} text-white hover:opacity-90 hover:shadow-lg flex items-center justify-center gap-2 group`}
      >
        View Full Role
        <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
      </button>
    </motion.div>
  );
}

function JobModal({ job, onClose }: { job: JobOffer; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center p-4 md:p-8 bg-black/70 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl my-8 glass rounded-2xl p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors text-sm"
        >
          ✕
        </button>

        {/* Title block */}
        <div className="flex items-center gap-4 mb-2">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${job.gradient} flex items-center justify-center flex-shrink-0`}>
            <job.icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-display font-bold text-white text-2xl">{job.title}</h2>
            <p className="text-gray-500 text-sm">{job.department} · {job.type}</p>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-2 mb-6 mt-4">
          <span className="flex items-center gap-1.5 text-xs text-gray-400 bg-dark-100 border border-gray-800 px-3 py-1.5 rounded-full">
            <MapPin className="w-3.5 h-3.5 text-primary" /> {job.location}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-400 bg-dark-100 border border-gray-800 px-3 py-1.5 rounded-full">
            <Clock className="w-3.5 h-3.5 text-primary" /> {job.commitment}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-400 bg-dark-100 border border-gray-800 px-3 py-1.5 rounded-full">
            <Globe className="w-3.5 h-3.5 text-primary" /> Remote-first
          </span>
        </div>

        {/* About */}
        <section className="mb-6">
          <h4 className="text-white font-semibold mb-2 text-sm uppercase tracking-wider">About the role</h4>
          <p className="text-gray-400 text-sm leading-relaxed">{job.about}</p>
        </section>

        {/* Responsibilities */}
        <section className="mb-6">
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">What you'll do</h4>
          <ul className="space-y-2">
            {job.responsibilities.map((r, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                <Zap className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                {r}
              </li>
            ))}
          </ul>
        </section>

        {/* Requirements */}
        <section className="mb-6">
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">What we're looking for</h4>
          <ul className="space-y-2">
            {job.requirements.map((r, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                {r}
              </li>
            ))}
          </ul>
        </section>

        {/* Nice to have */}
        <section className="mb-6">
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Nice to have</h4>
          <ul className="space-y-2">
            {job.niceToHave.map((r, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-500">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-600 flex-shrink-0 mt-1.5" />
                {r}
              </li>
            ))}
          </ul>
        </section>

        {/* Perks */}
        <section className="mb-8">
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">What you'll get</h4>
          <ul className="space-y-2">
            {job.perks.map((p, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                <Star className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                {p}
              </li>
            ))}
          </ul>
        </section>

        {/* Apply CTA */}
        <a
          href={`mailto:contact@bytesmonks.com?subject=Application – ${job.title}&body=Hi Bytes Monks team,%0D%0A%0D%0AI'd like to apply for the ${job.title} position.%0D%0A%0D%0A[Tell us a bit about yourself and attach your CV]`}
          className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${job.gradient} hover:opacity-90 hover:shadow-lg transition-all duration-300`}
        >
          <Send className="w-4 h-4" />
          Apply Now — Send Your Application
        </a>
        <p className="text-center text-gray-600 text-xs mt-3">
          Send your CV and a short intro to <span className="text-gray-400">contact@bytesmonks.com</span>
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Hiring() {
  const [openJobId, setOpenJobId] = useState<string | null>(null);
  const activeJob = jobs.find((j) => j.id === openJobId) ?? null;

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
            <span className="text-primary font-medium text-sm mb-4 block">We're Hiring</span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Build the Future{' '}
              <span className="gradient-text">With Us</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              We're a small team shipping real products. If you're hungry, self-driven,
              and excited about the intersection of tech and business — you'll fit right in.
            </p>

            {/* Stats */}
            <div className="inline-flex flex-wrap justify-center gap-8 glass rounded-2xl px-8 py-5 mt-4">
              {[
                { icon: Globe, label: 'Remote-first' },
                { icon: Users, label: `${jobs.length} open roles` },
                { icon: Zap, label: 'Move fast' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-gray-300">
                  <Icon className="w-4 h-4 text-primary" />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Job listings ── */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-dark-200">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="text-primary font-medium text-sm block mb-3">Open Positions</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
              {jobs.length} Roles Available
            </h2>
            <p className="text-gray-400 max-w-xl">
              Explore our open roles below. Click any card to see the full job description and apply directly.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} onOpen={setOpenJobId} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Culture strip ── */}
      <section className="py-16 px-4 md:px-8 bg-dark border-y border-gray-800">
        <div className="container-custom">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: Zap,
                title: 'Move Fast',
                body: 'We ship weekly. No bloated processes — just clear goals, real ownership, and quick iterations.',
              },
              {
                icon: Globe,
                title: 'Remote-first',
                body: 'Work from anywhere. Async by default, with structured check-ins to stay aligned.',
              },
              {
                icon: TrendingUp,
                title: 'Grow With Us',
                body: 'Early-stage means your contributions have real impact. What you build here, the world uses.',
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

      {/* ── Generic CTA ── */}
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
              Don't see the right role?
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              We're always open to exceptional people. Drop us a line and tell us how you'd contribute.
            </p>
            <a
              href="mailto:contact@bytesmonks.com?subject=Spontaneous Application&body=Hi Bytes Monks team,%0D%0A%0D%0AI'd love to explore opportunities with you.%0D%0A%0D%0A[Tell us about yourself]"
              className="btn-primary inline-flex items-center gap-2 group"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
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
            <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
          </div>
        </div>
      </div>

      {/* ── Job modal ── */}
      <AnimatePresence>
        {activeJob && (
          <JobModal job={activeJob} onClose={() => setOpenJobId(null)} />
        )}
      </AnimatePresence>

    </div>
  );
}
