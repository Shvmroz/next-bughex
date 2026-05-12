"use client";

import { useState, useEffect, useRef } from "react";
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

export default function AboutPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide logic
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % storySlides.length);
    }, 5000); // Increased to 5s
    return () => clearInterval(timer);
  }, [activeIndex]); // Reset timer whenever index changes (manual or auto)

  // Calculate progress for background effect (0 to 1)
  const progress = activeIndex / (storySlides.length - 1);

  // Background Blob Mapping (Simulating the scroll effect with the timer)
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
        {/* HERO STORY - NO SCROLL REQUIRED */}
        <section className="relative bg-[#FAFBFC] overflow-hidden">
          <div
            className="flex items-center justify-center relative z-20"
            style={{
              height: `calc(100svh - ${NAV_HEIGHT}px)`,
              marginTop: `${NAV_HEIGHT}px`,
            }}
          >
            {/* Animated Background Gradients synced with activeIndex */}
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

            {/* Vertical Slide Controls - RIGHT SIDE */}
            <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40">
              <button
                onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : storySlides.length - 1))}
                className="w-12 h-12 rounded-full border border-white/60 bg-white/40 backdrop-blur-md shadow-sm flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all text-dark/40 hover:border-primary/40 group"
              >
                <Icon icon="solar:alt-arrow-up-linear" width={24} className="group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <div className="h-px w-6 mx-auto bg-dark/5" />
              <button
                onClick={() => setActiveIndex((prev) => (prev + 1) % storySlides.length)}
                className="w-12 h-12 rounded-full border border-white/60 bg-white/40 backdrop-blur-md shadow-sm flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all text-dark/40 hover:border-primary/40 group"
              >
                <Icon icon="solar:alt-arrow-down-linear" width={24} className="group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>

            <div className="relative max-w-5xl mx-auto px-6 text-center w-full">
              <div className="relative flex items-center justify-center min-h-[300px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={storySlides[activeIndex].id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex flex-col items-center justify-center"
                  >
                    <p className="text-dark/70 font-medium leading-snug text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl px-4">
                      <span className="block font-bold text-dark mb-4 text-4xl sm:text-5xl md:text-6xl tracking-tight">
                        {storySlides[activeIndex].title}
                      </span>
                      <span className="block text-base sm:text-lg md:text-2xl max-w-2xl mx-auto">
                        {storySlides[activeIndex].body}
                      </span>
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
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