"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CapabilitiesSection from "@/components/home/CapabilitiesSection";
import { Icon } from "@iconify/react";
import { capabilities } from "@/lib/mock";

const NAV_HEIGHT = 64;

const storySlides = [
  {
    id: 1,
    title: "Who We Are",
    body: "BugHex is a premier digital engineering agency dedicated to transforming visionary ideas into high-performance products.",
  },
  {
    id: 2,
    title: "Our Engineering DNA",
    body: "We combine deep technical expertise in React, Node.js, and Mobile ecosystems with elite design thinking.",
  },
  {
    id: 3,
    title: "Intelligence by Design",
    body: "We integrate AI-driven logic into every layer, from automated backends to smart, predictive user interfaces.",
  },
  {
    id: 4,
    title: "Built for the Future",
    body: "Headquartered in Dubai, we architect scalable platforms that empower global brands to lead their industries.",
  },
  {
    id: 5,
    title: "Innovate. Scale. Evolve.",
    body: "Our mission is to build digital legacies—products that don't just exist, but define the future of technology.",
  },
];

const TOTAL = storySlides.length;

export default function AboutPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef(null);

  const goTo = useCallback((index) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  }, [activeIndex]);

  const prev = useCallback(() => {
    goTo(activeIndex > 0 ? activeIndex - 1 : TOTAL - 1);
  }, [activeIndex, goTo]);

  const next = useCallback(() => {
    goTo((activeIndex + 1) % TOTAL);
  }, [activeIndex, goTo]);

  // Auto-slide logic
  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [next]);

  const handleManualNav = (fn) => {
    clearInterval(timerRef.current);
    fn();
    timerRef.current = setInterval(next, 5000);
  };

  const progress = activeIndex / (TOTAL - 1);

  const blobStyles = {
    blob1: {
      left: `${-10 + progress * 80}%`,
      top: `${20 + progress * 50}%`,
      scale: 0.8 + Math.sin(progress * Math.PI) * 0.6,
    },
    blob2: {
      left: `${95 - progress * 90}%`,
      top: `${40 - progress * 50}%`,
      scale: 1.3 - Math.sin(progress * Math.PI) * 0.6,
    },
    blob3: {
      left: `${-20 + progress * 30}%`,
      top: `${-15 + progress * 35}%`,
      scale: 1 + progress * 0.6,
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Header />

      <main className="flex-grow">
        <section className="relative bg-[#FAFBFC] overflow-hidden">
          <div
            className="flex items-center justify-center relative z-20"
            style={{
              height: `calc(100svh - ${NAV_HEIGHT}px)`,
              marginTop: `${NAV_HEIGHT}px`,
            }}
          >
            {/* Animated Background Gradients */}
            <motion.div
              animate={{
                left: blobStyles.blob1.left,
                top: blobStyles.blob1.top,
                scale: blobStyles.blob1.scale,
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10"
            />
            <motion.div
              animate={{
                left: blobStyles.blob2.left,
                top: blobStyles.blob2.top,
                scale: blobStyles.blob2.scale,
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute w-[500px] h-[500px] bg-[#1bb5a2]/20 rounded-full blur-[50px] -z-10"
            />
            <motion.div
              animate={{
                left: blobStyles.blob3.left,
                top: blobStyles.blob3.top,
                scale: blobStyles.blob3.scale,
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute w-[200px] h-[200px] bg-[#CDEB63]/30 rounded-full blur-[50px] -z-10"
            />

            {/* VERTICAL NAVIGATION - Desktop Right Side (matches ScrollTextSection style) */}
            <div className="hidden md:flex absolute right-12 top-1/2 -translate-y-1/2 flex-col items-center gap-5 z-40">
              <button
                onClick={() => handleManualNav(prev)}
                disabled={activeIndex === 0}
                className="group relative flex items-center justify-center w-12 h-12 rounded-full
                bg-white/5 border border-dark/10 backdrop-blur-md
                hover:bg-primary/10 hover:border-primary/50
                transition-all duration-300 disabled:opacity-20 hover:scale-110 active:scale-95"
              >
                <svg className="w-6 h-6 text-dark/50 group-hover:text-primary transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
              </button>

              {storySlides.map((_, i) => (
                <button key={i} onClick={() => handleManualNav(() => goTo(i))} className="flex items-center justify-center">
                  <motion.div
                    animate={{ opacity: i === activeIndex ? 1 : 0.12 }}
                    className="w-[3px] bg-primary"
                    style={{ height: 48 }}
                  />
                </button>
              ))}

              <button
                onClick={() => handleManualNav(next)}
                disabled={activeIndex === TOTAL - 1}
                className="group relative flex items-center justify-center w-12 h-12 rounded-full
                bg-white/5 border border-dark/10 backdrop-blur-md
                hover:bg-primary/10 hover:border-primary/50
                transition-all duration-300 disabled:opacity-20 hover:scale-110 active:scale-95"
              >
                <svg className="w-6 h-6 text-dark/50 group-hover:text-primary transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <div className="relative max-w-5xl mx-auto px-6 text-center w-full">
              <div className="relative flex items-center justify-center min-h-[300px]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={storySlides[activeIndex].id}
                    initial={{ opacity: 0, y: direction * 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: direction * -20 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex flex-col items-center justify-center"
                  >
                    <h2 className="font-display font-bold text-dark mb-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight">
                      {storySlides[activeIndex].title}
                    </h2>
                    <p className="text-dark/70 text-lg sm:text-xl md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto">
                      {storySlides[activeIndex].body}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* MOBILE NAVIGATION - Up arrow top-center, down arrow bottom-center */}
            {/* UP - Top Center */}
            <div className="md:hidden absolute top-6 left-0 right-0 flex justify-center z-40">
              <button
                onClick={() => handleManualNav(prev)}
                disabled={activeIndex === 0}
                className="group relative flex items-center justify-center w-12 h-12 rounded-full
                bg-white/5 border border-dark/10 backdrop-blur-md
                hover:bg-primary/10 hover:border-primary/50
                transition-all duration-300 disabled:opacity-20 hover:scale-110 active:scale-95"
              >
                <svg className="w-6 h-6 text-dark/50 group-hover:text-primary transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
              </button>
            </div>

            {/* DOWN + DOTS - Bottom Center */}
            <div className="md:hidden absolute bottom-8 left-0 right-0 flex flex-col items-center gap-4 z-40">
              <div className="flex gap-2.5">
                {storySlides.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ${i === activeIndex
                        ? 'w-8 bg-primary shadow-[0_0_10px_rgba(27,181,162,0.5)]'
                        : 'w-2 bg-dark/15'
                      }`}
                  />
                ))}
              </div>
              <button
                onClick={() => handleManualNav(next)}
                disabled={activeIndex === TOTAL - 1}
                className="group relative flex items-center justify-center w-12 h-12 rounded-full
                bg-white/5 border border-dark/10 backdrop-blur-md
                hover:bg-primary/10 hover:border-primary/50
                transition-all duration-300 disabled:opacity-20 hover:scale-110 active:scale-95"
              >
                <svg className="w-6 h-6 text-dark/50 group-hover:text-primary transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="py-24 bg-dark text-white relative z-30">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { value: "10+", label: "Years in Dubai" },
              { value: "150+", label: "Products Shipped" },
              { value: "50+", label: "Global Clients" },
              { value: "100%", label: "Satisfaction Rate" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-4xl md:text-6xl font-bold text-primary mb-3">
                  {s.value}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CAPABILITIES */}
        <CapabilitiesSection
          title="Capabilities"
          tag="Our Expertise"
          subtitle="AI, Web, Mobile, and Security engineering at scale."
          items={capabilities.map((cap) => ({
            ...cap,
            description: cap.body,
            features: cap.tags,
            icon: <Icon icon={cap.icon} width={32} />,
          }))}
        />
      </main>

      <Footer />
    </div>
  );
}