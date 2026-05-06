'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';

export default function ProjectCard({ project, index }) {
  const thumbnail = project.images?.[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/projects/${project.id}`} className="block h-full">
        <div className="relative rounded-3xl bg-white border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(27,181,162,0.12)] hover:border-primary/20 hover:bg-primary transition-all duration-500 flex flex-col overflow-hidden h-full">

          {/* Grid overlay on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-3xl z-0">
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
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-500 pointer-events-none z-0" />

          {/* Thumbnail */}
          <div className="relative w-full h-48 overflow-hidden rounded-t-3xl z-10 shrink-0">
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(24,214,191,0.12), rgba(24,214,191,0.03))' }}
              >
                <div className="absolute inset-0 grid-bg opacity-50" />
                <span className="relative z-10 text-5xl text-primary/30 group-hover:text-white/30 transition-colors duration-500">
                  {project.category?.charAt(0)}
                </span>
              </div>
            )}
            {/* Overlay tint on hover */}
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col flex-1 p-6">

            {/* Badge + icon row */}
            <div className="flex items-center justify-between mb-4">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 group-hover:bg-white/20 text-[10px] font-bold tracking-widest uppercase text-primary group-hover:text-white transition-colors duration-500">
                {project.category}
              </div>
              <div className="w-9 h-9 rounded-xl bg-gray-50 group-hover:bg-white flex items-center justify-center border border-gray-100 group-hover:border-white transition-all duration-300 shrink-0">
                <Icon icon="mdi:rocket-launch" width={16} className="text-dark/30 group-hover:text-primary transition-colors duration-300" />
              </div>
            </div>

            <h3 className="font-display font-bold text-dark group-hover:text-white transition-colors duration-500 text-xl leading-snug mb-3">
              {project.name}
            </h3>

            <p className="text-sm font-medium text-dark/60 group-hover:text-white/80 leading-relaxed flex-1 mb-5 transition-colors duration-500 line-clamp-3">
              {project.description}
            </p>

            {/* Technologies */}
            {project.technologies?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-gray-100 group-hover:bg-white/20 text-dark/60 group-hover:text-white transition-colors duration-500"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-gray-100 group-hover:bg-white/20 text-dark/40 group-hover:text-white/60 transition-colors duration-500">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Footer row */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 group-hover:border-white/20 transition-colors duration-500">
              {project.client ? (
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-dark shrink-0"
                    style={{ background: 'linear-gradient(135deg, #18D6BF, #4de8d4)' }}
                  >
                    {project.client.charAt(0)}
                  </div>
                  <p className="text-xs text-dark/70 group-hover:text-white/80 font-medium transition-colors duration-500">
                    {project.client}
                  </p>
                </div>
              ) : (
                <span />
              )}
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-dark/40 group-hover:text-white transition-colors duration-500">
                View
                <Icon icon="mdi:arrow-right" width={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </div>

          </div>
        </div>
      </Link>
    </motion.article>
  );
}
