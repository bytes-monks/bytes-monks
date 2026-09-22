import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mark } from './Logo';
import { Sigil, Reveal } from './monastic';

type LineKind = 'prompt' | 'comment' | 'out' | 'key';
interface TermLine { text: string; kind: LineKind; pause?: number; break?: boolean }

function renderLine(text: string, kind: LineKind) {
  if (kind === 'prompt') {
    return (
      <>
        <span className="prompt">monk@scriptorium</span>:<span style={{ color: 'oklch(0.7 0.06 220)' }}>~/order</span>${' '}
        <span>{text}</span>
      </>
    );
  }
  if (kind === 'comment') return <span className="term-comment"># {text}</span>;
  if (kind === 'out') return <span style={{ opacity: 0.85 }}>{text}</span>;
  if (kind === 'key') return <span className="term-key">{text}</span>;
  return <span>{text}</span>;
}

function TypedLines({ lines, speed = 22 }: { lines: TermLine[]; speed?: number }) {
  // Starts empty to match the prerender; reduced-motion visitors get the
  // finished text on mount instead of a 12-second typing loop.
  const [state, setState] = useState({ li: 0, ci: 0, done: false });
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setState({ li: lines.length, ci: 0, done: true });
    }
  }, [lines.length]);

  useEffect(() => {
    if (state.done) return;
    const cur = lines[state.li];
    if (!cur) { setState((s) => ({ ...s, done: true })); return; }
    const text = cur.text;
    if (state.ci >= text.length) {
      timer.current = setTimeout(() => setState((s) => ({ li: s.li + 1, ci: 0, done: false })), cur.pause || 280);
    } else {
      timer.current = setTimeout(() => setState((s) => ({ ...s, ci: s.ci + 1 })), speed + (Math.random() * 30 - 8));
    }
    return () => clearTimeout(timer.current);
  }, [state, lines, speed]);

  return (
    <>
      {lines.slice(0, state.li).map((l, i) => (
        <div key={i} style={{ marginBottom: l.break ? 10 : 0 }}>{renderLine(l.text, l.kind)}</div>
      ))}
      {state.li < lines.length && (
        <div>
          {renderLine(lines[state.li].text.slice(0, state.ci), lines[state.li].kind)}
          <span className="cursor" style={{ height: '0.9em', width: 7 }} />
        </div>
      )}
    </>
  );
}

// The terminal types the offer index, so the decoration also answers
// "what do you do". It is aria-hidden: the same facts are in the links below.
const lines: TermLine[] = [
  { text: 'ls ./disciplines', kind: 'prompt', pause: 300 },
  { text: 'ai/   software/   data/   devops/', kind: 'out', pause: 380, break: true },
  { text: 'ls ./also', kind: 'prompt', pause: 300 },
  { text: 'talent-sourcing/   product-sourcing/', kind: 'out', pause: 380, break: true },
  { text: 'head -1 vows.txt', kind: 'prompt', pause: 300 },
  { text: 'I. Build only what will outlast its builder.', kind: 'out', pause: 340, break: true },
  { text: '→ 6 crafts loaded. ready.', kind: 'key', pause: 1200 },
];

const doors = [
  { latin: 'Ars Fabricandi', title: 'Software & AI', line: 'We build it, then run it.', to: '/#services' },
  { latin: 'Ars Vocandi', title: 'Talent sourcing', line: 'Engineers, vetted by engineers.', to: '/talent-sourcing' },
  { latin: 'Ars Mercatoria', title: 'China sourcing', line: 'Goods inspected before you pay.', to: '/product-sourcing' },
];

const marginalia = [
  '✦ Festina lente — make haste, slowly.',
  '⁂ Ora et codica — pray and code.',
  '❖ Ex silentio, systema — from silence, the system.',
  '✚ Memento refactor — remember to refactor.',
  '⁕ Deus est in testibus — god is in the tests.',
  '⚜ Verba volant, scripta manent — words fly, code remains.',
];

/** Sets data-offscreen while the element is out of view; CSS pauses its loops. */
function useOffscreenPause<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.removeAttribute('data-offscreen');
      else el.setAttribute('data-offscreen', '');
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

