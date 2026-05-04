'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import SectionHeader from './SectionHeader';
import { blogs } from '@/lib/mock';

export default function RecentProjectsSection() {
    const recentProjects = blogs.slice(0, 3);

    return (
        <section className="py-12 md:py-24 bg-[#FAFBFC] relative">
            <div className="max-w-7xl mx-auto">
                {/* SectionHeader needs px-6 only */}
                <div className="px-6">
                    <SectionHeader
                        tag="Our Work"
                        title="Recent Projects"
                        subtitle="Explore some of our most impactful digital transformations and case studies."
                        dark={false}
                        align="left"
                    />
                </div>

                {/* MOBILE HERO BANNER */}
                <div className="lg:hidden mt-10 mb-2 mx-6 rounded-3xl overflow-hidden relative h-52 shadow-xl">
                    <div className="absolute inset-0 bg-dark z-0" />
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="absolute inset-0 w-full h-full object-cover z-0 opacity-70"
                    >
                        <source src="/video/recent_project_video.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent z-10" />
                    <div className="absolute bottom-6 left-6 right-6 z-20">
                        <h3 className="text-2xl font-display font-bold text-white leading-tight">
                            Our Digital Portfolio
                        </h3>
                        <p className="text-white/70 text-sm font-medium mt-1">
                            Scalable, visually spectacular products.
                        </p>
                    </div>
                </div>

                {/* ── MOBILE CAROUSEL ── */}
                <div className="lg:hidden mt-6 relative">
                    <div
                        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 pl-6"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            WebkitOverflowScrolling: 'touch',
                            scrollPaddingLeft: '1.5rem',
                        }}
                    >
                        {recentProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`group cursor-pointer snap-start shrink-0 w-[80vw] max-w-[320px] rounded-2xl bg-white border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(27,181,162,0.14)] hover:border-primary/20 hover:bg-primary transition-all duration-500 flex flex-col p-6 relative overflow-hidden`}>
                                {/* Grid overlay on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-2xl">
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px)`,
                                            backgroundSize: '15px 15px',
                                            maskImage: 'radial-gradient(ellipse at center, black 0%, black 60%, transparent 100%)',
                                            WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, black 60%, transparent 100%)',
                                        }}
                                    />
                                </div>
                                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-500 pointer-events-none" />

                                {/* Badge + icon row */}
                                <div className="flex items-center justify-between mb-4 relative z-10">
                                    <div className="inline-block px-3 py-1 rounded-full bg-primary/10 group-hover:bg-white/20 text-[10px] font-bold tracking-widest uppercase text-primary group-hover:text-white transition-colors duration-500">
                                        {project.category}
                                    </div>
                                    <div className="w-9 h-9 rounded-xl bg-gray-50 group-hover:bg-white flex items-center justify-center border border-gray-100 group-hover:border-white transition-all duration-300">
                                        <Icon icon="mdi:rocket-launch" width={16} className="text-dark/30 group-hover:text-primary transition-colors duration-300" />
                                    </div>
                                </div>

                                <h4 className="font-display text-xl font-bold text-dark group-hover:text-white transition-colors duration-500 leading-snug mb-3 relative z-10">
                                    {project.title}
                                </h4>

                                <p className="text-sm font-medium text-dark/60 group-hover:text-white/80 leading-relaxed flex-1 mb-6 relative z-10 transition-colors duration-500">
                                    {project.excerpt}
                                </p>

                                <Link
                                    href="/projects"
                                    className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-dark group-hover:text-white transition-colors duration-500 relative z-10"
                                >
                                    Read Case Study
                                    <Icon icon="mdi:arrow-right" width={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                                </Link>
                            </motion.div>
                        ))}

                        {/* VIEW ALL — last carousel card */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: recentProjects.length * 0.1 }}
                            viewport={{ once: true }}
                            className="snap-start shrink-0 w-[60vw] max-w-[240px]"
                        >
                            <Link href="/projects" className="h-full flex">
                                <div className="flex-1 flex flex-col items-center justify-center gap-4 rounded-2xl border border-gray-200 hover:border-primary hover:bg-teal-50 transition-all duration-300 p-6 text-center min-h-[220px]">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                        <Icon icon="mdi:arrow-top-right" width={22} className="text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-primary">View All</p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Right padding sentinel */}
                        <div className="shrink-0 w-2" />
                    </div>

                    {/* Dot indicators */}
                    <div className="flex items-center justify-center gap-1.5 mt-2 px-6">
                        {recentProjects.map((_, i) => (
                            <div
                                key={i}
                                className="w-1.5 h-1.5 rounded-full bg-dark/20"
                            />
                        ))}
                        <div className="w-1.5 h-1.5 rounded-full bg-dark/20" />
                    </div>
                </div>

                {/* ── DESKTOP LAYOUT ── */}
                <div className="hidden lg:flex flex-row gap-16 mt-16 items-start relative px-6">
                    {/* LEFT PANEL - STICKY */}
                    <div className="lg:w-1/2 sticky top-32 rounded-[2.5rem] overflow-hidden shadow-2xl h-[calc(100vh-160px)] min-h-[500px]">
                        <div className="absolute inset-0 bg-dark z-0" />
                        <video autoPlay loop muted playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover z-0 opacity-80">
                            <source src="/video/recent_project_video.mp4" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent z-10" />
                        <div className="absolute bottom-12 left-10 right-10 z-20">
                            <h3 className="text-4xl xl:text-5xl font-display font-bold text-white mb-4 leading-tight">
                                Our Digital <br /> Portfolio
                            </h3>
                            <p className="text-white/70 font-medium text-lg max-w-sm">
                                We take pride in building scalable, visually spectacular products. See what we&apos;ve engineered.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT PANEL - CARDS */}
                    <div className="lg:w-1/2 flex flex-col gap-10">
                        {recentProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true, margin: '-100px' }}
                                className="group cursor-pointer rounded-3xl bg-white border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(27,181,162,0.12)] hover:border-primary/20 hover:bg-primary transition-all duration-500 flex flex-col p-12 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-3xl">
                                    <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px)`, backgroundSize: '15px 15px', maskImage: 'radial-gradient(ellipse at center, black 0%, black 60%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, black 60%, transparent 100%)' }} />
                                </div>
                                <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-500 pointer-events-none" />

                                <div className="flex items-center justify-between mb-6 relative z-10">
                                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 group-hover:bg-white/20 text-[10px] font-bold tracking-widest uppercase text-primary group-hover:text-white w-fit transition-colors duration-500">
                                        {project.category}
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-gray-50 group-hover:bg-white flex items-center justify-center border border-gray-100 group-hover:border-white transition-all duration-300 shadow-sm">
                                        <Icon icon="mdi:rocket-launch" width={20} className="text-dark/30 group-hover:text-primary transition-colors duration-300" />
                                    </div>
                                </div>

                                <h4 className="font-display text-4xl font-bold text-dark group-hover:text-white transition-colors leading-[1.2] mb-5 relative z-10 duration-500">
                                    {project.title}
                                </h4>
                                <p className="text-lg font-medium text-dark/60 group-hover:text-white/80 leading-relaxed mb-10 flex-1 relative z-10 transition-colors duration-500">
                                    {project.excerpt}
                                </p>
                                <Link href="/projects" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-dark group-hover:text-white transition-colors duration-500 relative z-10 mt-auto">
                                    Read Case Study
                                    <Icon icon="mdi:arrow-right" width={20} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* VIEW ALL BUTTON - Desktop only (mobile uses carousel card) */}
                <motion.div
                    className="hidden lg:flex mt-12 justify-center w-full px-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <Link href="/projects" className="w-full sm:w-auto">
                        <button className="btn w-full sm:w-auto h-[48px] px-12 text-xs tracking-[0.2em] shadow-xl group">
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                VIEW ALL PROJECTS
                                <Icon icon="mdi:arrow-top-right" width={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                            </span>
                        </button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}