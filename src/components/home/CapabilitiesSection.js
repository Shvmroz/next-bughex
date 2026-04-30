'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { services, servicesSectionContent } from '@/lib/mock';

export default function CapabilitiesSection({
  items = services,
  title = "Capabilities",
  subtitle = servicesSectionContent.subtitle,
  tag = servicesSectionContent.tag
}) {
  const containerRef = useRef(null);
  const scrollRef = useRef(0);
  const animationFrameRef = useRef(null);
  const velocityRef = useRef(0);

  const [renderX, setRenderX] = useState(0);

  const cardWidth = 344;
  const gap = 24;
  const itemCount = items.length;
  const loopWidth = itemCount * (cardWidth + gap);

  // ✅ Smooth animation loop (NO React re-render spam)
  useEffect(() => {
    const animate = () => {
      // base speed
      let speed = 0.6;

      // apply manual velocity (wheel)
      if (velocityRef.current !== 0) {
        speed += velocityRef.current;
        velocityRef.current *= 0.92; // friction
        if (Math.abs(velocityRef.current) < 0.01) {
          velocityRef.current = 0;
        }
      }

      scrollRef.current += speed;

      // ✅ seamless loop (no visible reset)
      if (scrollRef.current >= loopWidth) {
        scrollRef.current -= loopWidth;
      }
      if (scrollRef.current < 0) {
        scrollRef.current += loopWidth;
      }

      setRenderX(scrollRef.current);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [loopWidth]);

  // ✅ Smooth wheel interaction (no jumps)
  useEffect(() => {
    const handleWheel = (e) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom) return;

      e.preventDefault();

      // add velocity instead of jumping
      velocityRef.current += e.deltaY * 0.02;
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (el) el.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <section className="relative bg-white border-y border-[#f1f3f5] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="text-xs text-primary font-bold tracking-wider uppercase">
            {tag}
          </span>
        </div>

        <h2 className="font-display text-4xl md:text-5xl font-bold text-dark mb-4">
          Our <span className="text-gradient-animated">{title}</span>
        </h2>

        <p className="text-dark/60 text-lg max-w-2xl font-medium">
          {subtitle}
        </p>
      </div>

      <div className="relative overflow-hidden" ref={containerRef}>
        <div className="absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2 pointer-events-none z-0">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-primary/25 to-transparent border-t border-dashed border-primary/20" />
        </div>

        <motion.div
          className="flex gap-6 px-[8%] py-8"
          style={{ transform: `translateX(-${renderX}px)` }}
        >
          {[...items, ...items].map((service, index) => (
            <CapabilityCard
              key={`${service.id || index}-${Math.floor(index / items.length)}`}
              service={service}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CapabilityCard({ service }) {
  const description = service.description || service.body || '';

  const hexToRgba = (hex, opacity = 0.5) => {
    if (!hex) return `rgba(27,181,162,${opacity})`;

    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const strokeColor = hexToRgba(service.stroke || '#1bb5a2', 0.5);

  return (
    <div className="flex-shrink-0 w-[320px] md:w-[380px] relative z-10 py-2">
      <div className="relative overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_2px_12px_rgba(27,181,162,0.10)] transition-all duration-300 group hover:bg-[#f8fffd]">

        <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
          <motion.rect
            x="1.5"
            y="1.5"
            rx="14"
            ry="14"
            width="calc(100% - 3px)"
            height="calc(100% - 3px)"
            fill="transparent"
            stroke={strokeColor}
            strokeWidth="2"
            strokeDasharray="120 120"
            animate={{ strokeDashoffset: [0, -240] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </svg>

        <div
          className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none z-0"
          style={{
            backgroundImage:
              'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="absolute -top-10 -left-10 w-28 h-28 bg-primary/[0.06] rounded-full blur-[55px] group-hover:bg-primary/12 transition-all duration-700 pointer-events-none z-0" />

        <div className="relative z-10 flex">
          <div className="w-24 shrink-0 bg-[#f5fbfa] group-hover:bg-[#37d8bd] border-r border-black/5 flex items-center justify-center">
            <div className="w-14 h-14 rounded-xl bg-white border border-[#eef1f6] flex items-center justify-center shadow-sm">
              {service.icon}
            </div>
          </div>

          <div className="flex-1 min-w-0 px-6 py-5 flex flex-col justify-center">
            {service.subtitle && (
              <span className="text-[10px] font-bold text-primary/50 uppercase tracking-widest mb-2 block">
                {service.subtitle}
              </span>
            )}

            <h3 className="font-display font-bold text-dark text-[17px] leading-tight group-hover:text-primary transition-colors duration-300">
              {service.title}
            </h3>

            <p className="text-dark/50 text-[13px] leading-relaxed mt-2 group-hover:text-dark/70 transition-colors duration-300 break-words">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}