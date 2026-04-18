'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const slides = [
  {
    preText: 'We Analyze',
    headline: 'Understand Your Vision',
    body: 'Every great product starts with deep discovery. We immerse ourselves in your business, your users, and your market — mapping the precise path from idea to impact.',
  },
  {
    preText: 'We Architect',
    headline: 'Design the Blueprint',
    body: 'Our engineers craft scalable, battle-tested architectures. Clean code, modular systems, and cloud-native infrastructure built to grow with your ambitions.',
  },
  {
    preText: 'We Deliver',
    headline: 'Ship With Precision',
    body: 'Rapid iteration, rigorous QA, and on-time delivery — every sprint brings your product closer to market. We move fast without breaking things.',
  },
  {
    preText: 'We Evolve',
    headline: 'Grow Without Limits',
    body: 'Post-launch, we stay by your side. Performance monitoring, feature expansion, and strategic roadmap planning — a partnership that lasts beyond go-live.',
  },
];

const TOTAL = slides.length;

function SlideItem({ slide, index, scrollYProgress }) {
  const start = index / TOTAL;
  const end = (index + 1) / TOTAL;
  const opacity = useTransform(scrollYProgress, [start, start + 0.08, end - 0.08, end], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [start, start + 0.08, end - 0.08, end], [60, 0, 0, -60]);

  const parts = slide.headline.trim().split(/\s+/);
  const lastWord = parts.length > 1 ? parts.pop() : '';
  const restOfTitle = parts.join(' ');

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center pl-8 md:pl-16 lg:pl-20"
    >
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

    </motion.div>
  );
}

function ProcessLine({ index, scrollYProgress }) {
  const start = index / TOTAL;
  const mid = (index + 0.5) / TOTAL;
  const end = (index + 1) / TOTAL;
  const lineOpacity = useTransform(scrollYProgress, [start, mid, end], [0.12, 1, 0.12]);

  return (
    <motion.div
      style={{ opacity: lineOpacity }}
      className="w-px h-12 bg-primary"
    />
  );
}

export default function ScrollTextSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.3, 0.6, 0.6, 0.3]);

  return (
    <section
      ref={containerRef}
      className="relative bg-black"
      style={{ height: `${TOTAL * 100}vh` }}
      data-theme="dark"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* VIDEO BACKGROUND */}
        <motion.div
          style={{ scale: videoScale }}
          className="absolute inset-0 z-0"
        >
          <motion.video
            autoPlay
            muted
            loop
            playsInline
            style={{ opacity: videoOpacity }}
            className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
          >
            <source src="/video/vid-5.mp4" type="video/mp4" />
          </motion.video>
        </motion.div>

        {/* OVERLAY GRADIENTS */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,10,15,0.8) 0%, rgba(10,10,15,0.4) 40%, rgba(10,10,15,0.7) 100%)',
          }}
        />
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(27,181,162,0.08) 0%, transparent 70%)',
          }}
        />

        <div className="w-full h-full max-w-7xl mx-auto px-6 flex items-stretch relative z-10">

          <div className="hidden md:flex flex-col items-center justify-center w-16 flex-shrink-0 gap-5">
            {slides.map((_, i) => (
              <ProcessLine key={i} index={i} scrollYProgress={scrollYProgress} />
            ))}
            <p className="text-[9px] text-primary font-bold tracking-[0.3em] mt-6 uppercase whitespace-nowrap"
              style={{ writingMode: 'vertical-rl' }}>
              BUGHEX
            </p>
          </div>

          <div className="flex-1 relative">
            {slides.map((slide, i) => (
              <SlideItem
                key={i}
                slide={slide}
                index={i}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
