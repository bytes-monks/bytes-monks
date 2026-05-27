import { Mail, Linkedin, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Mark, Wordmark } from './Logo';

const socialLinks = [
  { href: 'mailto:contact@bytesmonks.com', Icon: Mail, label: 'Email', external: false },
  { href: 'https://www.linkedin.com/company/bytes-monks/', Icon: Linkedin, label: 'LinkedIn', external: true },
  { href: 'https://github.com/bytes-monks', Icon: Github, label: 'GitHub', external: true },
];

interface Col {
  h: string;
  l: { t: string; to?: string; href?: string }[];
}

const columns: Col[] = [
  {
    h: 'Disciplines',
    l: [
      { t: 'AI & Machine Learning', href: '#services' },
      { t: 'Custom Software', href: '#services' },
      { t: 'Data Engineering', href: '#services' },
      { t: 'DevOps & Scaling', href: '#services' },
      { t: 'Tariff of the Order', to: '/pricing' },
    ],
  },
  {
    h: 'The House',
    l: [
      { t: 'About the Order', href: '#about' },
      { t: 'The Rule', href: '#process' },
      { t: 'Chronicles', href: '#portfolio' },
      { t: 'Epistles', href: '#epistles' },
      { t: 'Take Vows · Careers', to: '/hiring' },
    ],
  },
  {
    h: 'Covenants',
    l: [
      { t: 'Privacy Covenant', to: '/privacy' },
      { t: 'Rule of Service', to: '/terms' },
      { t: 'Refund Covenant', to: '/refund' },
      { t: 'Commission work', href: '#contact' },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ borderTop: '1px solid var(--rule)', padding: '48px 48px 40px', maxWidth: 1320, margin: '80px auto 0', position: 'relative', zIndex: 3 }}>
      <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 48 }}>
        <div>
          <span style={{ color: 'var(--ink)', display: 'inline-block' }}>
            <Mark size={64} />
          </span>
          <div className="serif" style={{ fontSize: 22, marginTop: 14, fontWeight: 500 }}>
            <Wordmark height={22} />
          </div>
          <div className="serif italic" style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 6 }}>
            Ordo Bytorum · Tunis · MMXXI—
          </div>
          <p className="serif italic" style={{ fontSize: 14, color: 'var(--ink-faint)', marginTop: 16, maxWidth: 280 }}>
            Quiet craftsmen of scalable software, AI systems, and the occasional miracle.
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
                <Icon className="w-4 h-4" />
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
                <Link key={item.t} to={item.to} className="serif" style={sty} onMouseEnter={onEnter} onMouseLeave={onLeave}>{item.t}</Link>
              ) : (
                <a key={item.t} href={item.href} className="serif" style={sty} onMouseEnter={onEnter} onMouseLeave={onLeave}>{item.t}</a>
              );
            })}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 56, paddingTop: 24, borderTop: '1px solid var(--rule-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', color: 'var(--ink-faint)', textTransform: 'uppercase' }}>
          © {currentYear} Ordo Bytorum · All rights, left aligned.
        </div>
        <div className="serif italic" style={{ fontSize: 15, color: 'var(--ink-soft)' }}>Ora et codica.</div>
      </div>
    </footer>
  );
}
