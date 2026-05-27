import { useEffect, useRef, useState } from 'react';
import { Mark } from './Logo';
import { Sigil, Reveal } from './monastic';

type LineKind = 'prompt' | 'comment' | 'out' | 'key';
interface TermLine { text: string; kind: LineKind; pause?: number; break?: boolean }

function renderLine(text: string, kind: LineKind) {
  if (kind === 'prompt') {
    return (
      <>
        <span className="prompt">monk@scriptorium</span>:<span style={{ color: 'oklch(0.7 0.06 220)' }}>~/vow</span>${' '}
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
  const [state, setState] = useState({ li: 0, ci: 0, done: false });
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

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

const lines: TermLine[] = [
  { text: 'cat /etc/monks/vows.txt', kind: 'prompt', pause: 380, break: true },
  { text: 'reading manuscript...', kind: 'comment', pause: 260, break: true },
  { text: 'I. Build only what will outlast its builder.', kind: 'out', pause: 180 },
  { text: 'II. Let every function have a single intention.', kind: 'out', pause: 180 },
  { text: 'III. Comment as scripture — sparingly, truthfully.', kind: 'out', pause: 180 },
  { text: 'IV. Optimize for the reader, not the author.', kind: 'out', pause: 340, break: true },
  { text: '→ 4 vows loaded. ready.', kind: 'key', pause: 1200, break: true },
  { text: 'deploy --blessing', kind: 'prompt', pause: 600, break: true },
];

const marginalia = [
  '✦ Festina lente — make haste, slowly.',
  '⁂ Ora et codica — pray and code.',
  '❖ Ex silentio, systema — from silence, the system.',
  '✚ Memento refactor — remember to refactor.',
  '⁕ Deus est in testibus — god is in the tests.',
  '⚜ Verba volant, scripta manent — words fly, code remains.',
];

export default function Hero() {
  const [restart, setRestart] = useState(0);

  return (
    <section id="top" style={{ minHeight: '100vh', position: 'relative', paddingTop: 110, zIndex: 3 }}>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48, flexWrap: 'wrap' }}>
            <span className="eyebrow">Anno Codicis · Vol. IX</span>
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
              <h1 className="serif inkbleed" style={{ fontSize: 'clamp(52px, 9vw, 140px)', lineHeight: 0.88, fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 36 }}>
                We are the
                <br />
                <span className="italic" style={{ color: 'var(--vermillion)', fontWeight: 500 }}>quiet craftsmen</span>
                <br />
                of your
                <br />
                software.
              </h1>
            </Reveal>

            <Reveal delay={220}>
              <p className="serif italic" style={{ fontSize: 22, lineHeight: 1.55, maxWidth: 560, color: 'var(--ink-soft)', marginBottom: 40 }}>
                An order of engineers in the old tradition — patient, disciplined, and
                obsessed with the work itself. We build systems that age like stone, not
                like software.
              </p>
            </Reveal>

            <Reveal delay={320}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 56, flexWrap: 'wrap' }}>
                <a href="#contact" className="btn">Book Free Consultation →</a>
                <a href="#portfolio" className="btn btn-ghost">View Our Work</a>
              </div>
            </Reveal>

            <Reveal delay={420}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, paddingTop: 28, borderTop: '1px solid var(--rule-soft)' }}>
                {[
                  { roman: 'L+', label: 'Projects delivered' },
                  { roman: 'V+', label: 'Years in the order' },
                  { roman: 'C%', label: 'Client satisfaction' },
                ].map((s, i) => (
                  <div key={i} style={{ padding: '0 20px', borderRight: i < 2 ? '1px solid var(--rule-soft)' : 'none', paddingLeft: i === 0 ? 0 : 20 }}>
                    <div className="serif italic" style={{ fontSize: 48, lineHeight: 1, color: 'var(--vermillion)', fontWeight: 500 }}>{s.roman}</div>
                    <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', color: 'var(--ink-faint)', textTransform: 'uppercase', marginTop: 10 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right: sigil + scriptorium terminal */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, position: 'relative' }}>
            <Reveal delay={280}>
              <div className="flicker" style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
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
              <div className="scriptorium" onClick={() => setRestart((r) => r + 1)} style={{ cursor: 'pointer' }} title="click to re-read">
                <div className="scriptorium-head">
                  <span className="dot" style={{ background: 'var(--vermillion)' }} />
                  <span className="dot" style={{ background: 'var(--gilt)' }} />
                  <span className="dot" style={{ background: 'var(--sage)' }} />
                  <span style={{ marginLeft: 'auto' }}>scriptorium.sh — /codex</span>
                </div>
                <TypedLines key={restart} lines={lines} />
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Scrolling marginalia */}
      <div style={{ position: 'relative', borderTop: '1px solid var(--rule-soft)', borderBottom: '1px solid var(--rule-soft)', padding: '18px 0', marginTop: 40, overflow: 'hidden', background: 'color-mix(in oklch, var(--bg-deep) 40%, transparent)' }}>
        <div className="ticker-track serif italic" style={{ fontSize: 22, color: 'var(--ink-soft)' }}>
          {[...marginalia, ...marginalia].map((m, i) => (
            <span key={i}>{m}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
