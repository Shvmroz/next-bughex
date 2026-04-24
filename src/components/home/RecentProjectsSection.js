'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import SectionHeader from './SectionHeader';
import { blogs } from '@/lib/mock';

export default function RecentProjectsSection() {
    // Use the first 3 items from blogs as recent projects
    const recentProjects = blogs.slice(0, 3);

    return (
        <section className="py-24 bg-[#FAFBFC] relative">
            <div className="max-w-7xl mx-auto px-6">
                <SectionHeader
                    tag="Our Work"
                    title="Recent Projects"
                    subtitle="Explore some of our most impactful digital transformations and case studies."
                    dark={false}
                    align="left"
                />

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mt-16 items-start relative">

                    {/* LEFT PANEL - STICKY MEDIA */}
                    <div className="hidden lg:block lg:w-1/2 sticky top-32 rounded-[2.5rem] overflow-hidden shadow-2xl h-[calc(100vh-160px)] min-h-[500px]">
                        {/* Media background */}
                        <div className="absolute inset-0 bg-dark z-0" />
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
                        >
                            <source src="/video/vid-1.mp4" type="video/mp4" />
                        </video>

                        {/* Color and Gradient Overlays */}
                        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent z-10" />

                        {/* Content on Video */}
                        <div className="absolute bottom-12 left-10 right-10 z-20">

                            <h3 className="text-4xl xl:text-5xl font-display font-bold text-white mb-4 leading-tight">
                                Our Digital <br />Portfolio
                            </h3>
                            <p className="text-white/70 font-medium text-lg max-w-sm">
                                We take pride in building scalable, visually spectacular products. See what we&apos;ve engineered.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT PANEL - SCROLLING CARDS */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-8 lg:gap-10">
                        {recentProjects.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="group cursor-pointer rounded-3xl bg-white border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(27,181,162,0.12)] hover:border-primary/20 transition-all duration-500 flex flex-col p-8 sm:p-12 relative overflow-hidden"
                            >
                                {/* Subtle Background Glow behind card content */}
                                <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none" />

                                <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-[10px] font-bold tracking-widest uppercase text-primary w-fit mb-6 relative z-10">
                                    {project.category}
                                </div>

                                <h4 className="font-display text-3xl sm:text-4xl font-bold text-dark group-hover:text-primary transition-colors leading-[1.2] mb-5 relative z-10">
                                    {project.title}
                                </h4>
                                <p className="text-base sm:text-lg font-medium text-dark/60 leading-relaxed mb-10 flex-1 relative z-10">
                                    {project.excerpt}
                                </p>

                                <div className="mt-auto flex items-center justify-between relative z-10">
                                    <Link href={`/projects`} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-dark group-hover:text-primary transition-colors">
                                        Read Case Study
                                        <Icon icon="mdi:arrow-right" width={20} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                                    </Link>

                                    {/* Visual icon for flair */}
                                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-primary border border-gray-100 group-hover:border-primary transition-all duration-300 shadow-sm">
                                        <Icon icon="mdi:rocket-launch" width={20} className="text-dark/30 group-hover:text-white transition-colors duration-300" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* VIEW ALL BUTTON */}
                        <motion.div
                            className="mt-6 flex justify-start lg:justify-center w-full"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <Link href="/projects" className="w-full sm:w-auto">
                                <button className="btn w-full sm:w-auto h-[56px] px-10 text-[11px] lg:text-xs tracking-[0.2em] shadow-xl group">
                                    <i className="animation"></i>
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        PROJECTS
                                        <Icon icon="mdi:arrow-top-right" width={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                    </span>
                                    <i className="animation"></i>
                                </button>
                            </Link>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
