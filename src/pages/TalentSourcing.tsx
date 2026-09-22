import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Layers, Globe, ShieldCheck } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import { Reveal, Ornament } from '../components/monastic';
import { Field, FaqRow, SectionHead, SuccessPanel, useFormSubmit, FORM_ENDPOINT } from '../components/sourcingUi';
import {
  bench, disciplines, engagements, faqs, proof, rite, vetting,
} from '../data/talentSourcing';
import type { Hand } from '../data/talentSourcing';

const ROMAN_VALUES: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };

/** "VIII years" -> 8. The Roman form is the house's display convention, but a
 *  screen reader should hear a number. */
function romanToArabic(text: string): number {
  const glyphs = text.replace(/[^IVXLCDM]/g, '');
  let total = 0;
  for (let i = 0; i < glyphs.length; i += 1) {
    const v = ROMAN_VALUES[glyphs[i]];
    total += v < (ROMAN_VALUES[glyphs[i + 1]] ?? 0) ? -v : v;
  }
  return total;
}

/**
 * One folio from the Bench. Describes the SHAPE of a role we source — not a
 * person, and deliberately with no availability status: the disclaimer above
 * the grid says these are not live individuals, and a green "available now" dot
 * would contradict it.
 */
function HandCard({ hand, index }: { hand: Hand; index: number }) {
  const disc = disciplines.find((d) => d.id === hand.discipline);
  return (
    <motion.article
      layout
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index, 6) * 0.05 }}
      className="folio"
      style={{ border: '1px solid var(--ink)', background: 'var(--bg)', boxShadow: '5px 5px 0 var(--rule)', display: 'flex', flexDirection: 'column' }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '9px 9px 0 var(--vermillion)')}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '5px 5px 0 var(--rule)')}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '12px 20px', borderBottom: '1px solid var(--ink)', background: 'color-mix(in oklch, var(--ink) 5%, var(--bg))' }}>
        <span className="serif italic" style={{ fontSize: 17, color: 'var(--vermillion)', fontWeight: 600 }}>{hand.ref}</span>
        <span className="mono" style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>
          Role shape
        </span>
      </div>

      <div style={{ padding: '24px 20px 20px', display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
        <div>
          <h3 className="serif" style={{ fontSize: 25, lineHeight: 1.15, fontWeight: 500, color: 'var(--ink)' }}>{hand.role}</h3>
          <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginTop: 7 }}>
            {hand.seniority} · <span aria-hidden>{hand.years}</span>
            <span className="sr-only">{romanToArabic(hand.years)} years of experience</span>
          </div>
        </div>

        <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 6, listStyle: 'none', padding: 0, margin: 0 }}>
          {hand.stack.map((t) => (
            <li key={t} className="mono" style={{ fontSize: 9.5, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-soft)', border: '1px solid var(--rule)', padding: '4px 8px' }}>
              {t}
            </li>
          ))}
        </ul>

        <p className="hand" style={{ fontSize: 23, lineHeight: 1.38, color: 'var(--ink)', marginTop: 'auto', paddingTop: 6 }}>
          “{hand.note}”
        </p>

        <div style={{ borderTop: '1px solid var(--rule-soft)', paddingTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
          <span className="mono" style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>{disc?.name}</span>
          <a href="#brief" className="mono" style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--vermillion)', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Ask for hands like this →
          </a>
        </div>
      </div>
    </motion.article>
  );
}

type Side = 'brief' | 'bench';

