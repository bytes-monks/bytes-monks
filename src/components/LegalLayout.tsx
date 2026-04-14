import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import Logo from './Logo';

interface Section {
  title: string;
  content: ReactNode | ReactNode[];
}

interface LegalLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: Section[];
}

export default function LegalLayout({ title, subtitle, lastUpdated, sections }: LegalLayoutProps) {
  return (
    <div className="bg-dark min-h-screen">

      {/* Sticky mini-nav */}
      <div className="border-b border-gray-800/60 bg-dark-200/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container-custom px-4 md:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <Logo size={28} />
            <span className="font-display text-base font-bold">
              <span className="text-white">Bytes</span>
              <span className="gradient-text">Monks</span>
            </span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Page hero */}
      <div className="border-b border-gray-800/40 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
        <div className="container-custom px-4 md:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-primary" />
            <span className="text-primary text-xs tracking-widest uppercase font-medium">{subtitle}</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {title}
          </h1>
          <p className="text-gray-600 text-sm">Last updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-3xl space-y-0 divide-y divide-gray-800/40">
          {sections.map((section, i) => (
            <div key={i} className="py-10 first:pt-0">
              <div className="flex gap-6 md:gap-10">
                <span className="text-xs font-mono text-gray-700 mt-1.5 w-6 flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <h2 className="font-display text-lg md:text-xl font-semibold text-white mb-4">
                    {section.title}
                  </h2>
                  {Array.isArray(section.content) ? (
                    <ul className="space-y-3">
                      {section.content.map((item, j) => (
                        <li key={j} className="flex gap-3 text-gray-500 text-sm leading-relaxed">
                          <span className="text-primary/60 mt-1.5 flex-shrink-0 text-xs">—</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm leading-relaxed">{section.content}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer strip */}
      <div className="border-t border-gray-800/40 py-8">
        <div className="container-custom px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-700">
          <span>© {new Date().getFullYear()} Bytes Monks. All rights reserved.</span>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/refund" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
