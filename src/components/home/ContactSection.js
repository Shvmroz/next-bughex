'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import SectionHeader from './SectionHeader';
import { contactSectionContent, socialLinks } from '@/lib/mock';

const allSocials = [
  ...socialLinks,
  {
    name: 'Email',
    icon: 'mdi:email',
    href: 'mailto:hello@bughex.dev',
    hoverColor: '#1bb5a2',
  },
];

function FormField({ label, type = 'text', placeholder, value, onChange, required, textarea = false }) {
  const [focused, setFocused] = useState(false);

  const borderClass = focused
    ? 'border-primary'
    : 'border-gray-200 hover:border-dark/20';

  return (
    <div className="relative pt-2">
      <div
        className={`absolute left-4 transition-all duration-200 pointer-events-none z-10 px-1 bg-white
          ${focused || value ? '-top-2 text-xs font-bold' : 'top-4 text-sm font-medium'}
          ${focused ? 'text-primary' : 'text-dark/40'}`}
      >
        {label}
      </div>
      {textarea ? (
        <textarea
          rows={5}
          placeholder={focused ? placeholder : ''}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full px-4 py-4 rounded-xl bg-white border-2 text-dark text-sm focus:outline-none transition-all duration-200 resize-none ${borderClass}`}
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
          className={`w-full px-4 py-4 rounded-xl bg-white border-2 text-dark text-sm focus:outline-none transition-all duration-200 ${borderClass}`}
        />
      )}
    </div>
  );
}

export default function ContactSection({ isPage = false }) {
  const c = contactSectionContent;
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className={`relative overflow-hidden bg-[#fafafa] ${isPage ? 'pt-36 pb-24' : 'py-24'}`}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(27,181,162,0.06) 0%, transparent 70%)',
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {isPage && (
          <div className="text-center mb-20">
            <motion.p
              className="text-xs font-bold tracking-[0.35em] text-primary uppercase mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Partner with us
            </motion.p>
            <motion.h1
              className="font-display text-5xl md:text-7xl font-bold text-dark mb-5 tracking-tight leading-[1.05]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Let&apos;s Build{' '}
              <span className="text-gradient-animated">Together</span>
            </motion.h1>
            <motion.p
              className="text-dark/50 text-lg font-medium max-w-xl mx-auto"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Have a vision or a complex problem? We engineer the solution. Reach out and let&apos;s talk.
            </motion.p>
          </div>
        )}

        {!isPage && (
          <SectionHeader
            tag="Partner with us"
            title="Start Your Project"
            subtitle="Join the elite brands that trust BugHex for high-performance engineering."
            dark={false}
          />
        )}

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* INFO SIDE */}
          <motion.div
            className="lg:col-span-4 space-y-10"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[11px] font-bold text-primary uppercase tracking-widest font-display">
                  Let&apos;s talk business
                </span>
              </div>
              <h3 className="text-3xl font-display font-bold text-dark leading-[1.15]">
                Accelerate your <br />
                <span className="text-primary italic">digital roadmap</span>
              </h3>
              <p className="text-dark/55 leading-relaxed font-medium text-base">
                Have a vision or a complex problem? We&apos;re here to engineer the solution. Reach out
                directly or find us on social media.
              </p>
            </div>

            {/* Email card */}
            <div className="p-7 rounded-3xl bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] group hover:border-primary/30 transition-all duration-500">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-primary text-white shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-500">
                  <Icon icon="mdi:email" width={26} />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-dark/30 uppercase tracking-widest mb-1">
                    Email directly
                  </h4>
                  <a
                    href="mailto:hello@bughex.dev"
                    className="text-xl font-bold text-dark hover:text-primary transition-colors block"
                  >
                    hello@bughex.dev
                  </a>
                </div>
              </div>
            </div>

            {/* Connectivity — Footer-style icons */}
            <div className="space-y-5">
              <p className="text-[11px] font-bold text-dark/30 uppercase tracking-[0.4em] ml-1">
                Connectivity
              </p>
              <div className="flex flex-wrap gap-4">
                {allSocials.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-dark/30 transition-all duration-300 hover:text-white hover:border-primary/50 group relative overflow-hidden shadow-sm"
                    whileHover={{ y: -4 }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                      style={{ background: social.hoverColor }}
                    />
                    <Icon icon={social.icon} width={20} className="relative z-10" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Info list */}
            <div className="space-y-4 pt-2">
              {c.contactInfo.map((info) => (
                <div key={info.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon icon={info.icon} width={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-dark/30 uppercase tracking-widest">{info.label}</p>
                    <p className="text-sm font-semibold text-dark/70">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* FORM SIDE */}
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
                  <div className="mb-8">
                    <h3 className="font-display font-bold text-2xl text-dark mb-1">Send Us a Message</h3>
                    <p className="text-dark/40 text-sm font-medium">Fill out the form and we&apos;ll respond within 24 hours.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-7">
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
                      <label className="text-[11px] font-bold uppercase tracking-widest text-dark/40 ml-1">
                        What can we help with?
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {c.serviceOptions.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setFormData({ ...formData, service: opt })}
                            className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 border-2
                              ${formData.service === opt
                                ? 'bg-primary/10 border-primary text-primary'
                                : 'bg-white border-gray-100 text-dark/40 hover:border-primary/30 hover:text-primary'
                              }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <FormField
                      label="Your Message"
                      placeholder="Tell us about your project goals..."
                      textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />

                    <button type="submit" className="btn w-full justify-center">
                      <i className="animation"></i>
                      SEND MESSAGE
                      <i className="animation"></i>
                    </button>
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
                  <h3 className="text-2xl font-bold text-dark mb-2">Message Sent!</h3>
                  <p className="text-dark/40 font-medium max-w-xs mx-auto">
                    We&apos;ll be in touch within 24 hours.
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
