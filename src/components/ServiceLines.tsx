import { Link } from 'react-router-dom';
import { Reveal } from './monastic';
import { disciplines } from '../data/talentSourcing';
import { categories } from '../data/productSourcing';

interface Line {
  latin: string;
  title: string;
  line: string;
  tags: string[];
  to: string;
  cta: string;
}

/**
 * Home-page bridge into the two sourcing lines.
 *
 * Deliberately not the bordered box + right-hand CTA rail that CTA.tsx uses —
 * it sits a couple of sections above that, and repeating the shell made the
 * page read as three stacked calls to action.
 *
 * The eyebrow is un-numbered on purpose: numbering it would force renumbering
 * Epistles (VI) and Benediction (VII) across three other components.
 */
export default function ServiceLines() {
  const lines: Line[] = [
    {
      latin: 'Ars Vocandi',
      title: 'Talent sourcing',
      line: 'We find engineers, and an engineer vets every one of them.',
      tags: disciplines.map((d) => d.subtitle),
      to: '/talent-sourcing',
      cta: 'Tech talent sourcing',
    },
    {
      latin: 'Ars Mercatoria',
      title: 'Product sourcing',
      line: 'We find factories in China, and inspect the goods before you pay.',
      tags: categories.map((c) => c.subtitle),
      to: '/product-sourcing',
      cta: 'Product sourcing',
    },
  ];

  return (
    <section id="service-lines" className="section" style={{ paddingTop: 110, paddingBottom: 20 }}>
      <Reveal>
        <div style={{ marginBottom: 36 }}>
          <span className="eyebrow">Also of the Order · Sourcing</span>
          <h2 className="serif" style={{ fontSize: 'clamp(34px, 4.4vw, 62px)', lineHeight: 1.02, marginTop: 16, fontWeight: 500, letterSpacing: '-0.02em' }}>
            We also find <span className="italic" style={{ color: 'var(--vermillion)' }}>people and products</span>.
          </h2>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div className="lines-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
          {lines.map((l, i) => (
            <div
              key={l.to}
              className="lines-cell"
              style={{ padding: 'clamp(28px, 3.4vw, 44px)', borderRight: i === 0 ? '1px solid var(--rule)' : 'none', display: 'flex', flexDirection: 'column' }}
            >
              <div lang="la" className="mono" style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--vermillion)' }}>{l.latin}</div>
              <h3 className="serif" style={{ fontSize: 32, fontWeight: 500, color: 'var(--ink)', marginTop: 10, lineHeight: 1.1 }}>{l.title}</h3>
              <p className="serif italic" style={{ fontSize: 19, color: 'var(--ink-soft)', marginTop: 14, lineHeight: 1.5, maxWidth: 440 }}>{l.line}</p>

              <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 6, listStyle: 'none', padding: 0, margin: '22px 0 26px' }}>
                {l.tags.map((t) => (
                  <li key={t} className="mono" style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-soft)', border: '1px solid var(--rule)', padding: '5px 9px' }}>
                    {t}
                  </li>
                ))}
              </ul>

              <Link to={l.to} className="link-ink serif italic" style={{ marginTop: 'auto', alignSelf: 'flex-start', fontSize: 19 }}>
                {l.cta} →
              </Link>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
