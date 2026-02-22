import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check } from 'lucide-react';

const reasons = [
  'Senior-level engineering',
  'AI-first mindset',
  'Scalable architecture',
  'Fast iteration cycles',
  'Transparent communication',
  'Long-term partnerships',
  'Clean code standards',
  '24/7 support available',
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding bg-dark relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-100/30 via-transparent to-dark-100/30" />
      
      <div className="container-custom relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-medium mb-4 block">Why Us</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Why Choose{' '}
              <span className="gradient-text">Bytes Monks?</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              We combine technical excellence with strategic thinking. Every project
              benefits from our commitment to quality, transparency, and long-term success.
            </p>
            <a href="#contact" className="btn-primary inline-flex">
              Start Your Project
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {reasons.map((reason, index) => (
              <motion.div
                key={reason}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="glass rounded-xl p-4 flex items-center gap-3 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-accent-purple flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-300">{reason}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
