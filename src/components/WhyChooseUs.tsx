import { Reveal } from './monastic';

const vows = [
  { t: 'Senior hands only', d: 'No juniors learning on your budget. Everyone who touches your code has been burned before.' },
  { t: 'AI as first principle', d: 'We plan for AI from the first meeting. Bolting it on afterwards never works well.' },
  { t: 'Architecture that ages well', d: 'We build for your company three years from now. A rewrite usually means someone guessed wrong early.' },
  { t: 'Rapid, not rushed', d: 'We ship in short cycles and tell you the moment something slips.' },
  { t: 'Clear speech at all times', d: 'No black boxes. You always know where the work stands.' },
  { t: 'We stay', d: 'If your product grows, we stay and grow with it.' },
  { t: 'Code read as prose', d: "If the next engineer can't read it, we rewrite it. Docs are a kindness, not a chore." },
  { t: 'A vigil with stated hours', d: 'Every support plan names its response time. We keep to it.' },
];

export default function WhyChooseUs() {
  return (
    <section className="section" style={{ paddingTop: 140, paddingBottom: 100, background: 'color-mix(in oklch, var(--bg-deep) 50%, var(--bg))', maxWidth: 'unset' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div className="vows-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 80, alignItems: 'start' }}>
          {/* The sticky sits on the grid item itself, so it has the whole row to travel. */}
          <Reveal style={{ position: 'sticky', top: 120 }}>
            <div>
              <span className="eyebrow">V. Why Us · Our Vows</span>
              <h2 className="serif" style={{ fontSize: 'clamp(40px, 5vw, 74px)', lineHeight: 0.95, marginTop: 18, fontWeight: 500, letterSpacing: '-0.02em' }}>
                Eight vows{' '}<br /><span className="italic" style={{ color: 'var(--vermillion)' }}>we keep</span>.
              </h2>
              <p className="serif italic" style={{ fontSize: 18, color: 'var(--ink-soft)', marginTop: 24, maxWidth: 340 }}>
                We say these when you hire us. We re-read them before every release.
              </p>
              <a href="#contact" className="btn" data-cta="vows" style={{ marginTop: 28 }}>Start a Project →</a>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div>
              {vows.map((v, i) => (
                <div
                  key={i}
                  className="reveal-row"
                  style={{ display: 'grid', gridTemplateColumns: '60px 1fr', alignItems: 'start', gap: 24, padding: '28px 0 28px 40px', borderBottom: i < vows.length - 1 ? '1px solid var(--rule-soft)' : 'none', position: 'relative', transition: 'padding 0.35s' }}
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
  );
}
