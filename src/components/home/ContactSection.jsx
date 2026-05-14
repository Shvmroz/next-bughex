"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { socialLinks } from "@/lib/mock";
import Image from "next/image";
import { api_contact_us } from "@/DAL/api";

function FormField({
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
    <div className="relative w-full">
      <label
        className={`block text-[10px] font-bold tracking-widest uppercase mb-2 transition ${
          focused ? "text-primary" : "text-white/50"
        }`}
      >
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
          className="w-full px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-sm text-white outline-none focus:bg-white/15 focus:border-primary focus:shadow-[0_0_0_3px_rgba(27,181,162,0.2)] transition placeholder:text-white/50 resize-none"
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
          className="w-full px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-sm text-white outline-none focus:bg-white/15 focus:border-primary focus:shadow-[0_0_0_3px_rgba(27,181,162,0.2)] transition placeholder:text-white/50"
        />
      )}
    </div>
  );
}

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
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const email = "hr@thebughex.com";

  return (
    <section
      id="contact"
      data-theme="dark"
      data-nav-blur="true"
      className="w-full bg-white relative overflow-hidden"
    >
      {/* TOP BORDER */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div
        className={`max-w-7xl mx-auto px-6 ${
          isPage ? "pt-36 pb-24" : "py-16 md:py-32"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">

          {/* ── LEFT — text info ── */}
          <div>
            <h2 className="font-display text-4xl md:text-5xl xl:text-6xl font-bold text-dark leading-[1.05] mb-6">
              Let&apos;s build <br />
              <span className="text-gradient-animated">something</span> <br />
              exceptional.
            </h2>

            <p className="text-dark/50 text-lg font-medium leading-relaxed max-w-md mb-12">
              Whether you need a Flutter app, complex backend, or AI-powered
              solution — we&apos;re here to engineer it.
            </p>

            {/* SOCIALS */}
            <div className="space-y-4">
              <p className="text-[10px] font-bold text-dark/30 uppercase tracking-[0.3em]">
                Connect With Us
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-3 md:gap-x-5 md:gap-y-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-all duration-300 hover:scale-110 active:opacity-70"
                  >
                    <Icon
                      icon={social.icon}
                      className="w-5 h-5 md:w-[30px] md:h-[30px]"
                      style={{ color: social.hoverColor }}
                    />
                  </a>
                ))}
                <span className="text-[10px] text-dark/30 uppercase font-bold px-1 md:px-2">
                  or
                </span>
                <a
                  href={`mailto:${email}`}
                  className="group flex items-center gap-2 md:gap-3 text-dark/60 hover:text-primary transition-all duration-300 font-medium text-sm md:text-lg"
                >
                  <Image
                    src="/bughex-logo.png"
                    width={25}
                    height={25}
                    className="w-[18px] h-[18px] md:w-[25px] md:h-[25px] object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                    alt="Bughex"
                  />
                  {email}
                </a>
              </div>
            </div>
          </div>

          {/* ── RIGHT — video bg + glass form ── */}
          <div className="relative rounded-3xl overflow-hidden">

            {/* Video background */}
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/video/building.mp4" type="video/mp4" />
            </video>

            {/* Dark overlay so form is readable */}
            <div className="absolute inset-0 bg-dark/60" />

            {/* Form content sits on top */}
            <div className="relative z-10 px-4 py-6 md:p-8">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {error && (
                      <div className="p-4 bg-red-500/10 border border-red-400/30 rounded-xl text-red-300 text-sm flex items-center gap-3">
                        <Icon icon="mdi:alert-circle" width={20} />
                        {error}
                      </div>
                    )}

                    {/* NAME */}
                    <FormField
                      label="Full Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Enter your name"
                      required
                    />

                    {/* EMAIL + PHONE */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="e.g. your@name.com"
                        required
                      />
                      <FormField
                        label="Phone Number"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="e.g. +44 123 456 7890"
                        required
                      />
                    </div>

                    {/* SUBJECT */}
                    <FormField
                      label="Subject"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder="e.g. Mobile App, UI/UX Design"
                      required
                    />

                    {/* MESSAGE */}
                    <FormField
                      label="Project Details"
                      textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Tell us about your project or idea.."
                      required
                    />

                    <button
                      type="submit"
                      disabled={loading}
                      className={`btn w-full h-[48px] text-[11px] tracking-[0.2em] shadow-lg group ${
                        loading ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      <i className="animation"></i>
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {loading ? (
                          <>
                            <Icon icon="mdi:loading" className="animate-spin" width={16} />
                            SENDING...
                          </>
                        ) : (
                          <>
                            SUBMIT INQUIRY
                            <Icon
                              icon="mdi:arrow-right"
                              width={16}
                              className="transition-transform group-hover:translate-x-1"
                            />
                          </>
                        )}
                      </span>
                      <i className="animation"></i>
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                  >
                    <div className="w-20 h-20 bg-primary/20 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon icon="mdi:check-bold" width={40} className="text-primary" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">Message Received</h3>
                    <p className="text-white/50 mb-6">Our team will contact you shortly.</p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", email: "", subject: "", message: "", phone: "" });
                      }}
                      className="text-primary hover:text-teal-400 text-xs font-bold tracking-[0.2em] uppercase border-b border-primary/30 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
