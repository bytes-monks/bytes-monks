import { useState } from 'react';
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

const sponsorsReversed = [...sponsors].reverse();

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
          <img src={sponsor.image} alt={sponsor.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 3 }} />
        ) : (
          <span className="serif italic" style={{ fontSize: 13, fontWeight: 600, color: 'var(--vermillion)' }}>{sponsor.logo}</span>
        )}
      </div>
      <span className="serif" style={{ fontSize: 17, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{sponsor.name}</span>
    </a>
  );
}

export default function Sponsors() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="section" style={{ paddingTop: 80, paddingBottom: 80, overflow: 'hidden' }}>
      <Reveal>
        <div style={{ marginBottom: 48, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <span className="eyebrow">Patrons of the Order</span>
            <h2 className="serif" style={{ fontSize: 'clamp(30px, 4vw, 52px)', lineHeight: 1, marginTop: 16, fontWeight: 500, letterSpacing: '-0.01em' }}>
              Houses that <span className="italic" style={{ color: 'var(--vermillion)' }}>trust the order</span>.
            </h2>
          </div>
          <p className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>Hover to pause</p>
        </div>
      </Reveal>

      <div
        style={{ position: 'relative' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 96, background: 'linear-gradient(to right, var(--bg), transparent)', zIndex: 10, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 96, background: 'linear-gradient(to left, var(--bg), transparent)', zIndex: 10, pointerEvents: 'none' }} />

        <div style={{ overflow: 'hidden', padding: '6px 0' }}>
          <div className="sp-scroll" style={{ display: 'flex', gap: 16, width: 'max-content', animationPlayState: isPaused ? 'paused' : 'running' }}>
            {[...sponsors, ...sponsors].map((sponsor, index) => (
              <SponsorCard key={index} sponsor={sponsor} />
            ))}
          </div>
        </div>

        <div style={{ overflow: 'hidden', padding: '6px 0', marginTop: 12 }}>
          <div className="sp-scroll-rev" style={{ display: 'flex', gap: 16, width: 'max-content', animationPlayState: isPaused ? 'paused' : 'running' }}>
            {[...sponsorsReversed, ...sponsorsReversed].map((sponsor, index) => (
              <SponsorCard key={index} sponsor={sponsor} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes sp-scroll      { 0% { transform: translateX(0); }    100% { transform: translateX(-50%); } }
        @keyframes sp-scroll-rev  { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .sp-scroll     { animation: sp-scroll 28s linear infinite; }
        .sp-scroll-rev { animation: sp-scroll-rev 28s linear infinite; }
      `}</style>
    </section>
  );
}