export default function Hero() {
  const sectionRef = useOffscreenPause<HTMLElement>();

  return (
    <section ref={sectionRef} id="top" style={{ minHeight: '100vh', position: 'relative', paddingTop: 110, zIndex: 3 }}>
      {/* Floating manuscript year */}
      <div
        className="serif italic"
        style={{
          position: 'absolute', right: 40, bottom: 40, fontSize: 180,
          color: 'color-mix(in oklch, var(--ink-trace) 28%, transparent)',
          lineHeight: 1, pointerEvents: 'none', fontWeight: 400, userSelect: 'none', zIndex: 0,
        }}
        aria-hidden
      >
        MMXXVI
      </div>

      <div className="section" style={{ paddingTop: 40, paddingBottom: 40, position: 'relative', zIndex: 2 }}>
        {/* Eyebrow */}
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
            <span className="eyebrow">Tunis · Anno MMXXI</span>
            <span style={{ flex: 1, minWidth: 40, height: 1, background: 'var(--rule-soft)' }} />
            <span className="eyebrow" style={{ color: 'var(--sage)' }}>
              <span style={{ width: 6, height: 6, background: 'var(--sage)', borderRadius: '50%', display: 'inline-block', marginRight: 6 }} />
              Scriptorium Open
            </span>
          </div>
        </Reveal>

        <div className="hero-grid" style={{ display: 'grid', alignItems: 'start', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.9fr)', gap: 64 }}>
          {/* Left */}
          <div>
            <Reveal delay={80}>
              <h1 className="serif inkbleed" style={{ fontSize: 'clamp(46px, 6.7vw, 96px)', lineHeight: 0.92, fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 24 }}>
                We build your software, then <span className="italic" style={{ color: 'var(--vermillion)', fontWeight: 500 }}>keep it running</span>.
              </h1>
            </Reveal>

            <Reveal delay={220}>
              <p className="serif italic" style={{ fontSize: 'clamp(19px, 1.6vw, 22px)', lineHeight: 1.5, maxWidth: 560, color: 'var(--ink-soft)', marginBottom: 28 }}>
                AI agents, web apps, data pipelines and managed cloud, from engineers in Tunis.
                We also find engineers, and source goods from China.
              </p>
            </Reveal>

            <Reveal delay={320}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 48, flexWrap: 'wrap' }}>
                <a href="#contact" className="btn" data-cta="hero">Start a Project →</a>
                <a href="#portfolio" className="btn btn-ghost">See Our Work</a>
              </div>
            </Reveal>

            <Reveal delay={420}>
              <nav aria-label="What we do" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(160px, 100%), 1fr))', gap: 0, paddingTop: 24, borderTop: '1px solid var(--rule-soft)' }}>
                {doors.map((d, i) => (
                  <Link key={d.to} to={d.to} data-cta={`hero-door-${i + 1}`} style={{ padding: '4px 20px 12px', paddingLeft: i === 0 ? 0 : 20, borderRight: i < doors.length - 1 ? '1px solid var(--rule-soft)' : 'none', textDecoration: 'none', color: 'inherit' }}>
                    <span lang="la" className="mono" style={{ display: 'block', fontSize: 10, letterSpacing: '0.18em', color: 'var(--vermillion)', textTransform: 'uppercase' }}>{d.latin}</span>
                    <span className="serif" style={{ display: 'block', fontSize: 22, color: 'var(--ink)', marginTop: 6 }}>{d.title} →</span>
                    <span className="sans" style={{ display: 'block', fontSize: 13, color: 'var(--ink-soft)', marginTop: 4 }}>{d.line}</span>
                  </Link>
                ))}
              </nav>
            </Reveal>
          </div>

          {/* Right: sigil + scriptorium terminal */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, position: 'relative' }}>
            <Reveal delay={280}>
              <div className="flicker" aria-hidden style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                <Sigil size={280} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'var(--vermillion)', pointerEvents: 'none', lineHeight: 0 }}>
                  <Mark size={72} variant="mark" />
                </div>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, calc(-50% + 68px))', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
                  <div className="mono" style={{ fontSize: 9, letterSpacing: '0.3em', color: 'var(--ink-faint)' }}>ORDO · BYTORVM</div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={380}>
              <div className="scriptorium" aria-hidden>
                <div className="scriptorium-head">
                  <span className="dot" style={{ background: 'var(--vermillion)' }} />
                  <span className="dot" style={{ background: 'var(--gilt)' }} />
                  <span className="dot" style={{ background: 'var(--sage)' }} />
                  <span style={{ marginLeft: 'auto' }}>scriptorium.sh — /codex</span>
                </div>
                <div style={{ minHeight: 190 }}>
                  <TypedLines lines={lines} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Scrolling marginalia */}
      <div className="ticker" style={{ position: 'relative', borderTop: '1px solid var(--rule-soft)', borderBottom: '1px solid var(--rule-soft)', padding: '18px 0', marginTop: 40, overflow: 'hidden', background: 'color-mix(in oklch, var(--bg-deep) 40%, transparent)' }}>
        <div className="ticker-track serif italic" style={{ fontSize: 22, color: 'var(--ink-soft)' }}>
          {/* The second copy exists only to make the loop seamless. */}
          {[...marginalia, ...marginalia].map((m, i) => (
            <span key={i} aria-hidden={i >= marginalia.length || undefined}>{m}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
