import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { Mark } from './Logo';
import Navigation from './Navigation';

interface Section {
  title: string;
  content: ReactNode | ReactNode[];
}

interface LegalLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: Section[];
}

const ROMAN: [number, string][] = [
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];
function toRoman(n: number): string {
  let out = '';
  for (const [v, s] of ROMAN) {
    while (n >= v) { out += s; n -= v; }
  }
  return out;
}

const covenants = [
  { to: '/privacy', book: 'Book I', title: 'Privacy Covenant', blurb: 'What we gather, and how we keep it.' },
  { to: '/terms', book: 'Book II', title: 'Rule of Service', blurb: 'The compact between the Order and you.' },
  { to: '/refund', book: 'Book III', title: 'Refund Covenant', blurb: 'How coin is returned when work does not serve.' },
];

export default function LegalLayout({ title, subtitle, lastUpdated, sections }: LegalLayoutProps) {
  const { pathname } = useLocation();
  const numbered = sections.map((s, i) => ({ ...s, num: toRoman(i + 1) }));
  const [active, setActive] = useState(numbered[0]?.num ?? 'I');

  useEffect(() => {
    const onScroll = () => {
      let cur = numbered[0]?.num ?? 'I';
      for (const s of numbered) {
        const el = document.getElementById('sec-' + s.num);
        if (el && el.getBoundingClientRect().top < 140) cur = s.num;
      }
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navigation />

      <main>
      {/* Hero */}
      <section className="section" style={{ paddingTop: 160, paddingBottom: 60, position: 'relative', zIndex: 3 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 36, flexWrap: 'wrap' }}>
          <span className="eyebrow">{subtitle} · The Covenants</span>
          <span style={{ flex: 1, minWidth: 40, height: 1, background: 'var(--rule-soft)' }} />
          <Link to="/" className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--ink-faint)', textTransform: 'uppercase', textDecoration: 'none' }}>← Return to the scriptorium</Link>
        </div>
        <h1 className="serif" style={{ fontSize: 'clamp(48px, 9vw, 136px)', lineHeight: 0.88, fontWeight: 500, letterSpacing: '-0.025em', marginBottom: 28 }}>
          {title.split(' ').map((w, i) => (
            <span key={i} className={i % 2 ? 'italic' : ''} style={i % 2 ? { color: 'var(--vermillion)' } : undefined}>{w} </span>
          ))}
        </h1>
        <p className="serif italic" style={{ fontSize: 22, color: 'var(--ink-soft)', maxWidth: 760, lineHeight: 1.5, marginBottom: 24 }}>
          Set down in plain hand by the Brothers — in language you can actually read.
        </p>
        <span className="mono" style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>Last revised · {lastUpdated}</span>
      </section>

      {/* Body */}
      <section className="section" style={{ paddingTop: 40, paddingBottom: 120 }}>
        <div className="legal-grid" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 80, alignItems: 'start' }}>
          {/* Marginalia ToC */}
          <aside className="legal-toc hidden lg:block" style={{ position: 'sticky', top: 140, alignSelf: 'start' }}>
            <div className="mono" style={{ fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 16, borderBottom: '1px solid var(--rule-soft)', paddingBottom: 10 }}>
              Index of Clauses
            </div>
            <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {numbered.map((s) => (
                <li key={s.num}>
                  <a href={'#sec-' + s.num} style={{
                    display: 'flex', gap: 10, padding: '7px 0', textDecoration: 'none',
                    color: active === s.num ? 'var(--vermillion)' : 'var(--ink-soft)',
                    fontFamily: 'EB Garamond, serif', fontSize: 15, lineHeight: 1.3,
                    borderLeft: active === s.num ? '2px solid var(--vermillion)' : '2px solid transparent',
                    paddingLeft: 14, transition: 'all 0.2s',
                  }}>
                    <span className="italic" style={{ width: 28, flexShrink: 0, color: active === s.num ? 'var(--vermillion)' : 'var(--ink-faint)' }}>{s.num}</span>
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          {/* Main manuscript column */}
          <div style={{ maxWidth: 720 }}>
            {numbered.map((s, i) => (
              <article key={s.num} id={'sec-' + s.num} style={{ marginBottom: 56, paddingTop: i === 0 ? 0 : 8, scrollMarginTop: 120 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginBottom: 16 }}>
                  <span className="serif italic" style={{ fontSize: 48, color: 'var(--vermillion)', lineHeight: 0.85, fontWeight: 500 }}>{s.num}</span>
                  <h2 className="serif" style={{ fontSize: 30, fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.1 }}>{s.title}</h2>
                </div>
                <div style={{ paddingLeft: 40, borderLeft: '1px solid var(--rule-soft)' }}>
                  {Array.isArray(s.content) ? (
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                      {s.content.map((item, j) => (
                        <li key={j} className="serif" style={{ fontSize: 18, color: 'var(--ink-soft)', lineHeight: 1.6, display: 'flex', gap: 12 }}>
                          <span style={{ color: 'var(--vermillion)', flexShrink: 0 }}>⁜</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="serif" style={{ fontSize: 19, color: 'var(--ink-soft)', lineHeight: 1.65 }}>{s.content}</p>
                  )}
                </div>
              </article>
            ))}

            {/* Colophon */}
            <div style={{ marginTop: 80, paddingTop: 40, borderTop: '1px solid var(--ink)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 40, flexWrap: 'wrap' }}>
              <div>
                <span className="eyebrow">Colophon</span>
                <p className="serif italic" style={{ fontSize: 19, color: 'var(--ink-soft)', marginTop: 14, maxWidth: 420, lineHeight: 1.5 }}>
                  Set down in plain hand by the Brothers. Questions or petitions may be sent to contact@bytesmonks.com — we read every letter.
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--vermillion)', display: 'flex', justifyContent: 'center' }}><Mark size={72} variant="mark" /></div>
                <div className="mono" style={{ fontSize: 9, letterSpacing: '0.28em', color: 'var(--ink-faint)', textTransform: 'uppercase', marginTop: 10 }}>Ordo · Bytorum</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Companion covenants */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 80 }}>
        <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 32 }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 24 }}>Companion Covenants</div>
          <div className="covenant-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {covenants.filter((l) => l.to !== pathname).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                style={{ padding: '28px', border: '1px solid var(--rule)', textDecoration: 'none', color: 'inherit', display: 'block', transition: 'all 0.25s', background: 'var(--bg)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--ink)'; e.currentTarget.style.boxShadow = '4px 4px 0 var(--vermillion)'; e.currentTarget.style.transform = 'translate(-2px,-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--rule)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translate(0,0)'; }}
              >
                <div className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--vermillion)', marginBottom: 12 }}>{l.book}</div>
                <h3 className="serif" style={{ fontSize: 26, fontWeight: 500, marginBottom: 6 }}>{l.title}</h3>
                <p className="serif italic" style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.5 }}>{l.blurb}</p>
                <div className="serif italic" style={{ fontSize: 14, color: 'var(--vermillion)', marginTop: 14 }}>Read →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--rule)', padding: '32px 48px', maxWidth: 1320, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <span className="mono" style={{ fontSize: 10, color: 'var(--ink-faint)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>© {new Date().getFullYear()} Ordo Bytorum</span>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <Link to="/privacy" className="link-ink serif" style={{ fontSize: 14 }}>Privacy</Link>
          <Link to="/terms" className="link-ink serif" style={{ fontSize: 14 }}>Terms</Link>
          <Link to="/refund" className="link-ink serif" style={{ fontSize: 14 }}>Refund</Link>
          <Link to="/pricing" className="link-ink serif" style={{ fontSize: 14 }}>Tariff</Link>
        </div>
      </footer>
    </>
  );
}
