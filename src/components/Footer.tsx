import { Mail, Linkedin, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const socialLinks = [
  { href: 'mailto:contact@bytesmonks.com', Icon: Mail, label: 'Email', external: false },
  {
    href: 'https://www.linkedin.com/company/bytes-monks/',
    Icon: Linkedin,
    label: 'LinkedIn',
    external: true,
  },
  { href: 'https://github.com/bytes-monks', Icon: Github, label: 'GitHub', external: true },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark border-t border-gray-800/50 relative overflow-hidden">
      {/* Large background brand text */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center overflow-hidden pointer-events-none select-none">
        <span className="font-display font-bold text-[clamp(80px,14vw,200px)] text-gray-900/25 leading-none whitespace-nowrap tracking-tight">
          BYTES MONKS
        </span>
      </div>

      <div className="container-custom relative z-10 pt-16 pb-8">

        {/* Top: brand + mini CTA */}
        <div className="grid md:grid-cols-[1fr_300px] gap-10 mb-16 pb-16 border-b border-gray-800/50 items-start">

          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-3 mb-6">
              <Logo size={36} />
              <span className="font-display text-xl font-bold">
                <span className="text-white">Bytes</span>
                <span className="gradient-text">Monks</span>
              </span>
            </a>
            <p className="text-gray-600 text-sm leading-relaxed max-w-sm mb-8">
              We engineer digital excellence through clean code, intelligent systems,
              and long-term technical partnerships.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map(({ href, Icon, label, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-dark-100 border border-gray-800 flex items-center justify-center text-gray-600 hover:text-white hover:border-gray-600 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Mini CTA card */}
          <div className="glass rounded-2xl p-6 border border-gray-800/60">
            <p className="text-sm text-gray-500 mb-4">Ready to start a project?</p>
            <a
              href="#contact"
              className="btn-primary text-sm w-full text-center block mb-3"
            >
              Book Free Consultation
            </a>
            <p className="text-xs text-gray-700 text-center">Response within 24 hours</p>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h5 className="text-xs text-gray-700 uppercase tracking-widest mb-5 font-medium">Navigate</h5>
            <ul className="space-y-3">
              {['About', 'Services', 'Process', 'Work', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-600 hover:text-white transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-xs text-gray-700 uppercase tracking-widest mb-5 font-medium">Company</h5>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/pricing"
                  className="text-gray-600 hover:text-white transition-colors text-sm"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/hiring"
                  className="text-gray-600 hover:text-white transition-colors text-sm flex items-center gap-2"
                >
                  We're Hiring
                  <span className="text-[8px] text-green-400">●</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs text-gray-700 uppercase tracking-widest mb-5 font-medium">Legal</h5>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-gray-600 hover:text-white transition-colors text-sm">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs text-gray-700 uppercase tracking-widest mb-5 font-medium">Contact</h5>
            <a
              href="mailto:contact@bytesmonks.com"
              className="text-gray-600 hover:text-white transition-colors text-sm break-all"
            >
              contact@bytesmonks.com
            </a>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 pt-6 border-t border-gray-800/40 text-xs text-gray-800">
          <span>© {currentYear} Bytes Monks. All rights reserved.</span>
          <span className="tracking-widest uppercase">Engineered with precision.</span>
        </div>
      </div>
    </footer>
  );
}
