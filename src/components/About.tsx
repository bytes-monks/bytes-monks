import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Brain, Database, Rocket } from 'lucide-react';

const highlights = [
  { icon: Code2, title: 'Clean Architecture', desc: 'Structured, maintainable codebases' },
  { icon: Brain, title: 'AI-Powered Solutions', desc: 'Intelligent automation & insights' },
  { icon: Database, title: 'Scalable Systems', desc: 'Built to grow with your business' },
  { icon: Rocket, title: 'Product Focus', desc: 'User-centric development approach' },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding bg-dark relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-100/30 to-dark" />
      
      <div className="container-custom relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">About Us</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Discipline. Precision.{' '}
            <span className="gradient-text">Mastery.</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            Bytes Monks is a software & AI engineering company focused on building
            scalable, clean, and intelligent systems. We combine technical excellence
            with strategic thinking to deliver solutions that drive real business value.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent-purple/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 glass rounded-2xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Long-term Technical Partnerships
              </h3>
              <p className="text-gray-400 leading-relaxed">
                We don't just build software—we become your technical partners.
                From initial architecture to ongoing optimization, we're committed
                to your product's success at every stage of growth.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['50+', '100%', '24/7', '5+'].map((stat, i) => (
                <div key={i} className="text-center p-4 rounded-xl bg-dark/50">
                  <div className="font-display text-3xl md:text-4xl font-bold gradient-text mb-1">
                    {stat}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {['Projects Delivered', 'Client Satisfaction', 'Support Available', 'Years Experience'][i]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
