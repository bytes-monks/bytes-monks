import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const reasons = [
  {
    title: 'Senior-level engineering',
    desc: 'Every project is handled by experienced engineers, not juniors.',
  },
  {
    title: 'AI-first mindset',
    desc: 'We bake intelligence into solutions from the ground up.',
  },
  {
    title: 'Scalable architecture',
    desc: 'Systems designed to grow without costly rewrites.',
  },
  {
    title: 'Fast iteration cycles',
    desc: 'Rapid delivery with continuous feedback loops.',
  },
  {
    title: 'Transparent communication',
    desc: 'No black boxes — you always know where things stand.',
  },
  {
    title: 'Long-term partnerships',
    desc: 'We stay invested in your product long after launch.',
  },
  {
    title: 'Clean code standards',
    desc: 'Readable, maintainable, and properly documented codebases.',
  },
  {
    title: '24/7 support available',
    desc: 'Production issues don\'t wait. Neither do we.',
  },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding bg-dark relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-200/20 via-transparent to-dark-200/20" />

      <div className="container-custom relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-[2fr_3fr] gap-16 items-start">

          {/* Left: heading + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-28"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-primary" />
              <span className="text-primary text-xs tracking-widest uppercase font-medium">Why Us</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Why Choose{' '}
              <span className="gradient-text">Bytes Monks?</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-10">
              We combine technical excellence with strategic thinking. Every project
              benefits from our commitment to quality, transparency, and long-term success.
            </p>
            <a href="#contact" className="btn-primary inline-flex">
              Start Your Project
            </a>
          </motion.div>

          {/* Right: vertical list with dividers */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="divide-y divide-gray-800/50"
          >
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 14 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.05 * index }}
                className="flex items-start gap-6 py-6 group"
              >
                <span className="text-xs font-mono text-gray-700 group-hover:text-primary transition-colors mt-1 w-6 flex-shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-white group-hover:gradient-text transition-all mb-1">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-500 transition-colors">
                    {reason.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
