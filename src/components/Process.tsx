import { Reveal } from './monastic';

const rule = [
  {
    num: 'I',
    title: 'Audiamus',
    en: 'We understand',
    body: 'We read the problem before we write anything. Then we write down what we heard, so you can tell us where we got it wrong.',
    practice: 'Discovery · architecture mapping · written RFC',
  },
  {
    num: 'II',
    title: 'Disponamus',
    en: 'We architect',
    body: 'We draw the system before we build it. Every boundary and dependency gets a name and a written reason for being there.',
    practice: 'System design · data modeling · ADRs',
  },
  {
    num: 'III',
    title: 'Scribamus',
    en: 'We build',
    body: 'We write the code slowly, on purpose. Tests before conclusions, reviews before merges — and you see every piece as it ships.',
    practice: 'Iterative builds · rigorous tests · clean code',
  },
  {
    num: 'IV',
    title: 'Custodiamus',
    en: 'We keep vigil',
    body: "Launch isn't the end. We keep watching, and we pick up the phone at 3am when production is on fire.",
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
            Every project passes through all four, in order. Skipping a step always costs
            more later.
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
