import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Users, BarChart3, Cog } from 'lucide-react';

const caseStudies = [
  {
    title: 'AI Recruitment Platform',
    category: 'AI / SaaS',
    icon: Users,
    problem: 'Manual resume screening was slow and biased, leading to poor hiring decisions.',
    solution: 'Built an AI-powered CV-job matching system using vector embeddings and LLM analysis.',
    impact: '80% reduction in screening time, 3x improvement in candidate quality scores.',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    title: 'SaaS Analytics Dashboard',
    category: 'Data / Web App',
    icon: BarChart3,
    problem: 'Fragmented data across multiple tools made business insights impossible.',
    solution: 'Unified analytics platform with real-time dashboards and predictive insights.',
    impact: '40% faster decision-making, $2M+ in identified cost savings.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Enterprise Automation System',
    category: 'DevOps / Automation',
    icon: Cog,
    problem: 'Manual workflows causing delays and errors in critical business processes.',
    solution: 'End-to-end automation with AI-powered exception handling and monitoring.',
    impact: '95% automation rate, 60% reduction in operational costs.',
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
