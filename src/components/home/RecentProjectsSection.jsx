"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Icon } from "@iconify/react";
import SectionHeader from "./SectionHeader";
import ProjectCard from "@/components/projects/ProjectCard";
import { api_projects_list } from "@/DAL/api";

export default function RecentProjectsSection() {
  const [projects, setProjects] = useState([]);

  const get_recent_projects = async () => {
    const result = await api_projects_list();
    if (
      result.code === 200 ||
      Array.isArray(result) ||
      Array.isArray(result?.data)
    ) {
      const list = Array.isArray(result) ? result : result?.data ?? [];
      setProjects(list.slice(0, 3));
    } else {
      console.error("Failed to load recent projects:", result.message);
    }
  };

  useEffect(() => {
    get_recent_projects();
  }, []);

  return (
    <section className="py-12 md:py-24 bg-[#FAFBFC] relative">
      <div className="max-w-7xl mx-auto">
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
        <div className="lg:hidden mt-10 mb-2 mx-6 rounded-xl overflow-hidden relative h-52 shadow-xl">
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
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
              scrollPaddingLeft: "1.5rem",
            }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="snap-start shrink-0 w-[80vw] max-w-[320px]"
              >
                <ProjectCard project={project} index={index} />
              </div>
            ))}

            <div className="shrink-0 w-2" />
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-1.5 mt-2 px-6">
            {projects.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-dark/20" />
            ))}
            <div className="w-1.5 h-1.5 rounded-full bg-dark/20" />
          </div>
        </div>

        {/* ── DESKTOP LAYOUT ── */}
        <div className="hidden lg:flex flex-row gap-16 mt-16 items-start relative px-6">
          {/* LEFT PANEL - STICKY VIDEO */}
          <div className="lg:w-1/2 sticky top-32 rounded-xl overflow-hidden shadow-2xl h-[calc(100vh-160px)] min-h-[500px]">
            <div className="absolute inset-0 bg-dark z-0" />
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
            >
              <source src="/video/recent_project_video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent z-10" />
            <div className="absolute bottom-12 left-10 right-10 z-20">
              <h3 className="text-4xl xl:text-5xl font-display font-bold text-white mb-4 leading-tight">
                Live <br /> Projects
              </h3>
            </div>
          </div>

          {/* RIGHT PANEL - PROJECT CARDS */}
          <div className="lg:w-1/2 flex flex-col gap-8">
            {projects?.length > 0 ? (
              projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <ProjectCard project={project} index={index} />
                </motion.div>
              ))
            ) : (
              <div className="flex items-center justify-center py-20 text-center w-full text-gray-500 gap-2">
                <Icon icon="solar:bug-bold-duotone" width="24" height="24" />
                No Projects Found
              </div>
            )}
          </div>
        </div>

        {/* VIEW ALL BUTTON - below scroller on all screens */}
        <motion.div
          className="flex mt-12 justify-end w-full px-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Link href="/projects" className="w-full sm:w-auto">
            <button className="btn w-full sm:w-auto h-[48px] px-12 text-xs tracking-[0.2em] shadow-xl group">
              <span className="relative z-10 flex items-center justify-center gap-3">
                VIEW ALL PROJECTS
                <Icon
                  icon="mdi:arrow-top-right"
                  width={18}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                />
              </span>
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
