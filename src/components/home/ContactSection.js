'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import { SectionHeader } from './ServicesSection';
import { contactSectionContent } from '@/lib/mock';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55, ease: 'easeOut' } }),
};

function FormField({ label, type = 'text', placeholder, value, onChange, required }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label
        className={`block text-xs font-bold uppercase tracking-wider mb-2 transition-colors duration-200 ${focused ? 'text-primary' : 'text-dark/40'}`}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 py-3.5 rounded-xl bg-white border-2 text-dark/80 text-sm focus:outline-none transition-all duration-300 placeholder-dark/20 font-medium"
        style={{
          borderColor: focused ? 'var(--primary)' : '#e5e7eb',
          boxShadow: focused ? '0 0 0 3px rgba(27,181,162,0.08)' : 'none',
        }}
      />
    </div>
  );
}

export default function ContactSection() {
  const c = contactSectionContent;
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-32 bg-[#f8f9fa] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 80% 50%, rgba(27,181,162,0.05) 0%, transparent 70%)',
        }}
      />
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Pre-text scroll reveal */}
        <motion.p
          className="text-center text-xs font-bold tracking-[0.3em] text-primary uppercase mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {c.preText}
        </motion.p>

        <SectionHeader
          title={c.title}
          subtitle={c.subtitle}
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

          {/* LEFT — Info */}
          <motion.div
            className="lg:col-span-2"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.h3 variants={fadeUp} custom={0} className="font-display font-bold text-2xl text-dark mb-4">
              {c.title}
            </motion.h3>
            <motion.p variants={fadeUp} custom={1} className="text-dark/60 leading-relaxed mb-8 font-medium text-sm">
              {c.bodyText}
            </motion.p>

            <div className="space-y-5">
              {c.contactInfo.map((item, i) => (
                <motion.div key={item.label} variants={fadeUp} custom={i + 2} className="flex items-center gap-4 group">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
                    style={{
                      background: 'rgba(27, 181, 162, 0.1)',
                      border: '1px solid rgba(27, 181, 162, 0.15)',
                    }}
                  >
                    <Icon icon={item.icon} width={22} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-dark/30 uppercase tracking-wider font-bold">{item.label}</p>
                    <p className="text-dark font-bold">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  className="rounded-2xl p-8 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
                  style={{ border: '1px solid #f1f3f5' }}
                >
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        label="Name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                      <FormField
                        label="Email"
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <label
                        className={`block text-xs font-bold uppercase tracking-wider mb-2 transition-colors duration-200 ${focusedField === 'service' ? 'text-primary' : 'text-dark/40'}`}
                      >
                        Service Needed
                      </label>
                      <select
                        className="w-full px-4 py-3.5 rounded-xl bg-white border-2 text-dark/70 text-sm focus:outline-none transition-all duration-300 font-medium"
                        style={{
                          borderColor: focusedField === 'service' ? 'var(--primary)' : '#e5e7eb',
                          boxShadow: focusedField === 'service' ? '0 0 0 3px rgba(27,181,162,0.08)' : 'none',
                        }}
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        onFocus={() => setFocusedField('service')}
                        onBlur={() => setFocusedField(null)}
                      >
                        <option value="">Select a service...</option>
                        {c.serviceOptions.map((opt) => (
                          <option key={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        className={`block text-xs font-bold uppercase tracking-wider mb-2 transition-colors duration-200 ${focusedField === 'message' ? 'text-primary' : 'text-dark/40'}`}
                      >
                        Message
                      </label>
                      <textarea
                        rows={5}
                        placeholder="Tell us about your project..."
                        className="w-full px-4 py-3.5 rounded-xl bg-white border-2 text-dark/70 text-sm focus:outline-none transition-all duration-300 resize-none font-medium placeholder-dark/20"
                        style={{
                          borderColor: focusedField === 'message' ? 'var(--primary)' : '#e5e7eb',
                          boxShadow: focusedField === 'message' ? '0 0 0 3px rgba(27,181,162,0.08)' : 'none',
                        }}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        required
                      />
                    </div>

                    <button type="submit" className="btn w-full justify-center">
                      <i className="animation"></i>
                      Send Message
                      <i className="animation"></i>
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="text-center py-16 px-8 rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(27,181,162,0.06), rgba(27,181,162,0.02))',
                    border: '1px solid rgba(27,181,162,0.15)',
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center text-2xl font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #1bb5a2, #13a796)' }}
                  >
                    ✓
                  </motion.div>
                  <h3 className="font-display font-bold text-xl text-dark mb-2">{c.successTitle}</h3>
                  <p className="text-dark/50 font-medium">{c.successSubtext}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
