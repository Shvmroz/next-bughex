"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { socialLinks } from "@/lib/mock";
import Image from "next/image";
import { api_contact_us } from "@/DAL/api";

export default function ContactSection({ isPage = false }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api_contact_us(formData);
      if (res && !res.code) {
        setSubmitted(true);
      } else {
        setError(res?.message || "Failed to send message. Please try again.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      data-theme="dark"
      data-nav-blur="true"
      className="w-full bg-[#0A0A0B] relative overflow-hidden pt-24 md:pt-40 pb-24 md:pb-40 font-sans"
    >
      {/* ── BLENDING GRADIENTS ── */}
      {/* Top Blend - Fading in from ScrollTextSection (Black) */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />

      {/* Bottom Blend - Fading out to Footer (#0a0a0f) */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0f] to-transparent z-20 pointer-events-none" />

      {/* ── BACKGROUND ELEMENTS ── */}
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(27,181,162,0.2) 1.5px, transparent 1.5px), 
            linear-gradient(90deg, rgba(27,181,162,0.2) 1.5px, transparent 1.5px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[130px] transition-all duration-[10s] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-display font-bold text-white leading-[1.05]"
              >
                Ready to transform <br />
                <span className="text-primary italic">your ideas?</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-white/50 text-xl font-medium leading-relaxed max-w-lg"
              >
                Partner with us to engineer high-velocity digital solutions that
                redefine industries.
              </motion.p>
            </div>

            {/* Unified Contact Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="inline-flex flex-col sm:flex-row items-center gap-8 sm:gap-10 p-6 sm:p-8 rounded-[2.5rem] bg-black/40 backdrop-blur-md border border-white/5 shadow-2xl"
            >
              {/* Email Region */}
              <a
                href="mailto:hr@thebughex.com"
                className="group flex items-center gap-4"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-primary/20 text-primary transition-transform duration-500 group-hover:scale-110">
                  <Icon icon="solar:letter-bold-duotone" className="text-2xl" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">
                    Email Us
                  </p>
                  <p className="text-white/80 font-medium text-lg leading-none group-hover:text-primary transition-colors">
                    hr@thebughex.com
                  </p>
                </div>
              </a>

              {/* Vertical Divider (Desktop only) */}
              <div className="hidden sm:block w-px h-10 bg-white/10" />

              {/* Social Icons - Footer Style */}
              <div className="flex items-center gap-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-all duration-300 hover:scale-125 active:opacity-70"
                  >
                    <Icon
                      icon={social.icon}
                      width={30}
                      style={{ color: social.hoverColor }}
                    />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative p-1 md:p-2 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 shadow-2xl backdrop-blur-2xl"
            >
              <div className="bg-[#0A0A0B]/80 rounded-[2.5rem] p-8 md:p-12">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ModernInput
                          label="Full Name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="John Doe"
                          required
                        />
                        <ModernInput
                          label="Work Email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="john@company.com"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ModernInput
                          label="Subject"
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              subject: e.target.value,
                            })
                          }
                          placeholder="How can we help?"
                          required
                        />
                        <ModernInput
                          label="Contact Number"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="+44 ..."
                        />
                      </div>

                      <ModernInput
                        label="Tell us about your project"
                        textarea
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Share your goals, timeline and budget..."
                        required
                      />

                      {error && (
                        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-3">
                          <Icon icon="solar:danger-bold" />
                          {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="btn w-fit px-10 h-[52px] group relative overflow-hidden transition-all duration-300 disabled:opacity-50"
                      >
                        <i className="animation" />
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {loading ? (
                            <Icon
                              icon="svg-spinners:ring-resize"
                              className="text-xl"
                            />
                          ) : (
                            <>
                              INITIATE CONTACT
                              <Icon
                                icon="solar:arrow-right-bold"
                                className="group-hover:translate-x-2 transition-transform duration-300"
                              />
                            </>
                          )}
                        </span>
                        <i className="animation" />
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-20 space-y-8"
                    >
                      <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto border border-primary/30">
                        <Icon
                          icon="solar:check-circle-bold-duotone"
                          className="text-5xl text-primary"
                        />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-4xl font-display font-bold text-white">
                          Transmission Received
                        </h3>
                        <p className="text-white/50 text-lg">
                          Our engineering team has received your briefing.{" "}
                          <br /> Expect a response within one standard business
                          day.
                        </p>
                      </div>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="text-primary font-bold text-xs tracking-widest uppercase border-b-2 border-primary/20 hover:border-primary transition-all pb-1"
                      >
                        Send another briefing
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
}

function ModernInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  textarea = false,
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="space-y-2 relative group flex-1">
      <label
        className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
          focused ? "text-primary" : "text-white/20"
        }`}
      >
        {label}{" "}
        {required && <span className="text-primary/50 text-[14px]">*</span>}
      </label>

      <div className="relative">
        {textarea ? (
          <textarea
            rows={5}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 outline-none transition-all duration-500 focus:bg-white/[0.06] focus:border-primary/50 focus:shadow-[0_0_20px_rgba(27,181,162,0.05)] resize-none"
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            className="w-full h-14 bg-white/[0.03] border border-white/10 rounded-2xl px-6 text-white placeholder:text-white/10 outline-none transition-all duration-500 focus:bg-white/[0.06] focus:border-primary/50 focus:shadow-[0_0_20px_rgba(27,181,162,0.05)]"
          />
        )}

        <div
          className={`absolute bottom-px left-1/2 -translate-x-1/2 h-[1px] bg-primary transition-all duration-500 ${
            focused ? "w-[calc(100%-48px)] opacity-100" : "w-0 opacity-0"
          }`}
        />
      </div>
    </div>
  );
}
