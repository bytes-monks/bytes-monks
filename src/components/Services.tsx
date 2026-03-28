import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Brain, Code, Database, Cloud, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Brain,
    number: '01',
    title: 'AI & Machine Learning',
    description:
      'Intelligent systems that learn, adapt, and automate complex workflows — giving your business a measurable competitive edge.',
    features: [
      'Custom AI systems',
      'LLM integrations',
      'Chatbots & automation',
      'CV-job matching systems',
      'AI workflow automation',
    ],
    gradient: 'from-violet-500 to-purple-600',
    accent: 'text-violet-400',
    border: 'border-violet-500/30',
  },
  {
    icon: Code,
    number: '02',
    title: 'Custom Software Development',
    description:
      'Tailored solutions built for your unique needs — from lean MVPs to enterprise-grade platforms that scale without friction.',
    features: [
      'Web applications',
      'SaaS platforms',
      'Backend architecture',
      'API development',
      'Mobile apps',
    ],
    gradient: 'from-blue-500 to-cyan-500',
    accent: 'text-blue-400',
    border: 'border-blue-500/30',
  },
  {
    icon: Database,
    number: '03',
    title: 'Data Engineering',
    description:
      'Transform raw data into actionable insights with modern pipelines, vector search, and analytics infrastructure.',
    features: [
      'Data pipelines',
      'Vector search',
      'Analytics systems',
      'AI-driven insights',
      'Data warehousing',
    ],
    gradient: 'from-cyan-500 to-teal-500',
    accent: 'text-cyan-400',
    border: 'border-cyan-500/30',
  },
  {
    icon: Cloud,
    number: '04',
    title: 'DevOps & Scaling',
    description:
      'Reliable, automated infrastructure that grows with your business — zero-downtime deploys, always observable, always resilient.',
    features: [
      'Cloud deployment',
      'Docker & Kubernetes',
      'CI/CD pipelines',
      'Performance optimization',
      'Monitoring & logging',
    ],
    gradient: 'from-orange-500 to-pink-500',
    accent: 'text-orange-400',
    border: 'border-orange-500/30',
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const active = services[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <section id="services" className="section-padding bg-dark-200 relative">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />

      <div className="container-custom relative z-10" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-primary" />
            <span className="text-primary text-xs tracking-widest uppercase font-medium">What We Do</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
              Services Built for{' '}
              <span className="gradient-text">Excellence</span>
            </h2>
            <p className="text-gray-600 max-w-xs text-sm hidden md:block">
              Select a service to explore what we build.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid lg:grid-cols-[5fr_8fr] gap-6 items-start"
        >
          {/* Left: service selector */}
          <div className="space-y-2">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isActive = activeIndex === index;
              return (
                <button
                  key={service.title}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left rounded-xl px-5 py-4 transition-all duration-300 border group ${
                    isActive
                      ? `bg-primary/8 ${service.border}`
                      : 'border-transparent hover:bg-dark-100/50 hover:border-gray-800/60'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-xs font-mono font-bold w-5 flex-shrink-0 transition-colors ${
                        isActive ? 'text-primary' : 'text-gray-700'
                      }`}
                    >
                      {service.number}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-40'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span
                      className={`font-display font-semibold text-sm md:text-base transition-colors ${
                        isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'
                      }`}
                    >
                      {service.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.28 }}
            >
              <div className={`glass rounded-2xl p-8 md:p-10 border ${active.border}`}>
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${active.gradient} flex items-center justify-center mb-6`}
                >
                  <ActiveIcon className="w-8 h-8 text-white" />
                </div>

                <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">{active.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">{active.description}</p>

                {/* Feature list */}
                <div className="space-y-3 mb-8">
                  {active.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-center gap-3"
                    >
                      <ArrowRight className={`w-4 h-4 ${active.accent} flex-shrink-0`} />
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <div className="pt-6 border-t border-gray-800/50">
                  <a
                    href="#contact"
                    className={`inline-flex items-center gap-2 font-medium text-sm group transition-colors ${active.accent} hover:opacity-80`}
                  >
                    Discuss this service
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
