import { Reveal } from './monastic';

const rule = [
  {
    num: 'I',
    title: 'Audiamus',
    en: 'We understand',
    body: 'Before a single glyph is written, we read your problem aloud. Deep business analysis to uncover your core challenges — we map constraints, intentions, and the decade this thing must survive.',
    practice: 'Discovery · architecture mapping · written RFC',
  },
  {
    num: 'II',
    title: 'Disponamus',
    en: 'We architect',
    body: 'Architecture as intention. Clean, scalable design patterns that set the foundation for growth. Every boundary, contract, and dependency is weighed, named, and documented before it is correct.',
    practice: 'System design · data modeling · ADRs',
  },
  {
    num: 'III',
    title: 'Scribamus',
    en: 'We build',
    body: 'The code is written slowly, on purpose. High-quality implementation with rigorous testing. Tests before conclusions, reviews before merges, delivered iteratively with full visibility and collaborative feedback.',
    practice: 'Iterative builds · rigorous tests · clean code',
  },
  {
    num: 'IV',
    title: 'Custodiamus',
    en: 'We keep vigil',
    body: 'After launch, the work begins again. We monitor, we refactor, we tune for maximum efficiency — and we remain reachable at 3am when the build is on fire. The Rule does not end at delivery.',
    practice: 'Observability · performance · long-term partnership',
  },
];

export default function Process() {
  return (
    <section id="process" className="section" style={{ paddingTop: 140 }}>
      <Reveal>
        <div style={{ marginBottom: 64 }}>
          <span className="eyebrow">III. The Rule of the Order</span>
          <h2 className="serif" style={{ fontSize: 'clamp(44px, 6vw, 92px)', lineHeight: 0.95, marginTop: 18, fontWeight: 500, letterSpacing: '-0.02em' }}>
            Four precepts, <span className="italic" style={{ color: 'var(--vermillion)' }}>kept in order</span>.
          </h2>
          <p className="serif italic" style={{ fontSize: 20, color: 'var(--ink-soft)', marginTop: 20, maxWidth: 600 }}>
            Every project begins here and passes through each precept in turn. We do not skip
            steps; the Rule has outlived every shortcut.
          </p>
        </div>
      </Reveal>

      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 78, top: 0, bottom: 0, width: 1, background: 'var(--rule)' }} aria-hidden />

        {rule.map((r, i) => (
          <Reveal key={r.num} delay={i * 100}>
            <div className="rule-row" style={{ display: 'grid', gridTemplateColumns: '80px minmax(0, 1fr) minmax(0, 1.4fr) 240px', gap: 40, alignItems: 'start', padding: '48px 0', borderBottom: i < rule.length - 1 ? '1px solid var(--rule-soft)' : 'none', position: 'relative' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--bg)', border: '2px solid var(--vermillion)', position: 'absolute', left: 67, top: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--vermillion)' }} />
                </div>
                <div className="serif italic" style={{ fontSize: 56, color: 'var(--vermillion)', lineHeight: 1, fontWeight: 500 }}>{r.num}</div>
              </div>

              <div>
                <h3 className="serif" style={{ fontSize: 40, lineHeight: 1, fontWeight: 500, color: 'var(--ink)', marginBottom: 8 }}>{r.title}</h3>
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
  );
}
