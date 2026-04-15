'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/blog/BlogCard';
import { blogs, insightsPageContent } from '@/lib/mock';

export default function InsightsPage() {
  const c = insightsPageContent;
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = blogs.filter((b) => {
    const matchCat = activeCategory === 'All' || b.category === activeCategory;
    const matchSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(search.toLowerCase());
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
            <motion.p
              className="text-xs font-bold tracking-[0.3em] text-primary uppercase mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              BugHex Blog
            </motion.p>
            <motion.h1
              className="font-display text-4xl md:text-6xl font-bold text-dark mb-4 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {c.title}{' '}
              <span className="text-gradient-animated">{c.titleHighlight}</span>
            </motion.h1>
            <motion.p
              className="text-dark/60 text-lg max-w-xl mx-auto mb-10 font-medium"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {c.subtitle}
            </motion.p>

            <motion.div
              className="max-w-md mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <input
                type="text"
                placeholder={c.searchPlaceholder}
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
              {c.categories.map((cat) => (
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
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((blog, i) => (
                  <BlogCard key={blog.id} blog={blog} index={i} />
                ))}
              </div>
            ) : (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-dark/40 text-lg">{c.emptyState}</p>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
