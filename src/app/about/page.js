'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Icon } from '@iconify/react';
import Link from 'next/link';

export default function AboutPage() {
  // Hero Scroll Story
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"]
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

  // Horizontal Timeline Core
  const timelineRef = useRef(null);
  const { scrollYProgress: timelineProgressRaw } = useScroll({
    target: timelineRef,
    offset: ["start start", "end end"]
  });

  // Smoothing the scroll to x
  const timelineProgress = useSpring(timelineProgressRaw, { stiffness: 400, damping: 90 });
  const x = useTransform(timelineProgress, [0, 1], ["0%", "-66.66%"]);
  // "when scroll in the middel zoom out"
  const scale = useTransform(timelineProgress, [0, 0.5, 1], [1, 0.85, 1]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">

        {/* HERO SECTION - 5 STEP SCROLL STORY */}
        <section ref={heroRef} className="h-[500vh] relative bg-[#FAFBFC]">
          <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden w-full">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(27, 181, 162, 0.08) 0%, transparent 70%)',
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

        {/* CORE EXPERTISE - HORIZONTAL TIMELINE */}
        <section ref={timelineRef} className="h-[400vh] bg-white relative">
          <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden w-full bg-white z-10">
            <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

            <div className="w-full absolute top-20 md:top-24 left-0 text-center z-20 px-6">
              <span className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase mb-4 block">Our Expertise</span>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-dark mb-4 tracking-tight leading-[1.1]">
                Core <span className="text-gradient-animated">Capabilities</span>
              </h2>
            </div>

            <motion.div style={{ scale }} className="w-full h-[60vh] flex items-center mt-48 md:mt-32">
              <motion.div style={{ x }} className="flex gap-16 md:gap-32 px-[10vw] md:px-[20vw] w-[300vw] items-center h-full relative">

                {/* THE JOURNEY LINE */}
                <div className="absolute top-1/2 left-0 w-full h-px bg-gray-100 -translate-y-1/2 z-0" />

                {/* ITEM 1 */}
                <div className="w-[85vw] md:w-[65vw] max-w-5xl flex-shrink-0 flex flex-col md:flex-row bg-[#FAFBFC] border border-gray-100 rounded-[3rem] shadow-sm hover:bg-white hover:shadow-2xl hover:border-primary/20 transition-all duration-500 group relative z-10 overflow-hidden">
                  <div className="w-full md:w-1/3 min-h-[200px] md:min-h-0 bg-white flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 group-hover:bg-primary/5 transition-all duration-500">
                    <Icon icon="mdi:cellphone-link" width={96} className="text-dark/20 group-hover:text-primary transition-all duration-500" />
                  </div>
                  <div className="flex-1 p-8 md:p-14 text-center md:text-left flex flex-col justify-center">
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-dark mb-4 group-hover:text-primary transition-colors">Mobile Apps</h3>
                    <p className="text-dark/60 font-medium text-base md:text-lg leading-relaxed">
                      We engineer high-performance native and cross-platform mobile applications using Flutter, React Native, iOS, and Android to create seamless user experiences that dominate app stores.
                    </p>
                  </div>
                </div>

                {/* ITEM 2 */}
                <div className="w-[85vw] md:w-[65vw] max-w-5xl flex-shrink-0 flex flex-col md:flex-row bg-[#FAFBFC] border border-gray-100 rounded-[3rem] shadow-sm hover:bg-white hover:shadow-2xl hover:border-primary/20 transition-all duration-500 group relative z-10 overflow-hidden">
                  <div className="w-full md:w-1/3 min-h-[200px] md:min-h-0 bg-white flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 group-hover:bg-primary/5 transition-all duration-500">
                    <Icon icon="mdi:web" width={96} className="text-dark/20 group-hover:text-primary transition-all duration-500" />
                  </div>
                  <div className="flex-1 p-8 md:p-14 text-center md:text-left flex flex-col justify-center">
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-dark mb-4 group-hover:text-primary transition-colors">Web Platforms</h3>
                    <p className="text-dark/60 font-medium text-base md:text-lg leading-relaxed">
                      From dynamic single-page applications to massive enterprise web platforms. We build with modern stacks like React, Next.js, and highly scalable serverless architectures.
                    </p>
                  </div>
                </div>

                {/* ITEM 3 */}
                <div className="w-[85vw] md:w-[65vw] max-w-5xl flex-shrink-0 flex flex-col md:flex-row bg-[#FAFBFC] border border-gray-100 rounded-[3rem] shadow-sm hover:bg-white hover:shadow-2xl hover:border-primary/20 transition-all duration-500 group relative z-10 overflow-hidden">
                  <div className="w-full md:w-1/3 min-h-[200px] md:min-h-0 bg-white flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 group-hover:bg-primary/5 transition-all duration-500">
                    <Icon icon="mdi:robot-outline" width={102} className="text-dark/20 group-hover:text-primary transition-all duration-500" />
                  </div>
                  <div className="flex-1 p-8 md:p-14 text-center md:text-left flex flex-col justify-center">
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-dark mb-4 group-hover:text-primary transition-colors">AI Specialization</h3>
                    <p className="text-dark/60 font-medium text-base md:text-lg leading-relaxed">
                      Our true differentiator. We integrate intelligent AI solutions—from large language models to complex automation—supercharging your capabilities and positioning you lightyears ahead.
                    </p>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
