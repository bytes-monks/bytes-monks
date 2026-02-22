import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Code, Database, Cloud } from 'lucide-react';

const services = [
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Intelligent systems that learn, adapt, and automate.',
    features: [
      'Custom AI systems',
      'LLM integrations',
      'Chatbots & automation',
      'CV-job matching systems',
      'AI workflow automation',
    ],
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: Code,
    title: 'Custom Software Development',
    description: 'Tailored solutions built for your unique needs.',
    features: [
      'Web applications',
      'SaaS platforms',
      'Backend architecture',
      'API development',
      'Mobile apps',
    ],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Database,
    title: 'Data Engineering',
    description: 'Transform raw data into actionable insights.',
    features: [
      'Data pipelines',
      'Vector search',
      'Analytics systems',
      'AI-driven insights',
      'Data warehousing',
    ],
    gradient: 'from-cyan-500 to-teal-500',
  },
  {
    icon: Cloud,
    title: 'DevOps & Scaling',
    description: 'Infrastructure that grows with your business.',
    features: [
      'Cloud deployment',
      'Docker & Kubernetes',
      'CI/CD pipelines',
      'Performance optimization',
      'Monitoring & logging',
    ],
    gradient: 'from-orange-500 to-pink-500',
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="section-padding bg-dark-200 relative">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      
      <div className="container-custom relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">What We Do</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            Services Built for{' '}
            <span className="gradient-text">Excellence</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl -z-10"
                style={{
                  background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                }}
              />
              <div className="glass rounded-2xl p-8 h-full hover:border-primary/30 transition-all duration-300">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="font-display text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-gray-300">
                      <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
