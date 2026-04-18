'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

const stats = [
  { value: '150+', label: 'Projects Shipped' },
  { value: '50+', label: 'Happy Clients' },
  { value: '8+', label: 'Years Excellence' },
];

export default function VideoShowcaseSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [1.08, 1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.3, 0.6, 0.6, 0.3]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [40, -20]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* VIDEO BACKGROUND */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0 z-0"
      >
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          style={{ opacity }}
          className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
        >
          <source src="/vecteezy_futuristic.mp4" type="video/mp4" />
        </motion.video>
      </motion.div>

      {/* OVERLAY GRADIENTS */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10,10,15,0.6) 0%, rgba(10,10,15,0.2) 40%, rgba(10,10,15,0.5) 100%)',
        }}
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(27,181,162,0.08) 0%, transparent 70%)',
        }}
      />

      {/* CONTENT */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center"
      >
        <motion.div
          className="inline-flex items-center gap-3 mb-8 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[11px] font-bold tracking-[0.35em] text-white/70 uppercase">
            Our Work in Motion
          </span>
        </motion.div>

        <motion.h2
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.02] mb-6 tracking-tight text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8 }}
        >
          Engineering the{' '}
          <span className="text-gradient-animated">Future</span>
          <br />
          of Digital
        </motion.h2>

        <motion.p
          className="text-white/50 text-lg md:text-xl leading-relaxed font-medium max-w-2xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          From concept to launch, we craft digital experiences that captivate users, drive revenue,
          and define industries. This is what precision engineering looks like.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-5 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link href="/projects">
            <button className="btn">
              <i className="animation"></i>
              VIEW OUR WORK
              <i className="animation"></i>
            </button>
          </Link>
          <Link href="/contact">
            <button className="px-8 py-3 rounded text-white/70 text-xs font-bold tracking-[0.2em] uppercase border border-white/20 hover:border-primary/60 hover:text-white transition-all duration-300 backdrop-blur-sm">
              START A PROJECT
            </button>
          </Link>
        </motion.div>

        {/* STATS ROW */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center px-10 py-6 ${
                i < stats.length - 1 ? 'border-b sm:border-b-0 sm:border-r border-white/10' : ''
              }`}
            >
              <span className="font-display font-bold text-3xl text-primary mb-1">{stat.value}</span>
              <span className="text-[11px] text-white/40 font-bold uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* BOTTOM FADE */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-[2] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(10,10,15,0.6))',
        }}
      />
    </section>
  );
}
