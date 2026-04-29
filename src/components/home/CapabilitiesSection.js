'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { services, servicesSectionContent } from '@/lib/mock';

export default function CapabilitiesSection({
    items = services,
    title = "Capabilities",
    subtitle = servicesSectionContent.subtitle,
    tag = servicesSectionContent.tag
}) {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const cardWidth = 344;
    const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(items.length - 1) * cardWidth}px`]);

    return (
        <section
            ref={containerRef}
            className="relative bg-white border-y border-[#f1f3f5]"
            style={{ height: `calc(100vh + ${(items.length - 1) * cardWidth}px)` }}
        >
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 pt-16 md:pt-20 pb-8 md:pb-12 w-full">
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

                <div className="relative">
                    <div className="absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2 pointer-events-none z-0">
                        <div className="w-full h-full bg-gradient-to-r from-transparent via-primary/25 to-transparent border-t border-dashed border-primary/20" />
                    </div>

                    <motion.div style={{ x }} className="flex gap-6 px-[8%]">
                        {items.map((service, index) => (
                            <CapabilityCard key={service.id || index} service={service} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function CapabilityCard({ service }) {
    const description = service.description || service.body || '';

    // ✅ convert hex → rgba with 50% opacity
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
        <motion.div className="flex-shrink-0 w-[280px] md:w-[320px] relative z-10 py-2">
            <div className="relative overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_2px_12px_rgba(27,181,162,0.10)] transition-all duration-300 group hover:bg-[#f8fffd]">

                {/* ✅ BORDER FIXED COLOR */}
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none z-20"
                    preserveAspectRatio="none"
                >
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
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                </svg>

                {/* Grid */}
                <div
                    className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none z-0"
                    style={{
                        backgroundImage:
                            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                    }}
                />

                {/* Glow */}
                <div className="absolute -top-10 -left-10 w-28 h-28 bg-primary/[0.06] rounded-full blur-[55px] group-hover:bg-primary/12 transition-all duration-700 pointer-events-none z-0" />

                {/* CONTENT */}
                <div className="relative z-10 flex">

                    {/* LEFT */}
                    <div className="w-20 shrink-0 bg-[#f5fbfa] border-r border-black/5 flex items-center justify-center">
                        <div className="w-11 h-11 rounded-xl bg-white border border-[#eef1f6] flex items-center justify-center shadow-sm">
                            {service.icon}
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex-1 min-w-0 px-4 py-4 flex flex-col justify-center">

                        {service.subtitle && (
                            <span className="text-[9px] font-bold text-primary/50 uppercase tracking-widest mb-1 block">
                                {service.subtitle}
                            </span>
                        )}

                        <h3 className="font-display font-bold text-dark text-[15px] leading-tight group-hover:text-primary transition-colors duration-300">
                            {service.title}
                        </h3>

                        <p className="text-dark/50 text-[12px] leading-relaxed mt-1.5 group-hover:text-dark/70 transition-colors duration-300 break-words">
                            {description}
                        </p>

                    </div>
                </div>
            </div>
        </motion.div>
    );
}