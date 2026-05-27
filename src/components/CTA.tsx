import { Reveal } from './monastic';

export default function CTA() {
  return (
    <section className="section" style={{ paddingTop: 140 }}>
      <Reveal>
        <div style={{ border: '1px solid var(--ink)', background: 'color-mix(in oklch, var(--bg-deep) 30%, var(--bg))', position: 'relative' }}>
          {/* Corner ornaments */}
          {[
            { top: 12, left: 12 }, { top: 12, right: 12 },
            { bottom: 12, left: 12 }, { bottom: 12, right: 12 },
          ].map((p, i) => (
            <span key={i} style={{
              position: 'absolute', ...p, width: 20, height: 20,
              borderTop: 'top' in p ? '1px solid var(--vermillion)' : 'none',
              borderBottom: 'bottom' in p ? '1px solid var(--vermillion)' : 'none',
              borderLeft: 'left' in p ? '1px solid var(--vermillion)' : 'none',
              borderRight: 'right' in p ? '1px solid var(--vermillion)' : 'none',
            }} />
          ))}

          <div className="cta-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'stretch' }}>
            <div style={{ padding: 'clamp(32px, 5vw, 56px) clamp(28px, 5vw, 64px)' }}>
              <span className="eyebrow">Ready to build?</span>
              <h2 className="serif" style={{ fontSize: 'clamp(38px, 5vw, 72px)', lineHeight: 0.95, marginTop: 20, fontWeight: 500, letterSpacing: '-0.02em' }}>
                Let's create something
                <br />
                <span className="italic" style={{ color: 'var(--vermillion)' }}>exceptional together.</span>
              </h2>
              <p className="serif italic" style={{ fontSize: 20, color: 'var(--ink-soft)', marginTop: 24, maxWidth: 480, lineHeight: 1.5 }}>
                Tell us about your project. We'll respond within a day with a plan tailored to your goals.
              </p>
            </div>

            <div className="cta-side" style={{ borderLeft: '1px solid var(--rule)', background: 'color-mix(in oklch, var(--bg-deep) 50%, var(--bg))', padding: '56px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16, minWidth: 280 }}>
              <a href="#contact" className="btn" style={{ justifyContent: 'center' }}>Schedule a Call →</a>
              <a href="mailto:contact@bytesmonks.com" className="btn btn-ghost" style={{ justifyContent: 'center' }}>Send us an email</a>
              <p className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-faint)', textAlign: 'center', marginTop: 4 }}>
                XXIV-hour response · no commitment
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
