import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const testimonials = [
  {
    quote: "Bytes Monks transformed our hiring process with their AI system. The technical depth and business understanding they bring is exceptional.",
    author: "Sarah Chen",
    role: "CTO, TalentFlow",
    company: "TalentFlow",
  },
  {
    quote: "Working with them felt like having a true technical partner. They delivered our platform on time and exceeded every expectation.",
    author: "Marcus Williams",
    role: "Founder, DataSync",
    company: "DataSync",
  },
  {
    quote: "The quality of code and architecture they produced set a new standard for our engineering team. Highly recommend.",
    author: "Elena Rodriguez",
    role: "VP Engineering, Nexus",
    company: "Nexus",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding bg-dark-200 relative">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      
      <div className="container-custom relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">Testimonials</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            What Our{' '}
            <span className="gradient-text">Clients Say</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="glass rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 relative"
            >
              <div className="absolute top-6 left-6 text-6xl font-display text-primary/10 font-bold">
                "
              </div>
              
              <div className="relative">
                <p className="text-gray-300 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent-purple flex items-center justify-center text-white font-bold">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
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
