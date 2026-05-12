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
        <div className="relative rounded-xl bg-white border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] hover:shadow-2xl hover:shadow-black/10 hover:border-primary transition-all duration-500 flex flex-col overflow-hidden h-full">

          {/* Grid overlay on hover - Gray Graph Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-xl z-0">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)`,
                backgroundSize: '15px 15px',
                maskImage: 'radial-gradient(ellipse at center, black 0%, black 60%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, black 60%, transparent 100%)',
              }}
            />
          </div>
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none z-0" />

          {/* Thumbnail */}
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-xl z-10 shrink-0">
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gray-50">
                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v13.5a1.5 1.5 0 001.5 1.5z" />
                </svg>
                <span className="text-xs text-gray-300 font-medium">No image</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col flex-1 p-6">

            {/* Badge + icon row */}
            <div className="flex items-center justify-between mb-4">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-[10px] font-bold tracking-widest uppercase text-primary transition-colors duration-500">
                {project.category}
              </div>
              <div className="w-9 h-9 rounded-xl bg-gray-50 group-hover:bg-primary/10 flex items-center justify-center border border-gray-100 group-hover:border-primary/20 transition-all duration-300 shrink-0">
                <Icon icon="mdi:rocket-launch" width={16} className="text-dark/30 group-hover:text-primary transition-colors duration-300" />
              </div>
            </div>

            <h3 className="font-display font-bold text-dark group-hover:text-primary transition-colors duration-500 text-xl leading-snug mb-3">
              {project.name}
            </h3>

            <p className="text-sm font-medium text-dark/60 leading-relaxed flex-1 mb-5 transition-colors duration-500 line-clamp-3">
              {project.description}
            </p>

            {/* Technologies */}
            {project.technologies?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-gray-100 group-hover:bg-primary/5 text-dark/60 group-hover:text-primary transition-colors duration-500"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-gray-100 group-hover:bg-primary/5 text-dark/40 group-hover:text-primary/60 transition-colors duration-500">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Footer row */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 transition-colors duration-500">
              {project.client ? (
                <div className="flex items-center gap-2">
                  <p className="text-xs text-dark/70 font-medium transition-colors duration-500 capitalize">
                    Client: {project.client}
                  </p>
                </div>
              ) : (
                <span />
              )}
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-dark/40 group-hover:text-primary transition-colors duration-500">
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
