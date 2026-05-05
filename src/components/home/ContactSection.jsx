import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { socialLinks } from "@/lib/mock";

const contactSectionContent = {
  preText: "Ready to build?",
  title: "Start Your Project",
  subtitle:
    "Ready to build something extraordinary? Let's talk about your vision.",
  bodyText:
    "Whether you need a Flutter app, a complex backend, or an AI-powered solution, BugHex has the expertise to bring your vision to life. We work with startups and enterprises alike.",
  contactInfo: [
    { icon: "mdi:email-outline", label: "Email", value: "hello@bughex.dev" },
    {
      icon: "mdi:map-marker-outline",
      label: "Location",
      value: "Remote — Worldwide",
    },
    {
      icon: "mdi:clock-outline",
      label: "Response Time",
      value: "Within 24 hours",
    },
  ],
  serviceOptions: [
    "Flutter Development",
    "React Native",
    "JavaScript / React",
    "Laravel / PHP",
    "Node.js Backend",
    "iOS / Android",
    "AI Solutions",
  ],
};

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
          focused ? "text-primary" : "text-dark/40"
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
          className="w-full px-5 py-4 rounded-xl bg-[#F8F9FA] border border-gray-200 text-sm resize-none outline-none focus:bg-white focus:border-primary focus:shadow-[0_0_0_3px_rgba(27,181,162,0.08)] transition"
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
          className="w-full px-5 py-4 rounded-xl bg-[#F8F9FA] border border-gray-200 text-sm outline-none focus:bg-white focus:border-primary focus:shadow-[0_0_0_3px_rgba(27,181,162,0.08)] transition"
        />
      )}
    </div>
  );
}

export default function ContactSection({ isPage = false }) {
  const c = contactSectionContent;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: [],
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [openService, setOpenService] = useState(false);

  const dropdownRef = useRef(null);

  // close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenService(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const email =
    c.contactInfo?.find((i) => i.label === "Email")?.value ||
    "hello@bughex.dev";

  const allSocials = [
    ...(socialLinks || []),
    {
      name: "Email",
      icon: "mdi:email",
      href: `mailto:${email}`,
      hoverColor: "#1bb5a2",
    },
  ];

  return (
    <section id="contact" className="w-full bg-white relative overflow-hidden">
      {/* TOP BORDER */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div
        className={`max-w-7xl mx-auto px-6 ${
          isPage ? "pt-36 pb-24" : "py-16 md:py-32"
        }`}
      >
        {/* SECTION HEADER */}
        <div className="flex items-center gap-3 mb-16">
          <div className="w-8 h-px bg-primary" />
          <span className="text-[10px] font-bold tracking-[0.35em] text-primary uppercase">
            Get In Touch
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
          {/* LEFT SIDE */}
          <div>
            <h2 className="font-display text-4xl md:text-5xl xl:text-6xl font-bold text-dark leading-[1.05] mb-6">
              Let&apos;s build <br />
              <span className="text-gradient-animated">something</span> <br />
              exceptional.
            </h2>

            <p className="text-dark/50 text-lg font-medium leading-relaxed max-w-md mb-12">
              Whether you need a Flutter app, complex backend, or AI-powered
              solution — we’re here to engineer it.
            </p>

            {/* SOCIALS */}
            <div>
              <p className="text-[10px] font-bold text-dark/30 uppercase tracking-widest mb-5">
                Connect With Us
              </p>

              <div className="flex gap-3">
                {allSocials.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ y: -5 }}
                    className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center relative overflow-hidden group"
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
                      style={{ background: social.hoverColor }}
                    />
                    <Icon
                      icon={social.icon}
                      width={22}
                      className="relative z-10 group-hover:text-white transition"
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="relative">
            <div className="bg-white border border-gray-100 rounded-3xl shadow-lg p-4 md:p-8 relative overflow-hidden">

              <AnimatePresence mode="wait">

                {!submitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >

                    {/* NAME + EMAIL */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        label="Full Name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="John Doe"
                        required
                      />

                      <FormField
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    {/* MULTI SELECT DROPDOWN */}
                    <div className="relative" ref={dropdownRef}>
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-dark/40 mb-3">
                        What do you need?
                      </label>

                      {/* BUTTON */}
                      <button
                        type="button"
                        onClick={() => setOpenService(!openService)}
                        className="w-full px-5 py-4 rounded-xl bg-[#F8F9FA] border border-gray-200 text-left text-sm flex justify-between items-center"
                      >
                        {formData.service.length > 0
                          ? formData.service.join(", ")
                          : "Select services"}

                        <Icon
                          icon="mdi:chevron-down"
                          width={18}
                          className={`transition-transform ${
                            openService ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* DROPDOWN */}
                      <AnimatePresence>
                        {openService && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl p-2 max-h-64 overflow-y-auto"
                          >
                            {c.serviceOptions.map((opt) => {
                              const selected =
                                formData.service.includes(opt);

                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => {
                                    setFormData((prev) => {
                                      const exists =
                                        prev.service.includes(opt);

                                      return {
                                        ...prev,
                                        service: exists
                                          ? prev.service.filter(
                                              (s) => s !== opt
                                            )
                                          : [...prev.service, opt],
                                      };
                                    });
                                  }}
                                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition ${
                                    selected
                                      ? "bg-primary/10 text-primary"
                                      : "hover:bg-gray-50 text-dark/70"
                                  }`}
                                >
                                  <span>{opt}</span>

                                  {selected && (
                                    <Icon
                                      icon="mdi:check"
                                      width={18}
                                      className="text-primary"
                                    />
                                  )}
                                </button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* MESSAGE */}
                    <FormField
                      label="Project Details"
                      textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          message: e.target.value,
                        })
                      }
                      placeholder="Describe your idea..."
                      required
                    />

                    {/* YOUR ORIGINAL BUTTON (UNCHANGED) */}
                    <button
                      type="submit"
                      className="btn w-full h-[48px] text-[11px] tracking-[0.2em] shadow-lg group"
                    >
                      <i className="animation"></i>

                      <span className="relative z-10 flex items-center justify-center gap-2">
                        SUBMIT INQUIRY
                        <Icon
                          icon="mdi:arrow-right"
                          width={16}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </span>

                      <i className="animation"></i>
                    </button>

                  </motion.form>
                ) : (
                  <motion.div className="text-center py-20">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon icon="mdi:check-bold" width={40} className="text-primary" />
                    </div>

                    <h3 className="text-3xl font-bold mb-3">
                      Message Received
                    </h3>

                    <p className="text-dark/50 mb-6">
                      We’ll get back to you within 24 hours.
                    </p>

                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-primary text-xs font-bold tracking-[0.2em] uppercase border-b border-primary/30"
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
