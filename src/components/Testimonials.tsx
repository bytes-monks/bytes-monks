import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const testimonials = [
  {
    quote:
      'Bytes Monks Handles all of our infrastructure. The technical depth and business understanding they bring is exceptional.',
    author: 'Iheb Lourimi',
    role: 'CEO',
    company: 'DM Nova',
    photo: '/clients/iheb_lourimi.jfif',
    index: '01',
  },
  {
    quote:
      'Working with them felt like having a true technical partner. They delivered our platform on time and exceeded every expectation.',
    author: 'Seif Esslam Bensib',
    role: 'Lead Game Developer',
    company: 'Khotoua',
    photo: null,
    index: '02',
  },
  {
    quote:
      'The quality of code and architecture they produced set a new standard for our engineering team. Highly recommend.',
    author: 'Mootaz Zemmel',
    role: 'Software Engineer',
    company: 'Elbaladya.tn',
    photo: '/clients/mootaz_zemmel.jfif',
    index: '03',
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding bg-dark-200 relative">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />

      <div className="container-custom relative z-10" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-primary" />
            <span className="text-primary text-xs tracking-widest uppercase font-medium">Testimonials</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            What Our{' '}
            <span className="gradient-text">Clients Say</span>
          </h2>
        </motion.div>

        {/* Testimonials — editorial list with dividers */}
        <div className="divide-y divide-gray-800/50">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 22 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.14 }}
              className="group"
            >
              <div className="grid md:grid-cols-[80px_1fr_200px] gap-6 md:gap-10 items-start py-10 md:py-12">

                {/* Index */}
                <div className="font-display text-4xl font-bold text-gray-800/60 group-hover:text-gray-700 transition-colors leading-none select-none">
                  {t.index}
                </div>

                {/* Quote */}
                <div>
                  <div className="font-display text-5xl text-primary/20 leading-none mb-2 select-none">"</div>
                  <p className="text-gray-300 text-lg md:text-xl leading-relaxed group-hover:text-white transition-colors">
                    {t.quote}
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 md:flex-col md:items-start md:pt-8">
                  {t.photo ? (
                    <img
                      src={t.photo}
                      alt={t.author}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {t.author.split(' ').map((n) => n[0]).join('')}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-white text-sm">{t.author}</div>
                    <div className="text-gray-600 text-xs mt-0.5">
                      {t.role}, {t.company}
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
