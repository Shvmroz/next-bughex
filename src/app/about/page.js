'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Icon } from '@iconify/react';
import Link from 'next/link';

const capabilities = [
  {
    number: '01',
    icon: 'mdi:cellphone-link',
    title: 'Mobile Apps',
    subtitle: 'Flutter & React Native',
    body: 'We engineer high-performance native and cross-platform mobile applications. One codebase, every platform — iOS, Android, Web, and Desktop.',
    tags: ['Flutter', 'React Native', 'Swift', 'Kotlin'],
    accent: '#1bb5a2',
  },
  {
    number: '02',
    icon: 'mdi:web',
    title: 'Web Platforms',
    subtitle: 'React, Next.js & More',
    body: 'From dynamic SPAs to massive enterprise platforms. We build with modern stacks and serverless architectures built to handle global scale.',
    tags: ['React', 'Next.js', 'Node.js', 'Laravel'],
    accent: '#0ea5e9',
  },
  {
    number: '03',
    icon: 'mdi:robot-outline',
    title: 'AI Specialization',
    subtitle: 'LLMs & Automation',
    body: 'Our true differentiator. We integrate intelligent AI — from large language models to complex automation pipelines — positioning you lightyears ahead.',
    tags: ['OpenAI', 'LangChain', 'TensorFlow', 'Python'],
    accent: '#10b981',
  },
  {
    number: '04',
    icon: 'mdi:shield-check-outline',
    title: 'Cybersecurity',
    subtitle: 'Penetration & Hardening',
    body: 'Elite security audits, penetration testing, and hardening for your entire digital infrastructure. We find vulnerabilities before attackers do.',
    tags: ['Pentesting', 'OWASP', 'Audits', 'Compliance'],
    accent: '#f59e0b',
  },
];

const stats = [
  { value: '10+', label: 'Years in Dubai' },
  { value: '150+', label: 'Products Shipped' },
  { value: '50+', label: 'Global Clients' },
  { value: '100%', label: 'Client Satisfaction' },
];

