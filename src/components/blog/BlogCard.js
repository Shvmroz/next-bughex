'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function BlogCard({ blog, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/projects/${blog.slug}`}>
        <div
          className="rounded-2xl border border-gray-100 hover:border-primary/30 transition-all duration-500 overflow-hidden h-full shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(19,167,150,0.08)] bg-white"
        >
          <div
            className="h-44 flex items-center justify-center relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, rgba(24, 214, 191, 0.12), rgba(24, 214, 191, 0.03))`,
            }}
          >
            <div className="absolute inset-0 grid-bg opacity-50" />
            <div className="relative z-10 text-center">
              <span className="text-5xl text-primary/30">{blog.category.charAt(0)}</span>
              <p className="text-xs text-primary/60 mt-2 font-display font-semibold tracking-wider uppercase">
                {blog.category}
              </p>
            </div>
            <motion.div
              className="absolute inset-0 bg-primary/5"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
                {blog.category}
              </span>
              <span className="text-xs text-dark/40">{blog.readTime}</span>
            </div>

            <h3 className="font-display font-bold text-dark text-lg leading-tight mb-2 group-hover:text-primary transition-colors duration-300">
              {blog.title}
            </h3>
            <p className="text-dark/60 text-sm leading-relaxed mb-5 line-clamp-2">{blog.excerpt}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-dark"
                  style={{ background: 'linear-gradient(135deg, #18D6BF, #4de8d4)' }}
                >
                  {blog.author.charAt(0)}
                </div>
                <div>
                  <p className="text-xs text-dark/70 font-medium">{blog.author}</p>
                  <p className="text-xs text-dark/40">{blog.date}</p>
                </div>
              </div>
              <motion.span
                className="text-primary text-sm"
                animate={{ x: 0 }}
                whileHover={{ x: 3 }}
              >
                →
              </motion.span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
