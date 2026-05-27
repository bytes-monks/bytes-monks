import { Reveal, Ornament } from './monastic';

const ledger = [
  { k: 'Founded', v: 'MMXXI' },
  { k: 'Scriptoria', v: 'Tunis · Remote' },
  { k: 'Disciplines', v: 'AI · Code · Data · Cloud' },
  { k: 'Projects delivered', v: 'Fifty & rising' },
  { k: 'Client satisfaction', v: 'One hundred per cent' },
  { k: 'The vigil', v: 'Kept · day & night' },
];

export default function About() {
  return (
    <section id="about" className="section" style={{ paddingTop: 80 }}>
      <Reveal>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 64, gap: 32, flexWrap: 'wrap' }}>
          <div>
            <span className="eyebrow">I. On the Order</span>
            <h2 className="serif" style={{ fontSize: 'clamp(44px, 6vw, 92px)', lineHeight: 0.95, marginTop: 18, fontWeight: 500, letterSpacing: '-0.02em' }}>
              An order sworn to <span className="italic" style={{ color: 'var(--vermillion)' }}>discipline</span>,
              <br />not to deadlines.
            </h2>
          </div>
          <div className="mono hidden md:block" style={{ fontSize: 11, color: 'var(--ink-faint)', letterSpacing: '0.16em', textTransform: 'uppercase', writingMode: 'vertical-rl', transform: 'rotate(180deg)', alignSelf: 'flex-start' }}>
            Folio I · recto
          </div>
        </div>
      </Reveal>

      <div className="grid items-start" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 80 }}>
        <Reveal delay={120}>
          <p className="serif dropcap" style={{ fontSize: 22, lineHeight: 1.6, color: 'var(--ink)' }}>
            Bytes Monks is a software and AI engineering house founded on a single heresy of
            our age: that the craft still matters. We combine technical excellence with strategic
            thinking — reading the problem before writing the answer, weighing each decision
            against the decade it must survive. We do not just build software; we become your
            long-term technical partners, and we measure ourselves in what remains useful after
            we are gone.
          </p>
          <div style={{ marginTop: 36, display: 'flex', alignItems: 'center', gap: 18 }}>
            <div className="seal">BM</div>
            <div>
              <div className="serif italic" style={{ fontSize: 18, color: 'var(--ink)' }}>Sealed by the Scriptorium</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--ink-faint)', letterSpacing: '0.16em', textTransform: 'uppercase', marginTop: 4 }}>
                Tunis · Anno Domini MMXXI
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={220}>
          <div style={{ borderLeft: '1px solid var(--rule)', paddingLeft: 40 }}>
            {ledger.map((r, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 24, padding: '18px 0', borderBottom: i < ledger.length - 1 ? '1px solid var(--rule-soft)' : 'none' }}>
                <div className="mono" style={{ fontSize: 10, color: 'var(--ink-faint)', letterSpacing: '0.16em', textTransform: 'uppercase', paddingTop: 4 }}>{r.k}</div>
                <div className="serif italic" style={{ fontSize: 20, color: 'var(--ink)' }}>{r.v}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div style={{ marginTop: 100 }}>
        <Ornament />
      </div>
    </section>
  );
}
