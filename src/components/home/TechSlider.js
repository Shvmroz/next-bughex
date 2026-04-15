'use client';

import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const techRow1 = [
  { name: 'React', icon: 'logos:react', color: '#61DAFB' },
  { name: 'Next.js', icon: 'logos:nextjs-icon', color: '#ffffff' },
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
  { name: 'iOS', icon: 'logos:apple', color: '#ffffff' },
  { name: 'Python', icon: 'logos:python', color: '#3776AB' },
  { name: 'GraphQL', icon: 'logos:graphql', color: '#E10098' },
  { name: 'MongoDB', icon: 'logos:mongodb-icon', color: '#47A248' },
  { name: 'PostgreSQL', icon: 'logos:postgresql', color: '#4169E1' },
  { name: 'Redis', icon: 'logos:redis', color: '#DC382D' },
  { name: 'Firebase', icon: 'logos:firebase', color: '#FFCA28' },
  { name: 'TailwindCSS', icon: 'logos:tailwindcss-icon', color: '#06B6D4' },
  { name: 'OpenAI', icon: 'simple-icons:openai', color: '#ffffff' },
];

function TechChip({ tech }) {
  return (
    <div
      className="flex items-center gap-3 px-5 py-3 rounded-2xl mx-3 flex-shrink-0 group transition-all duration-300 hover:scale-105"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <span
        className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0"
        style={{ background: `${tech.color}18` }}
      >
        <Icon icon={tech.icon} width={22} style={{ color: tech.color }} />
      </span>
      <span className="text-sm font-semibold text-white/70 whitespace-nowrap group-hover:text-white transition-colors">
        {tech.name}
      </span>
    </div>
  );
}

function InfiniteTrack({ techs, direction = 'left', speed = 35 }) {
  const duplicated = [...techs, ...techs, ...techs];
  const totalWidth = techs.length * 170;

  return (
    <div className="overflow-hidden relative w-full">
      <motion.div
        className="flex"
        animate={{
          x: direction === 'left' ? [-totalWidth, 0] : [0, -totalWidth],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
      >
        {duplicated.map((tech, i) => (
          <TechChip key={`${tech.name}-${i}`} tech={tech} />
        ))}
      </motion.div>
    </div>
  );
}

export default function TechSlider() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: '#0a0a0f' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(27,181,162,0.06) 0%, transparent 70%)',
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-10" />

      <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10 text-center">
        <motion.p
          className="text-xs font-bold tracking-[0.3em] text-primary uppercase mb-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Stack
        </motion.p>
        <motion.h2
          className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Technologies We{' '}
          <span className="text-gradient-animated">Master</span>
        </motion.h2>
      </div>

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
