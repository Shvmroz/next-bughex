"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    preText: "We Analyze",
    headline: "Understand Your Vision",
    body: "Every great product starts with deep discovery. We immerse ourselves in your business, your users, and your market — mapping the precise path from idea to impact.",
  },
  {
    preText: "We Architect",
    headline: "Design the Blueprint",
    body: "Our engineers craft scalable, battle-tested architectures. Clean code, modular systems, and cloud-native infrastructure built to grow with your ambitions.",
  },
  {
    preText: "We Deliver",
    headline: "Ship With Precision",
    body: "Rapid iteration, rigorous QA, and on-time delivery — every sprint brings your product closer to market. We move fast without breaking things.",
  },
  {
    preText: "We Evolve",
    headline: "Grow Without Limits",
    body: "Post-launch, we stay by your side. Performance monitoring, feature expansion, and strategic roadmap planning — a partnership that lasts beyond go-live.",
  },
];

const TOTAL = slides.length;

const slideVariants = {
  enter: (dir) => ({
    y: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: (dir) => ({
    y: dir > 0 ? -60 : 60,
    opacity: 0,
    transition: { duration: 0.35, ease: [0.55, 0, 1, 0.45] },
  }),
};

function SlideContent({ slide }) {
  const parts = slide.headline.trim().split(/\s+/);
  const lastWord = parts.length > 1 ? parts.pop() : "";
  const restOfTitle = parts.join(" ");

  return (
    <div className="flex flex-col justify-center pl-8 md:pl-16 lg:pl-20 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
        <span className="text-[11px] font-bold tracking-[0.4em] text-primary uppercase">
          {slide.preText}
        </span>
      </div>

      <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8 tracking-tight max-w-3xl">
        {restOfTitle} <span className="text-gradient-animated">{lastWord}</span>
      </h2>

      <p className="text-white/60 text-lg leading-relaxed font-medium max-w-xl">
        {slide.body}
      </p>
    </div>
  );
}

export default function ScrollTextSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback(
    (index) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const prev = useCallback(() => {
    if (current > 0) goTo(current - 1);
  }, [current, goTo]);

  const next = useCallback(() => {
    if (current < TOTAL - 1) goTo(current + 1);
  }, [current, goTo]);

  // ── Auto-advance every 2s, loops back to first slide ──────────────────────
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % TOTAL);
    }, 5000);
    return () => clearTimeout(timerRef.current);
  }, [current, paused]);

  // Manual nav: temporarily pause auto-play for 5s then resume
  const handleManualNav = useCallback((fn) => {
    clearTimeout(timerRef.current);
    setPaused(true);
    fn();
    setTimeout(() => setPaused(false), 5000);
  }, []);
  // ──────────────────────────────────────────────────────────────────────────

  return (
    <section className="relative bg-black" data-theme="dark">
      <div
        className="h-screen overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* VIDEO BACKGROUND */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none opacity-50"
          >
            <source
              src="/video/scroll_text_section_video.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        {/* OVERLAY GRADIENTS */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,15,0.8) 0%, rgba(10,10,15,0.4) 40%, rgba(10,10,15,0.7) 100%)",
          }}
        />
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(27,181,162,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="w-full h-full max-w-7xl mx-auto px-6 flex items-stretch relative z-10">
          {/* LEFT: Process indicator + vertical nav */}
          <div className="hidden md:flex flex-col items-center justify-center w-16 flex-shrink-0 gap-5">
            {/* UP navigation arrow */}
            <div className="hidden md:flex flex-col items-center justify-center w-16 flex-shrink-0">
              <button
                onClick={() => handleManualNav(prev)}
                disabled={current === 0}
                aria-label="Previous slide"
                className="group relative flex items-center justify-center w-12 h-12 rounded-full 
               bg-white/5 border border-white/10 backdrop-blur-md
               hover:bg-primary/10 hover:border-primary/50
               transition-all duration-300
               disabled:opacity-20 disabled:cursor-not-allowed
               hover:scale-110 active:scale-95"
              >
                <span className="absolute inset-0 rounded-full bg-primary/10 blur-md opacity-0 group-hover:opacity-100 transition" />
                <svg
                  className="w-6 h-6 text-white/70 group-hover:text-primary transition-colors duration-300 relative z-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </button>
            </div>

            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => handleManualNav(() => goTo(i))}
                aria-label={`Go to slide ${i + 1}`}
                className="flex items-center justify-center"
              >
                <motion.div
                  animate={{ opacity: i === current ? 1 : 0.12 }}
                  transition={{ duration: 0.35 }}
                  className="w-px bg-primary"
                  style={{ height: 48 }}
                />
              </button>
            ))}
            <p
              className="text-[9px] text-primary font-bold tracking-[0.3em] mt-6 uppercase whitespace-nowrap"
              style={{ writingMode: "vertical-rl" }}
            >
              Bughex
            </p>

            {/* DOWN navigation arrow */}
            <div className="hidden md:flex flex-col items-center justify-center w-16 flex-shrink-0">
              <button
                onClick={() => handleManualNav(next)}
                disabled={current === TOTAL - 1}
                aria-label="Next slide"
                className="group relative flex items-center justify-center w-12 h-12 rounded-full 
               bg-white/5 border border-white/10 backdrop-blur-md
               hover:bg-primary/10 hover:border-primary/50
               transition-all duration-300
               disabled:opacity-20 disabled:cursor-not-allowed
               hover:scale-110 active:scale-95"
              >
                <span className="absolute inset-0 rounded-full bg-primary/10 blur-md opacity-0 group-hover:opacity-100 transition" />
                <svg
                  className="w-6 h-6 text-white/70 group-hover:text-primary transition-colors duration-300 relative z-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* CENTER: Animated slide content */}
          <div className="flex-1 relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 flex items-center"
              >
                <SlideContent slide={slides[current]} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* MOBILE: Bottom dot navigation */}
        <div className="md:hidden absolute bottom-8 left-0 right-0 flex items-center justify-center gap-3 z-10">
          <button
            onClick={() => handleManualNav(prev)}
            disabled={current === 0}
            className="p-2 text-white/40 hover:text-primary transition-colors disabled:opacity-20"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>

          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => handleManualNav(() => goTo(i))}
                className="transition-all duration-300"
              >
                <motion.div
                  animate={{
                    width: i === current ? 20 : 6,
                    opacity: i === current ? 1 : 0.3,
                  }}
                  className="h-1.5 rounded-full bg-primary"
                />
              </button>
            ))}
          </div>

          <button
            onClick={() => handleManualNav(next)}
            disabled={current === TOTAL - 1}
            className="p-2 text-white/40 hover:text-primary transition-colors disabled:opacity-20"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}