'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/projects/ProjectCard';
import { api_project_detail, api_projects_list } from '@/DAL/api';
import { useRouter } from 'next/navigation';

export default function ProjectDetailPage({ params }) {
  const slug = params.slug;

  const [project, setProject] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // stores error message, null = no error
  const fetched = useRef(false);
  const router = useRouter();


  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    const get_related_projects = async () => {
      const result = await api_projects_list();
      if (Array.isArray(result)) {
        setRelated(result.filter((p) => String(p.id) !== String(slug)).slice(0, 3));
      } else if (Array.isArray(result?.data)) {
        setRelated(result.data.filter((p) => String(p.id) !== String(slug)).slice(0, 3));
      } else {
        console.error('Failed to load related projects:', result.message);
      }
    };

    const get_project_detail = async () => {
      setLoading(true);
      const result = await api_project_detail(slug);
      const data = result?.data ?? result;

      if (data && !data.code && !data.message) {
        setProject(data);
        setLoading(false);
        get_related_projects();
      } else {
        setError(result.message || 'Project not found.');
        setLoading(false);
      }
    };

    get_project_detail();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white pt-32 pb-24">
          <div className="max-w-4xl mx-auto px-6 space-y-6">
            {/* Back link */}
            <div className="h-4 w-28 rounded-full animate-[skeleton_1.8s_ease-in-out_infinite]" />
            {/* Meta chips */}
            <div className="flex gap-2">
              <div className="h-6 w-20 rounded-full animate-[skeleton_1.8s_ease-in-out_infinite]" />
              <div className="h-6 w-14 rounded-full animate-[skeleton_1.8s_ease-in-out_infinite]" />
            </div>
            {/* Title */}
            <div className="h-10 w-3/4 rounded-xl animate-[skeleton_1.8s_ease-in-out_infinite]" />
            {/* Description */}
            <div className="h-6 w-1/2 rounded-xl animate-[skeleton_1.8s_ease-in-out_infinite]" />
            {/* Tech chips row */}
            <div className="flex gap-2 flex-wrap pb-8 border-b border-gray-100">
              {[72, 88, 64, 96, 56].map((w, i) => (
                <div key={i} className="h-8 rounded-full animate-[skeleton_1.8s_ease-in-out_infinite]" style={{ width: w }} />
              ))}
            </div>
            {/* Primary image */}
            <div className="h-72 md:h-[480px] w-full rounded-3xl animate-[skeleton_1.8s_ease-in-out_infinite]" />
            {/* Secondary images grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-40 rounded-2xl animate-[skeleton_1.8s_ease-in-out_infinite]" />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // ── ERROR / NOT FOUND ──
  if (error) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white flex items-center justify-center">
          <motion.div
            className="text-center px-6 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display font-bold text-3xl text-dark mb-3 tracking-tight">
              Project Not Found
            </h1>
            <p className="text-dark/50 text-base mb-8 font-medium">
              {error}
            </p>
            <button className="btn" onClick={() => router.back()}>
              <i className="animation"></i>
              Go Back
              <i className="animation"></i>
            </button>

          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  const year = project.year ? new Date(project.year).getFullYear() : null;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">

        {/* ── HERO ── */}
        <section className="pt-32 pb-12 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 40% at 50% 20%, rgba(24, 214, 191, 0.07) 0%, transparent 70%)',
            }}
          />
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm text-dark/40 hover:text-primary font-bold transition-colors mb-8"
              >
                ← Back to Projects
              </Link>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="text-xs px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold tracking-wide">
                  {project.category}
                </span>
                {year && (
                  <span className="text-xs text-dark/30 font-bold">{year}</span>
                )}
                {project.client && (
                  <span className="text-xs text-dark/30 font-bold">Client: {project.client}</span>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary font-bold hover:underline"
                  >
                    Live Project ↗
                  </a>
                )}
              </div>

              <h1 className="font-display font-bold text-3xl md:text-5xl text-dark leading-tight mb-6 tracking-tight">
                {project.name}
              </h1>

              <p className="text-dark/60 text-lg md:text-xl leading-relaxed mb-8 font-medium italic border-l-4 border-primary/30 pl-6">
                {project.description}
              </p>

              {/* Technologies */}
              {project.technologies?.length > 0 && (
                <div className="flex flex-wrap gap-2 pb-8 border-b border-gray-100">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-4 py-2 rounded-full border border-gray-100 bg-gray-50 text-dark/50 hover:border-primary/30 hover:text-primary transition-all cursor-default font-bold uppercase tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* ── IMAGES ── */}
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-6">
            {project.images?.length > 0 ? (
              <motion.div
                className="grid gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* Primary image — large */}
                <div className="relative w-full h-72 md:h-[480px] rounded-3xl overflow-hidden shadow-xl shadow-primary/5">
                  <Image
                    src={project.images[0]}
                    alt={project.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Additional images — grid */}
                {project.images.length > 1 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {project.images.slice(1).map((img, i) => (
                      <div
                        key={i}
                        className="relative h-40 rounded-2xl overflow-hidden shadow-md"
                      >
                        <Image src={img} alt={`${project.name} ${i + 2}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : (
              /* Fallback placeholder */
              <motion.div
                className="rounded-3xl h-64 mb-12 flex items-center justify-center relative overflow-hidden shadow-xl shadow-primary/5"
                style={{
                  background: 'linear-gradient(135deg, rgba(24, 214, 191, 0.12), rgba(24, 214, 191, 0.03))',
                  border: '1px solid rgba(24, 214, 191, 0.15)',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="relative z-10 text-center">
                  <span className="text-8xl text-primary/20 font-display font-bold">
                    {project.category?.charAt(0)}
                  </span>
                  <p className="text-sm text-primary/50 font-display tracking-[0.2em] uppercase mt-2 font-bold">
                    {project.category}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </section>

      </main>

      {/* ── RELATED PROJECTS ── */}
      {related.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-primary font-bold tracking-widest uppercase text-xs mb-3">
                  More Work
                </p>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-dark tracking-tight">
                  Related Projects
                </h2>
              </div>
              <Link
                href="/projects"
                className="text-sm font-bold text-primary border-b-2 border-primary/20 hover:border-primary transition-all pb-1"
              >
                View All Projects
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
