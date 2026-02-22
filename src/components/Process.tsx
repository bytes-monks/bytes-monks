import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, PenTool, Code, Zap } from 'lucide-react';

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Understand',
    description: 'Deep business analysis to uncover your core challenges and opportunities.',
  },
  {
    icon: PenTool,
    number: '02',
    title: 'Architect',
    description: 'Clean, scalable design patterns that set the foundation for growth.',
  },
  {
    icon: Code,
    number: '03',
    title: 'Build',
    description: 'High-quality implementation with rigorous testing and best practices.',
  },
  {
    icon: Zap,
    number: '04',
    title: 'Optimize',
    description: 'Performance tuning and AI enhancement for maximum efficiency.',
  },
];

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="process" className="section-padding bg-dark relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-100/30 via-transparent to-dark-100/30" />
      
      <div className="container-custom relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">Our Process</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            The Monk{' '}
            <span className="gradient-text">Method</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="glass rounded-2xl p-6 text-center hover:border-primary/30 transition-all duration-300 group">
                  <div className="relative inline-flex mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent-purple rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="relative w-16 h-16 rounded-full bg-dark flex items-center justify-center border border-primary/30">
                      <step.icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>
                  
                  <div className="font-display text-4xl font-bold text-primary/20 mb-2">
                    {step.number}
                  </div>
                  
                  <h3 className="font-display text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-8 h-8 rounded-full bg-dark border border-primary/30 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
