'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { contactPageContent } from '@/lib/mock';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' } }),
};

function AnimatedText({ text, className, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {text}
    </motion.span>
  );
}

function FormField({ label, type = 'text', placeholder, value, onChange, required }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative">
      <label
        className={`block text-xs font-bold uppercase tracking-wider mb-2 transition-colors duration-200 ${focused ? 'text-primary' : 'text-dark/40'}`}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full px-5 py-4 rounded-2xl bg-white border-2 text-dark/80 text-sm focus:outline-none transition-all duration-300 placeholder-dark/20 font-medium"
          style={{
            borderColor: focused ? 'var(--primary)' : '#e5e7eb',
            boxShadow: focused ? '0 0 0 4px rgba(27,181,162,0.08)' : 'none',
          }}
        />
      </div>
    </div>
  );
}

export default function ContactPage() {
  const c = contactPageContent;
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  const heroRef = useRef(null);
  const formRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const formInView = useInView(formRef, { once: true, margin: '-80px' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">

        {/* ── HERO ────────────────────────────── */}
        <section ref={heroRef} className="relative pt-36 pb-24 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(27,181,162,0.09) 0%, transparent 70%)',
            }}
          />
          <div className="absolute inset-0 grid-bg opacity-20" />

          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div
              className="max-w-3xl"
              initial="hidden"
              animate={heroInView ? 'visible' : 'hidden'}
            >
              <motion.p
                variants={fadeUp}
                custom={0}
                className="text-xs font-bold tracking-[0.3em] text-primary uppercase mb-4"
              >
                {c.preText}
              </motion.p>
              <motion.h1
                variants={fadeUp}
                custom={1}
                className="font-display font-bold text-5xl md:text-7xl text-dark tracking-tight mb-6 leading-none"
              >
                {c.title}{' '}
                <span className="text-gradient-animated">{c.titleHighlight}</span>
              </motion.h1>
              <motion.p variants={fadeUp} custom={2} className="text-dark/50 text-lg font-medium max-w-xl">
                {c.subtitle}
              </motion.p>
            </motion.div>
          </div>

          {/* Floating decorative orbs */}
          <motion.div
            className="absolute top-20 right-10 w-72 h-72 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(27,181,162,0.06) 0%, transparent 70%)' }}
            animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-10 right-1/4 w-48 h-48 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(27,181,162,0.04) 0%, transparent 70%)' }}
            animate={{ y: [0, 15, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </section>

        {/* ── FORM + INFO ─────────────────────── */}
        <section ref={formRef} className="pb-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

              {/* LEFT — Info */}
              <motion.div
                className="lg:col-span-2"
                initial="hidden"
                animate={formInView ? 'visible' : 'hidden'}
              >
                <motion.div variants={fadeUp} custom={0} className="mb-10">
                  <p className="text-xs font-bold tracking-[0.3em] text-primary uppercase mb-3">{c.infoTitle}</p>
                  <h2 className="font-display font-bold text-3xl text-dark mb-4 tracking-tight">{c.formTitle}</h2>
                  <p className="text-dark/50 font-medium leading-relaxed">{c.infoBody}</p>
                </motion.div>

                <div className="space-y-6">
                  {c.contactInfo.map((item, i) => (
                    <motion.div
                      key={item.label}
                      variants={fadeUp}
                      custom={i + 1}
                      className="flex items-center gap-5 group"
                    >
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
                        style={{
                          background: 'linear-gradient(135deg, rgba(27,181,162,0.12), rgba(27,181,162,0.04))',
                          border: '1px solid rgba(27,181,162,0.15)',
                        }}
                      >
                        <Icon icon={item.icon} width={24} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-dark/30 uppercase tracking-wider font-bold mb-0.5">{item.label}</p>
                        <p className="text-dark font-bold text-base">{item.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Decorative stat card */}
                <motion.div
                  variants={fadeUp}
                  custom={4}
                  className="mt-12 p-6 rounded-3xl relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(27,181,162,0.08), rgba(27,181,162,0.02))',
                    border: '1px solid rgba(27,181,162,0.12)',
                  }}
                >
                  <div className="absolute inset-0 grid-bg opacity-20" />
                  <div className="relative z-10 flex gap-8">
                    {[{ val: '24h', label: 'Response Time' }, { val: '150+', label: 'Projects Done' }, { val: '100%', label: 'Satisfaction' }].map((s) => (
                      <div key={s.label} className="text-center flex-1">
                        <p className="font-display font-bold text-2xl text-primary">{s.val}</p>
                        <p className="text-xs text-dark/40 mt-1 font-bold">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* RIGHT — Form */}
              <motion.div
                className="lg:col-span-3"
                initial="hidden"
                animate={formInView ? 'visible' : 'hidden'}
              >
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div
                      key="form"
                      variants={fadeUp}
                      custom={0}
                      className="rounded-3xl p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
                      style={{ border: '1px solid #f1f3f5', background: '#fff' }}
                    >
                      <div className="mb-8">
                        <p className="text-xs font-bold tracking-[0.3em] text-primary uppercase mb-2">
                          {c.formSubtitle}
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <FormField
                            label="Your Name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                          />
                          <FormField
                            label="Email Address"
                            type="email"
                            placeholder="john@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                          />
                        </div>

                        <div className="relative">
                          <label
                            className={`block text-xs font-bold uppercase tracking-wider mb-2 transition-colors duration-200 ${focused === 'service' ? 'text-primary' : 'text-dark/40'}`}
                          >
                            Service Needed
                          </label>
                          <select
                            className="w-full px-5 py-4 rounded-2xl bg-white border-2 text-dark/70 text-sm focus:outline-none transition-all duration-300 font-medium appearance-none cursor-pointer"
                            style={{
                              borderColor: focused === 'service' ? 'var(--primary)' : '#e5e7eb',
                              boxShadow: focused === 'service' ? '0 0 0 4px rgba(27,181,162,0.08)' : 'none',
                            }}
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            onFocus={() => setFocused('service')}
                            onBlur={() => setFocused(null)}
                          >
                            <option value="">Select a service...</option>
                            {c.serviceOptions.map((opt) => (
                              <option key={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>

                        <div className="relative">
                          <label
                            className={`block text-xs font-bold uppercase tracking-wider mb-2 transition-colors duration-200 ${focused === 'message' ? 'text-primary' : 'text-dark/40'}`}
                          >
                            Your Message
                          </label>
                          <textarea
                            rows={6}
                            placeholder="Tell us about your project, goals, and timeline..."
                            className="w-full px-5 py-4 rounded-2xl bg-white border-2 text-dark/70 text-sm focus:outline-none transition-all duration-300 resize-none font-medium placeholder-dark/20"
                            style={{
                              borderColor: focused === 'message' ? 'var(--primary)' : '#e5e7eb',
                              boxShadow: focused === 'message' ? '0 0 0 4px rgba(27,181,162,0.08)' : 'none',
                            }}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            onFocus={() => setFocused('message')}
                            onBlur={() => setFocused(null)}
                            required
                          />
                        </div>

                        <motion.button
                          type="submit"
                          className="btn w-full justify-center text-sm py-4 rounded-2xl"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <i className="animation"></i>
                          Send Message
                          <i className="animation"></i>
                        </motion.button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="rounded-3xl p-16 text-center"
                      style={{
                        background: 'linear-gradient(135deg, rgba(27,181,162,0.06), rgba(27,181,162,0.02))',
                        border: '1px solid rgba(27,181,162,0.15)',
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl"
                        style={{ background: 'linear-gradient(135deg, #1bb5a2, #13a796)' }}
                      >
                        <span className="text-white font-bold">✓</span>
                      </motion.div>
                      <h3 className="font-display font-bold text-2xl text-dark mb-3">{c.successTitle}</h3>
                      <p className="text-dark/50 font-medium">{c.successSubtext}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
