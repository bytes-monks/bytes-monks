import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Briefcase, Users, Globe } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Seo from '../components/Seo';

// ─── Types ────────────────────────────────────────────────────────────────────

import { jobs } from '../data/jobs';
import type { JobOffer } from '../data/jobs';

const cultureItems = [
  { glyph: 'i.', title: 'Ship weekly', body: 'You own your work and decide how it gets done.' },
  { glyph: 'ii.', title: 'Remote-first', body: 'Work from anywhere. Async by default, plus a weekly check-in.' },
  { glyph: 'iii.', title: 'Your work shows', body: "We're small. What you make here, people use." },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function MetaPill({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <span className="mono" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-soft)', border: '1px solid var(--rule)', padding: '6px 12px' }}>
      <Icon className="w-3.5 h-3.5" style={{ color: 'var(--vermillion)' }} /> {label}
    </span>
  );
}

function JobCard({ job, index, open, onToggle }: { job: JobOffer; index: number; open: boolean; onToggle: (id: string) => void }) {
  const detailId = `job-detail-${job.id}`;
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="folio"
      style={{ border: '1px solid var(--ink)', background: 'var(--bg)', boxShadow: '6px 6px 0 var(--rule)' }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '10px 10px 0 var(--vermillion)')}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '6px 6px 0 var(--rule)')}
    >
      <div style={{ padding: 'clamp(20px, 6vw, 32px) clamp(18px, 6vw, 34px)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 18, flexWrap: 'wrap' }}>
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

        <button
          onClick={() => onToggle(job.id)}
          aria-expanded={open}
          aria-controls={detailId}
          className="btn"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          {open ? 'Hide Full Role ↑' : 'View Full Role →'}
        </button>

        <JobDetails job={job} open={open} id={detailId} />
      </div>
    </motion.div>
  );
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 24 }}>
      <div className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--vermillion)', marginBottom: 12 }}>{title}</div>
      {children}
    </section>
  );
}

function BulletList({ items, marker, color }: { items: string[]; marker: string; color: string }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map((r) => (
        <li key={r} className="serif" style={{ display: 'flex', gap: 10, fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.5 }}>
          <span aria-hidden style={{ color, flexShrink: 0 }}>{marker}</span> {r}
        </li>
      ))}
    </ul>
  );
}

/**
 * The full role, rendered into the DOM on every page load and collapsed with
 * CSS rather than mounted on demand.
 *
 * This is load-bearing for SEO, not just a style choice: src/lib/pageSchema.ts
 * emits a JobPosting whose `description` is built from exactly this text, and
 * Google requires that markup to describe content the page actually shows.
 * `visibility` keeps it out of the accessibility tree and the tab order while
 * collapsed, without removing it from the prerendered HTML.
 */
function JobDetails({ job, open, id }: { job: JobOffer; open: boolean; id: string }) {
  return (
    <div
      id={id}
      style={{
        display: 'grid',
        gridTemplateRows: open ? '1fr' : '0fr',
        visibility: open ? 'visible' : 'hidden',
        transition: `grid-template-rows 0.35s cubic-bezier(.2,.8,.2,1), visibility 0s linear ${open ? '0s' : '0.35s'}`,
      }}
    >
      <div style={{ overflow: 'hidden' }}>
        <div style={{ paddingTop: 26, marginTop: 26, borderTop: '1px solid var(--rule-soft)' }}>
          <DetailSection title="About the role">
            <p className="serif" style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-soft)' }}>{job.about}</p>
          </DetailSection>
          <DetailSection title="What you'll do">
            <BulletList items={job.responsibilities} marker="⁜" color="var(--vermillion)" />
          </DetailSection>
          <DetailSection title="What we're looking for">
            <BulletList items={job.requirements} marker="—" color="var(--ink-faint)" />
          </DetailSection>
          <DetailSection title="Nice to have">
            <BulletList items={job.niceToHave} marker="·" color="var(--ink-faint)" />
          </DetailSection>
          <DetailSection title="What you'll get">
            <BulletList items={job.perks} marker="✦" color="var(--gilt)" />
          </DetailSection>

          <a
            href={`mailto:contact@bytesmonks.com?subject=Application – ${job.title}&body=Hi Bytes Monks team,%0D%0A%0D%0AI'd like to apply for the ${job.title} position.%0D%0A%0D%0A[Tell us a bit about yourself and attach your CV]`}
            className="btn"
            tabIndex={open ? undefined : -1}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Apply by Email →
          </a>
          <p className="mono" style={{ textAlign: 'center', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginTop: 14 }}>
            Send your CV and a short intro to contact@bytesmonks.com
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Hiring() {
  const [openJobId, setOpenJobId] = useState<string | null>(null);
  const toggle = (id: string) => setOpenJobId((cur) => (cur === id ? null : id));

  return (
    <div style={{ minHeight: '100vh' }}>
      <Seo path="/hiring" />
      <Navigation />

      <main id="main" tabIndex={-1}>
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
              Join a small team <span className="italic" style={{ color: 'var(--vermillion)' }}>that ships</span>.
            </h1>
            <p className="serif italic" style={{ fontSize: 22, color: 'var(--ink-soft)', maxWidth: 600, lineHeight: 1.5, margin: '24px 0 32px' }}>
              We're a few people in Tunis building software for clients and two products
              of our own. You'd work directly with the founders.
            </p>
            <a href="#positions" className="btn">See Open Roles →</a>
          </div>

          <div style={{ border: '1px solid var(--ink)', padding: '32px', background: 'color-mix(in oklch, var(--bg-deep) 30%, var(--bg))' }}>
            {[
              { icon: Globe, label: 'Location', value: 'Remote-first' },
              { icon: Users, label: 'Open roles', value: `${jobs.length} positions` },
              { icon: Clock, label: 'Cadence', value: 'We ship weekly' },
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
          <p className="serif italic" style={{ fontSize: 17, color: 'var(--ink-soft)', maxWidth: 280 }}>Open a role to read it in full and apply.</p>
        </div>

        <div className="jobs-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {jobs.map((job, i) => <JobCard key={job.id} job={job} index={i} open={openJobId === job.id} onToggle={toggle} />)}
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
                Write to us{' '}<br /><span className="italic" style={{ color: 'var(--vermillion)' }}>anyway.</span>
              </h2>
              <p className="serif italic" style={{ fontSize: 19, color: 'var(--ink-soft)', marginTop: 20, maxWidth: 460, lineHeight: 1.5 }}>
                Tell us what you'd do here and why.
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
              <p className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-faint)', textAlign: 'center' }}>We reply to every letter</p>
            </div>
          </div>
        </div>
      </section>

      </main>

      <Footer />

    </div>
  );
}
