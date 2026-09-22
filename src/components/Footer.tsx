import { Mail, Linkedin, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Mark, Wordmark } from './Logo';
import { prefetchRoute } from '../routes';
import { CONSENT_OPEN_EVENT } from '../lib/track';

const socialLinks = [
  { href: 'mailto:contact@bytesmonks.com', Icon: Mail, label: 'Email', external: false },
  { href: 'https://www.linkedin.com/company/bytes-monks/', Icon: Linkedin, label: 'LinkedIn', external: true },
  { href: 'https://github.com/bytes-monks', Icon: Github, label: 'GitHub', external: true },
];

interface Col {
  h: string;
  /** `to` goes through the router, so '/#x' works from every page (a bare
   *  '#x' only worked on the home page). `action` renders a button. */
  l: { t: string; to?: string; action?: 'cookies' }[];
}

const columns: Col[] = [
  {
    h: 'Disciplines',
    l: [
      { t: 'AI & Machine Learning', to: '/#services' },
      { t: 'Custom Software', to: '/#services' },
      { t: 'Data Engineering', to: '/#services' },
      { t: 'DevOps & Scaling', to: '/#services' },
      { t: 'Pricing', to: '/pricing' },
    ],
  },
  {
    h: 'Sourcing',
    l: [
      { t: 'Tech talent sourcing', to: '/talent-sourcing' },
      { t: 'Hire vetted engineers', to: '/talent-sourcing#bench' },
      { t: 'Product sourcing from China', to: '/product-sourcing' },
      { t: 'Inspection & QC', to: '/product-sourcing#assay' },
      { t: 'Join the bench', to: '/talent-sourcing#join' },
    ],
  },
  {
    h: 'The House',
    l: [
      { t: 'About the Order', to: '/#about' },
      { t: 'How we work', to: '/#process' },
      { t: 'Case studies', to: '/#portfolio' },
      { t: 'Client letters', to: '/#epistles' },
      { t: 'Careers', to: '/hiring' },
      { t: 'Commission work', to: '/#contact' },
    ],
  },
  {
    h: 'Covenants',
    l: [
      { t: 'Privacy Policy', to: '/privacy' },
      { t: 'Terms of Service', to: '/terms' },
      { t: 'Refund Policy', to: '/refund' },
      { t: 'Cookie settings', action: 'cookies' },
    ],
  },
];

export default function Footer() {
  // Frozen at build time: the prerendered HTML and the client must agree, or
  // React discards the whole prerender on New Year's Day.
  const currentYear = __BUILD_YEAR__;

  return (
    <footer aria-label="Site" style={{ borderTop: '1px solid var(--rule)', padding: '48px 48px 40px', maxWidth: 1320, margin: '80px auto 0', position: 'relative', zIndex: 3 }}>
      <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.3fr repeat(4, 1fr)', gap: 40 }}>
        <div>
          <span aria-hidden style={{ color: 'var(--ink)', display: 'inline-block' }}>
            <Mark size={64} />
          </span>
          <div className="serif" style={{ fontSize: 22, marginTop: 14, fontWeight: 500 }}>
            <Wordmark height={22} />
          </div>
          <div className="serif italic" style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 6 }}>
            Ordo Bytorum · Tunis · MMXXI—
          </div>
          <p className="serif italic" style={{ fontSize: 14, color: 'var(--ink-faint)', marginTop: 16, maxWidth: 280 }}>
            We build and run software, AI and cloud systems from Tunis. We also source engineers and goods.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            {socialLinks.map(({ href, Icon, label, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                aria-label={label}
                style={{ width: 38, height: 38, border: '1px solid var(--rule)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-soft)', transition: 'all 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--vermillion)'; e.currentTarget.style.color = 'var(--vermillion)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--rule)'; e.currentTarget.style.color = 'var(--ink-soft)'; }}
              >
                <Icon className="w-4 h-4" aria-hidden />
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.h}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 18 }}>{col.h}</div>
            {col.l.map((item) => {
              const sty: React.CSSProperties = { display: 'block', fontSize: 15, color: 'var(--ink)', padding: '6px 0', textDecoration: 'none', transition: 'color 0.2s' };
              const onEnter = (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = 'var(--vermillion)');
              const onLeave = (e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = 'var(--ink)');
              return item.to ? (
                <Link
                  key={item.t}
                  to={item.to}
                  className="serif"
                  style={sty}
                  onMouseEnter={(e) => { onEnter(e); prefetchRoute(item.to!); }}
                  onFocus={() => prefetchRoute(item.to!)}
                  onMouseLeave={onLeave}
                >
                  {item.t}
                </Link>
              ) : (
                <button
                  key={item.t}
                  type="button"
                  className="serif"
                  style={{ ...sty, background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', font: 'inherit', fontSize: 15 }}
                  onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
                >
                  {item.t}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 56, paddingTop: 24, borderTop: '1px solid var(--rule-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', color: 'var(--ink-faint)', textTransform: 'uppercase' }}>
          © {currentYear} Bytes Monks · Ordo Bytorum
        </div>
        <div className="serif italic" style={{ fontSize: 15, color: 'var(--ink-soft)' }}>Ora et codica.</div>
      </div>
    </footer>
  );
}
