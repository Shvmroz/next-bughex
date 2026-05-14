'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/projects/ProjectCard';
import { projectsPageContent } from '@/lib/mock';
import { api_projects_list } from '@/DAL/api';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const get_projects_list = async () => {
    setLoading(true);
    const result = await api_projects_list();
    if (result.code === 200 || Array.isArray(result) || Array.isArray(result?.data)) {
      const list = Array.isArray(result) ? result : result?.data ?? [];
      setProjects(list);
      setLoading(false);
    } else {
      console.error('Failed to load projects:', result.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    get_projects_list();
  }, []);

  // Build categories dynamically from API data
  const categories = [
    'All',
    ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean))),
  ];

  const filtered = projects.filter((p) => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch =
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        <section className="pt-32 pb-8 md:pb-16 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(24, 214, 191, 0.07) 0%, transparent 70%)',
            }}
          />
          <div className="absolute inset-0 grid-bg opacity-30" />

          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-dark mb-4">
              {projectsPageContent.title}{' '}
              <span className="text-gradient-animated">{projectsPageContent.titleHighlight}</span>
            </h1>
            <p className="text-dark/60 text-lg max-w-xl mx-auto mb-10">
              {projectsPageContent.subtitle}
            </p>

            <div className="max-w-md mx-auto mb-8">
              <input
                type="text"
                placeholder={projectsPageContent.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 rounded-full bg-[#F8F9FA] border border-gray-200 text-sm outline-none focus:bg-white focus:border-primary focus:shadow-[0_0_0_3px_rgba(27,181,162,0.08)] transition placeholder:text-gray-400/60"
              />
            </div>

            {/* ── MOBILE: filter icon + horizontal chips ── */}
            <div
              className="flex md:hidden items-center gap-2 max-w-md mx-auto mb-2 md:mb-8 overflow-x-auto pb-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* Filter / clear icon */}
              <button
                onClick={() => setActiveCategory('All')}
                className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center shadow-sm transition-colors duration-200 ${
                  activeCategory !== 'All'
                    ? 'bg-primary border-primary text-white'
                    : 'bg-white border-gray-200 text-dark/50'
                }`}
              >
                {activeCategory !== 'All' ? (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M11 12h2" />
                  </svg>
                )}
              </button>
              {/* Chips */}
              {loading
                ? [64, 80, 72, 56, 88].map((w, i) => (
                    <div key={i} className="shrink-0 h-8 rounded-full animate-[skeleton_1.8s_ease-in-out_infinite]" style={{ width: w }} />
                  ))
                : categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                        activeCategory === cat
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-white border border-gray-200 text-dark/60'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
            </div>

            {/* ── DESKTOP: badge pills ── */}
            <div className="hidden md:flex flex-wrap gap-3 justify-center">
              {loading
                ? [64, 80, 72, 96, 56, 88].map((w, i) => (
                    <div key={i} className="h-10 rounded-full animate-[skeleton_1.8s_ease-in-out_infinite]" style={{ width: w }} />
                  ))
                : categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${activeCategory === cat
                          ? 'bg-primary border border-primary text-white font-semibold shadow-md'
                          : 'bg-white border border-gray-200 text-dark/60 hover:border-primary/50 hover:text-primary'
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-gray-200 bg-white overflow-hidden flex flex-col"
                  >
                    {/* Thumbnail */}
                    <div className="w-full aspect-[4/3] animate-[skeleton_1.8s_ease-in-out_infinite] shrink-0" />

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-6 gap-3">
                      {/* Badge + icon row */}
                      <div className="flex items-center justify-between">
                        <div className="h-6 w-24 rounded-full animate-[skeleton_1.8s_ease-in-out_infinite]" />
                        <div className="w-9 h-9 rounded-xl animate-[skeleton_1.8s_ease-in-out_infinite]" />
                      </div>
                      {/* Title */}
                      <div className="h-6 w-3/4 rounded-lg animate-[skeleton_1.8s_ease-in-out_infinite]" />
                      {/* Description lines */}
                      <div className="space-y-2 flex-1">
                        <div className="h-4 rounded-full animate-[skeleton_1.8s_ease-in-out_infinite] w-full" />
                        <div className="h-4 rounded-full animate-[skeleton_1.8s_ease-in-out_infinite] w-5/6" />
                        <div className="h-4 rounded-full animate-[skeleton_1.8s_ease-in-out_infinite] w-4/6" />
                      </div>
                      {/* Tech chips */}
                      <div className="flex gap-1.5">
                        {[56, 72, 48].map((w, j) => (
                          <div key={j} className="h-6 rounded-full animate-[skeleton_1.8s_ease-in-out_infinite]" style={{ width: w }} />
                        ))}
                      </div>
                      {/* Footer row */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="h-4 w-28 rounded-full animate-[skeleton_1.8s_ease-in-out_infinite]" />
                        <div className="h-4 w-10 rounded-full animate-[skeleton_1.8s_ease-in-out_infinite]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}
              </div>
            ) : (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-dark/40 text-lg">{projectsPageContent.emptyState}</p>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
