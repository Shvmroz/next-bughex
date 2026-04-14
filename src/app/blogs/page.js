'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/blog/BlogCard';
import { blogs } from '@/lib/blogData';

const categories = ['All', 'Flutter', 'AI & ML', 'Mobile Development', 'Backend'];

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = blogs.filter((b) => {
    const matchCat = activeCategory === 'All' || b.category === activeCategory;
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-dark">
      <Header />
      <main className="flex-grow">
        <section className="pt-32 pb-16 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(24, 214, 191, 0.07) 0%, transparent 70%)',
            }}
          />
          <div className="absolute inset-0 grid-bg opacity-30" />

          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-xs text-primary font-medium tracking-wider uppercase">Knowledge Base</span>
            </motion.div>

            <motion.h1
              className="font-display text-4xl md:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Our <span className="text-gradient">Blog</span>
            </motion.h1>
            <motion.p
              className="text-white/50 text-lg max-w-xl mx-auto mb-10"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Insights, tutorials, and deep dives from the BugHex engineering team.
            </motion.p>

            <motion.div
              className="max-w-md mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-5 py-3 rounded-full bg-dark-card border border-dark-border text-white/70 text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder-white/20"
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
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${activeCategory === cat
                      ? 'bg-primary text-dark font-semibold'
                      : 'border border-dark-border text-white/50 hover:border-primary/50 hover:text-primary'
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
                <p className="text-white/30 text-lg">No articles found for your search.</p>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
