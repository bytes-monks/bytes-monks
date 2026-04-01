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
  Send,
  Star,
  Globe,
  Zap,
  X,
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
      'Early access to all Bytes Monks products',
      'Potential conversion to paid role based on performance',
    ],
  },
  {
    id: 'business-developer-intern',
    title: 'Business Developer',
    type: 'Internship',
    location: 'Remote',
    department: 'Growth',
    commitment: 'Part-time · 20 hrs / week',
    badge: 'Now Hiring',
    icon: TrendingUp,
    gradient: 'from-violet-500 to-purple-600',
    tagline: 'Drive partnerships, support deals, and get hands-on experience in startup growth.',
    about:
      'Bytes Monks is looking for an ambitious Business Developer Intern to support our growth efforts — identifying new client opportunities, nurturing strategic partnerships, and helping scale our agency and SaaS revenue. You will work directly with the founders, get real exposure to the full sales cycle, and have a tangible impact on company direction from day one.',
    responsibilities: [
      'Research and qualify new business opportunities through outbound prospecting (LinkedIn, cold email, events)',
      'Support discovery calls, proposals, and follow-up communications',
      'Help build and maintain relationships with prospects, clients, and strategic partners',
      'Collaborate with the tech team to understand and communicate our service offerings',
      'Track pipeline activity in CRM and report progress on weekly targets',
      'Represent Bytes Monks at online tech / startup events and communities',
      'Gather market feedback to inform product roadmap and positioning',
    ],
    requirements: [
      'Currently enrolled in or recently graduated from a Business, Marketing, or related programme',
      'Strong communication skills — clear, persuasive, and professional',
      'Genuine interest in technology, startups, or SaaS products',
      'Proactive self-starter mindset: you take initiative and follow through',
      'Ability to work independently and manage your time across 20 hours per week',
      'Fluent written and spoken English',
    ],
    niceToHave: [
      'Prior experience in sales, business development, or a client-facing role',
      'Understanding of web technologies or SaaS business models',
      'Existing network in the startup or SME ecosystem',
    ],
    perks: [
      'Fully remote & flexible hours',
      'Letter of recommendation upon successful completion',
      'Mentorship from the founding team and direct exposure to startup operations',
      'Early access to all Bytes Monks products and internal tools',
      'Potential conversion to paid role based on performance',
    ],
  },
];

const cultureItems = [
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
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function MetaPill({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-gray-500 bg-dark border border-gray-800/60 px-3 py-1.5 rounded-full">
      <Icon className="w-3.5 h-3.5 text-primary" /> {label}
    </span>
  );
}

function JobCard({ job, index, onOpen }: { job: JobOffer; index: number; onOpen: (id: string) => void }) {
  const Icon = job.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="glass rounded-2xl overflow-hidden hover:border-gray-700 transition-all duration-300 group"
    >
      {/* Top accent strip */}
      <div className={`h-1 bg-gradient-to-r ${job.gradient}`} />

      <div className="p-7">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-r ${job.gradient} flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-display font-bold text-white text-lg">{job.title}</h3>
                {job.badge && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-500/15 text-green-400">
                    {job.badge}
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-xs">{job.department}</p>
            </div>
          </div>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${job.gradient} text-white flex-shrink-0`}>
            {job.type}
          </span>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed mb-5 italic">"{job.tagline}"</p>

        <div className="flex flex-wrap gap-2 mb-5">
          <MetaPill icon={MapPin} label={job.location} />
          <MetaPill icon={Clock} label={job.commitment} />
          <MetaPill icon={Briefcase} label={job.department} />
        </div>

        {/* Perks preview */}
        <div className="space-y-1.5 mb-6">
          {job.perks.slice(0, 3).map((perk, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
              <Star className="w-3 h-3 text-amber-500 flex-shrink-0" />
              {perk}
            </div>
          ))}
        </div>

        <button
          onClick={() => onOpen(job.id)}
          className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300 bg-gradient-to-r ${job.gradient} text-white hover:opacity-90 hover:shadow-lg flex items-center justify-center gap-2 group`}
        >
          View Full Role
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}

function ModalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-7">
      <h4 className="text-xs text-gray-600 uppercase tracking-widest font-medium mb-3">{title}</h4>
      {children}
    </section>
  );
}

