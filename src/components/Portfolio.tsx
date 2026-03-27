import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Cloud, GraduationCap, Bot } from 'lucide-react';

const caseStudies = [
  {
    title: 'Cloud Infrastructure Migration',
    category: 'DevOps / Cloud',
    icon: Cloud,
    problem: 'Legacy infrastructure on OVH lacked scalability, resilience, and modern deployment capabilities, putting production reliability at risk.',
    solution: 'Migrated the entire infrastructure to Azure with automated scalability, a robust backup process, and CI/CD pipelines via GitHub Actions for seamless multi-environment deployments. Also migrated the production database to PostgreSQL with query optimizations.',
    impact: 'Up to 80% improvement in database query performance, zero-downtime deployments across environments, and a fully automated, resilient cloud infrastructure.',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    title: 'Children Education Platform',
    category: 'EdTech / Full-Stack',
    icon: GraduationCap,
    problem: 'A growing children\'s education application needed reliable infrastructure, a secure admin control panel, and a scalable game backend to support its expanding user base.',
    solution: 'Designed and maintained the full cloud infrastructure, implemented automated backup processes, built a comprehensive administration and control panel, and developed and maintained the game\'s backend systems.',
    impact: 'Stable, scalable platform supporting continuous growth, with full operational visibility through the admin panel and reliable game experiences for young learners.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'AI Co-Pilot & Expert Agent',
    category: 'AI / SaaS',
    icon: Bot,
    problem: 'Users needed a personalized AI assistant capable of reasoning over their own unique knowledge bases, with integrated payments, transcription, and analytics — all delivered reliably.',
    solution: 'Designed and implemented an AI Co-Pilot functioning as an expert agent over users\' custom knowledge databases. Delivered CI/CD pipelines, automated database backups, a transcription service, online payment integration, and an analytics module.',
    impact: 'A fully production-ready AI platform with end-to-end automation, enabling users to interact with their own knowledge through a powerful, reliable, and extensible agent.',
    gradient: 'from-orange-500 to-pink-500',
  },
];

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="portfolio" className="section-padding bg-dark-200 relative">
      <div className="absolute inset-0 bg-gradient-radial from-accent-purple/5 via-transparent to-transparent" />
      
      <div className="container-custom relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">Portfolio</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            Selected{' '}
            <span className="gradient-text">Work</span>
          </h2>
        </motion.div>

        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="glass rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300">
                <div className="grid lg:grid-cols-3 gap-0">
                  <div className={`bg-gradient-to-br ${study.gradient} p-8 lg:p-10 flex flex-col justify-between`}>
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-sm mb-4">
                        {study.category}
                      </div>
                      <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                        <study.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-white">{study.title}</h3>
                    </div>
                    <div className="mt-6">
                      <button className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                        View Case Study
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2 p-8 lg:p-10">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">
                          Problem
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{study.problem}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-accent-purple mb-2 uppercase tracking-wider">
                          Solution
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{study.solution}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-green-400 mb-2 uppercase tracking-wider">
                          Impact
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{study.impact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