function SourcingForms({ side, setSide }: { side: Side; setSide: (s: Side) => void }) {
  const { status, setStatus, submit, successRef, disabled } = useFormSubmit(
    side === 'brief' ? 'sourcing-brief' : 'bench-folio'
  );

  const tab = (key: Side, label: string) => (
    <button
      key={key}
      onClick={() => { setSide(key); setStatus('idle'); }}
      aria-pressed={side === key}
      className="mono"
      style={{
        flex: 1, padding: '14px 18px', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
        cursor: 'pointer', border: '1px solid var(--ink)', borderWidth: '0 0 0 1px',
        background: side === key ? 'var(--ink)' : 'transparent',
        color: side === key ? 'var(--bg)' : 'var(--ink-soft)', transition: 'all 0.25s ease',
      }}
    >
      {label}
    </button>
  );

  if (status === 'success') {
    return (
      <SuccessPanel
        panelRef={successRef}
        heading={side === 'brief' ? 'Your brief is sealed.' : 'Your folio is entered.'}
        body={
          side === 'brief'
            ? 'We read every brief and reply within a day, with hands or an honest no.'
            : 'We will write when a seat fits. Nothing leaves our hands without your word.'
        }
      />
    );
  }

  return (
    <div style={{ border: '1px solid var(--ink)', background: 'var(--bg)' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid var(--ink)' }}>
        {tab('brief', 'I am hiring')}
        {tab('bench', 'I am looking')}
      </div>

      <form method="post" action={FORM_ENDPOINT} onSubmit={submit} key={side} style={{ padding: 'clamp(24px, 4vw, 40px)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="form-grid">
        {side === 'brief' ? (
          <>
            <Field id="name" label="Your name" placeholder="First and last name" required disabled={disabled} />
            <Field id="email" label="Your email" type="email" placeholder="you@company.com" required disabled={disabled} />
            <Field id="company" label="Company" placeholder="Company or project" disabled={disabled} />
            <Field id="role" label="Role you are hiring for" placeholder="Senior backend engineer" required disabled={disabled} />
            <Field id="discipline" label="Discipline" disabled={disabled} options={[...disciplines.map((d) => `${d.name} — ${d.subtitle}`), 'Not sure yet']} />
            <Field id="seniority" label="Seniority" disabled={disabled} options={['Mid', 'Senior', 'Staff or Lead', 'Head or Director', 'Not sure yet']} />
            <Field id="engagement" label="Engagement type" disabled={disabled} options={['Direct placement', 'Contract hands', 'Embedded squad', 'Undecided']} />
            <Field id="count" label="How many people" placeholder="1" disabled={disabled} />
            <Field id="start" label="Start date" placeholder="Immediately, or a date" disabled={disabled} />
            <Field id="band" label="Salary or rate band" placeholder="Band, or “tell us the market”" disabled={disabled} />
            <div style={{ gridColumn: '1 / -1' }}>
              <Field id="message" label="Anything else" placeholder="Anything else we should know before we start looking…" textarea disabled={disabled} />
            </div>
          </>
        ) : (
          <>
            <Field id="name" label="Your name" placeholder="As you'd like it written" required disabled={disabled} />
            <Field id="email" label="Your email" type="email" placeholder="you@company.com" required disabled={disabled} />
            <Field id="craft" label="Your role" placeholder="Backend engineer, designer…" required disabled={disabled} />
            <Field id="discipline" label="Discipline" disabled={disabled} options={disciplines.map((d) => `${d.name} — ${d.subtitle}`)} />
            <Field id="years" label="Years of experience" placeholder="7" disabled={disabled} />
            <Field id="stack" label="Your stack" placeholder="Go, Postgres, Kubernetes…" disabled={disabled} />
            <Field id="location" label="Location" placeholder="City and time zone" disabled={disabled} />
            <Field id="availability" label="Availability" disabled={disabled} options={['Available now', 'Available in weeks', 'Open to the right seat', 'Just watching']} />
            <div style={{ gridColumn: '1 / -1' }}>
              <Field id="link" label="Link to your work" placeholder="GitHub, portfolio, or LinkedIn" disabled={disabled} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <Field id="message" label="A short word" placeholder="What you want next, in a line or two" textarea disabled={disabled} />
            </div>
          </>
        )}

        <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button type="submit" disabled={disabled} className="btn" style={{ justifyContent: 'center' }}>
            {disabled ? 'Sealing…' : side === 'brief' ? 'Seal & Send →' : 'Enter my name in the book →'}
          </button>
          {status === 'error' && (
            <p role="alert" className="mono" style={{ fontSize: 11, letterSpacing: '0.08em', color: 'var(--vermillion)' }}>
              Something went wrong. Please try again or{' '}
              <a href="mailto:contact@bytesmonks.com" className="link-ink">email us directly</a>.
            </p>
          )}
          <p className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-faint)', textAlign: 'center' }}>
            {side === 'brief' ? 'No spam. No obligation.' : 'No fee, ever · ask us to delete it any time'}
          </p>
        </div>
      </form>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TalentSourcing() {
  const [filter, setFilter] = useState<string>('all');
  const [side, setSide] = useState<Side>('brief');

  // /talent-sourcing#join is the candidate entrance — the footer and the dual CTA
  // both point at it, so it must open on the candidate tab, not the client one.
  useEffect(() => {
    if (window.location.hash === '#join') setSide('bench');
  }, []);

  const visible = useMemo(
    () => (filter === 'all' ? bench : bench.filter((h) => h.discipline === filter)),
    [filter]
  );


  return (
    <div style={{ minHeight: '100vh' }}>
      <Seo path="/talent-sourcing" />
      <Navigation />

      <main id="main" tabIndex={-1}>
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="section" style={{ paddingTop: 160, paddingBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40, flexWrap: 'wrap' }}>
            <span className="eyebrow">Ars Vocandi · Tech Talent Sourcing</span>
            <span style={{ flex: 1, minWidth: 40, height: 1, background: 'var(--rule-soft)' }} />
            <Link to="/" className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--ink-faint)', textTransform: 'uppercase', textDecoration: 'none' }}>
              ← Return to the scriptorium
            </Link>
          </div>

          <div className="sourcing-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 56, alignItems: 'center' }}>
            <div>
              <h1 className="hand" style={{ fontSize: 'clamp(46px, 7.4vw, 108px)', lineHeight: 1.06, fontWeight: 600, letterSpacing: '-0.01em' }}>
                We know where the <span style={{ color: 'var(--vermillion)' }}>good hands</span> are.
              </h1>
              <p className="serif italic" style={{ fontSize: 23, color: 'var(--ink-soft)', maxWidth: 620, lineHeight: 1.5, margin: '26px 0 10px' }}>
                Tech talent sourcing for AI, software, data, and cloud teams.
              </p>
              <p className="hand" style={{ fontSize: 26, color: 'var(--ink-faint)', marginBottom: 32 }}>
                Vetted by engineers who would have to work with them.
              </p>

              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <a href="#brief" className="btn" onClick={() => setSide('brief')}>Send a Sourcing Brief →</a>
                <a href="#join" className="btn btn-ghost" onClick={() => setSide('bench')}>Join the Bench</a>
              </div>
              <p className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginTop: 18 }}>
                Reply within 24 hours · no fee to candidates
              </p>
            </div>

            <div style={{ border: '1px solid var(--ink)', padding: 32, background: 'color-mix(in oklch, var(--bg-deep) 30%, var(--bg))' }}>
              {[
                { icon: Layers, label: 'Disciplines sourced', value: 'Six crafts' },
                { icon: Users, label: 'Ways to hire', value: 'Permanent · contract · squad' },
                { icon: Globe, label: 'Where they sit', value: 'Remote-first, EU hours' },
                { icon: ShieldCheck, label: 'Cost to candidates', value: 'None, ever' },
              ].map(({ icon: Icon, label, value }, i) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: i < 3 ? '1px solid var(--rule-soft)' : 'none' }}>
                  <div style={{ width: 36, height: 36, border: '1px solid var(--rule)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon className="w-4 h-4" aria-hidden style={{ color: 'var(--vermillion)' }} />
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

        {/* ── Proof band ───────────────────────────────────────────────────── */}
        <section className="section" style={{ paddingTop: 40, paddingBottom: 40 }}>
          <div className="sourcing-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
            {proof.map((p, i) => (
              <div key={p.k} style={{ padding: '28px 26px', borderRight: i < proof.length - 1 ? '1px solid var(--rule)' : 'none' }}>
                <div className="serif italic" style={{ fontSize: 28, color: 'var(--vermillion)', lineHeight: 1 }}>{p.k}</div>
                <div className="serif" style={{ fontSize: 20, fontWeight: 500, color: 'var(--ink)', marginTop: 12, lineHeight: 1.25 }}>{p.t}</div>
                <p className="sans" style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.6, marginTop: 8 }}>{p.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── I. What we source ────────────────────────────────────────────── */}
        <section id="disciplines" className="section" style={{ paddingTop: 100 }}>
          <SectionHead
            eyebrow="I. What we source"
            plain="Six hands,"
            accent="one standard."
            sub="We staff the four disciplines we practise, and the two that steer them."
          />
          <div className="sourcing-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid var(--ink)', borderLeft: '1px solid var(--rule)' }}>
            {disciplines.map((d) => (
              <div key={d.id} style={{ padding: '30px 28px', borderRight: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
                  <span className="serif italic" style={{ fontSize: 30, color: 'var(--vermillion)', lineHeight: 1 }}>{d.num}</span>
                  <span className="serif" aria-hidden style={{ fontSize: 22, color: 'var(--ink-trace)' }}>{d.sigil}</span>
                </div>
                <h3 className="serif" style={{ fontSize: 25, fontWeight: 500, color: 'var(--ink)', marginTop: 14, lineHeight: 1.15 }}>{d.name}</h3>
                <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginTop: 8 }}>{d.subtitle}</div>
                <p className="sans" style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6, marginTop: 14 }}>{d.gloss}</p>
              </div>
            ))}
          </div>
          <p className="hand" style={{ fontSize: 25, color: 'var(--ink-faint)', marginTop: 24 }}>
            We don't source sales, finance, or admin. Only these.
          </p>
        </section>

        {/* ── II. The Bench ────────────────────────────────────────────────── */}
        <section id="bench" className="section" style={{ paddingTop: 120 }}>
          <SectionHead
            eyebrow="II. The Bench · Index Manuum"
            plain="The hands we"
            accent="go and find."
            sub="The role shapes we source — seniority, stack, and what good looks like."
          />

          <p className="mono" style={{ fontSize: 11, lineHeight: 1.7, letterSpacing: '0.04em', color: 'var(--ink-faint)', border: '1px solid var(--rule)', borderLeft: '3px solid var(--vermillion)', padding: '14px 18px', maxWidth: 900, marginBottom: 36 }}>
            These are role shapes, not a live roster and not individual people. Once a brief is open,
            we share real folios under NDA: anonymised CVs, availability, and rates.
          </p>

          <div role="group" aria-label="Filter the bench by discipline" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
            {[{ id: 'all', name: 'All hands' }, ...disciplines].map((d) => {
              const on = filter === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => setFilter(d.id)}
                  aria-pressed={on}
                  className="mono"
                  style={{
                    fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '9px 14px',
                    border: `1px solid ${on ? 'var(--ink)' : 'var(--rule)'}`,
                    background: on ? 'var(--ink)' : 'transparent',
                    color: on ? 'var(--bg)' : 'var(--ink-soft)',
                    cursor: 'pointer', transition: 'all 0.2s ease',
                  }}
                >
                  {d.name}
                </button>
              );
            })}
          </div>

          <p aria-live="polite" className="sr-only">
            {`Showing ${visible.length} of ${bench.length} role shapes${
              filter === 'all' ? '' : ` in ${disciplines.find((d) => d.id === filter)?.name ?? ''}`
            }.`}
          </p>

          {visible.length ? (
            <div className="bench-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
              {visible.map((h, i) => <HandCard key={h.ref} hand={h} index={i} />)}
            </div>
          ) : (
            <p className="serif italic" style={{ fontSize: 20, color: 'var(--ink-soft)', padding: '40px 0' }}>
              No hands under this discipline yet. Send the brief and we'll go and find them.
            </p>
          )}
        </section>

        {/* ── III. The Rite ────────────────────────────────────────────────── */}
        <section id="rite" className="section" style={{ paddingTop: 130 }}>
          <SectionHead
            eyebrow="III. The Rite"
            plain="Five steps,"
            accent="no shortcuts."
            sub="The same rite for one hand or for ten."
          />
          <div style={{ position: 'relative' }}>
            <div aria-hidden style={{ position: 'absolute', left: 78, top: 0, bottom: 0, width: 1, background: 'var(--rule)' }} />
            {rite.map((r, i) => (
              <Reveal key={r.num} delay={i * 90}>
                <div className="rule-row" style={{ display: 'grid', gridTemplateColumns: '80px minmax(0, 1fr) minmax(0, 1.4fr) 240px', gap: 40, alignItems: 'start', padding: '44px 0', borderBottom: i < rite.length - 1 ? '1px solid var(--rule-soft)' : 'none', position: 'relative' }}>
                  <div style={{ position: 'relative' }}>
                    <div aria-hidden style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--bg)', border: '2px solid var(--vermillion)', position: 'absolute', left: 67, top: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--vermillion)' }} />
                    </div>
                    <div className="serif italic" style={{ fontSize: 52, color: 'var(--vermillion)', lineHeight: 1, fontWeight: 500 }}>{r.num}</div>
                  </div>
                  <div>
                    <h3 className="serif" style={{ fontSize: 36, lineHeight: 1, fontWeight: 500, color: 'var(--ink)', marginBottom: 8 }}>{r.title}</h3>
                    <div className="mono" style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>— {r.en}</div>
                  </div>
                  <p className="serif" style={{ fontSize: 19, lineHeight: 1.55, color: 'var(--ink-soft)' }}>{r.body}</p>
                  <div style={{ padding: '14px 18px', borderLeft: '2px solid var(--vermillion)', background: 'color-mix(in oklch, var(--bg-deep) 30%, transparent)' }}>
                    <div className="mono" style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 8 }}>In practice</div>
                    <div className="sans" style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>{r.practice}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── IV. The Vetting ──────────────────────────────────────────────── */}
        <section id="vetting" className="section" style={{ paddingTop: 130, paddingBottom: 100, background: 'color-mix(in oklch, var(--bg-deep) 50%, var(--bg))', maxWidth: 'unset' }}>
          <div style={{ maxWidth: 1320, margin: '0 auto' }}>
            <div className="vows-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 80, alignItems: 'start' }}>
              {/* Sticky on the grid item itself, so it has the whole row to travel. */}
              <Reveal style={{ position: 'sticky', top: 120 }}>
                <div>
                  <span className="eyebrow">IV. The Vetting</span>
                  <h2 className="hand" style={{ fontSize: 'clamp(38px, 4.6vw, 68px)', lineHeight: 1.14, marginTop: 16, fontWeight: 600 }}>
                    Nobody reaches you <span style={{ color: 'var(--vermillion)' }}>unread</span>.
                  </h2>
                  <p className="hand" style={{ fontSize: 25, color: 'var(--ink-faint)', marginTop: 20, maxWidth: 340 }}>
                    Anyone we wouldn't hire ourselves never reaches your inbox.
                  </p>
                  <a href="#brief" className="btn" style={{ marginTop: 28 }}>Send a Sourcing Brief →</a>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <div>
                  {vetting.map((v, i) => (
                    <div
                      key={v.t}
                      className="reveal-row"
                      style={{ display: 'grid', gridTemplateColumns: '60px 1fr', alignItems: 'start', gap: 24, padding: '28px 0 28px 40px', borderBottom: i < vetting.length - 1 ? '1px solid var(--rule-soft)' : 'none', position: 'relative', transition: 'padding 0.35s' }}
                      onMouseEnter={(e) => (e.currentTarget.style.paddingLeft = '56px')}
                      onMouseLeave={(e) => (e.currentTarget.style.paddingLeft = '40px')}
                    >
                      <div className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', color: 'var(--vermillion)', paddingTop: 8 }}>{String(i + 1).padStart(2, '0')}</div>
                      <div>
                        <h3 className="serif" style={{ fontSize: 26, lineHeight: 1.2, color: 'var(--ink)', marginBottom: 8, fontWeight: 500 }}>{v.t}</h3>
                        <p className="sans" style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.6 }}>{v.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── V. Terms of Engagement ───────────────────────────────────────── */}
        <section id="terms" className="section" style={{ paddingTop: 130 }}>
          <SectionHead
            eyebrow="V. Terms of Engagement"
            plain="Three ways"
            accent="to hire."
            sub="Choose by how long you need the hand."
          />
          <div className="terms-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
            {engagements.map((m, i) => (
              <div
                key={m.name}
                style={{
                  padding: '36px 30px', display: 'flex', flexDirection: 'column',
                  borderRight: i < engagements.length - 1 ? '1px solid var(--rule)' : 'none',
                  background: m.highlight ? 'color-mix(in oklch, var(--vermillion) 5%, var(--bg))' : 'transparent',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
                  <span className="serif italic" style={{ fontSize: 32, color: 'var(--vermillion)', lineHeight: 1 }}>{m.num}</span>
                  <div>
                    <h3 className="serif" style={{ fontSize: 28, fontWeight: 500, color: 'var(--ink)', lineHeight: 1.1 }}>{m.name}</h3>
                    <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginTop: 7 }}>{m.subtitle}</div>
                  </div>
                </div>

                <p className="serif italic" style={{ fontSize: 19, color: 'var(--ink-soft)', lineHeight: 1.45, margin: '22px 0 24px' }}>{m.line}</p>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 26px', display: 'flex', flexDirection: 'column', gap: 10, borderTop: '1px solid var(--rule-soft)', paddingTop: 20 }}>
                  {m.includes.map((inc) => (
                    <li key={inc} className="sans" style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.55 }}>
                      <span aria-hidden style={{ color: 'var(--vermillion)', flexShrink: 0 }}>⁜</span> {inc}
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: 'auto', borderTop: '1px solid var(--rule-soft)', paddingTop: 18 }}>
                  <div className="mono" style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 6 }}>How it is priced</div>
                  <div className="serif italic" style={{ fontSize: 17, color: 'var(--ink)' }}>{m.price}</div>
                  <div className="mono" style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-faint)', margin: '16px 0 6px' }}>Best for</div>
                  <div className="sans" style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.5 }}>{m.bestFor}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="serif italic" style={{ fontSize: 19, color: 'var(--ink-soft)', textAlign: 'center', marginTop: 28 }}>
            Not sure which? Send the brief and we'll tell you the one we'd choose.
          </p>
        </section>

        {/* ── The Guarantee ────────────────────────────────────────────────── */}
        <section className="section" style={{ paddingTop: 110 }}>
          <Reveal>
            <div style={{ border: '1px solid var(--ink)', background: 'color-mix(in oklch, var(--bg-deep) 30%, var(--bg))', position: 'relative', padding: 'clamp(36px, 6vw, 72px)', textAlign: 'center' }}>
              {[{ top: 12, left: 12 }, { top: 12, right: 12 }, { bottom: 12, left: 12 }, { bottom: 12, right: 12 }].map((p, i) => (
                <span key={i} aria-hidden style={{
                  position: 'absolute', ...p, width: 20, height: 20,
                  borderTop: 'top' in p ? '1px solid var(--vermillion)' : 'none',
                  borderBottom: 'bottom' in p ? '1px solid var(--vermillion)' : 'none',
                  borderLeft: 'left' in p ? '1px solid var(--vermillion)' : 'none',
                  borderRight: 'right' in p ? '1px solid var(--vermillion)' : 'none',
                }} />
              ))}
              <span className="eyebrow" style={{ justifyContent: 'center' }}>The Guarantee</span>
              <h2 className="hand" style={{ fontSize: 'clamp(34px, 4.8vw, 70px)', lineHeight: 1.14, marginTop: 18, fontWeight: 600 }}>
                If the hand does not hold, <span style={{ color: 'var(--vermillion)' }}>we replace it</span>.
              </h2>
              <p className="serif" style={{ fontSize: 19, color: 'var(--ink-soft)', lineHeight: 1.6, maxWidth: 720, margin: '22px auto 0' }}>
                Every direct placement carries a replacement guarantee. If they leave, or you let them go
                inside the agreed window, we search again at no further fee.
              </p>
              <p className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginTop: 22 }}>
                Written into the engagement letter. Not a handshake.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── VI. FAQ ──────────────────────────────────────────────────────── */}
        <section id="faq" className="section" style={{ paddingTop: 120 }}>
          <SectionHead
            eyebrow="VI. Questions answered"
            plain="Asked before, answered"
            accent="plainly."
          />
          <div style={{ borderTop: '1px solid var(--ink)', maxWidth: 1000 }}>
            {faqs.map((f, i) => <FaqRow key={f.q} item={f} id={`faq-a-${i}`} />)}
          </div>
        </section>

        {/* ── VII. Dual CTA + forms ────────────────────────────────────────── */}
        <section id="brief" className="section" style={{ paddingTop: 120, paddingBottom: 40 }}>
          <span id="join" aria-hidden style={{ position: 'absolute', top: 80 }} />
          <SectionHead
            eyebrow="VII. Benediction"
            plain="Two doors,"
            accent="one order."
          />
          <div className="dual-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: '1px solid var(--ink)', marginBottom: 48 }}>
            <div style={{ padding: 'clamp(28px, 4vw, 48px)' }}>
              <span className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>For those hiring</span>
              <h3 className="hand" style={{ fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: 1.18, marginTop: 12, fontWeight: 600 }}>
                Tell us <span style={{ color: 'var(--vermillion)' }}>which hand</span> you need.
              </h3>
              <p className="serif italic" style={{ fontSize: 18, color: 'var(--ink-soft)', marginTop: 14, lineHeight: 1.5 }}>
                One page is enough. Role, stack, band, and when.
              </p>
              <button className="btn" style={{ marginTop: 24 }} onClick={() => setSide('brief')}>Send a Sourcing Brief →</button>
              <p className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginTop: 14 }}>Reply within 24 hours · no obligation</p>
            </div>
            <div className="dual-side" style={{ padding: 'clamp(28px, 4vw, 48px)', borderLeft: '1px solid var(--rule)', background: 'color-mix(in oklch, var(--bg-deep) 40%, var(--bg))' }}>
              <span className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>For those seeking work</span>
              <h3 className="hand" style={{ fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: 1.18, marginTop: 12, fontWeight: 600 }}>
                Enter your name <span style={{ color: 'var(--vermillion)' }}>in the book</span>.
              </h3>
              <p className="serif italic" style={{ fontSize: 18, color: 'var(--ink-soft)', marginTop: 14, lineHeight: 1.5 }}>
                No fees, no spam, and no CV sent anywhere without your word.
              </p>
              <button className="btn btn-ghost" style={{ marginTop: 24 }} onClick={() => setSide('bench')}>Join the Bench →</button>
              <p className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginTop: 14 }}>We keep your folio only while you want us to</p>
            </div>
          </div>

          <SourcingForms side={side} setSide={setSide} />

          <div style={{ marginTop: 72 }}>
            <Ornament />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
