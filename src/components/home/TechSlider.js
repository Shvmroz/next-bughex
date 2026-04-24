'use client';

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
  return (
    <div
      className="flex flex-col items-center justify-center w-20 md:w-24 py-6 rounded-2xl mx-3 flex-shrink-0 group transition-all duration-300 relative bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md overflow-hidden"
    >
      {/* Subtle tint on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `${tech.color}06` }}
      />

      <div
        className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 relative z-10"
        style={{ background: `${tech.color}12` }}
      >
        <Icon icon={tech.icon} width={24} style={{ color: tech.color }} className="drop-shadow-sm" />
      </div>

      <span className="text-[9px] font-bold text-dark/40 tracking-widest uppercase relative z-10 group-hover:text-dark/70 transition-colors duration-300 text-center px-1">
        {tech.name}
      </span>

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-center"
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

      <div className="relative z-10 space-y-4">
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
