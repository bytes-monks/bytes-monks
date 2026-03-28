import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '100%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Support Available' },
  { value: '5+', label: 'Years Experience' },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding bg-dark relative">
      <div className="container-custom relative z-10" ref={ref}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-14"
        >
          <span className="w-8 h-px bg-primary" />
          <span className="text-primary text-xs tracking-widest uppercase font-medium">About Us</span>
        </motion.div>

        {/* Split: bold headline left, text right */}
        <div className="grid lg:grid-cols-2 gap-16 items-end mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.1 }}
          >
            <h2
              className="font-display font-bold leading-[0.92] tracking-tight"
              style={{ fontSize: 'clamp(48px, 6vw, 88px)' }}
            >
              <span className="block text-white">Discipline.</span>
              <span className="block text-white">Precision.</span>
              <span className="block gradient-text">Mastery.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="pb-2 space-y-5"
          >
            <p className="text-gray-400 text-lg leading-relaxed">
              Bytes Monks is a software &amp; AI engineering company focused on
              building scalable, clean, and intelligent systems. We combine
              technical excellence with strategic thinking to deliver solutions
              that drive real business value.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We don't just build software — we become your long-term technical
              partners. From initial architecture to ongoing optimization, every
              decision is made with your product's growth in mind.
            </p>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 border border-gray-800/60 rounded-2xl overflow-hidden divide-x divide-y md:divide-y-0 divide-gray-800/60"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-dark-100/40 px-8 py-10 text-center hover:bg-dark-100/70 transition-colors"
            >
              <div className="font-display text-4xl md:text-5xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm tracking-wide">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
