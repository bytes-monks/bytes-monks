import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, PenTool, Code, Zap } from 'lucide-react';

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Understand',
    description:
      'Deep business analysis to uncover your core challenges and opportunities. We align on vision, goals, and constraints before writing a single line of code.',
  },
  {
    icon: PenTool,
    number: '02',
    title: 'Architect',
    description:
      'Clean, scalable design patterns that set the foundation for growth. Every decision is deliberate, documented, and built to survive the demands of tomorrow.',
  },
  {
    icon: Code,
    number: '03',
    title: 'Build',
    description:
      'High-quality implementation with rigorous testing and engineering best practices. Delivered iteratively, with full visibility and collaborative feedback throughout.',
  },
  {
    icon: Zap,
    number: '04',
    title: 'Optimize',
    description:
      'Performance tuning, AI enhancement, and continuous improvement for maximum efficiency. We monitor, iterate, and support long after the initial launch.',
  },
];

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="process" className="section-padding bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-200/30 via-transparent to-dark-200/30" />

      <div className="container-custom relative z-10" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-primary" />
            <span className="text-primary text-xs tracking-widest uppercase font-medium">Our Process</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            The Monk{' '}
            <span className="gradient-text">Method</span>
          </h2>
        </motion.div>

        {/* Steps — full-width row list */}
        <div className="divide-y divide-gray-800/40">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.14 }}
                className="group"
              >
                <div className="grid grid-cols-[64px_1fr] md:grid-cols-[80px_220px_1fr_48px] lg:grid-cols-[100px_260px_1fr_56px] gap-6 md:gap-8 items-center py-8 md:py-10 px-4 md:px-6 rounded-xl -mx-4 md:-mx-6 hover:bg-dark-100/25 transition-colors duration-300">

                  {/* Large faded number */}
                  <div className="font-display text-5xl md:text-6xl font-bold text-gray-800/70 group-hover:text-gray-700 transition-colors leading-none select-none">
                    {step.number}
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-white group-hover:gradient-text transition-all">
                      {step.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="col-span-2 md:col-span-1">
                    <p className="text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
                      {step.description}
                    </p>
                  </div>

                  {/* Icon circle */}
                  <div className="hidden md:flex justify-end">
                    <div className="w-12 h-12 rounded-full border border-gray-800 group-hover:border-primary/40 flex items-center justify-center transition-all duration-300">
                      <Icon className="w-5 h-5 text-gray-700 group-hover:text-primary transition-colors duration-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
