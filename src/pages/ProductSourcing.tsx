import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Boxes, ClipboardCheck, Factory, Ship } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import { Ornament, Reveal } from '../components/monastic';
import { Field, FaqRow, SectionHead, SuccessPanel, useFormSubmit } from '../components/sourcingUi';
import {
  assay, categories, faqs, handled, passage, proof, refusals, theBalance, tradeModels,
} from '../data/productSourcing';

type Door = 'quote' | 'inspection';

// ─── Numbered trust rows, shared by The Assay and The Refusals ───────────────

function NumberedRows({ items }: { items: { t: string; d: string }[] }) {
  return (
    <div>
      {items.map((v, i) => (
        <div
          key={v.t}
          className="reveal-row"
          style={{ display: 'grid', gridTemplateColumns: '60px 1fr', alignItems: 'start', gap: 24, padding: '28px 0 28px 40px', borderBottom: i < items.length - 1 ? '1px solid var(--rule-soft)' : 'none', position: 'relative', transition: 'padding 0.35s' }}
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
  );
}

// ─── The two doors ────────────────────────────────────────────────────────────

function BriefForms({ door, setDoor }: { door: Door; setDoor: (d: Door) => void }) {
  const { status, setStatus, submit, successRef, disabled } = useFormSubmit(
    door === 'quote' ? 'sourcing-quote' : 'inspection-request'
  );

  const tab = (key: Door, label: string) => (
    <button
      key={key}
      onClick={() => { setDoor(key); setStatus('idle'); }}
      aria-pressed={door === key}
      className="mono"
      style={{
        flex: 1, padding: '14px 18px', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
        cursor: 'pointer', border: '1px solid var(--ink)', borderWidth: '0 0 0 1px',
        background: door === key ? 'var(--ink)' : 'transparent',
        color: door === key ? 'var(--bg)' : 'var(--ink-soft)', transition: 'all 0.25s ease',
      }}
    >
      {label}
    </button>
  );

  if (status === 'success') {
    return (
      <SuccessPanel
        panelRef={successRef}
        heading={door === 'quote' ? 'Your brief is sealed.' : 'Your supplier is entered.'}
        body={
          door === 'quote'
            ? 'We read every brief and reply within a day, with a plan or an honest no.'
            : 'We will write with what an inspection covers and what it costs.'
        }
      />
    );
  }

  return (
    <div style={{ border: '1px solid var(--ink)', background: 'var(--bg)' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid var(--ink)' }}>
        {tab('quote', 'I need sourcing')}
        {tab('inspection', 'I need inspection')}
      </div>

      <form onSubmit={submit} key={door} className="form-grid" style={{ padding: 'clamp(24px, 4vw, 40px)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <Field id="name" label="Your name" placeholder="Brother or Sister…" required disabled={disabled} />
        <Field id="email" label="Your sending address" type="email" placeholder="you@house.io" required disabled={disabled} />
        <Field id="company" label="Your house" placeholder="Company or shop" disabled={disabled} />

        {door === 'quote' ? (
          <>
            <Field id="product" label="What you want sourced" placeholder="A photo, a link, or a description" required disabled={disabled} />
            <Field id="family" label="Family of goods" disabled={disabled} options={[...categories.map((c) => `${c.name} — ${c.subtitle}`), 'Not sure yet']} />
            <Field id="quantity" label="Quantity sought" placeholder="500 pieces, or your best guess" disabled={disabled} />
            <Field id="targetPrice" label="Target landed price" placeholder="Per piece, or “tell us the market”" disabled={disabled} />
            <Field id="branding" label="Your mark on it" disabled={disabled} options={['Plain, unbranded', 'Our logo on the product', 'Our own packaging', 'Full private label']} />
            <Field id="destination" label="Where it must land" placeholder="City and country" disabled={disabled} />
            <Field id="incoterm" label="Terms you prefer" disabled={disabled} options={['EXW', 'FOB', 'CIF', 'DDP', 'Tell me which to use']} />
            <Field id="timing" label="When you need it" placeholder="A date, or “as soon as it’s right”" disabled={disabled} />
            <Field id="spec" label="Spec or drawings" placeholder="Link to a file, if you have one" disabled={disabled} />
          </>
        ) : (
          <>
            <Field id="supplier" label="Supplier name and city" placeholder="Factory or trading company" required disabled={disabled} />
            <Field id="product" label="What they are making for you" placeholder="Product and quantity" required disabled={disabled} />
            <Field id="orderValue" label="Order value, roughly" placeholder="So we can size the inspection" disabled={disabled} />
            <Field id="timing" label="When it ships" placeholder="A date, if you have one" disabled={disabled} />
            <Field id="spec" label="Link to your spec or PO" placeholder="Anything the goods must match" disabled={disabled} />
          </>
        )}

        <div style={{ gridColumn: '1 / -1' }}>
          <Field id="message" label="Your petition" placeholder="Anything else we should know before we start looking…" textarea disabled={disabled} />
        </div>

        <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button type="submit" disabled={disabled} className="btn" style={{ justifyContent: 'center' }}>
            {disabled ? 'Sealing…' : door === 'quote' ? 'Seal & Send →' : 'Send the supplier to us →'}
          </button>
          {status === 'error' && (
            <p role="alert" className="mono" style={{ fontSize: 11, letterSpacing: '0.08em', color: 'var(--vermillion)' }}>
              Something went wrong. Please try again or{' '}
              <a href="mailto:contact@bytesmonks.com" className="link-ink">email us directly</a>.
            </p>
          )}
          <p className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-faint)', textAlign: 'center' }}>
            {door === 'quote' ? 'No spam. No obligation.' : 'Inspection only · no sourcing fee'}
          </p>
        </div>
      </form>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductSourcing() {
  const [door, setDoor] = useState<Door>('quote');

  return (
    <div style={{ minHeight: '100vh' }}>
      <Seo path="/product-sourcing" />
      <Navigation />

      <main id="main" tabIndex={-1}>
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="section" style={{ paddingTop: 160, paddingBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40, flexWrap: 'wrap' }}>
            <span className="eyebrow">Ars Mercatoria · Product Sourcing from China</span>
            <span style={{ flex: 1, minWidth: 40, height: 1, background: 'var(--rule-soft)' }} />
            <Link to="/" className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--ink-faint)', textTransform: 'uppercase', textDecoration: 'none' }}>
              ← Return to the scriptorium
            </Link>
          </div>

          <div className="sourcing-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 56, alignItems: 'center' }}>
            <div>
              <h1 className="hand" style={{ fontSize: 'clamp(46px, 7.4vw, 108px)', lineHeight: 1.06, fontWeight: 600, letterSpacing: '-0.01em' }}>
                We go and see the <span style={{ color: 'var(--vermillion)' }}>factory floor</span>.
              </h1>
              <p className="serif italic" style={{ fontSize: 23, color: 'var(--ink-soft)', maxWidth: 620, lineHeight: 1.5, margin: '26px 0 10px' }}>
                Product sourcing from China, for buyers in the EU and Tunisia.
              </p>
              <p className="hand" style={{ fontSize: 26, color: 'var(--ink-faint)', marginBottom: 32 }}>
                Photos from the floor, not from the brochure.
              </p>

              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <a href="#brief" className="btn" onClick={() => setDoor('quote')}>Request a Sourcing Quote →</a>
                <a href="#brief" className="btn btn-ghost" onClick={() => setDoor('inspection')}>Inspect a supplier I found</a>
              </div>
              <p className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginTop: 18 }}>
                Reply within XXIV hours · no obligation
              </p>
            </div>

            <div style={{ border: '1px solid var(--ink)', padding: 32, background: 'color-mix(in oklch, var(--bg-deep) 30%, var(--bg))' }}>
              {[
                { icon: Boxes, label: 'Goods we source', value: 'Six families' },
                { icon: Factory, label: 'Who we buy from', value: 'Factories, not phone numbers' },
                { icon: ClipboardCheck, label: 'Before you pay', value: 'Inspection, with photos' },
                { icon: Ship, label: 'Getting it to you', value: 'Freight and customs handled' },
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
        <section id="categories" className="section" style={{ paddingTop: 100 }}>
          <SectionHead
            eyebrow="I. What we source"
            plain="Six families,"
            accent="one standard."
            sub="We buy things that ship in boxes and survive the journey."
          />
          <div className="sourcing-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid var(--ink)', borderLeft: '1px solid var(--rule)' }}>
            {categories.map((c) => (
              <div key={c.id} style={{ padding: '30px 28px', borderRight: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
                  <span className="serif italic" style={{ fontSize: 30, color: 'var(--vermillion)', lineHeight: 1 }}>{c.num}</span>
                  <span className="serif" aria-hidden style={{ fontSize: 22, color: 'var(--ink-trace)' }}>{c.sigil}</span>
                </div>
                <h3 className="serif" style={{ fontSize: 25, fontWeight: 500, color: 'var(--ink)', marginTop: 14, lineHeight: 1.15 }}>{c.name}</h3>
                <div className="mono" style={{ fontSize: 9.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginTop: 8 }}>{c.subtitle}</div>
                <p className="sans" style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6, marginTop: 14 }}>{c.gloss}</p>
              </div>
            ))}
          </div>
          <p className="hand" style={{ fontSize: 25, color: 'var(--ink-faint)', marginTop: 24 }}>
            No food, no medicine, no counterfeits. Ever.
          </p>
        </section>

        {/* ── II. The Passage ──────────────────────────────────────────────── */}
        <section id="passage" className="section" style={{ paddingTop: 130 }}>
          <SectionHead
            eyebrow="II. The Passage"
            plain="Six steps,"
            accent="none skipped."
            sub="The same passage for one carton or one container."
          />
          <div style={{ position: 'relative' }}>
            <div aria-hidden style={{ position: 'absolute', left: 78, top: 0, bottom: 0, width: 1, background: 'var(--rule)' }} />
            {passage.map((r, i) => (
              <Reveal key={r.num} delay={i * 80}>
                <div className="rule-row" style={{ display: 'grid', gridTemplateColumns: '80px minmax(0, 1fr) minmax(0, 1.4fr) 240px', gap: 40, alignItems: 'start', padding: '44px 0', borderBottom: i < passage.length - 1 ? '1px solid var(--rule-soft)' : 'none', position: 'relative' }}>
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

        {/* ── III. The Assay ───────────────────────────────────────────────── */}
        <section id="assay" className="section" style={{ paddingTop: 130, paddingBottom: 100, background: 'color-mix(in oklch, var(--bg-deep) 50%, var(--bg))', maxWidth: 'unset' }}>
          <div style={{ maxWidth: 1320, margin: '0 auto' }}>
            <div className="vows-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 80, alignItems: 'start' }}>
              <Reveal>
                <div style={{ position: 'sticky', top: 120 }}>
                  <span className="eyebrow">III. The Assay</span>
                  <h2 className="hand" style={{ fontSize: 'clamp(38px, 4.6vw, 68px)', lineHeight: 1.14, marginTop: 16, fontWeight: 600 }}>
                    Nothing ships <span style={{ color: 'var(--vermillion)' }}>unseen</span>.
                  </h2>
                  <p className="hand" style={{ fontSize: 25, color: 'var(--ink-faint)', marginTop: 20, maxWidth: 340 }}>
                    If we wouldn’t accept the carton, it doesn’t leave China.
                  </p>
                  <a href="#brief" className="btn" style={{ marginTop: 28 }}>Request a Sourcing Quote →</a>
                </div>
              </Reveal>
              <Reveal delay={120}><NumberedRows items={assay} /></Reveal>
            </div>
          </div>
        </section>

        {/* ── IV. The Refusals ─────────────────────────────────────────────── */}
        <section className="section" style={{ paddingTop: 120 }}>
          <SectionHead
            eyebrow="IV. The Refusals"
            plain="Four things we"
            accent="turn down."
            sub="What a house will not do says more than what it will."
          />
          <div style={{ maxWidth: 900 }}><NumberedRows items={refusals} /></div>
        </section>

        {/* ── V. What we handle ────────────────────────────────────────────── */}
        <section className="section" style={{ paddingTop: 120 }}>
          <SectionHead
            eyebrow="V. What we handle"
            plain="Eight jobs,"
            accent="one desk."
          />
          <ul className="handled-grid" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 56px', borderTop: '1px solid var(--ink)' }}>
            {handled.map((h, i) => (
              <li key={h.t} style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: 14, alignItems: 'baseline', padding: '18px 0', borderBottom: '1px solid var(--rule-soft)' }}>
                <span className="mono" aria-hidden style={{ fontSize: 10, color: 'var(--vermillion)', letterSpacing: '0.1em' }}>{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className="serif" style={{ fontSize: 20, color: 'var(--ink)', fontWeight: 500 }}>{h.t}</span>
                  <span className="sans" style={{ display: 'block', fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.55, marginTop: 4 }}>{h.d}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── VI. Terms of Engagement ──────────────────────────────────────── */}
        <section id="terms" className="section" style={{ paddingTop: 130 }}>
          <SectionHead
            eyebrow="VI. Terms of Engagement"
            plain="Three ways"
            accent="to buy."
            sub="Choose by how much of the import you want to carry yourself."
          />
          <div className="terms-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
            {tradeModels.map((m, i) => (
              <div
                key={m.name}
                style={{
                  padding: '36px 30px', display: 'flex', flexDirection: 'column',
                  borderRight: i < tradeModels.length - 1 ? '1px solid var(--rule)' : 'none',
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
            Not sure which? Send the brief and we’ll tell you which one we’d choose.
          </p>
        </section>

        {/* ── The Balance ──────────────────────────────────────────────────── */}
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
              <span className="eyebrow" style={{ justifyContent: 'center' }}>{theBalance.eyebrow}</span>
              <h2 className="hand" style={{ fontSize: 'clamp(34px, 4.8vw, 70px)', lineHeight: 1.14, marginTop: 18, fontWeight: 600 }}>
                {theBalance.plain} <span style={{ color: 'var(--vermillion)' }}>{theBalance.accent}</span>
              </h2>
              <p className="serif" style={{ fontSize: 19, color: 'var(--ink-soft)', lineHeight: 1.6, maxWidth: 720, margin: '22px auto 0' }}>
                {theBalance.body}
              </p>
              <p className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginTop: 22 }}>
                {theBalance.micro}
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── VII. FAQ ─────────────────────────────────────────────────────── */}
        <section id="faq" className="section" style={{ paddingTop: 120 }}>
          <SectionHead
            eyebrow="VII. Questions answered"
            plain="Asked before, answered"
            accent="plainly."
          />
          <div style={{ borderTop: '1px solid var(--ink)', maxWidth: 1000 }}>
            {faqs.map((f, i) => <FaqRow key={f.q} item={f} id={`ps-faq-${i}`} />)}
          </div>
        </section>

        {/* ── VIII. Benediction ────────────────────────────────────────────── */}
        <section id="brief" className="section" style={{ paddingTop: 120, paddingBottom: 40 }}>
          <SectionHead
            eyebrow="VIII. Benediction"
            plain="Tell us what you want"
            accent="made."
            sub="One page is enough. Product, quantity, and where it ships."
          />
          <BriefForms door={door} setDoor={setDoor} />

          <div style={{ marginTop: 72 }}>
            <Ornament />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
