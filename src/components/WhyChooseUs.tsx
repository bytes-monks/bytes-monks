import { Reveal } from './monastic';

const vows = [
  { t: 'Senior hands only', d: 'No juniors paid to fumble. Every project is handled by experienced engineers who have been burned before.' },
  { t: 'AI as first principle', d: 'Intelligence is not a feature we bolt on. It is a substrate we design around from the first meeting.' },
  { t: 'Architecture that ages well', d: 'We build for the version of your company three years from now. Rewrites are a failure of design, not of time.' },
  { t: 'Rapid, not rushed', d: 'Fast iteration cycles with honest feedback. Urgency without panic.' },
  { t: 'Clear speech at all times', d: 'No black boxes, no weasel words. You always know exactly where the work stands.' },
  { t: 'We stay', d: 'Partnerships outlast contracts. If your product grows, so does our involvement.' },
  { t: 'Code read as prose', d: 'If the next engineer cannot read it aloud, we rewrite it. Documentation is a kindness, not a chore.' },
  { t: 'Vigil through the night', d: "Production doesn't care what time it is. Neither do we when something is burning." },
];

export default function WhyChooseUs() {
  return (
    <section className="section" style={{ paddingTop: 140, paddingBottom: 100, background: 'color-mix(in oklch, var(--bg-deep) 50%, var(--bg))', maxWidth: 'unset' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div className="vows-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 80, alignItems: 'start' }}>
          <Reveal>
            <div style={{ position: 'sticky', top: 120 }}>
              <span className="eyebrow">IV. Our Vows</span>
              <h2 className="serif" style={{ fontSize: 'clamp(40px, 5vw, 74px)', lineHeight: 0.95, marginTop: 18, fontWeight: 500, letterSpacing: '-0.02em' }}>
                Eight vows <br /><span className="italic" style={{ color: 'var(--vermillion)' }}>we keep</span>.
              </h2>
              <p className="serif italic" style={{ fontSize: 18, color: 'var(--ink-soft)', marginTop: 24, maxWidth: 340 }}>
                Spoken when we are hired. Re-read before every release. Broken by no one in the order.
              </p>
              <a href="#contact" className="btn" style={{ marginTop: 28 }}>Start Your Project →</a>
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
