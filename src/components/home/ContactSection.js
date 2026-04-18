'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import SectionHeader from './SectionHeader';
import { contactSectionContent, stats } from '@/lib/mock';

function FormField({ label, type = 'text', placeholder, value, onChange, required, textarea = false }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative pt-2">
      <div
        className={`absolute left-4 transition-all duration-200 pointer-events-none z-10 px-1 bg-white
          ${focused || value ? '-top-2 text-xs font-bold' : 'top-4 text-sm font-medium'}
          ${focused ? 'text-primary' : 'text-dark/40'}`}
      >
        {label}
      </div>
      <div className="relative">
        {textarea ? (
          <textarea
            rows={5}
            placeholder={focused ? placeholder : ''}
            value={value}
            onChange={onChange}
            required={required}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`w-full px-4 py-4 rounded-xl bg-white border-2 text-dark text-sm focus:outline-none transition-all duration-200 resize-none
              ${focused ? 'border-primary' : 'border-gray-200 hover:border-dark/20'}`}
          />
        ) : (
          <input
            type={type}
            placeholder={focused ? placeholder : ''}
            value={value}
            onChange={onChange}
            required={required}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`w-full px-4 py-4 rounded-xl bg-white border-2 text-dark text-sm focus:outline-none transition-all duration-200
              ${focused ? 'border-primary' : 'border-gray-200 hover:border-dark/20'}`}
          />
        )}
      </div>
    </div>
  );
}

export default function ContactSection() {
  const c = contactSectionContent;
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#fafafa] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader
          tag="Partner with us"
          title="Start Your Project"
          subtitle="Join the elite brands that trust BugHex for high-performance engineering."
          dark={false}
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* INFO SIDE (Simplified & Focused) */}
          <div className="lg:col-span-4 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[11px] font-bold text-primary uppercase tracking-widest font-display">Let's talk business</span>
              </div>
              <h3 className="text-4xl font-display font-bold text-dark leading-[1.1]">
                Accelerate your <br /> <span className="text-primary italic">digital roadmap</span>
              </h3>
              <p className="text-dark/60 leading-relaxed font-medium text-lg">
                Have a vision or a complex problem? We're here to engineer the solution. Reach out directly or find us on social media.
              </p>
            </div>

            {/* Main Email Action */}
            <div className="p-8 rounded-3xl bg-white border-2 border-gray-50 shadow-[0_10px_40px_rgba(0,0,0,0.02)] group hover:border-primary/30 transition-all duration-500">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-primary text-white shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-500">
                  <Icon icon="mdi:email" width={26} />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-dark/30 uppercase tracking-widest mb-1">Email directly</h4>
                  <a href="mailto:hello@bughex.dev" className="text-2xl font-bold text-dark hover:text-primary transition-colors block">
                    hello@bughex.dev
                  </a>
                </div>
              </div>
            </div>

            {/* Social Connectivity Panel */}
            <div className="space-y-5 pt-4">
              <p className="text-[11px] font-bold text-dark/30 uppercase tracking-[0.4em] ml-1">Connectivity</p>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: 'mdi:facebook', href: '#' },
                  { icon: 'mdi:instagram', href: '#' },
                  { icon: 'mdi:linkedin', href: '#' },
                  { icon: 'mdi:email-outline', href: 'mailto:hello@bughex.dev' }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className="w-14 h-14 rounded-2xl bg-white border-2 border-gray-100 flex items-center justify-center text-dark/40 hover:text-primary hover:border-primary/50 hover:bg-primary/[0.02] shadow-sm hover:shadow-md transition-all duration-300 group"
                  >
                    <Icon icon={social.icon} width={24} className="group-hover:scale-110 transition-transform duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* FORM SIDE (Material Card) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-white p-8 md:p-12 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100"
                >
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        label="Full Name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                      <FormField
                        label="Email Address"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-dark/40 ml-1">What can we help with?</label>
                      <div className="flex flex-wrap gap-2">
                        {c.serviceOptions.map(opt => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setFormData({ ...formData, service: opt })}
                            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-200 border-2
                                      ${formData.service === opt
                                ? 'bg-primary/10 border-primary text-primary'
                                : 'bg-white border-gray-100 text-dark/40 hover:border-dark/10 hover:bg-gray-50'}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <FormField
                      label="Your Message"
                      placeholder="Tell us about your project goals..."
                      textarea={true}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />

                    <motion.button
                      type="submit"
                      className="relative w-full py-4 rounded-xl bg-primary text-black font-bold uppercase tracking-[0.2em] text-xs shadow-lg shadow-primary/20 overflow-hidden"
                      whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(27,181,162,0.3)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-center gap-2">
                        Send Message
                        <Icon icon="mdi:send" width={16} />
                      </div>
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-gray-100 p-20 rounded-3xl text-center shadow-lg"
                >
                  <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon icon="mdi:check-bold" width={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-dark mb-2">Message Sent</h3>
                  <p className="text-dark/40 font-medium max-w-xs mx-auto">
                    We'll be in touch within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-primary font-bold text-xs uppercase tracking-widest hover:underline"
                  >
                    Go Back
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
