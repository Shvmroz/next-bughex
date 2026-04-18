'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const slides = [
  {
    preText: 'We Analyze',
    headline: 'Understand Your Vision',
    body: 'Every great product starts with deep discovery. We immerse ourselves in your business, your users, and your market — mapping the precise path from idea to impact.',
    num: '01',
  },
  {
    preText: 'We Architect',
    headline: 'Design the Blueprint',
    body: 'Our engineers craft scalable, battle-tested architectures. Clean code, modular systems, and cloud-native infrastructure built to grow with your ambitions.',
    num: '02',
  },
  {
    preText: 'We Deliver',
    headline: 'Ship With Precision',
    body: 'Rapid iteration, rigorous QA, and on-time delivery — every sprint brings your product closer to market. We move fast without breaking things.',
    num: '03',
  },
  {
    preText: 'We Evolve',
    headline: 'Grow Without Limits',
    body: 'Post-launch, we stay by your side. Performance monitoring, feature expansion, and strategic roadmap planning — a partnership that lasts beyond go-live.',
    num: '04',
  },
];

const TOTAL = slides.length;

function SlideItem({ slide, index, scrollYProgress }) {
  const start = index / TOTAL;
  const end = (index + 1) / TOTAL;
  const opacity = useTransform(scrollYProgress, [start, start + 0.08, end - 0.08, end], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [start, start + 0.08, end - 0.08, end], [60, 0, 0, -60]);
  const numOpacity = useTransform(scrollYProgress, [start, start + 0.08, end - 0.08, end], [0, 0.04, 0.04, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center pl-8 md:pl-16 lg:pl-20"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
          <span className="text-primary font-display font-bold text-xs">{slide.num}</span>
        </div>
        <span className="text-[11px] font-bold tracking-[0.4em] text-primary uppercase">
          {slide.preText}
        </span>
      </div>

      <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-8 tracking-tight max-w-3xl">
        {slide.headline}
      </h2>

      <p className="text-white/45 text-lg leading-relaxed font-medium max-w-xl">
        {slide.body}
      </p>

      <div className="mt-10 flex items-center gap-4">
        <div className="h-px w-16 bg-primary/40" />
        <span className="text-[11px] text-white/20 font-bold tracking-widest uppercase">
          Step {index + 1} of {TOTAL}
        </span>
      </div>

      <motion.span
        style={{ opacity: numOpacity }}
        className="absolute right-0 top-1/2 -translate-y-1/2 font-display font-bold text-[200px] leading-none text-white select-none pointer-events-none hidden lg:block"
      >
        {slide.num}
      </motion.span>
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

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0a0a0f]"
      style={{ height: `${TOTAL * 100}vh` }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 15% 50%, rgba(27,181,162,0.04) 0%, transparent 60%)',
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-10" />

      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="w-full h-full max-w-7xl mx-auto px-6 flex items-stretch">

          <div className="hidden md:flex flex-col items-center justify-center w-16 flex-shrink-0 gap-5">
            {slides.map((_, i) => (
              <ProcessLine key={i} index={i} scrollYProgress={scrollYProgress} />
            ))}
            <p className="text-[9px] text-white/15 font-bold tracking-[0.3em] mt-6 uppercase whitespace-nowrap"
               style={{ writingMode: 'vertical-rl' }}>
              PROCESS
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
