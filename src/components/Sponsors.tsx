import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const sponsors = [
  { name: 'Rakam AI', logo: 'RA', url: 'https://rakam.ai/' },
  { name: 'DM Nova', logo: 'DM', url: 'https://dmnova.tech/' },
  { name: 'Khotoua', logo: 'KH', url: 'https://khotoua.com/' },
  { name: 'Jetfi Systems', logo: 'JS', url: 'https://jetfisystems.de/' },
  { name: 'NLKit', logo: 'NK', url: 'https://www.nlkit.com/' },
  { name: 'elBaladiya.tn', logo: 'EB', url: 'https://elbaladiya.tn/home' },
  { name: 'AI Xperts', logo: 'AX', url: 'https://www.ai-xperts.io/' },
];

const sponsorsReversed = [...sponsors].reverse();

export default function Sponsors() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-100/20 to-dark" />
      
      <div className="container-custom relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium mb-2 block">Trusted Partners</span>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
            Companies That <span className="gradient-text">Believe In Us</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Proudly partnered with industry leaders who trust our expertise
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark to-transparent z-10" />
          
          <div className="overflow-hidden py-8">
            <div 
              className={`flex gap-8 ${isPaused ? '' : 'animate-scroll'}`}
              style={{
                animationPlayState: isPaused ? 'paused' : 'running',
              }}
            >
              {[...sponsors, ...sponsors].map((sponsor, index) => (
                <a
                  key={index}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 glass rounded-2xl p-6 md:p-8 hover:border-primary/40 transition-all duration-300 group min-w-[160px] md:min-w-[200px] block no-underline"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent-purple/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-xl md:text-2xl font-bold gradient-text">
                        {sponsor.logo}
                      </span>
                    </div>
                    <span className="text-gray-300 font-medium text-sm md:text-base group-hover:text-white transition-colors">
                      {sponsor.name}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="overflow-hidden py-8 mt-4">
            <div 
              className={`flex gap-8 ${isPaused ? '' : 'animate-scroll-reverse'}`}
              style={{
                animationPlayState: isPaused ? 'paused' : 'running',
              }}
            >
              {[...sponsorsReversed, ...sponsorsReversed].map((sponsor, index) => (
                <a
                  key={index}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 glass rounded-2xl p-6 md:p-8 hover:border-primary/40 transition-all duration-300 group min-w-[160px] md:min-w-[200px] block no-underline"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-accent-blue/20 to-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-xl md:text-2xl font-bold gradient-text">
                        {sponsor.logo}
                      </span>
                    </div>
                    <span className="text-gray-300 font-medium text-sm md:text-base group-hover:text-white transition-colors">
                      {sponsor.name}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center items-center gap-8 mt-12 flex-wrap"
        >
          {['Innovative Solutions', 'Trusted Excellence', 'Global Reach'].map((badge, i) => (
            <div key={i} className="flex items-center gap-2 text-gray-400">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent-purple" />
              <span className="text-sm">{badge}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes scroll-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
          width: max-content;
        }
        
        .animate-scroll-reverse {
          animation: scroll-reverse 30s linear infinite;
          width: max-content;
        }
      `}</style>
    </section>
  );
}
