import { Reveal } from './monastic';

const sponsors = [
  { name: 'Rakam AI', logo: 'RA', image: '/logos/rakam_ai.webp', url: 'https://rakam.ai/' },
  { name: 'DM Nova', logo: 'DM', image: '/logos/dmnova.webp', url: 'https://dmnova.tech/' },
  { name: 'Khotoua', logo: 'KH', image: '/logos/khotoua.webp', url: 'https://khotoua.com/' },
  { name: 'Jetfi Systems', logo: 'JS', image: null, url: 'https://jetfisystems.de/' },
  { name: 'NLKit', logo: 'NK', image: null, url: 'https://www.nlkit.com/' },
  { name: 'elBaladiya.tn', logo: 'EB', image: null, url: 'https://elbaladiya.tn/home' },
  { name: 'AI Xperts', logo: 'AX', image: '/logos/ai_xperts.avif', url: 'https://www.ai-xperts.io/' },
];

function SponsorCard({ sponsor }: { sponsor: (typeof sponsors)[0] }) {
  return (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12, padding: '14px 22px',
        border: '1px solid var(--rule)', background: 'var(--bg)', textDecoration: 'none',
        minWidth: 'max-content', transition: 'all 0.25s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--ink)'; e.currentTarget.style.boxShadow = '4px 4px 0 var(--vermillion)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--rule)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{ width: 36, height: 36, border: '1px solid var(--rule)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0, background: 'var(--bg-deep)' }}>
        {sponsor.image ? (
          <img src={sponsor.image} alt="" width={108} height={108} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 3 }} />
        ) : (
          <span aria-hidden className="serif italic" style={{ fontSize: 13, fontWeight: 600, color: 'var(--vermillion)' }}>{sponsor.logo}</span>
        )}
      </div>
      <span className="serif" style={{ fontSize: 17, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{sponsor.name}</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export default function Sponsors() {
  // A static row: the old two-track marquee moved forever with no pause for
  // keyboard or touch users (WCAG 2.2.2), made every house a Tab stop four
  // times and slid focused links out of view.
  return (
    <section className="section" style={{ paddingTop: 80, paddingBottom: 80 }}>
      <Reveal>
        <div style={{ marginBottom: 40 }}>
          <span className="eyebrow">Patrons of the Order</span>
          <h2 className="serif" style={{ fontSize: 'clamp(30px, 4vw, 52px)', lineHeight: 1, marginTop: 16, fontWeight: 500, letterSpacing: '-0.01em' }}>
            Houses that <span className="italic" style={{ color: 'var(--vermillion)' }}>trust the order</span>.
          </h2>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 16, listStyle: 'none', padding: 0, margin: 0 }}>
          {sponsors.map((sponsor) => (
            <li key={sponsor.name}>
              <SponsorCard sponsor={sponsor} />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
