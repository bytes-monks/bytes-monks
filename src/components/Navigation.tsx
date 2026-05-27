import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Mark, Wordmark } from './Logo';

const navLinks = [
  { name: 'The Order', to: '/#about' },
  { name: 'Disciplines', to: '/#services' },
  { name: 'The Rule', to: '/#process' },
  { name: 'Chronicles', to: '/#portfolio' },
  { name: 'Tariff', to: '/pricing' },
  { name: 'Take Vows', to: '/hiring', dot: true },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="nav"
      style={{ borderBottomColor: isScrolled ? 'var(--rule)' : 'transparent' }}
    >
      {/* Logo lockup */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--ink)', textDecoration: 'none' }}>
        <span className="flicker" style={{ color: 'var(--ink)' }}>
          <Mark size={38} />
        </span>
        <span style={{ display: 'inline-flex', flexDirection: 'column', lineHeight: 1 }}>
          <Wordmark height={16} />
          <span className="mono" style={{ fontSize: 8, letterSpacing: '0.28em', color: 'var(--ink-faint)', textTransform: 'uppercase', marginTop: 3 }}>
            Ordo · Bytorvm
          </span>
        </span>
      </Link>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center" style={{ gap: 24 }}>
        {navLinks.map((link) => (
          <Link key={link.name} to={link.to}>
            {link.name}
            {link.dot && (
              <span style={{ marginLeft: 6, display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'var(--sage)', verticalAlign: 'middle' }} />
            )}
          </Link>
        ))}
      </div>

      {/* Desktop CTA */}
      <Link to="/#contact" className="btn hidden md:inline-flex" style={{ padding: '10px 16px' }}>
        Commission Work
      </Link>

      {/* Mobile menu button */}
      <button
        className="md:hidden"
        style={{ color: 'var(--ink-soft)', background: 'transparent', border: 'none', cursor: 'pointer', padding: 4 }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden"
            style={{ position: 'absolute', top: '100%', left: 0, right: 0, overflow: 'hidden', background: 'var(--bg)', borderBottom: '1px solid var(--rule)' }}
          >
            <div style={{ padding: '8px 24px 20px', display: 'flex', flexDirection: 'column' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className="serif"
                  style={{ fontSize: 20, color: 'var(--ink)', textDecoration: 'none', padding: '12px 0', borderBottom: '1px solid var(--rule-soft)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                  {link.dot && <span className="mono" style={{ fontSize: 9, letterSpacing: '0.18em', color: 'var(--sage)', textTransform: 'uppercase' }}>Open</span>}
                </Link>
              ))}
              <Link to="/#contact" className="btn" style={{ marginTop: 18, justifyContent: 'center' }} onClick={() => setIsMobileMenuOpen(false)}>
                Commission Work
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
