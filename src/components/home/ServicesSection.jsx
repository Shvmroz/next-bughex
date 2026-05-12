"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import SectionHeader from "./SectionHeader";
import { api_services_list } from "@/DAL/api";
import { apiBaseURL } from "@/config/config";
import Image from "next/image";

export default function ServicesSection() {
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
    <section
      id="services"
      className="pt-16 pb-24 md:py-32 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader
          tag="Our Expertise"
          title="Engineered to Scale Your Services"
          subtitle="We deliver end-to-end digital solutions tailored to the unique demands of modern business. From concept to cloud, we build for excellence."
          align="left"
        />

        <div className="flex flex-col gap-10 md:gap-16 mt-10 md:mt-16">
          {loading ? (
            // Skeleton Loader
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-[480px] md:h-[550px] rounded-3xl bg-gray-50 animate-pulse"
              />
            ))
          ) : services.length > 0 ? (
            services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group relative h-auto min-h-[450px] md:h-[550px] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden flex flex-col justify-center md:justify-end shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={getImageUrl(service.images?.[0] || service.image)}
                    alt={service.name}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-dark/40 md:from-dark/90 md:via-dark/60 md:to-transparent transition-all duration-700" />
                </div>

                {/* Content Container */}
                <div className="relative z-10 p-8 md:p-16 w-full max-w-5xl transition-all duration-500">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex flex-col items-center text-center md:items-start md:text-left"
                  >
                    {/* Header Row */}
                    <div className="flex items-center gap-4 mb-6 md:mb-8 md:flex-col md:items-start">
                      <div className="w-10 h-10 md:w-16 md:h-16 flex-shrink-0 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-xl border border-white/10 md:bg-transparent md:backdrop-blur-none md:border-none md:rounded-none md:mb-6">
                        {service.icon ? (
                          <img
                            src={getImageUrl(service.icon)}
                            className="w-6 h-6 md:w-12 md:h-12 object-contain filter brightness-0 invert"
                            alt=""
                          />
                        ) : (
                          <Icon
                            icon="solar:reorder-bold"
                            width="24"
                            className="text-white md:w-12"
                          />
                        )}
                      </div>
                      <h2 className="text-2xl md:text-6xl font-display font-bold text-white tracking-tight">
                        {service.name}
                      </h2>
                    </div>

                    {/* Description Box */}
                    <p className="text-white/70 text-base md:text-xl font-medium leading-relaxed mb-8 max-w-2xl px-6 py-5 md:px-0 md:py-0 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 md:bg-transparent md:backdrop-blur-none md:border-none md:ml-0">
                      {service.description}
                    </p>

                    {/* Tech & Action */}
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 w-full">
                      {service.technologies?.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Corner Decoration (Desktop) */}
                <div className="absolute top-12 right-12 hidden md:flex opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                  <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-xl">
                    <Icon
                      icon="solar:arrow-right-up-linear"
                      width={32}
                      className="text-white"
                    />
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-dark/30 font-medium">
              No services available at the moment.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
