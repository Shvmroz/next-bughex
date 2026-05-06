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
        <section className="pt-32 pb-16 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(24, 214, 191, 0.07) 0%, transparent 70%)',
            }}
          />
          <div className="absolute inset-0 grid-bg opacity-30" />

          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <motion.h1
              className="font-display text-4xl md:text-6xl font-bold text-dark mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {projectsPageContent.title}{' '}
              <span className="text-gradient-animated">{projectsPageContent.titleHighlight}</span>
            </motion.h1>
            <motion.p
              className="text-dark/60 text-lg max-w-xl mx-auto mb-10"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {projectsPageContent.subtitle}
            </motion.p>

            <motion.div
              className="max-w-md mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <input
                type="text"
                placeholder={projectsPageContent.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-5 py-3 rounded-full bg-white border border-gray-200 shadow-sm text-dark/80 text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder-dark/30"
              />
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-3 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-primary border border-primary text-white font-semibold shadow-md'
                      : 'bg-white border border-gray-200 text-dark/60 hover:border-primary/50 hover:text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-gray-100 bg-gray-50 animate-pulse h-80"
                  />
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
