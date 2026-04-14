import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Process', href: '#process' },
  { name: 'Work', href: '#portfolio' },
  { name: 'Pricing', href: '/pricing', external: true },
  { name: "We're Hiring", href: '/hiring', external: true },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass border-b border-gray-800/50 py-4' : 'py-6'
      }`}
    >
      <div className="container-custom flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <Logo size={32} />
          <span className="font-display text-lg font-bold tracking-tight">
            <span className="text-white">Bytes</span>
            <span className="gradient-text">Monks</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.filter(l => l.name !== 'Contact').map((link) =>
            link.external ? (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm text-gray-500 hover:text-white transition-colors relative group"
              >
                {link.name}
                {link.name === "We're Hiring" && (
                  <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-green-400 align-middle" />
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-primary to-accent-purple group-hover:w-full transition-all duration-300" />
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-gray-500 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-primary to-accent-purple group-hover:w-full transition-all duration-300" />
              </a>
            )
          )}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a href="#contact" className="btn-primary text-sm px-6 py-2.5">
            Book Consultation
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-400 hover:text-white transition-colors p-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden"
          >
            <div className="glass border-t border-gray-800/50 mt-4 mx-4 rounded-xl">
              <div className="py-4 px-5 flex flex-col divide-y divide-gray-800/50">
                {navLinks.map((link) =>
                  link.external ? (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors py-3 text-sm flex items-center justify-between"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                      {link.name === "We're Hiring" && (
                        <span className="text-xs text-green-400 font-medium">Open</span>
                      )}
                    </Link>
                  ) : (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors py-3 text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  )
                )}
                <div className="pt-4 pb-1">
                  <a
                    href="#contact"
                    className="btn-primary text-center text-sm w-full block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Book Consultation
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
