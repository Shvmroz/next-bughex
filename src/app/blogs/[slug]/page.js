'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getBlogBySlug, blogs } from '@/lib/blogData';
import BlogCard from '@/components/blog/BlogCard';

export default function BlogDetailPage({ params }) {
  const { slug } = params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const related = blogs.filter((b) => b.id !== blog.id).slice(0, 3);

  const contentHtml = blog.content
    .split('\n\n')
    .map((para, i) => {
      if (para.startsWith('## ')) {
        return (
          <h2 key={i} className="font-display font-bold text-2xl text-white mt-10 mb-4">
            {para.replace('## ', '')}
          </h2>
        );
      }
      if (para.startsWith('- ')) {
        const items = para.split('\n').filter((l) => l.startsWith('- '));
        return (
          <ul key={i} className="space-y-2 mb-6 pl-4">
            {items.map((item, j) => {
              const parts = item.replace('- ', '').split('**');
              return (
                <li key={j} className="text-white/60 text-base leading-relaxed flex gap-2">
                  <span className="text-primary mt-1.5">◆</span>
                  <span>
                    {parts.map((p, k) =>
                      k % 2 === 1 ? <strong key={k} className="text-white">{p}</strong> : p
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        );
      }
      return (
        <p key={i} className="text-white/60 text-base leading-relaxed mb-6">
          {para}
        </p>
      );
    });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-dark">
        <section className="pt-32 pb-12 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 40% at 50% 20%, rgba(24, 214, 191, 0.06) 0%, transparent 70%)',
            }}
          />
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-primary transition-colors mb-8"
              >
                ← Back to Blog
              </Link>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="text-xs px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
                  {blog.category}
                </span>
                <span className="text-xs text-white/30">{blog.readTime}</span>
                <span className="text-xs text-white/30">{blog.date}</span>
              </div>

              <h1 className="font-display font-bold text-3xl md:text-5xl text-white leading-tight mb-6">
                {blog.title}
              </h1>

              <p className="text-white/50 text-lg leading-relaxed mb-8">{blog.excerpt}</p>

              <div className="flex items-center gap-3 pb-8 border-b border-dark-border">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-dark"
                  style={{ background: 'linear-gradient(135deg, #18D6BF, #4de8d4)' }}
                >
                  {blog.author.charAt(0)}
                </div>
                <div>
                  <p className="font-display font-semibold text-white text-sm">{blog.author}</p>
                  <p className="text-white/40 text-xs">{blog.authorRole}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              className="rounded-2xl h-56 mb-10 flex items-center justify-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(24, 214, 191, 0.12), rgba(24, 214, 191, 0.03))',
                border: '1px solid rgba(24, 214, 191, 0.15)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="absolute inset-0 grid-bg opacity-40" />
              <div className="relative z-10 text-center">
                <span className="text-7xl text-primary/20 font-display font-bold">{blog.category.charAt(0)}</span>
                <p className="text-sm text-primary/50 font-display tracking-widest uppercase mt-2">{blog.category}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {contentHtml}
            </motion.div>

            <div className="mt-10 pt-8 border-t border-dark-border">
              <p className="text-xs text-white/30 mb-3 uppercase tracking-wider">Tags</p>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm px-3 py-1.5 rounded-lg border border-dark-border text-white/50 hover:border-primary/30 hover:text-primary transition-all cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-dark-card">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-display font-bold text-2xl text-white mb-8">More Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((b, i) => (
                <BlogCard key={b.id} blog={b} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
