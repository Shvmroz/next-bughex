'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { leaders, leadershipSectionContent } from '@/lib/mock';
import SectionHeader from './SectionHeader';

export default function LeadershipSection() {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const firstCard = container.querySelector('.snap-center');
            if (firstCard) {
                const cardWidth = firstCard.offsetWidth + 32; // card width + gap-8 (32px)
                const scrollTo = direction === 'left' ? container.scrollLeft - cardWidth : container.scrollLeft + cardWidth;
                container.scrollTo({ left: scrollTo, behavior: 'smooth' });
            }
        }
    };

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 50); // Small threshold
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 50);
        }
    };

    useEffect(() => {
        handleScroll();
    }, []);

    return (
        <section className="py-22 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* HEADER */}
                <div className="flex justify-between items-end mb-10">
                    <SectionHeader
                        title={leadershipSectionContent.title}
                        align="left"
                    />

                    {/* Animated Slider Controls */}
                    <div className="flex gap-3">
                        <motion.button
                            whileHover={canScrollLeft ? { scale: 1.05, backgroundColor: 'rgba(27, 181, 162, 0.05)' } : {}}
                            whileTap={canScrollLeft ? { scale: 0.95 } : {}}
                            onClick={() => scroll('left')}
                            className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-300 ${canScrollLeft ? 'border-primary text-primary cursor-pointer' : 'border-gray-100 text-gray-200 cursor-not-allowed'}`}
                        >
                            <Icon icon="mdi:arrow-left" width={20} />
                        </motion.button>
                        <motion.button
                            whileHover={canScrollRight ? { scale: 1.05, backgroundColor: 'rgba(27, 181, 162, 0.05)' } : {}}
                            whileTap={canScrollRight ? { scale: 0.95 } : {}}
                            onClick={() => scroll('right')}
                            className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-300 ${canScrollRight ? 'border-primary text-primary cursor-pointer' : 'border-gray-100 text-gray-200 cursor-not-allowed'}`}
                        >
                            <Icon icon="mdi:arrow-right" width={20} />
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* FULL WIDTH SLIDER */}
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex gap-8 overflow-x-auto pb-12 scrollbar-hide snap-x"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {/* LARGE SPACER TO START FROM OFFSET (Half Screen-ish) */}
                <div className="min-w-[40vw] flex-shrink-0 pointer-events-none" />

                {leaders.map((leader, i) => (
                    <motion.div
                        key={i}
                        className="min-w-[220px] md:min-w-[260px] snap-center group"
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.05 }}
                        viewport={{ once: true, margin: "0px -100px 0px -100px" }}
                    >
                        {/* IMAGE PLACEHOLDER */}
                        <div className="aspect-[4/5] bg-gray-100 rounded-3xl overflow-hidden mb-6 relative border border-gray-50 flex items-center justify-center">
                            <Icon icon="mdi:account" width={80} className="text-gray-200" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/[0.03] to-transparent pointer-events-none" />
                        </div>

                        {/* INFO */}
                        <div className="space-y-3 px-2">
                            <h3 className="text-3xl font-bold text-dark tracking-tight">
                                {leader.nameFirst} <span className="text-primary">{leader.nameLast}</span>
                            </h3>
                            <div className="flex items-center justify-between gap-4 pt-1">
                                <p className="text-base text-dark/70 font-semibold tracking-tight">
                                    {leader.role}
                                </p>
                                <Link href="#" className="flex-shrink-0 transition-transform hover:scale-110">
                                    <Icon icon="mdi:linkedin" width={28} className="text-dark hover:text-[#0A66C2] transition-colors" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* END SPACER */}
                <div className="min-w-[20vw] flex-shrink-0" />
            </div>
        </section>
    );
}
