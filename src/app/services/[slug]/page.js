"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/home/ContactSection";
import { api_services_list } from "@/DAL/api";
import { apiBaseURL } from "@/config/config";

export default function ServiceDetailPage() {
    const params = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchService = async () => {
            setLoading(true);
            try {
                const result = await api_services_list();
                const list = Array.isArray(result) ? result : result?.data ?? [];
                // Match by ID or slug if we had one, for now I'll use ID or just find one
                const found = list.find(s => s.id.toString() === params.slug || s.name.toLowerCase().replace(/\s+/g, '-') === params.slug);
                setService(found);
            } catch (error) {
                console.error("Error fetching service:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchService();
    }, [params.slug]);

    if (loading) return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-grow pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Hero grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                        {/* Left: text */}
                        <div className="space-y-6">
                            <div className="h-8 w-36 rounded-full animate-[skeleton_1.8s_ease-in-out_infinite]" />
                            <div className="h-16 w-4/5 rounded-2xl animate-[skeleton_1.8s_ease-in-out_infinite]" />
                            <div className="h-16 w-3/5 rounded-2xl animate-[skeleton_1.8s_ease-in-out_infinite]" />
                            <div className="space-y-3">
                                <div className="h-5 w-full rounded-full animate-[skeleton_1.8s_ease-in-out_infinite]" />
                                <div className="h-5 w-5/6 rounded-full animate-[skeleton_1.8s_ease-in-out_infinite]" />
                                <div className="h-5 w-4/6 rounded-full animate-[skeleton_1.8s_ease-in-out_infinite]" />
                            </div>
                            <div className="h-14 w-48 rounded-full animate-[skeleton_1.8s_ease-in-out_infinite]" />
                        </div>
                        {/* Right: image */}
                        <div className="aspect-[4/3] rounded-[40px] animate-[skeleton_1.8s_ease-in-out_infinite]" />
                    </div>

                    {/* Technologies section */}
                    <div className="h-8 w-64 rounded-xl animate-[skeleton_1.8s_ease-in-out_infinite] mx-auto mb-12" />
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="p-6 rounded-2xl animate-[skeleton_1.8s_ease-in-out_infinite] flex flex-col items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/30" />
                                <div className="h-3 w-16 rounded-full bg-white/30" />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );

    if (!service) return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
                <Icon icon="solar:bug-bold-duotone" width="64" className="text-primary/20 mb-4" />
                <h1 className="text-4xl font-display font-bold text-dark mb-4">Service Not Found</h1>
                <p className="text-dark/50 max-w-md">The service you are looking for might have been moved or renamed.</p>
            </div>
            <Footer />
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-grow">
                {/* HERO SECTION */}
                <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-[#FAFBFC]">
                    <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
                    </div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-8">
                                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    Service Detail
                                </div>
                                <h1 className="text-5xl md:text-7xl font-display font-bold text-dark mb-8 leading-[1.05]">
                                    {service.name}
                                </h1>
                                <p className="text-xl md:text-2xl text-dark/60 font-medium leading-relaxed mb-12 max-w-xl">
                                    {service.description}
                                </p>
                                <button
                                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="btn h-14 px-10 text-sm tracking-widest"
                                >
                                    START A PROJECT
                                </button>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className="relative"
                            >
                                <div className="relative aspect-square md:aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl">
                                    <Image
                                        src={service.images?.[0] || '/bug.png'}
                                        alt={service.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
                                </div>
                                {/* Floating Stats */}
                                <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hidden md:block">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                            <Icon icon="solar:star-bold" className="text-primary" width={24} />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-dark">Premium</p>
                                            <p className="text-xs font-bold text-dark/30 uppercase tracking-widest">Quality Standard</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* FEATURES / TECHNOLOGIES */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-3xl font-display font-bold text-dark mb-16 text-center">Technologies & Expertise</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {service.technologies?.map((tech, i) => (
                                <motion.div
                                    key={tech}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    viewport={{ once: true }}
                                    className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col items-center justify-center text-center group hover:bg-primary transition-all duration-300"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                        <Icon icon="solar:code-bold" className="text-primary" width={24} />
                                    </div>
                                    <span className="text-xs font-bold text-dark/60 group-hover:text-white uppercase tracking-wider">{tech}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <ContactSection isPage={false} />
            </main>
            <Footer />
        </div>
    );
}
