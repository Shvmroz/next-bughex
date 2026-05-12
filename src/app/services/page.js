"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/home/SectionHeader";
import { api_services_list } from "@/DAL/api";
import { apiBaseURL } from "@/config/config";

export default function ServicesPage() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    const get_services = async () => {
        setLoading(true);
        try {
            const result = await api_services_list();
            const list = Array.isArray(result) ? result : result?.data ?? [];
            setServices(list);
        } catch (error) {
            console.error("Failed to load services:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        get_services();
    }, []);

    const getImageUrl = (img) => {
        if (!img) return "/bug.png";
        if (img.startsWith("http")) return img;
        return `${apiBaseURL.replace(/\/$/, "")}/${img.replace(/^\//, "")}`;
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-grow pt-32 pb-32">
                <div className="max-w-7xl mx-auto px-6">
                    <SectionHeader
                        tag="Ditial Solutions"
                        title="Our Services"
                        subtitle="Premium engineering and design solutions tailored for growth."
                        align="center"
                    />

                    <div className="flex flex-col gap-12 mt-20">
                        {loading ? (
                            [...Array(3)].map((_, i) => (
                                <div key={i} className="h-[450px] rounded-3xl bg-gray-50 animate-pulse" />
                            ))
                        ) : services.length > 0 ? (
                            services.map((service, index) => (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    className="group relative h-[450px] md:h-[550px] rounded-3xl overflow-hidden flex flex-col justify-end"
                                >

                                    {/* Background Image */}
                                    <div className="absolute inset-0 z-0 overflow-hidden">
                                        <img
                                            src={getImageUrl(service.images?.[0])}
                                            alt={service.name}
                                            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-dark/75 group-hover:bg-dark/30 transition-all duration-700" />
                                    </div>

                                    {/* Content Container */}
                                    <div className="relative z-10 p-8 md:p-16 w-full max-w-4xl transition-all duration-500">
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + (index * 0.1) }}
                                        >
                                            <div className="w-[42px] h-[42px] flex items-center justify-center mb-6">
                                                {service.icon ? (
                                                    <img src={getImageUrl(service.icon)} className="w-[42px] h-[42px] object-contain filter brightness-0 invert" alt="" />
                                                ) : (
                                                    <Icon icon="meteocons:star-fill" width={42} height={42} />
                                                )}
                                            </div>
                                            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                                                {service.name}
                                            </h2>
                                            <p className="text-white/70 text-lg md:text-xl font-medium leading-relaxed mb-8 max-w-2xl px-8 py-6 rounded-2xl -ml-8 border border-transparent transition-all duration-500 group-hover:bg-white/5 group-hover:backdrop-blur-md group-hover:text-white group-hover:border-white/10">
                                                {service.description}
                                            </p>

                                            {/* Tech Tags */}
                                            <div className="flex flex-wrap gap-2 pt-4">
                                                {service.technologies?.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest backdrop-blur-md hover:bg-white/20 transition-all cursor-default"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </div>


                                </motion.div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-32 text-center w-full bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-100">
                                <Icon icon="solar:bug-bold-duotone" width="64" className="text-primary/20 mb-4" />
                                <h3 className="text-2xl font-display font-bold text-dark/30">No Services Found</h3>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
