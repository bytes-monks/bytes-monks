import { useState } from 'react';
import { Reveal } from './monastic';

const disciplines = [
  {
    num: 'I',
    sigil: '✚',
    name: 'Ars Intelligentia',
    subtitle: 'AI & Machine Learning',
    oath: 'To summon intelligence into matter, and keep it faithful.',
    gloss:
      'Intelligent systems that learn, adapt, and automate complex workflows — from LLM-powered agents and CV-matching pipelines to production-grade automation that gives your business a measurable edge.',
    works: ['Custom AI systems', 'LLM integrations', 'Chatbots & agents', 'CV-to-role matching', 'Workflow automation'],
  },
  {
    num: 'II',
    sigil: '⚜',
    name: 'Ars Fabricandi',
    subtitle: 'Custom Software Development',
    oath: 'To make things that work, and keep working.',
    gloss:
      'Full-stack systems tailored to the grain of your business — from lean MVPs to enterprise-grade SaaS platforms, APIs, and mobile apps engineered to scale without friction.',
    works: ['Web applications', 'SaaS platforms', 'Backend architecture', 'API development', 'Mobile apps'],
  },
  {
    num: 'III',
    sigil: '❖',
    name: 'Ars Datarum',
    subtitle: 'Data Engineering',
    oath: 'To render the unseen legible.',
    gloss:
      'Pipelines, warehouses, and vector stores that turn raw streams into analytics your board can read and your models can learn from.',
    works: ['Data pipelines', 'Vector search', 'Analytics systems', 'AI-driven insights', 'Data warehousing'],
  },
  {
    num: 'IV',
    sigil: '⁕',
    name: 'Ars Sustinendi',
    subtitle: 'DevOps & Scaling',
    oath: 'To keep the vigil when others sleep.',
    gloss:
      'Automated, observable, resilient infrastructure — zero-downtime deploys, proper CI/CD, and cloud topology that survives a Tuesday.',
    works: ['Cloud deployment', 'Docker & Kubernetes', 'CI/CD pipelines', 'Performance tuning', 'Monitoring & logging'],
  },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const d = disciplines[active];

  return (
    <section id="services" className="section" style={{ paddingTop: 120 }}>
      <Reveal>
        <div style={{ marginBottom: 56 }}>
          <span className="eyebrow">II. The Four Disciplines</span>
          <h2 className="serif" style={{ fontSize: 'clamp(44px, 6vw, 92px)', lineHeight: 0.95, marginTop: 18, fontWeight: 500, letterSpacing: '-0.02em' }}>
            Four arts, one <span className="italic" style={{ color: 'var(--vermillion)' }}>rule</span>.
          </h2>
        </div>
      </Reveal>

      <div className="disciplines-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.3fr)', gap: 0, borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
        {/* Left: list */}
        <div style={{ borderRight: '1px solid var(--rule)' }}>
          {disciplines.map((disc, i) => (
            <button
              key={disc.num}
              onClick={() => setActive(i)}
              style={{
                display: 'block', width: '100%', textAlign: 'left', padding: '32px 36px',
                background: active === i ? 'color-mix(in oklch, var(--vermillion) 6%, transparent)' : 'transparent',
                borderBottom: i < disciplines.length - 1 ? '1px solid var(--rule-soft)' : 'none',
                borderLeft: active === i ? '4px solid var(--vermillion)' : '4px solid transparent',
                color: 'inherit', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.35s ease',
              }}
              onMouseEnter={(e) => { if (active !== i) e.currentTarget.style.background = 'color-mix(in oklch, var(--ink) 4%, transparent)'; }}
              onMouseLeave={(e) => { if (active !== i) e.currentTarget.style.background = 'transparent'; }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
                <span className="serif italic" style={{ fontSize: 36, color: 'var(--vermillion)', minWidth: 48, lineHeight: 1 }}>{disc.num}</span>
                <div style={{ flex: 1 }}>
                  <div className="serif" style={{ fontSize: 28, lineHeight: 1.1, fontWeight: 500, color: 'var(--ink)' }}>{disc.name}</div>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginTop: 8 }}>{disc.subtitle}</div>
                </div>
                <span className="serif" style={{ fontSize: 28, color: active === i ? 'var(--vermillion)' : 'var(--ink-trace)', transition: 'color 0.3s' }}>{disc.sigil}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Right: detail panel */}
        <div key={active} style={{ padding: '48px 56px', position: 'relative', background: 'color-mix(in oklch, var(--bg-deep) 20%, var(--bg))', animation: 'inkbleed 0.6s cubic-bezier(.2,.8,.2,1) both' }}>
          <div className="serif italic" style={{ position: 'absolute', bottom: 20, right: 28, fontSize: 200, color: 'color-mix(in oklch, var(--vermillion) 10%, transparent)', lineHeight: 0.8, pointerEvents: 'none', userSelect: 'none', zIndex: 0 }}>
            {d.num}
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 20 }}>Oath of this Discipline</div>
            <div className="serif italic" style={{ fontSize: 30, lineHeight: 1.3, color: 'var(--ink)', marginBottom: 40, maxWidth: 480 }}>“{d.oath}”</div>

            <p className="sans" style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-soft)', maxWidth: 520, marginBottom: 36 }}>{d.gloss}</p>

            <div style={{ borderTop: '1px solid var(--rule-soft)', paddingTop: 24 }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 18 }}>Works of this Hand</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 24px' }}>
                {d.works.map((w, i) => (
                  <div key={w} className="serif" style={{ fontSize: 18, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span className="mono" style={{ fontSize: 10, color: 'var(--vermillion)' }}>{String(i + 1).padStart(2, '0')}</span>
                    <span>{w}</span>
                  </div>
                ))}
              </div>
            </div>

            <a href="#contact" className="link-ink serif italic" style={{ display: 'inline-block', marginTop: 40, fontSize: 18 }}>
              Consult the brothers on this matter →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
