import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Briefcase, Users, Globe, X } from 'lucide-react';
import Navigation from '../components/Navigation';

// ─── Types ────────────────────────────────────────────────────────────────────

interface JobOffer {
  id: string;
  title: string;
  type: string;
  location: string;
  department: string;
  commitment: string;
  badge?: string;
  numeral: string;
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
    numeral: 'I',
    tagline: 'Shape our voice online and grow a community around what we build.',
    about:
      'Bytes Monks is looking for a creative and driven Social Media Manager Intern to own our presence across LinkedIn, Twitter/X, and Instagram. You will craft content that showcases our products (Genify, Form Temple) and our agency work, engage our community, and help us grow from a niche dev studio into a recognisable tech brand.',
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
    numeral: 'II',
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
  { glyph: 'α', title: 'Move Fast', body: 'We ship weekly. No bloated processes — just clear goals, real ownership, and quick iterations.' },
  { glyph: 'β', title: 'Remote-first', body: 'Work from anywhere. Async by default, with structured check-ins to stay aligned.' },
  { glyph: 'γ', title: 'Grow With Us', body: 'Early-stage means your contributions have real impact. What you build here, the world uses.' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function MetaPill({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <span className="mono" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-soft)', border: '1px solid var(--rule)', padding: '6px 12px' }}>
      <Icon className="w-3.5 h-3.5" style={{ color: 'var(--vermillion)' }} /> {label}
    </span>
  );
}

function JobCard({ job, index, onOpen }: { job: JobOffer; index: number; onOpen: (id: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="folio"
      style={{ border: '1px solid var(--ink)', background: 'var(--bg)', boxShadow: '6px 6px 0 var(--rule)' }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '10px 10px 0 var(--vermillion)')}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '6px 6px 0 var(--rule)')}
    >
      <div style={{ padding: '32px 34px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
            <span className="serif italic" style={{ fontSize: 40, color: 'var(--vermillion)', lineHeight: 0.9 }}>{job.numeral}</span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <h3 className="serif" style={{ fontSize: 28, fontWeight: 500, color: 'var(--ink)' }}>{job.title}</h3>
                {job.badge && <span className="mono" style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)', border: '1px solid var(--sage)', padding: '3px 8px' }}>{job.badge}</span>}
              </div>
              <p className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginTop: 6 }}>{job.department}</p>
            </div>
          </div>
          <span className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--bg)', background: 'var(--ink)', padding: '5px 10px', flexShrink: 0 }}>{job.type}</span>
        </div>

        <p className="serif italic" style={{ fontSize: 19, color: 'var(--ink-soft)', lineHeight: 1.4, marginBottom: 20 }}>“{job.tagline}”</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
          <MetaPill icon={MapPin} label={job.location} />
          <MetaPill icon={Clock} label={job.commitment} />
          <MetaPill icon={Briefcase} label={job.department} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28, paddingTop: 18, borderTop: '1px solid var(--rule-soft)' }}>
          {job.perks.slice(0, 3).map((perk, i) => (
            <div key={i} className="sans" style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'var(--ink-soft)' }}>
              <span style={{ color: 'var(--vermillion)', flexShrink: 0 }}>⁜</span> {perk}
            </div>
          ))}
        </div>

        <button onClick={() => onOpen(job.id)} className="btn" style={{ width: '100%', justifyContent: 'center' }}>View Full Role →</button>
      </div>
    </motion.div>
  );
}

function ModalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 28 }}>
      <div className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--vermillion)', marginBottom: 12 }}>{title}</div>
      {children}
    </section>
  );
}

