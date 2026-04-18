'use client';

import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import SectionHeader from './SectionHeader';

const techRow1 = [
  { name: 'React', icon: 'logos:react', color: '#61DAFB' },
  { name: 'Next.js', icon: 'logos:nextjs-icon', color: '#000000' },
  { name: 'Flutter', icon: 'logos:flutter', color: '#54C5F8' },
  { name: 'Node.js', icon: 'logos:nodejs-icon', color: '#8CC84B' },
  { name: 'TypeScript', icon: 'logos:typescript-icon', color: '#3178C6' },
  { name: 'Laravel', icon: 'logos:laravel', color: '#FF2D20' },
  { name: 'Swift', icon: 'logos:swift', color: '#F05138' },
  { name: 'Kotlin', icon: 'logos:kotlin-icon', color: '#7F52FF' },
  { name: 'Docker', icon: 'logos:docker-icon', color: '#2496ED' },
  { name: 'AWS', icon: 'logos:aws', color: '#FF9900' },
];

const techRow2 = [
  { name: 'Android', icon: 'logos:android-icon', color: '#3DDC84' },
  { name: 'iOS', icon: 'logos:apple', color: '#000000' },
  { name: 'Python', icon: 'logos:python', color: '#3776AB' },
  { name: 'GraphQL', icon: 'logos:graphql', color: '#E10098' },
  { name: 'MongoDB', icon: 'logos:mongodb-icon', color: '#47A248' },
  { name: 'PostgreSQL', icon: 'logos:postgresql', color: '#4169E1' },
  { name: 'Redis', icon: 'logos:redis', color: '#DC382D' },
  { name: 'Firebase', icon: 'logos:firebase', color: '#FFCA28' },
  { name: 'TailwindCSS', icon: 'logos:tailwindcss-icon', color: '#06B6D4' },
  { name: 'OpenAI', icon: 'simple-icons:openai', color: '#000000' },
];

function TechCard({ tech }) {
  // Generate slightly different positions for each bubble based on the tech name length
  const seed = tech.name.length;
  const bubbles = [
    { size: 6, top: `${10 + (seed * 7) % 25}%`, left: `${12 + (seed * 3) % 20}%`, delay: 0 },
    { size: 4, top: `${20 + (seed * 5) % 20}%`, right: `${15 + (seed * 9) % 20}%`, delay: 1 },
    { size: 5, bottom: `${15 + (seed * 4) % 20}%`, left: `${40 + (seed * 2) % 40}%`, delay: 0.5 },
  ];

  return (
    <div
      className="flex flex-col items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-3xl mx-4 flex-shrink-0 group transition-all duration-500 relative bg-white overflow-hidden border"
      style={{ borderColor: `${tech.color}40` }}
    >
      {/* BUBBLE ANIMATIONS - Shown only on hover */}
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            right: b.right,
            bottom: b.bottom,
            background: tech.color,
            filter: 'blur(1px)',
          }}
          animate={{
            y: [-12, 12, -12],
            x: [-8, 8, -8],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 4 + (seed % 3) + i,
            repeat: Infinity,
            delay: b.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Subtle Background Glow on Hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${tech.color}08 0%, transparent 70%)`,
        }}
      />

      <div
        className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 relative z-10"
        style={{
          background: `${tech.color}10`,
        }}
      >
        <Icon icon={tech.icon} width={32} style={{ color: tech.color }} className="drop-shadow-sm" />
      </div>

      <span className="text-xs font-bold text-dark/40 tracking-widest uppercase relative z-10 transition-colors duration-300 group-hover:text-dark">
        {tech.name}
      </span>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
        style={{ background: tech.color }}
      />
    </div>
  );
}

function InfiniteTrack({ techs, direction = 'left', speed = 35 }) {
  const items = [...techs, ...techs];

  return (
    <div className="overflow-hidden relative w-full flex">
      <div
        className="flex flex-nowrap w-max"
        style={{
          animation: `${direction === 'left' ? 'scroll-left' : 'scroll-right'} ${speed}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {items.map((tech, i) => (
          <TechCard key={`${tech.name}-${i}`} tech={tech} />
        ))}
      </div>
    </div>
  );
}

export default function TechSlider() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: '#F8F9FA' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(27,181,162,0.06) 0%, transparent 70%)',
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-10" />

      <SectionHeader
        tag="Our Stack"
        title="Technologies We Master"
      />

      <div className="relative z-10 space-y-5">
        <div
          className="relative"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        >
          <InfiniteTrack techs={techRow1} direction="left" speed={40} />
        </div>
        <div
          className="relative"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        >
          <InfiniteTrack techs={techRow2} direction="right" speed={35} />
        </div>
      </div>
    </section>
  );
}
