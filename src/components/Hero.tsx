import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

const serviceList = [
  { num: '01', label: 'AI & Machine Learning', color: 'text-violet-400' },
  { num: '02', label: 'Custom Software Dev', color: 'text-blue-400' },
  { num: '03', label: 'Data Engineering', color: 'text-cyan-400' },
  { num: '04', label: 'DevOps & Scaling', color: 'text-orange-400' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Subtle background orbs */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-accent-purple/8 blur-[110px] pointer-events-none" />

      <div className="container-custom relative z-10 pt-28 pb-20">
        <div className="grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] gap-14 xl:gap-20 items-center">

          {/* Left: Main content */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-10"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-400 font-medium tracking-widest uppercase">
                  Available for new projects
                </span>
              </span>
              <span className="w-px h-4 bg-gray-700" />
              <span className="text-xs text-gray-600 tracking-widest uppercase">
                Software &amp; AI Engineering
              </span>
            </motion.div>

            {/* Headline — fluid sizing */}
            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1 }}
              className="font-display font-bold tracking-tight leading-[0.92] mb-8"
              style={{ fontSize: 'clamp(52px, 7.5vw, 96px)' }}
            >
              <span className="block text-white">Engineering</span>
              <span className="block gradient-text">Digital</span>
              <span className="block text-white">Excellence.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-gray-400 text-lg leading-relaxed max-w-lg mb-10"
            >
              We build scalable software, intelligent AI systems, and
              high-performance digital products for ambitious companies.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38 }}
              className="flex flex-wrap gap-4 mb-14"
            >
              <a
                href="#contact"
                className="btn-primary inline-flex items-center gap-2 group"
              >
                Book Free Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#portfolio" className="btn-secondary inline-flex items-center gap-2">
                View Our Work
              </a>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="flex flex-wrap gap-8 pt-8 border-t border-gray-800/60"
            >
              {[
                { value: '50+', label: 'Projects Delivered' },
                { value: '5+', label: 'Years Experience' },
                { value: '100%', label: 'Client Satisfaction' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-gray-600 mt-0.5 tracking-wide">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Floating info card */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="glass rounded-2xl p-8 border border-gray-800 relative z-10">
                {/* Card header */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs text-gray-600 uppercase tracking-widest font-medium">
                    Core Services
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                </div>

                {/* Service list */}
                <div className="space-y-5 mb-8">
                  {serviceList.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.08 }}
                      className="flex items-center gap-4 group cursor-default"
                    >
                      <span className={`text-xs font-mono font-bold ${item.color} w-5 flex-shrink-0`}>
                        {item.num}
                      </span>
                      <div className="flex-1 h-px bg-gray-800/80 group-hover:bg-gray-700 transition-colors" />
                      <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Trusted by */}
                <div className="border-t border-gray-800/60 pt-6">
                  <p className="text-xs text-gray-700 mb-3 tracking-wide">Trusted by</p>
                  <div className="flex -space-x-2">
                    {['BK', 'DM', 'JF', 'NK', 'XP'].map((init, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center text-xs font-bold text-white border-2 border-dark"
                      >
                        {init}
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full bg-dark-100 border-2 border-dark flex items-center justify-center text-xs text-gray-500">
                      +
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative glows */}
              <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-primary/12 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-44 h-44 rounded-full bg-accent-purple/10 blur-3xl pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-1 text-gray-700 hover:text-gray-500 transition-colors"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