function JobModal({ job, onClose }: { job: JobOffer; onClose: () => void }) {
  const Icon = job.icon;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center p-4 md:p-8 bg-black/75 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.28 }}
        className="w-full max-w-2xl my-8 glass rounded-2xl overflow-hidden border border-gray-800/60"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient top bar */}
        <div className={`h-1 bg-gradient-to-r ${job.gradient}`} />

        <div className="p-8">
          {/* Close */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${job.gradient} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-display font-bold text-white text-xl">{job.title}</h2>
                <p className="text-gray-600 text-xs mt-0.5">{job.department} · {job.type}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-white transition-colors p-1 flex-shrink-0"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-2 mb-7">
            <MetaPill icon={MapPin} label={job.location} />
            <MetaPill icon={Clock} label={job.commitment} />
            <MetaPill icon={Globe} label="Remote-first" />
          </div>

          <ModalSection title="About the role">
            <p className="text-gray-500 text-sm leading-relaxed">{job.about}</p>
          </ModalSection>

          <ModalSection title="What you'll do">
            <ul className="space-y-2.5">
              {job.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                  <Zap className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                  {r}
                </li>
              ))}
            </ul>
          </ModalSection>

          <ModalSection title="What we're looking for">
            <ul className="space-y-2.5">
              {job.requirements.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0 mt-1.5" />
                  {r}
                </li>
              ))}
            </ul>
          </ModalSection>

          <ModalSection title="Nice to have">
            <ul className="space-y-2.5">
              {job.niceToHave.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-700 flex-shrink-0 mt-1.5" />
                  {r}
                </li>
              ))}
            </ul>
          </ModalSection>

          <ModalSection title="What you'll get">
            <ul className="space-y-2.5">
              {job.perks.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                  <Star className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                  {p}
                </li>
              ))}
            </ul>
          </ModalSection>

          <a
            href={`mailto:contact@bytesmonks.com?subject=Application – ${job.title}&body=Hi Bytes Monks team,%0D%0A%0D%0AI'd like to apply for the ${job.title} position.%0D%0A%0D%0A[Tell us a bit about yourself and attach your CV]`}
            className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${job.gradient} hover:opacity-90 hover:shadow-lg transition-all duration-300`}
          >
            <Send className="w-4 h-4" />
            Apply Now — Send Your Application
          </a>
          <p className="text-center text-gray-700 text-xs mt-3">
            Send your CV and a short intro to{' '}
            <span className="text-gray-500">contact@bytesmonks.com</span>
          </p>
        </div>
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
          <div className="absolute top-1/3 right-0 w-[600px] h-[500px] bg-primary/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-accent-purple/8 rounded-full blur-[100px]" />
        </div>

        <div className="container-custom px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-px bg-green-400" />
              <span className="text-green-400 text-xs tracking-widest uppercase font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                We're Hiring
              </span>
            </div>

            <div className="grid lg:grid-cols-[1fr_340px] gap-12 items-center">
              <div>
                <h1
                  className="font-display font-bold leading-tight mb-5"
                  style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
                >
                  Build the Future{' '}
                  <span className="gradient-text">With Us</span>
                </h1>
                <p className="text-gray-500 text-lg leading-relaxed max-w-xl mb-8">
                  We're a small team shipping real products. If you're hungry, self-driven,
                  and excited about the intersection of tech and business — you'll fit right in.
                </p>
                <a
                  href="#positions"
                  className="btn-primary inline-flex items-center gap-2 group"
                >
                  See Open Roles
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Stats card */}
              <div className="glass rounded-2xl p-7 border border-gray-800/60">
                <div className="space-y-5">
                  {[
                    { icon: Globe, label: 'Location', value: 'Remote-first' },
                    { icon: Users, label: 'Open roles', value: `${jobs.length} positions` },
                    { icon: Zap, label: 'Culture', value: 'Move fast, ship often' },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 uppercase tracking-widest">{label}</div>
                        <div className="text-white text-sm font-medium">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Job listings ── */}
      <section id="positions" className="py-16 md:py-24 px-4 md:px-8 bg-dark-200">
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
              <span className="text-primary text-xs tracking-widest uppercase font-medium">Open Positions</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                {jobs.length} Roles Available
              </h2>
              <p className="text-gray-600 text-sm max-w-xs">
                Click any card to see the full job description and apply.
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {jobs.map((job, i) => (
              <JobCard key={job.id} job={job} index={i} onOpen={setOpenJobId} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Culture strip ── */}
      <section className="py-14 px-4 md:px-8 bg-dark border-y border-gray-800/40">
        <div className="container-custom">
          <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-800/40">
            {cultureItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex items-start gap-4 py-8 sm:px-8 first:pl-0 last:pr-0"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm mb-1">{item.title}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Generic CTA ── */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-dark-200 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-primary/10 to-accent-purple/10 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10">
          <div className="glass rounded-3xl border border-gray-800/60 overflow-hidden">
            <div className="grid md:grid-cols-[1fr_auto] gap-0 items-stretch">
              <div className="p-10 md:p-14">
                <p className="text-xs text-gray-600 uppercase tracking-widest font-medium mb-5">
                  Don't see the right role?
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  We're always open to<br />
                  <span className="gradient-text">exceptional people.</span>
                </h2>
                <p className="text-gray-500 max-w-sm leading-relaxed text-sm">
                  Drop us a line and tell us how you'd contribute. We read every message.
                </p>
              </div>
              <div className="bg-dark-100/50 border-l border-gray-800/60 p-10 md:p-12 flex flex-col justify-center gap-4 min-w-[260px]">
                <a
                  href="mailto:contact@bytesmonks.com?subject=Spontaneous Application&body=Hi Bytes Monks team,%0D%0A%0D%0AI'd love to explore opportunities with you.%0D%0A%0D%0A[Tell us about yourself]"
                  className="btn-primary inline-flex items-center justify-center gap-2 group"
                >
                  Get in Touch
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <p className="text-xs text-gray-700 text-center">We respond to every message</p>
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
