'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { SectionHeader } from './ServicesSection';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          title="Start Your Project"
          subtitle="Ready to build something extraordinary? Let's talk about your vision."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-display font-bold text-2xl text-dark mb-6">
              Let&apos;s Build Together
            </h3>
            <p className="text-dark/60 leading-relaxed mb-8 font-medium">
              Whether you need a Flutter app, a complex backend, or an AI-powered solution, BugHex has the expertise to bring your vision to life. We work with startups and enterprises alike.
            </p>

            <div className="space-y-6">
              {[
                { icon: '📧', label: 'Email', value: 'hello@bughex.dev' },
                { icon: '📍', label: 'Location', value: 'Remote — Worldwide' },
                { icon: '⏱', label: 'Response Time', value: 'Within 24 hours' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                    style={{
                      background: 'rgba(19, 167, 150, 0.1)',
                      border: '1px solid rgba(19, 167, 150, 0.2)',
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-dark/30 uppercase tracking-wider font-bold">{item.label}</p>
                    <p className="text-dark font-bold font-inter">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label="Name"
                    type="text"
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
                  <label className="block text-xs text-dark/50 mb-2 uppercase tracking-wider font-bold">Service Needed</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#dee2e6] text-dark/70 text-sm focus:outline-none focus:border-primary/50 transition-colors shadow-sm font-medium"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  >
                    <option value="">Select a service</option>
                    <option>Flutter Development</option>
                    <option>React Native</option>
                    <option>JavaScript / React</option>
                    <option>Laravel / PHP</option>
                    <option>Node.js Backend</option>
                    <option>iOS / Android</option>
                    <option>AI Solutions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-dark/50 mb-2 uppercase tracking-wider font-bold">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us about your project..."
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#dee2e6] text-dark/70 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none shadow-sm font-medium"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="btn w-full">
                  <i className="animation"></i>
                  Send Message →
                  <i className="animation"></i>
                </button>
              </form>
            ) : (
              <motion.div
                className="text-center py-16 px-8 rounded-2xl border border-primary/20 bg-primary/5 shadow-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="text-5xl mb-4 text-primary">✓</div>
                <h3 className="font-display font-bold text-xl text-dark mb-2">Message Sent!</h3>
                <p className="text-dark/50 font-medium">We&apos;ll get back to you within 24 hours.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FormField({ label, type, placeholder, value, onChange, required }) {
  return (
    <div>
      <label className="block text-xs text-dark/50 mb-2 uppercase tracking-wider font-bold">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 rounded-xl bg-white border border-[#dee2e6] text-dark/70 text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder-dark/20 shadow-sm font-medium"
      />
    </div>
  );
}