function JobModal({ job, onClose }: { job: JobOffer; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 16, background: 'color-mix(in oklch, var(--ink) 55%, transparent)', backdropFilter: 'blur(4px)', overflowY: 'auto' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.28 }}
        style={{ width: '100%', maxWidth: 720, margin: '32px 0', background: 'var(--bg)', border: '1px solid var(--ink)', boxShadow: '8px 8px 0 var(--vermillion)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: 'clamp(28px, 4vw, 44px)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
              <span className="serif italic" style={{ fontSize: 48, color: 'var(--vermillion)', lineHeight: 0.85 }}>{job.numeral}</span>
              <div>
                <h2 className="serif" style={{ fontSize: 32, fontWeight: 500, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{job.title}</h2>
                <p className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginTop: 6 }}>{job.department} · {job.type}</p>
              </div>
            </div>
            <button onClick={onClose} aria-label="Close" style={{ background: 'transparent', border: '1px solid var(--rule)', color: 'var(--ink-soft)', cursor: 'pointer', padding: 6, flexShrink: 0 }}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
            <MetaPill icon={MapPin} label={job.location} />
            <MetaPill icon={Clock} label={job.commitment} />
            <MetaPill icon={Globe} label="Remote-first" />
          </div>

          <ModalSection title="About the role">
            <p className="serif" style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--ink-soft)' }}>{job.about}</p>
          </ModalSection>

          <ModalSection title="What you'll do">
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {job.responsibilities.map((r, i) => (
                <li key={i} className="serif" style={{ display: 'flex', gap: 10, fontSize: 17, color: 'var(--ink-soft)', lineHeight: 1.5 }}><span style={{ color: 'var(--vermillion)', flexShrink: 0 }}>⁜</span> {r}</li>
              ))}
            </ul>
          </ModalSection>

          <ModalSection title="What we're looking for">
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {job.requirements.map((r, i) => (
                <li key={i} className="serif" style={{ display: 'flex', gap: 10, fontSize: 17, color: 'var(--ink-soft)', lineHeight: 1.5 }}><span style={{ color: 'var(--ink-faint)', flexShrink: 0 }}>—</span> {r}</li>
              ))}
            </ul>
          </ModalSection>

          <ModalSection title="Nice to have">
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {job.niceToHave.map((r, i) => (
                <li key={i} className="serif" style={{ display: 'flex', gap: 10, fontSize: 17, color: 'var(--ink-faint)', lineHeight: 1.5 }}><span style={{ flexShrink: 0 }}>·</span> {r}</li>
              ))}
            </ul>
          </ModalSection>

          <ModalSection title="What you'll get">
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {job.perks.map((p, i) => (
                <li key={i} className="serif" style={{ display: 'flex', gap: 10, fontSize: 17, color: 'var(--ink-soft)', lineHeight: 1.5 }}><span style={{ color: 'var(--gilt)', flexShrink: 0 }}>✦</span> {p}</li>
              ))}
            </ul>
          </ModalSection>

          <a
            href={`mailto:contact@bytesmonks.com?subject=Application – ${job.title}&body=Hi Bytes Monks team,%0D%0A%0D%0AI'd like to apply for the ${job.title} position.%0D%0A%0D%0A[Tell us a bit about yourself and attach your CV]`}
            className="btn"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Apply Now — Send Your Application →
          </a>
          <p className="mono" style={{ textAlign: 'center', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginTop: 14 }}>
            Send your CV and a short intro to contact@bytesmonks.com
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
    <div style={{ minHeight: '100vh' }}>
      <Navigation />

      {/* Hero */}
      <section className="section" style={{ paddingTop: 160, paddingBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 36, flexWrap: 'wrap' }}>
          <span className="eyebrow" style={{ color: 'var(--sage)' }}>
            <span style={{ width: 6, height: 6, background: 'var(--sage)', borderRadius: '50%', display: 'inline-block', marginRight: 6 }} />
            Take Vows · We're Hiring
          </span>
          <span style={{ flex: 1, minWidth: 40, height: 1, background: 'var(--rule-soft)' }} />
          <Link to="/" className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--ink-faint)', textTransform: 'uppercase', textDecoration: 'none' }}>← Return to the scriptorium</Link>
        </div>

        <div className="hiring-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 48, alignItems: 'center' }}>
          <div>
            <h1 className="serif" style={{ fontSize: 'clamp(44px, 7vw, 100px)', lineHeight: 0.9, fontWeight: 500, letterSpacing: '-0.025em' }}>
              Build the future <span className="italic" style={{ color: 'var(--vermillion)' }}>with us</span>.
            </h1>
            <p className="serif italic" style={{ fontSize: 22, color: 'var(--ink-soft)', maxWidth: 600, lineHeight: 1.5, margin: '24px 0 32px' }}>
              We're a small order shipping real products. If you're hungry, self-driven, and excited
              about the intersection of tech and business — you'll fit right in.
            </p>
            <a href="#positions" className="btn">See Open Roles →</a>
          </div>

          <div style={{ border: '1px solid var(--ink)', padding: '32px', background: 'color-mix(in oklch, var(--bg-deep) 30%, var(--bg))' }}>
            {[
              { icon: Globe, label: 'Location', value: 'Remote-first' },
              { icon: Users, label: 'Open roles', value: `${jobs.length} positions` },
              { icon: Clock, label: 'Culture', value: 'Move fast, ship often' },
            ].map(({ icon: Icon, label, value }, i) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: i < 2 ? '1px solid var(--rule-soft)' : 'none' }}>
                <div style={{ width: 36, height: 36, border: '1px solid var(--rule)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon className="w-4 h-4" style={{ color: 'var(--vermillion)' }} />
                </div>
                <div>
                  <div className="mono" style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>{label}</div>
                  <div className="serif italic" style={{ fontSize: 18, color: 'var(--ink)' }}>{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job listings */}
      <section id="positions" className="section" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ marginBottom: 48, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <span className="eyebrow">Open Positions</span>
            <h2 className="serif" style={{ fontSize: 'clamp(34px, 4.5vw, 64px)', lineHeight: 0.98, marginTop: 16, fontWeight: 500, letterSpacing: '-0.02em' }}>
              {jobs.length} roles <span className="italic" style={{ color: 'var(--vermillion)' }}>available</span>.
            </h2>
          </div>
          <p className="serif italic" style={{ fontSize: 17, color: 'var(--ink-soft)', maxWidth: 280 }}>Click any folio to read the full role and apply.</p>
        </div>

        <div className="jobs-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {jobs.map((job, i) => <JobCard key={job.id} job={job} index={i} onOpen={setOpenJobId} />)}
        </div>
      </section>

      {/* Culture strip */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 80 }}>
        <div className="pricing-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
          {cultureItems.map((item, i) => (
            <div key={i} style={{ padding: '32px', borderRight: i < 2 ? '1px solid var(--rule)' : 'none' }}>
              <div className="serif italic" style={{ fontSize: 22, color: 'var(--vermillion)', marginBottom: 10 }}>{item.glyph}</div>
              <p className="serif" style={{ fontSize: 22, fontWeight: 500, color: 'var(--ink)', marginBottom: 8 }}>{item.title}</p>
              <p className="sans" style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Generic CTA */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 100 }}>
        <div style={{ border: '1px solid var(--ink)', background: 'color-mix(in oklch, var(--bg-deep) 30%, var(--bg))' }}>
          <div className="cta-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto' }}>
            <div style={{ padding: 'clamp(32px, 5vw, 56px)' }}>
              <span className="eyebrow">Don't see the right role?</span>
              <h2 className="serif" style={{ fontSize: 'clamp(32px, 4.5vw, 60px)', lineHeight: 0.95, marginTop: 18, fontWeight: 500, letterSpacing: '-0.02em' }}>
                We're always open to<br /><span className="italic" style={{ color: 'var(--vermillion)' }}>exceptional people.</span>
              </h2>
              <p className="serif italic" style={{ fontSize: 19, color: 'var(--ink-soft)', marginTop: 20, maxWidth: 460, lineHeight: 1.5 }}>
                Drop us a line and tell us how you'd contribute. We read every letter.
              </p>
            </div>
            <div className="cta-side" style={{ borderLeft: '1px solid var(--rule)', background: 'color-mix(in oklch, var(--bg-deep) 50%, var(--bg))', padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14, minWidth: 280 }}>
              <a
                href="mailto:contact@bytesmonks.com?subject=Spontaneous Application&body=Hi Bytes Monks team,%0D%0A%0D%0AI'd love to explore opportunities with you.%0D%0A%0D%0A[Tell us about yourself]"
                className="btn"
                style={{ justifyContent: 'center' }}
              >
                Get in Touch →
              </a>
              <p className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-faint)', textAlign: 'center' }}>We respond to every letter</p>
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
          <Link to="/pricing" className="link-ink serif" style={{ fontSize: 14 }}>Tariff</Link>
        </div>
      </footer>

      <AnimatePresence>
        {activeJob && <JobModal job={activeJob} onClose={() => setOpenJobId(null)} />}
      </AnimatePresence>
    </div>
  );
}
