import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Mark, Wordmark } from './Logo';
import { prefetchRoute } from '../routes';

// Plain labels for wayfinding; the monastic name stays as a caption in the
// mobile menu, and in every section eyebrow.
const navLinks = [
  { name: 'Services', latin: 'The Disciplines', to: '/#services' },
  { name: 'Work', latin: 'Chronicles', to: '/#portfolio' },
  { name: 'Talent sourcing', latin: 'Ars Vocandi', to: '/talent-sourcing', page: true },
  { name: 'China sourcing', latin: 'Ars Mercatoria', to: '/product-sourcing', page: true },
  { name: 'Pricing', latin: 'The Tariff', to: '/pricing', page: true },
  { name: 'Careers', latin: 'Take Vows', to: '/hiring', page: true },
];

/** The header CTA points at the form built for the page the visitor is on. */
const CTAS: Record<string, { label: string; short: string; to: string }> = {
  '/talent-sourcing': { label: 'Send a Brief', short: 'Brief', to: '/talent-sourcing#brief' },
  '/product-sourcing': { label: 'Get a Quote', short: 'Quote', to: '/product-sourcing#brief' },
  '/hiring': { label: 'See Open Roles', short: 'Roles', to: '/hiring#positions' },
};
const DEFAULT_CTA = { label: 'Commission Work', short: 'Contact', to: '/#contact' };

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const cta = CTAS[pathname] ?? DEFAULT_CTA;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Any navigation closes the menu.
  useEffect(() => { setIsMobileMenuOpen(false); }, [pathname, hash]);

  // While open: lock page scroll, close on Escape (focus back to the burger),
  // and close when keyboard focus leaves the menu.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        burgerRef.current?.focus();
      }
    };
    const onFocusOut = (e: FocusEvent) => {
      const next = e.relatedTarget as Node | null;
      if (next && menuRef.current && !menuRef.current.contains(next)) setIsMobileMenuOpen(false);
    };
    // A tap outside the menu closes it. (A fixed backdrop can't do this: the
    // nav's backdrop-filter makes it the containing block for fixed children.)
    const onPointer = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setIsMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    const menu = menuRef.current;
    menu?.addEventListener('focusout', onFocusOut);
    return () => {
      root.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
      menu?.removeEventListener('focusout', onFocusOut);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      aria-label="Main"
      className="nav"
      style={{ borderBottomColor: isScrolled ? 'var(--rule)' : 'transparent' }}
    >
      <a href="#main" className="skip-link">Skip to content</a>

      {/* Logo lockup */}
      <Link to="/" aria-label="Bytes Monks, home" style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--ink)', textDecoration: 'none', minWidth: 0, textTransform: 'uppercase' }}>
        <span className="flicker" style={{ color: 'var(--ink)' }}>
          <Mark size={38} />
        </span>
        <span aria-hidden style={{ display: 'inline-flex', flexDirection: 'column', lineHeight: 1 }}>
          <Wordmark height={16} />
          <span className="mono" style={{ fontSize: 8, letterSpacing: '0.28em', color: 'var(--ink-faint)', textTransform: 'uppercase', marginTop: 3 }}>
            Ordo · Bytorvm
          </span>
        </span>
      </Link>

      {/* Desktop nav */}
      <div className="nav-links hidden min-[1180px]:flex items-center" style={{ gap: 24 }}>
        {navLinks.map((link) =>
          link.page ? (
            <NavLink
              key={link.name}
              to={link.to}
              onMouseEnter={() => prefetchRoute(link.to)}
              onFocus={() => prefetchRoute(link.to)}
            >
              {link.name}
            </NavLink>
          ) : (
            <Link key={link.name} to={link.to}>{link.name}</Link>
          )
        )}
      </div>

      <div ref={menuRef} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* CTA: full label from 640px, a one-word label on phones */}
        <Link to={cta.to} data-cta="nav" className="btn nav-cta" style={{ padding: '10px 16px' }}>
          <span className="hidden sm:inline">{cta.label}</span>
          <span className="sm:hidden">{cta.short}</span>
        </Link>

        {/* Mobile menu button */}
        <button
          ref={burgerRef}
          className="min-[1180px]:hidden"
          style={{ color: 'var(--ink-soft)', background: 'transparent', border: 'none', cursor: 'pointer', padding: 11, marginRight: -11, lineHeight: 0 }}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label="Menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
        </button>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="min-[1180px]:hidden"
                style={{ position: 'absolute', top: '100%', left: 0, right: 0, overflow: 'hidden', background: 'var(--bg)', borderBottom: '1px solid var(--rule)' }}
              >
                <div style={{ padding: '8px 24px 20px', display: 'flex', flexDirection: 'column', maxHeight: 'calc(100dvh - 70px)', overflowY: 'auto', overscrollBehavior: 'contain' }}>
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.to}
                      className="serif"
                      aria-current={link.page && pathname === link.to ? 'page' : undefined}
                      style={{ fontSize: 20, color: 'var(--ink)', textDecoration: 'none', padding: '12px 0', borderBottom: '1px solid var(--rule-soft)', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}
                    >
                      {link.name}
                      <span className="mono" aria-hidden style={{ fontSize: 10, letterSpacing: '0.18em', color: 'var(--ink-faint)', textTransform: 'uppercase' }}>{link.latin}</span>
                    </Link>
                  ))}
                  <Link to="/#about" className="serif" style={{ fontSize: 20, color: 'var(--ink)', textDecoration: 'none', padding: '12px 0', borderBottom: '1px solid var(--rule-soft)', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
                    About
                    <span className="mono" aria-hidden style={{ fontSize: 10, letterSpacing: '0.18em', color: 'var(--ink-faint)', textTransform: 'uppercase' }}>The Order</span>
                  </Link>
                  <Link to={cta.to} data-cta="nav-menu" className="btn" style={{ marginTop: 18, justifyContent: 'center' }}>
                    {cta.label}
                  </Link>
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
