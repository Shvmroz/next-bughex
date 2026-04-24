'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { contactSectionContent, socialLinks } from '@/lib/mock';

function FormField({ label, type = 'text', placeholder, value, onChange, required, textarea = false }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative w-full">
     <label
  htmlFor={inputId}
  className={`block text-[10px] font-bold tracking-widest uppercase mb-2 transition-colors duration-300 ${
    focused ? "text-primary" : "text-dark/40"
  }`}
>
  {label}
  {required && <span className="text-red-400 ml-1">*</span>}
</label>
      {textarea ? (
        <textarea
          rows={4}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full px-5 py-4 rounded-xl bg-[#F8F9FA] border border-gray-200 text-dark focus:bg-white focus:border-primary focus:shadow-[0_0_0_3px_rgba(27,181,162,0.08)] outline-none transition-all duration-300 resize-none text-sm font-medium placeholder-dark/30"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full px-5 py-4 rounded-xl bg-[#F8F9FA] border border-gray-200 text-dark focus:bg-white focus:border-primary focus:shadow-[0_0_0_3px_rgba(27,181,162,0.08)] outline-none transition-all duration-300 text-sm font-medium placeholder-dark/30"
        />
      )}
    </div>
  );
}

export default function ContactSection({ isPage = false }) {
  const c = contactSectionContent;
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const email = c.contactInfo.find(info => info.label === 'Email')?.value || 'hello@bughex.dev';
  const allSocials = [
    ...socialLinks,
    {
      name: 'Email',
      icon: 'mdi:email',
      href: `mailto:${email}`,
      hoverColor: '#1bb5a2'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="w-full bg-white relative overflow-hidden">

      {/* DECORATIVE TOP BORDER LINE */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className={`max-w-7xl mx-auto px-6 ${isPage ? 'pt-36 pb-24' : 'py-24 md:py-32'}`}>

        {/* SECTION LABEL */}
        <div className="flex items-center gap-3 mb-16">
          <div className="w-8 h-px bg-primary" />
          <span className="text-[10px] font-bold tracking-[0.35em] text-primary uppercase">Get In Touch</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">

          {/* LEFT — HEADLINE + SOCIALS */}
          <div>
            <h2 className="font-display text-4xl md:text-5xl xl:text-6xl font-bold text-dark leading-[1.05] mb-6 tracking-tight">
              Let&apos;s build<br />
              <span className="text-gradient-animated">something</span><br />
              exceptional.
            </h2>
            <p className="text-dark/50 text-lg font-medium leading-relaxed max-w-md mb-12">
              Whether you need a Flutter app, complex backend, or AI-powered solution &mdash; we&apos;re here to engineer it.
            </p>

            {/* SOCIALS — matching footer hover effect */}
            <div>
              <p className="text-[10px] font-bold text-dark/30 uppercase tracking-widest mb-4">Connect</p>
              <div className="flex flex-wrap gap-4">
                {allSocials.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="w-12 h-12 rounded-2xl bg-[#F8F9FA] border border-gray-200 flex items-center justify-center text-dark/40 transition-all duration-300 hover:text-white hover:border-primary/50 group relative overflow-hidden"
                    whileHover={{ y: -5 }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                      style={{ background: social.hoverColor }}
                    />
                    <Icon icon={social.icon} width={22} className="relative z-10" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — FORM */}
          <div className="relative">
            {/* Card frame */}
            <div className="rounded-3xl border border-gray-100 bg-white shadow-[0_8px_60px_rgba(0,0,0,0.06)] p-8 md:p-10">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                    onSubmit={handleSubmit}
                  >
                    <div className="mb-2">
                      <h4 className="font-display text-2xl font-bold text-dark mb-1">Send us a message</h4>
                      <p className="text-dark/40 text-sm font-medium">We&apos;ll get back to you within 24 hours.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-dark/40 mb-3">
                        I&apos;m interested in...
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {c.serviceOptions.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setFormData({ ...formData, service: opt })}
                            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-200 border ${
                              formData.service === opt
                                ? 'bg-primary border-primary text-white shadow-sm'
                                : 'bg-[#F8F9FA] border-gray-200 text-dark/50 hover:border-primary/40 hover:text-primary'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <FormField
                      label="Project Details"
                      placeholder="Tell us what you're trying to build..."
                      textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />

                    <button type="submit" className="btn w-full h-[48px] text-[11px] tracking-[0.2em] shadow-lg group">
                      <i className="animation"></i>
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        SUBMIT INQUIRY
                        <Icon icon="mdi:arrow-right" width={16} className="transition-transform group-hover:translate-x-1" />
                      </span>
                      <i className="animation"></i>
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="min-h-[420px] flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 relative">
                      <div className="absolute inset-0 bg-primary/15 rounded-full animate-ping opacity-40" />
                      <Icon icon="mdi:check-bold" width={40} className="relative z-10" />
                    </div>
                    <h3 className="text-3xl font-display font-bold text-dark mb-3">Message Received!</h3>
                    <p className="text-dark/50 font-medium mb-8 text-base leading-relaxed max-w-sm">
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs font-bold text-primary uppercase tracking-[0.2em] border-b-2 border-primary/20 pb-1 hover:border-primary transition-colors"
                    >
                      Submit Another Request
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Decorative glow behind the card */}
            <div className="absolute -inset-4 bg-primary/3 rounded-[2rem] blur-2xl -z-10 pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}
