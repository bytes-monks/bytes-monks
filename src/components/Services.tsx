import { useState } from 'react';
import { Reveal } from './monastic';
import { coreDisciplines } from '../data/disciplines';

const detail = [
  {
    oath: 'To make machines think, and keep them honest.',
    gloss:
      'We build LLM agents, CV-matching pipelines, and automation that runs without a babysitter.',
    works: ['Custom AI systems', 'LLM integrations', 'Chatbots & agents', 'CV-to-role matching', 'Workflow automation'],
  },
  {
    oath: 'To make things that work, and keep working.',
    gloss:
      'Web apps, SaaS platforms, APIs, and mobile apps. We start with the smallest version that\'s actually useful.',
    works: ['Web applications', 'SaaS platforms', 'Backend architecture', 'API development', 'Mobile apps'],
  },
  {
    oath: 'To render the unseen legible.',
    gloss:
      'Pipelines, warehouses, and vector stores. Raw data goes in, numbers your team can actually read come out.',
    works: ['Data pipelines', 'Vector search', 'Analytics systems', 'AI-driven insights', 'Data warehousing'],
  },
  {
    oath: 'To keep the vigil, and keep it well.',
    gloss:
      'Deploys that need no maintenance window, and CI/CD that actually runs. Production doesn\'t care what time it is.',
    works: ['Cloud deployment', 'Docker & Kubernetes', 'CI/CD pipelines', 'Performance tuning', 'Monitoring & logging'],
  },
];

// Latin name, numeral and sigil come from the shared list; only the oath,
// gloss and works are specific to the services section.
const disciplines = coreDisciplines.map((d, i) => ({ ...d, ...detail[i] }));

export default function Services() {
  // Every panel is rendered on every render; only `hidden` toggles. The old
  // component mounted just the active panel, so three of the four services
  // never reached the prerendered HTML. Server and client both start at 0,
  // so this is hydration-safe.
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="section" style={{ paddingTop: 120 }}>
      <Reveal>
        <div style={{ marginBottom: 56 }}>
          <span className="eyebrow">II. Services · The Four Disciplines</span>
          <h2 className="serif" style={{ fontSize: 'clamp(44px, 6vw, 92px)', lineHeight: 0.95, marginTop: 18, fontWeight: 500, letterSpacing: '-0.02em' }}>
            Four arts, one <span className="italic" style={{ color: 'var(--vermillion)' }}>rule</span>.
          </h2>
        </div>
      </Reveal>

      <div className="disciplines-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.3fr)', gap: 0, borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
        {disciplines.map((disc, i) => [
          <button
            key={`b-${disc.id}`}
            type="button"
            className="disc-btn"
            id={`disc-btn-${disc.id}`}
            aria-expanded={active === i}
            aria-controls={`disc-panel-${disc.id}`}
            onClick={() => setActive(i)}
            style={{
              display: 'block', width: '100%', textAlign: 'left', padding: 'clamp(20px, 4vw, 32px) clamp(16px, 5vw, 36px)',
              background: active === i ? 'color-mix(in oklch, var(--vermillion) 6%, transparent)' : 'transparent',
              border: 'none',
              borderBottom: i < disciplines.length - 1 ? '1px solid var(--rule-soft)' : 'none',
              borderRight: '1px solid var(--rule)',
              borderLeft: active === i ? '4px solid var(--vermillion)' : '4px solid transparent',
              color: 'inherit', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.35s ease',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
              <span className="serif italic" aria-hidden style={{ fontSize: 36, color: 'var(--vermillion)', minWidth: 48, lineHeight: 1 }}>{disc.num}</span>
              <span style={{ flex: 1 }}>
                <span lang="la" className="serif" style={{ display: 'block', fontSize: 28, lineHeight: 1.1, fontWeight: 500, color: 'var(--ink)' }}>{disc.name}</span>
                <span className="mono" style={{ display: 'block', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginTop: 8 }}>{disc.subtitle}</span>
              </span>
              <span className="serif" aria-hidden style={{ fontSize: 28, color: active === i ? 'var(--vermillion)' : 'var(--ink-trace)', transition: 'color 0.3s' }}>{disc.sigil}</span>
            </span>
          </button>,
          <div
            key={`p-${disc.id}`}
            id={`disc-panel-${disc.id}`}
            role="region"
            aria-labelledby={`disc-btn-${disc.id}`}
            className="disc-panel"
            hidden={active !== i}
            style={{ padding: 'clamp(24px, 6vw, 48px) clamp(16px, 5vw, 56px)', position: 'relative', background: 'color-mix(in oklch, var(--bg-deep) 20%, var(--bg))', animation: 'inkbleed 0.6s cubic-bezier(.2,.8,.2,1) both' }}
          >
            <div className="serif italic" aria-hidden style={{ position: 'absolute', bottom: 20, right: 28, fontSize: 200, color: 'color-mix(in oklch, var(--vermillion) 10%, transparent)', lineHeight: 0.8, pointerEvents: 'none', userSelect: 'none', zIndex: 0 }}>
              {disc.num}
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 20 }}>Oath of this Discipline</div>
              <div className="serif italic" style={{ fontSize: 30, lineHeight: 1.3, color: 'var(--ink)', marginBottom: 40, maxWidth: 480 }}>“{disc.oath}”</div>

              <p className="sans" style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-soft)', maxWidth: 520, marginBottom: 36 }}>{disc.gloss}</p>

              <div style={{ borderTop: '1px solid var(--rule-soft)', paddingTop: 24 }}>
                <h3 className="mono" style={{ fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 18, fontWeight: 400 }}>{disc.subtitle}: what we build</h3>
                <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '10px 24px', listStyle: 'none', padding: 0 }}>
                  {disc.works.map((w, j) => (
                    <li key={w} className="serif" style={{ fontSize: 18, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span className="mono" aria-hidden style={{ fontSize: 10, color: 'var(--vermillion)' }}>{String(j + 1).padStart(2, '0')}</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a href="#contact" className="link-ink serif italic" data-cta={`service-${disc.id}`} style={{ display: 'inline-block', marginTop: 40, fontSize: 18 }}>
                Ask us about {disc.subtitle} →
              </a>
            </div>
          </div>,
        ])}
      </div>
    </section>
  );
}
