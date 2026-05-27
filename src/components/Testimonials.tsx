import { Reveal } from './monastic';

const epistles = [
  {
    quote:
      'Bytes Monks handles all of our infrastructure. The technical depth and business understanding they bring is exceptional.',
    author: 'Iheb Lourimi',
    role: 'Chief Executive',
    house: 'DM Nova',
    photo: '/clients/iheb_lourimi.jfif',
  },
  {
    quote:
      'Working with them felt like having a true technical partner. They delivered our platform on time and exceeded every expectation.',
    author: 'Seif Esslam Bensib',
    role: 'Lead Game Developer',
    house: 'Khotoua',
    photo: null,
  },
  {
    quote:
      'The quality of code and architecture they produced set a new standard for our engineering team. Highly recommended.',
    author: 'Mootaz Zemmel',
    role: 'Software Engineer',
    house: 'Elbaladya.tn',
    photo: '/clients/mootaz_zemmel.jfif',
  },
];

export default function Testimonials() {
  return (
    <section id="epistles" className="section" style={{ paddingTop: 140 }}>
      <Reveal>
        <div style={{ marginBottom: 72 }}>
          <span className="eyebrow">VI. Epistles</span>
          <h2 className="serif" style={{ fontSize: 'clamp(44px, 6vw, 92px)', lineHeight: 0.95, marginTop: 18, fontWeight: 500, letterSpacing: '-0.02em' }}>
            Letters kept under <span className="italic" style={{ color: 'var(--vermillion)' }}>seal</span>.
          </h2>
        </div>
      </Reveal>

      <div className="epistles-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
        {epistles.map((e, i) => (
          <Reveal key={e.author} delay={i * 140}>
            <article style={{ background: 'var(--bg)', border: '1px solid var(--rule)', padding: '40px 36px 32px', position: 'relative', minHeight: 360, display: 'flex', flexDirection: 'column' }}>
              {/* Corner fold */}
              <div style={{ position: 'absolute', top: 0, right: 0, width: 40, height: 40, background: 'linear-gradient(225deg, var(--rule-soft) 0 50%, transparent 50%)' }} aria-hidden />

              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 20 }}>
                Epistola {['I', 'II', 'III'][i]} · to the Brothers
              </div>

              <div className="serif italic" style={{ fontSize: 80, color: 'var(--vermillion)', lineHeight: 0.6, marginBottom: -10, fontWeight: 700 }}>&ldquo;</div>

              <p className="serif" style={{ fontSize: 20, lineHeight: 1.5, color: 'var(--ink)', flex: 1 }}>{e.quote}</p>

              <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--rule-soft)', display: 'flex', alignItems: 'center', gap: 14 }}>
                {e.photo ? (
                  <img src={e.photo} alt={e.author} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                ) : (
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--ink)', color: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontSize: 18, fontWeight: 600, flexShrink: 0 }}>
                    {e.author.split(' ').map((n) => n[0]).join('')}
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <div className="serif" style={{ fontSize: 18, fontWeight: 500, color: 'var(--ink)' }}>{e.author}</div>
                  <div className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginTop: 3 }}>{e.role} · {e.house}</div>
                </div>
                <div className="seal" style={{ width: 40, height: 40, fontSize: 14 }}>⁂</div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
