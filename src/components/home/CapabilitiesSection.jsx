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

  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);
  const lastDeltaRef = useRef(0);

  const [renderX, setRenderX] = useState(0);

  const cardWidth = 344;
  const gap = 24;
  const itemCount = items.length;
  const loopWidth = itemCount * (cardWidth + gap);

  useEffect(() => {
    const animate = () => {
      let speed = 0.6;

      if (velocityRef.current !== 0) {
        speed += velocityRef.current;
        velocityRef.current *= 0.92;
        if (Math.abs(velocityRef.current) < 0.01) velocityRef.current = 0;
      }

      scrollRef.current += speed;
      if (scrollRef.current >= loopWidth) scrollRef.current -= loopWidth;
      if (scrollRef.current < 0) scrollRef.current += loopWidth;

      setRenderX(scrollRef.current);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [loopWidth]);

  // ── WHEEL ──
  useEffect(() => {
    const handleWheel = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom) return;
      e.preventDefault();
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      velocityRef.current += delta * 0.02;
    };

    const el = containerRef.current;
    if (el) el.addEventListener('wheel', handleWheel, { passive: false });
    return () => { if (el) el.removeEventListener('wheel', handleWheel); };
  }, []);

  // ── MOUSE DRAG ──
  useEffect(() => {
    const onMouseDown = (e) => {
      isDraggingRef.current = true;
      lastXRef.current = e.clientX;
      lastDeltaRef.current = 0;
      velocityRef.current = 0;
    };

    const onMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      const delta = e.clientX - lastXRef.current;
      lastDeltaRef.current = delta;
      scrollRef.current -= delta;
      lastXRef.current = e.clientX;
    };

    const onMouseUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      // fling based on last drag delta
      velocityRef.current = -lastDeltaRef.current * 0.3;
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }

    return () => {
      if (el) el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  // ── TOUCH DRAG ──
  useEffect(() => {
    const onTouchStart = (e) => {
      lastXRef.current = e.touches[0].clientX;
      lastDeltaRef.current = 0;
      velocityRef.current = 0;
    };

    const onTouchMove = (e) => {
      const delta = e.touches[0].clientX - lastXRef.current;
      lastDeltaRef.current = delta;
      scrollRef.current -= delta;
      lastXRef.current = e.touches[0].clientX;
    };

    const onTouchEnd = () => {
      // fling based on last touch delta
      velocityRef.current = -lastDeltaRef.current * 0.3;
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener('touchstart', onTouchStart, { passive: true });
      el.addEventListener('touchmove', onTouchMove, { passive: true });
      el.addEventListener('touchend', onTouchEnd);
    }

    return () => {
      if (el) {
        el.removeEventListener('touchstart', onTouchStart);
        el.removeEventListener('touchmove', onTouchMove);
        el.removeEventListener('touchend', onTouchEnd);
      }
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

      <div
        className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
        ref={containerRef}
      >
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
  const cardRef = useRef(null);
  const [mobileActive, setMobileActive] = useState(false);

  // On mobile only: auto-activate when card is fully in view
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // Only run on touch devices (mobile)
    if (window.matchMedia('(hover: hover)').matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => setMobileActive(entry.isIntersecting),
      { threshold: 1.0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
    <div ref={cardRef} className="flex-shrink-0 w-[280px] md:w-[380px] relative z-10 py-2">
      <div className={`relative overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_2px_12px_rgba(27,181,162,0.10)] transition-all duration-300 group ${mobileActive ? 'bg-[#f8fffd] is-active' : ''}`}>

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
            className={`transition-opacity duration-300 ${mobileActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
          />
        </svg>

        <div
          className={`absolute inset-0 transition-opacity duration-700 pointer-events-none z-0 ${mobileActive ? 'opacity-[0.06]' : 'opacity-[0.03] group-hover:opacity-[0.06]'}`}
          style={{
            backgroundImage:
              'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className={`absolute -top-10 -left-10 w-28 h-28 rounded-full blur-[55px] transition-all duration-700 pointer-events-none z-0 ${mobileActive ? 'bg-primary/12' : 'bg-primary/[0.06] group-hover:bg-primary/12'}`} />

        <div className="relative z-10 flex">
          {/* Icon column */}
          <div className={`w-16 md:w-24 shrink-0 border-r border-black/5 flex items-center justify-center transition-colors duration-300 ${mobileActive ? 'bg-[#37d8bd]' : 'bg-[#f5fbfa] group-hover:bg-[#37d8bd]'}`}>
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-white border border-[#eef1f6] flex items-center justify-center shadow-sm">
              {service.icon}
            </div>
          </div>

          {/* Text column */}
          <div className="flex-1 min-w-0 px-4 md:px-6 py-4 md:py-5 flex flex-col justify-center">
            {service.subtitle && (
              <span className="text-[9px] md:text-[10px] font-bold text-primary/50 uppercase tracking-widest mb-1.5 block">
                {service.subtitle}
              </span>
            )}
            <h3 className={`font-display font-bold text-dark text-[15px] md:text-[17px] leading-tight transition-colors duration-300 ${mobileActive ? 'text-primary' : 'group-hover:text-primary'}`}>
              {service.title}
            </h3>
            <p className={`text-[12px] md:text-[13px] leading-relaxed mt-1.5 transition-colors duration-300 break-words ${mobileActive ? 'text-dark/70' : 'text-dark/50 group-hover:text-dark/70'}`}>
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}