'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/blogs/BlogCard';
import { api_blogs_list } from '@/DAL/api';
import { Icon } from '@iconify/react';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const get_blogs_list = async () => {
    setLoading(true);
    const result = await api_blogs_list();
    if (Array.isArray(result)) {
      setBlogs(result);
      setLoading(false);
    } else if (Array.isArray(result?.data)) {
      setBlogs(result.data);
      setLoading(false);
    } else {
      console.error('Failed to load blogs:', result.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    get_blogs_list();
  }, []);

  // Build categories dynamically from API data
  const categories = [
    'All',
    ...Array.from(new Set(blogs.map((b) => b.category).filter(Boolean))),
  ];

  const filtered = blogs.filter((b) => {
    const matchCat = activeCategory === 'All' || b.category === activeCategory;
    const matchSearch =
      b.title?.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">

        {/* ── HERO ── */}
        <section className="pt-32 pb-8 md:pb-16 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(24, 214, 191, 0.07) 0%, transparent 70%)',
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
              Our{' '}
              <span className="text-gradient-animated">Blogs</span>
            </motion.h1>
            <motion.p
              className="text-dark/60 text-lg max-w-xl mx-auto mb-10"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Insights, tutorials, and deep dives from the BugHex team.
            </motion.p>

            {/* Search */}
            <motion.div
              className="max-w-md mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <input
                type="text"
                placeholder="Search blogs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 rounded-[4px] bg-[#F8F9FA] border border-gray-200 text-sm outline-none focus:bg-white focus:border-primary focus:shadow-[0_0_0_3px_rgba(27,181,162,0.08)] transition placeholder:text-gray-400/60"
              />

            </motion.div>

            {/* ── MOBILE: filter dropdown ── */}
            <motion.div
              className="flex md:hidden max-w-md mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="relative w-full">
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="w-full appearance-none px-5 py-3 pr-10 rounded-full bg-white border border-gray-200 shadow-sm text-dark/80 text-sm focus:outline-none focus:border-primary/50 transition-colors font-semibold cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                  <svg className="w-4 h-4 text-dark/40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* ── DESKTOP: badge pills ── */}
            <motion.div
              className="hidden md:flex flex-wrap gap-3 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {categories.map((cat) => (
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
            </motion.div>
          </div>
        </section>

        {/* ── GRID ── */}
        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="rounded-3xl border border-gray-100 bg-gray-50 animate-pulse h-80" />
                ))}
              </div>
            ) : filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((blog, i) => (
                  <BlogCard key={blog.id} blog={blog} index={i} />
                ))}
              </div>
            ) : (

              <div className="flex items-center justify-center py-20 text-center w-full text-gray-500 gap-2">
                <Icon icon="solar:bug-bold-duotone" width="24" height="24" />
                No Blogs Found
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
