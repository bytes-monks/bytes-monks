import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const sponsors = [
  { name: 'Rakam AI',      logo: 'RA', image: '/logos/rakam_ai.webp',  url: 'https://rakam.ai/' },
  { name: 'DM Nova',       logo: 'DM', image: '/logos/dmnova.webp',    url: 'https://dmnova.tech/' },
  { name: 'Khotoua',       logo: 'KH', image: '/logos/khotoua.webp',   url: 'https://khotoua.com/' },
  { name: 'Jetfi Systems', logo: 'JS', image: null,                    url: 'https://jetfisystems.de/' },
  { name: 'NLKit',         logo: 'NK', image: null,                    url: 'https://www.nlkit.com/' },
  { name: 'elBaladiya.tn', logo: 'EB', image: null,                    url: 'https://elbaladiya.tn/home' },
  { name: 'AI Xperts',     logo: 'AX', image: '/logos/ai_xperts.avif', url: 'https://www.ai-xperts.io/' },
];

const sponsorsReversed = [...sponsors].reverse();

function SponsorCard({ sponsor }: { sponsor: typeof sponsors[0] }) {
  return (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-xl border border-gray-800/60 bg-dark-100/40 hover:border-gray-700 hover:bg-dark-100/70 transition-all duration-300 group min-w-max"
    >
      <div className="w-9 h-9 rounded-lg bg-dark border border-gray-800 flex items-center justify-center overflow-hidden flex-shrink-0">
        {sponsor.image ? (
          <img
            src={sponsor.image}
            alt={sponsor.name}
            className="w-full h-full object-contain p-1"
          />
        ) : (
          <span className="text-xs font-bold gradient-text">{sponsor.logo}</span>
        )}
      </div>
      <span className="text-gray-500 text-sm font-medium group-hover:text-gray-300 transition-colors whitespace-nowrap">
        {sponsor.name}
      </span>
    </a>
  );
}

export default function Sponsors() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-16 md:py-20 px-4 md:px-8 bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-200/20 via-transparent to-dark-200/20" />

      <div className="container-custom relative z-10" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-primary" />
            <span className="text-primary text-xs tracking-widest uppercase font-medium">Trusted Partners</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
              Companies That <span className="gradient-text">Believe In Us</span>
            </h2>
            <p className="text-gray-600 text-sm">Hover to pause</p>
          </div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />

          <div className="overflow-hidden py-3">
            <div
              className={`flex gap-4 ${isPaused ? '' : 'animate-scroll'}`}
              style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
            >
              {[...sponsors, ...sponsors].map((sponsor, index) => (
                <SponsorCard key={index} sponsor={sponsor} />
              ))}
            </div>
          </div>

          <div className="overflow-hidden py-3 mt-3">
            <div
              className={`flex gap-4 ${isPaused ? '' : 'animate-scroll-reverse'}`}
              style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
            >
              {[...sponsorsReversed, ...sponsorsReversed].map((sponsor, index) => (
                <SponsorCard key={index} sponsor={sponsor} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-reverse {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll         { animation: scroll 28s linear infinite; width: max-content; }
        .animate-scroll-reverse { animation: scroll-reverse 28s linear infinite; width: max-content; }
      `}</style>
    </section>
  );
}