function CapabilityCard({ cap, index, scrollYProgress }) {
  const start = index / capabilities.length;
  const end = (index + 1) / capabilities.length;

  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.04, end - 0.04, end],
    [0, 1, 1, 0]
  );
  const x = useTransform(
    scrollYProgress,
    [start, start + 0.04, end - 0.04, end],
    [-80, 0, 0, 80]
  );
  const scale = useTransform(
    scrollYProgress,
    [start, start + 0.04, end - 0.04, end],
    [0.96, 1, 1, 0.96]
  );

  return (
    <motion.div
      style={{ opacity, x, scale }}
      className="absolute inset-0 flex items-center justify-center px-6"
    >
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-0 rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100">

          {/* LEFT — ICON with looped gradient bg */}
          <div
            className="flex flex-col items-center justify-center p-10 md:p-14 text-white relative overflow-hidden"
          >
            {/* Animated looped gradient background */}
            <div
              className="absolute inset-0 capability-gradient-bg pointer-events-none"
              style={{
                '--accent': cap.accent,
                background: `linear-gradient(135deg, ${cap.accent}ff, ${cap.accent}99, ${cap.accent}cc, ${cap.accent}66, ${cap.accent}ff)`,
                backgroundSize: '300% 300%',
                animation: 'gradientShift 3s ease infinite',
              }}
            />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="w-20 h-20 rounded-3xl bg-white/15 border border-white/25 flex items-center justify-center backdrop-blur-sm shadow-lg">
                <Icon icon={cap.icon} width={40} className="text-white" />
              </div>
              <p className="text-white/70 text-xs font-bold tracking-[0.25em] uppercase text-center">{cap.subtitle}</p>
            </div>
          </div>

          {/* RIGHT — CONTENT */}
          <div className="bg-white p-10 md:p-14 flex flex-col justify-between">
            <div>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-dark mb-4 tracking-tight">
                {cap.title}
              </h3>
              <p className="text-dark/60 text-base md:text-lg leading-relaxed font-medium mb-8">
                {cap.body}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {cap.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 rounded-full border font-bold tracking-wide"
                  style={{
                    borderColor: `${cap.accent}30`,
                    color: cap.accent,
                    background: `${cap.accent}08`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* PROGRESS DOTS */}
        <div className="flex justify-center gap-2 mt-8">
          {capabilities.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === index ? 24 : 6,
                height: 6,
                background: i === index ? cap.accent : '#e5e7eb',
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  // Hero Scroll Story
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  });

  const hOpacity1 = useTransform(heroProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const hY1 = useTransform(heroProgress, [0, 0.25], [0, -50]);

  const hOpacity2 = useTransform(heroProgress, [0.15, 0.25, 0.4, 0.5], [0, 1, 1, 0]);
  const hY2 = useTransform(heroProgress, [0.15, 0.25, 0.4, 0.5], [50, 0, 0, -50]);

  const hOpacity3 = useTransform(heroProgress, [0.4, 0.5, 0.65, 0.75], [0, 1, 1, 0]);
  const hY3 = useTransform(heroProgress, [0.4, 0.5, 0.65, 0.75], [50, 0, 0, -50]);

  const hOpacity4 = useTransform(heroProgress, [0.65, 0.75, 0.9, 0.95], [0, 1, 1, 0]);
  const hY4 = useTransform(heroProgress, [0.65, 0.75, 0.9, 0.95], [50, 0, 0, -50]);

  const hOpacity5 = useTransform(heroProgress, [0.85, 0.95, 1], [0, 1, 1]);
  const hY5 = useTransform(heroProgress, [0.85, 0.95], [50, 0]);

  // Capabilities scroll
  const capRef = useRef(null);
  const { scrollYProgress: capProgressRaw } = useScroll({
    target: capRef,
    offset: ['start start', 'end end'],
  });
  const capProgress = useSpring(capProgressRaw, { stiffness: 300, damping: 80 });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">

        {/* HERO SCROLL STORY */}
        <section ref={heroRef} className="h-[500vh] relative bg-[#FAFBFC]">
          <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden w-full">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(27, 181, 162, 0.08) 0%, transparent 70%)',
              }}
            />
            <div className="absolute inset-0 grid-bg opacity-40 mix-blend-multiply" />

            <div className="relative max-w-5xl mx-auto px-6 text-center z-10 w-full">
              <div className="relative h-[250px] md:h-[200px] w-full max-w-4xl mx-auto flex items-center justify-center">

                <motion.div style={{ opacity: hOpacity1, y: hY1 }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[52px] text-dark/70 font-medium leading-[1.3] text-center">
                    <span className="text-dark font-bold block mb-3 sm:mb-5">BugHex is a premier Dubai-based agency.</span>
                    With 10 years of experience engineering digital solutions for international clients.
                  </p>
                </motion.div>

                <motion.div style={{ opacity: hOpacity2, y: hY2 }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[52px] text-dark/70 font-medium leading-[1.3] text-center">
                    <span className="text-dark font-bold block mb-3 sm:mb-5">We build flawlessly.</span>
                    Specializing in React JS, Native, Flutter, Laravel, Node.js, Python, Raw JS, and elite Cybersecurity.
                  </p>
                </motion.div>

                <motion.div style={{ opacity: hOpacity3, y: hY3 }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[52px] text-dark/70 font-medium leading-[1.3] text-center">
                    <span className="text-dark font-bold block mb-3 sm:mb-5">We architect scale.</span>
                    Every platform we build is meticulously engineered for global reach and massive active user loads.
                  </p>
                </motion.div>

                <motion.div style={{ opacity: hOpacity4, y: hY4 }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[52px] text-dark/70 font-medium leading-[1.3] text-center">
                    <span className="text-dark font-bold block mb-3 sm:mb-5">We lead the future.</span>
                    Pushing the boundaries of modern automation and advanced AI integration.
                  </p>
                </motion.div>

                <motion.div style={{ opacity: hOpacity5, y: hY5 }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[52px] text-dark/70 font-medium leading-[1.3] text-center">
                    <span className="text-dark font-bold block mb-3 sm:mb-5">This is our journey.</span>
                    Keep scrolling to see exactly what powers our market-dominating ecosystem.
                  </p>
                </motion.div>

              </div>
            </div>
          </div>
        </section>

        {/* STATS BAR */}
        <section className="py-16 bg-dark relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/10">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <p className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">{s.value}</p>
                  <p className="text-white/40 text-xs font-bold tracking-widest uppercase">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CORE CAPABILITIES — SCROLL CARDS */}
        <section ref={capRef} className="h-[500vh] bg-[#FAFBFC] relative">
          <div className="sticky top-0 h-screen overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

            {/* Heading */}
            <div className="absolute top-0 left-0 right-0 pt-20 md:pt-28 text-center z-20 pointer-events-none">
              <span className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase mb-4 block">Our Expertise</span>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-dark tracking-tight leading-[1.1]">
                Core <span className="text-gradient-animated">Capabilities</span>
              </h2>
            </div>

            {/* Cards stack */}
            <div className="absolute inset-0 flex items-center justify-center pt-32 md:pt-36">
              {capabilities.map((cap, i) => (
                <CapabilityCard
                  key={cap.number}
                  cap={cap}
                  index={i}
                  scrollYProgress={capProgress}
                />
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
