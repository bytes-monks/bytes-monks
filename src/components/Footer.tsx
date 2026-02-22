import { Mail, Linkedin, Github, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark border-t border-gray-800">
      <div className="container-custom py-12 px-4 md:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full border-2 border-primary" />
                <div className="absolute inset-2 rounded-full border border-accent-purple" />
                <div className="absolute inset-[10px] rounded-full bg-gradient-to-r from-primary to-accent-purple" />
              </div>
              <span className="font-display text-xl font-bold">
                <span className="text-white">Bytes</span>
                <span className="gradient-text">Monks</span>
              </span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              We engineer digital excellence through clean code, intelligent systems,
              and long-term technical partnerships.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About', 'Services', 'Process', 'Work', 'Contact'].map(link => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="mailto:hello@bytesmonks.com"
                className="w-10 h-10 rounded-lg bg-dark-100 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-dark-100 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-dark-100 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm flex items-center gap-1">
            © {currentYear} Bytes Monks. Built with{' '}
            <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for excellence.
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
