import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding bg-dark relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-primary/15 to-accent-purple/15 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10" ref={ref}>
        <div className="glass rounded-3xl border border-gray-800/60 overflow-hidden">
          <div className="grid md:grid-cols-[1fr_auto] gap-0 items-stretch">

            {/* Left: text content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="p-10 md:p-14 lg:p-16"
            >
              <p className="text-xs text-gray-600 uppercase tracking-widest font-medium mb-6">
                Ready to build?
              </p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Let's create something
                <br />
                <span className="gradient-text">exceptional together.</span>
              </h2>
              <p className="text-gray-500 text-lg max-w-lg leading-relaxed">
                Tell us about your project. We'll respond within 24 hours with a plan
                tailored to your goals.
              </p>
            </motion.div>

            {/* Right: action panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-dark-100/50 border-l border-gray-800/60 p-10 md:p-12 flex flex-col justify-center gap-5 min-w-[260px]"
            >
              <a
                href="#contact"
                className="btn-primary inline-flex items-center justify-center gap-2 group text-center"
              >
                Schedule a Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="mailto:contact@bytesmonks.com"
                className="btn-secondary inline-flex items-center justify-center gap-2 text-sm"
              >
                <Mail className="w-4 h-4" />
                Send us an email
              </a>
              <p className="text-xs text-gray-700 text-center">
                24h response · No commitment required
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
