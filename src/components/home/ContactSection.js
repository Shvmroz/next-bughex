'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { contactSectionContent, socialLinks } from '@/lib/mock';

function FormField({ label, type = 'text', placeholder, value, onChange, required, textarea = false }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative w-full">
      <label className={`block text-[10px] font-bold tracking-widest uppercase mb-2 transition-colors duration-300 ${focused ? 'text-primary' : 'text-dark/40'}`}>
        {label} {required && <span className="text-red-400">*</span>}
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
          className="w-full px-5 py-4 rounded-xl bg-primary/5 border border-primary/20 text-dark focus:bg-white focus:border-primary focus:shadow-[0_0_20px_rgba(27,181,162,0.15)] focus:ring-1 focus:ring-primary outline-none transition-all duration-300 resize-none text-base font-medium placeholder-dark/30"
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
          className="w-full px-5 py-4 rounded-xl bg-primary/5 border border-primary/20 text-dark focus:bg-white focus:border-primary focus:shadow-[0_0_20px_rgba(27,181,162,0.15)] focus:ring-1 focus:ring-primary outline-none transition-all duration-300 text-base font-medium placeholder-dark/30"
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
    <section id="contact" className="w-full flex flex-col lg:flex-row relative">

      {/* LEFT PANEL - FULL WIDTH COLORED BRAND BLOCK */}
      <div className={`w-full lg:w-[45%] xl:w-[40%] relative p-8 sm:p-10 lg:p-12 xl:p-16 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#1bb5a2] to-[#118B7A] text-white ${isPage ? 'pt-[160px]' : ''}`}>

        {/* Background Decorative Geometric Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-black/10 rounded-full blur-3xl pointer-events-none -translate-x-1/3 translate-y-1/3" />

        <div className="relative z-10 lg:my-auto">
          <h3 className="font-display text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold leading-[1.05] mb-6">
            Let's build <br className="hidden sm:block" />something <br className="hidden lg:block" />exceptional.
          </h3>
          <p className="text-white/80 font-medium leading-relaxed max-w-sm mb-12 text-lg">
            Whether you need a Flutter app, complex backend, or AI-powered solution, we're here to engineer it.
          </p>

          {/* Contact Information List */}
          <div className="space-y-8">
            {c.contactInfo.filter(info => info.label === 'Email').map((info) => (
              <div key={info.label} className="flex items-center gap-5">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 backdrop-blur-md border border-white/20 shadow-lg">
                  <Icon icon={info.icon} width={24} className="text-white md:w-[28px] md:h-[28px]" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">{info.label}</p>
                  {info.label === 'Email' ? (
                    <a href={`mailto:${info.value}`} className="text-xl md:text-2xl font-bold text-white hover:text-white/80 transition-colors">
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-lg font-bold text-white">{info.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Socials at bottom left */}
        <div className="relative z-10 mt-6 pt-8 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest block">
            Connect Directly
          </p>
          <div className="flex gap-3">
            {allSocials.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white/90 transition-all duration-300 hover:text-white hover:border-white/40 group relative overflow-hidden shadow-sm"
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
      </div>

      {/* RIGHT PANEL - FULL WIDTH FORM ENTRY */}
      <div className={`w-full lg:w-[55%] xl:w-[60%] p-8 sm:p-10 lg:p-12 xl:p-16 relative bg-white flex flex-col justify-center ${isPage ? 'mt-[40px]' : ''}`}>
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 max-w-2xl w-full mx-auto lg:ml-0"
              onSubmit={handleSubmit}
            >
              <div className="mb-3">
                <h4 className="font-display text-3xl md:text-3xl font-bold text-dark mb-1">Send us a message</h4>
                <p className="text-dark/50 font-medium text-sm">Fill out the form and our team will get back to you within 24 hours.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

              {/* Service Selection */}
              <div>
                <label className="block text-[11px] font-bold tracking-widest uppercase text-dark/40 mb-4">
                  I'm interested in...
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {c.serviceOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFormData({ ...formData, service: opt })}
                      className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 border
                        ${formData.service === opt
                          ? 'bg-primary border-primary text-white shadow-md shadow-primary/20 scale-[1.02]'
                          : 'bg-white border-gray-200 text-dark/60 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <FormField
                label="Project Details"
                placeholder="Tell us a little bit about what you're trying to build..."
                textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />

              <div className="pt-0">
                <button type="submit" className="btn w-full h-[46px] text-[11px] tracking-[0.2em] shadow-xl group">
                  <i className="animation"></i>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    SUBMIT INQUIRY
                    <Icon icon="mdi:arrow-right" width={18} className="transition-transform group-hover:translate-x-1" />
                  </span>
                  <i className="animation"></i>
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full min-h-[400px] flex flex-col items-center justify-center text-center max-w-lg mx-auto lg:ml-0"
            >
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-8 relative shadow-[0_0_50px_rgba(27,181,162,0.2)]">
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-50" />
                <Icon icon="mdi:check-bold" width={48} className="relative z-10" />
              </div>
              <h3 className="text-4xl font-display font-bold text-dark mb-4">Message Received!</h3>
              <p className="text-dark/50 font-medium mb-10 text-lg leading-relaxed">
                Thank you for reaching out. We've received your request and our team will get back to you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold text-primary uppercase tracking-[0.2em] border-b-2 border-primary/20 pb-1 hover:text-dark hover:border-dark transition-colors"
              >
                Submit Another Request
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
}
