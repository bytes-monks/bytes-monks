import { Reveal } from './monastic';
import { Mark } from './Logo';

const chronicles = [
  {
    anno: 'MMXXIV',
    title: 'The Migration of the Cloud',
    category: 'Ars Sustinendi',
    verse: 'A faltering infrastructure, moved stone by stone to a new foundation.',
    problem:
      'Legacy infrastructure on OVH lacked scalability, resilience, and modern deployment capabilities, putting production reliability at risk.',
    solution:
      'Migrated the entire infrastructure to Azure with automated scalability, a robust backup process, and CI/CD pipelines via GitHub Actions for seamless multi-environment deployments. Also migrated the production database to PostgreSQL with query optimizations.',
    impact:
      'Up to 80% improvement in database query performance, zero-downtime deployments across environments, and a fully automated, resilient cloud infrastructure.',
    measure: 'LXXX',
    measureUnit: '% faster queries',
  },
  {
    anno: 'MMXXIII',
    title: 'A Platform for Young Readers',
    category: 'Ars Fabricandi',
    verse: "A children's learning platform, kept alive and growing for its young pupils.",
    problem:
      "A growing children's education application needed reliable infrastructure, a secure admin control panel, and a scalable game backend to support its expanding user base.",
    solution:
      "Designed and maintained the full cloud infrastructure, implemented automated backup processes, built a comprehensive administration and control panel, and developed and maintained the game's backend systems.",
    impact:
      'Stable, scalable platform supporting continuous growth, with full operational visibility through the admin panel and reliable game experiences for young learners.',
    measure: 'C',
    measureUnit: '% uptime',
  },
  {
    anno: 'MMXXV',
    title: 'The Expert Agent',
    category: 'Ars Intelligentia',
    verse: "An artificial scribe, reasoning over its master's own books.",
    problem:
      'Users needed a personalized AI assistant capable of reasoning over their own unique knowledge bases, with integrated payments, transcription, and analytics — all delivered reliably.',
    solution:
      "Designed and implemented an AI Co-Pilot functioning as an expert agent over users' custom knowledge databases. Delivered CI/CD pipelines, automated database backups, a transcription service, online payment integration, and an analytics module.",
    impact:
      'A fully production-ready AI platform with end-to-end automation, enabling users to interact with their own knowledge through a powerful, reliable, and extensible agent.',
    measure: 'AI',
    measureUnit: 'full-stack agent',
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="section" style={{ paddingTop: 140 }}>
      <Reveal>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap', marginBottom: 72 }}>
          <div>
            <span className="eyebrow">V. The Chronicles</span>
            <h2 className="serif" style={{ fontSize: 'clamp(44px, 6vw, 92px)', lineHeight: 0.95, marginTop: 18, fontWeight: 500, letterSpacing: '-0.02em' }}>
              Works already <span className="italic" style={{ color: 'var(--vermillion)' }}>entered into the book</span>.
            </h2>
          </div>
          <p className="serif italic" style={{ fontSize: 18, color: 'var(--ink-soft)', maxWidth: 280 }}>
            Three entries from a longer volume. Real problems, real solutions, measurable impact.
          </p>
        </div>
      </Reveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
        {chronicles.map((c, i) => (
          <Reveal key={c.title} delay={i * 120}>
            <article
              className="folio"
              style={{ background: 'var(--bg)', border: '1px solid var(--ink)', position: 'relative', boxShadow: '6px 6px 0 var(--rule)' }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '10px 10px 0 var(--vermillion)')}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '6px 6px 0 var(--rule)')}
            >
              {/* Header band */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 36px', borderBottom: '1px solid var(--ink)', background: 'color-mix(in oklch, var(--ink) 5%, var(--bg))' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <span className="serif italic" style={{ fontSize: 24, color: 'var(--vermillion)', fontWeight: 700 }}>{String(i + 1).padStart(2, '0')}.</span>
                  <span className="mono" style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>{c.category}</span>
                </div>
                <span className="serif italic" style={{ fontSize: 16, color: 'var(--ink-soft)' }}>Anno {c.anno}</span>
              </div>

              <div className="folio-body" style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 0 }}>
                {/* Left: heraldic panel */}
                <div style={{ padding: '36px', borderRight: '1px solid var(--rule)', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 300, background: 'color-mix(in oklch, var(--vermillion) 4%, var(--bg))' }}>
                  <div>
                    <h3 className="serif" style={{ fontSize: 34, lineHeight: 1.05, fontWeight: 500, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{c.title}</h3>
                    <p className="serif italic" style={{ fontSize: 16, color: 'var(--ink-soft)', marginTop: 14, lineHeight: 1.5 }}>{c.verse}</p>
                  </div>

                  <div style={{ marginTop: 36, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <div>
                      <div className="serif italic" style={{ fontSize: 72, color: 'var(--vermillion)', lineHeight: 0.9, fontWeight: 500 }}>{c.measure}</div>
                      <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginTop: 4 }}>{c.measureUnit}</div>
                    </div>
                    <div style={{ width: 54, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--vermillion)', border: '1px solid var(--vermillion)', borderRadius: '50%' }}>
                      <Mark size={38} variant="mark" />
                    </div>
                  </div>
                </div>

                {/* Right: PSI */}
                <div className="psi-grid" style={{ padding: '36px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32 }}>
                  {[
                    { k: 'Problem', v: c.problem, c: 'var(--ink-faint)' },
                    { k: 'Solution', v: c.solution, c: 'var(--ink-soft)' },
                    { k: 'Impact', v: c.impact, c: 'var(--ink)' },
                  ].map((col, j) => (
                    <div key={col.k}>
                      <div className="mono" style={{ fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--vermillion)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span className="serif italic">{['α', 'β', 'γ'][j]}</span>
                        {col.k}
                      </div>
                      <p className="serif" style={{ fontSize: 15, lineHeight: 1.55, color: col.c }}>{col.v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
