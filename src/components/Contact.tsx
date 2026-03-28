import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2, Mail, Clock } from 'lucide-react';

const FORM_ENDPOINT = 'https://formgrid.dev/api/f/jjl2cap8';

const projectTypes = [
  'AI / Machine Learning',
  'Web Application',
  'SaaS Platform',
  'Data Engineering',
  'DevOps / Infrastructure',
  'Other',
];

const inputClass =
  'w-full px-4 py-3 bg-dark border border-gray-800 rounded-lg focus:outline-none focus:border-primary/60 transition-colors text-white placeholder-gray-700 text-sm';

const labelClass = 'block text-xs text-gray-500 uppercase tracking-widest font-medium mb-2';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="section-padding bg-dark-200 relative">
      <div className="absolute inset-0 bg-gradient-radial from-accent-purple/5 via-transparent to-transparent" />

      <div className="container-custom relative z-10" ref={ref}>

        <div className="grid lg:grid-cols-[2fr_3fr] gap-16 items-start">

          {/* Left: info panel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-28"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-primary" />
              <span className="text-primary text-xs tracking-widest uppercase font-medium">Contact</span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Let's Start{' '}
              <span className="gradient-text">Building</span>
            </h2>

            <p className="text-gray-500 leading-relaxed mb-10">
              Tell us about your project. We'll review it and respond within 24 hours
              with next steps — no commitment required.
            </p>

            {/* Contact details */}
            <div className="space-y-5 mb-10">
              <a
                href="mailto:contact@bytesmonks.com"
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-dark border border-gray-800 group-hover:border-primary/40 flex items-center justify-center transition-colors flex-shrink-0">
                  <Mail className="w-4 h-4 text-gray-600 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <div className="text-xs text-gray-600 uppercase tracking-widest mb-0.5">Email</div>
                  <div className="text-gray-300 text-sm group-hover:text-white transition-colors">
                    contact@bytesmonks.com
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-dark border border-gray-800 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-600 uppercase tracking-widest mb-0.5">Response time</div>
                  <div className="text-gray-300 text-sm">Within 24 hours</div>
                </div>
              </div>
            </div>

            {/* Social proof */}
            <div className="glass rounded-xl p-5 border border-gray-800/60">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex -space-x-2">
                  {['SC', 'MW', 'ER'].map((init, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent-purple border-2 border-dark flex items-center justify-center text-xs font-bold text-white"
                    >
                      {init}
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-500">Joined 50+ companies</div>
              </div>
              <p className="text-gray-600 text-xs leading-relaxed italic">
                "Working with them felt like having a true technical partner."
              </p>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {status === 'success' ? (
              <div className="glass rounded-2xl p-14 text-center border border-green-500/20">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">Message Sent!</h3>
                <p className="text-gray-500">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 md:p-10 border border-gray-800/60">
                <div className="space-y-6">

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className={labelClass}>Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={inputClass}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass}>Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={inputClass}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="projectType" className={labelClass}>Project Type</label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    >
                      <option value="" disabled>Select a project type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className={`${inputClass} resize-none`}
                      placeholder="Tell us about your project, goals, and timeline..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full btn-primary flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      Something went wrong. Please try again or{' '}
                      <a href="mailto:contact@bytesmonks.com" className="underline hover:text-red-300">
                        email us directly
                      </a>.
                    </div>
                  )}

                  <p className="text-xs text-gray-700 text-center">
                    No spam. No commitment. Just a conversation.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
