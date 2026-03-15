import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Section {
  title: string;
  content: string | string[];
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
      {/* Header */}
      <div className="border-b border-gray-800 bg-dark-200">
        <div className="container-custom px-4 md:px-8 py-6 flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="border-b border-gray-800 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
        <div className="container-custom px-4 md:px-8 relative z-10">
          <p className="text-primary font-medium mb-3 text-sm">{subtitle}</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
          <p className="text-gray-500 text-sm">Last updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom px-4 md:px-8 py-16">
        <div className="max-w-3xl space-y-12">
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="font-display text-xl font-semibold text-white mb-4">
                {i + 1}. {section.title}
              </h2>
              {Array.isArray(section.content) ? (
                <ul className="space-y-2">
                  {section.content.map((item, j) => (
                    <li key={j} className="flex gap-2 text-gray-400 text-sm leading-relaxed">
                      <span className="text-primary mt-1 flex-shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-sm leading-relaxed">{section.content}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer strip */}
      <div className="border-t border-gray-800 py-8">
        <div className="container-custom px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
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
