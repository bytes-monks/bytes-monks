import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Cloud, GraduationCap, Bot } from 'lucide-react';

const caseStudies = [
  {
    title: 'Cloud Infrastructure Migration',
    category: 'DevOps / Cloud',
    icon: Cloud,
    problem:
      'Legacy infrastructure on OVH lacked scalability, resilience, and modern deployment capabilities, putting production reliability at risk.',
    solution:
      'Migrated the entire infrastructure to Azure with automated scalability, a robust backup process, and CI/CD pipelines via GitHub Actions for seamless multi-environment deployments. Also migrated the production database to PostgreSQL with query optimizations.',
    impact:
      'Up to 80% improvement in database query performance, zero-downtime deployments across environments, and a fully automated, resilient cloud infrastructure.',
    gradient: 'from-violet-500 to-purple-600',
    highlight: '80% faster',
  },
  {
    title: 'Children Education Platform',
    category: 'EdTech / Full-Stack',
    icon: GraduationCap,
    problem:
      "A growing children's education application needed reliable infrastructure, a secure admin control panel, and a scalable game backend to support its expanding user base.",
    solution:
      'Designed and maintained the full cloud infrastructure, implemented automated backup processes, built a comprehensive administration and control panel, and developed and maintained the game\'s backend systems.',
    impact:
      'Stable, scalable platform supporting continuous growth, with full operational visibility through the admin panel and reliable game experiences for young learners.',
    gradient: 'from-blue-500 to-cyan-500',
    highlight: '100% uptime',
  },
  {
    title: 'AI Co-Pilot & Expert Agent',
    category: 'AI / SaaS',
    icon: Bot,
    problem:
      'Users needed a personalized AI assistant capable of reasoning over their own unique knowledge bases, with integrated payments, transcription, and analytics — all delivered reliably.',
    solution:
      "Designed and implemented an AI Co-Pilot functioning as an expert agent over users' custom knowledge databases. Delivered CI/CD pipelines, automated database backups, a transcription service, online payment integration, and an analytics module.",
    impact:
      'A fully production-ready AI platform with end-to-end automation, enabling users to interact with their own knowledge through a powerful, reliable, and extensible agent.',
    gradient: 'from-orange-500 to-pink-500',
    highlight: 'Full-stack AI',
  },
];

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="portfolio" className="section-padding bg-dark-200 relative">
      <div className="absolute inset-0 bg-gradient-radial from-accent-purple/5 via-transparent to-transparent" />

      <div className="container-custom relative z-10" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-accent-purple" />
            <span className="text-accent-purple text-xs tracking-widest uppercase font-medium">Portfolio</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
              Selected{' '}
              <span className="gradient-text">Work</span>
            </h2>
            <p className="text-gray-600 text-sm max-w-xs hidden md:block">
              Real problems. Real solutions. Measurable impact.
            </p>
          </div>
        </motion.div>

        {/* Case studies */}
        <div className="space-y-6">
          {caseStudies.map((study, index) => {
            const Icon = study.icon;
            return (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.14 }}
              >
                <div className="glass rounded-2xl overflow-hidden group hover:border-primary/20 transition-all duration-500">
                  <div className="grid lg:grid-cols-[300px_1fr] gap-0">

                    {/* Left accent panel */}
                    <div
                      className={`bg-gradient-to-br ${study.gradient} p-8 lg:p-10 flex flex-col justify-between min-h-[220px] relative overflow-hidden`}
                    >
                      {/* Large faded index number */}
                      <div className="absolute -bottom-4 -left-2 font-display text-[120px] font-bold text-white/10 leading-none select-none">
                        {String(index + 1).padStart(2, '0')}
                      </div>

                      <div className="relative z-10">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-white text-xs mb-4 font-medium">
                          {study.category}
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-display text-xl font-bold text-white leading-tight">
                          {study.title}
                        </h3>
                      </div>

                      <div className="relative z-10 mt-6 flex items-center justify-between">
                        <span className="text-white/60 text-xs font-mono font-bold tracking-widest uppercase">
                          {study.highlight}
                        </span>
                        <button className="inline-flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-sm">
                          View Case Study
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Right: PSI grid */}
                    <div className="p-8 lg:p-10">
                      <div className="grid md:grid-cols-3 gap-8 h-full">
                        <div>
                          <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
                            Problem
                          </h4>
                          <p className="text-gray-500 text-sm leading-relaxed">{study.problem}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-accent-purple uppercase tracking-widest mb-3">
                            Solution
                          </h4>
                          <p className="text-gray-500 text-sm leading-relaxed">{study.solution}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-green-400 uppercase tracking-widest mb-3">
                            Impact
                          </h4>
                          <p className="text-gray-500 text-sm leading-relaxed">{study.impact}</p>
                        </div>
                      </div>
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
