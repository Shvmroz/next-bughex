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
      if (Array.isArray(result)) {
        setServices(result);
      } else if (Array.isArray(result?.data)) {
        setServices(result.data);
      }
    } catch (error) {
      console.error("Failed to load services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    get_services();
  }, []);

  return (
    <section
      id="services"
      className="py-24 md:py-32 bg-white relative overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] z-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader
          tag="Our Expertise"
          title="Engineered to Scale Your Services"
          subtitle="We deliver end-to-end digital solutions tailored to the unique demands of modern business. From concept to cloud, we build for excellence."
          align="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-16">
          {loading ? (
            // Skeleton Loader
            [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-2xl bg-gray-50 animate-pulse border border-gray-100"
              />
            ))
          ) : services.length > 0 ? (
            services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative h-full p-8 rounded-3xl bg-white border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_48px_rgba(27,181,162,0.08)] transition-all duration-500 hover:-translate-y-2 flex flex-col">
                  {/* Icon Area */}
                  <div className="w-16 h-16 rounded-2xl bg-[#f8fdfc] border border-gray-100 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:border-primary transition-colors duration-500">
                    {service.icon ? (
                      <img
                        src={`${apiBaseURL}${service.icon}`}
                        alt={service.name}
                        className="w-8 h-8 object-contain transition-all duration-500 group-hover:filter group-hover:brightness-0 group-hover:invert"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/bug.png"; // Fallback
                        }}
                      />
                    ) : (
                      <Icon
                        icon="solar:reorder-bold"
                        width="32"
                        className="text-primary group-hover:text-white transition-colors duration-500"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-display font-bold text-dark mb-4 group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-dark/50 text-base leading-relaxed mb-8 flex-grow font-medium">
                    {service.description}
                  </p>

                  {/* Technologies */}
                  {service.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-50">
                      {service.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gray-50 text-dark/40 group-hover:bg-primary/5 group-hover:text-primary transition-all"
                        >
                          {tech}
                        </span>
                      ))}
                      {service.technologies.length > 4 && (
                        <span className="text-[10px] font-bold text-dark/20 flex items-center">
                          +{service.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Hover Decoration */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-10 transition-opacity">
                    <Icon
                      icon="solar:arrow-right-up-linear"
                      width={48}
                      className="text-primary"
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
