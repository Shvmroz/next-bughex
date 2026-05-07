'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Estimate read time from content string (~200 wpm)
function readTime(content) {
  if (!content) return null;
  const words = content.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

export default function BlogCard({ blog, index }) {
  const thumbnail = blog.featured_image;
  const date = blog.created_at
    ? new Date(blog.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;
  const est = readTime(blog.content);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-primary/30 hover:shadow-[0_8px_32px_rgba(27,181,162,0.09)] transition-all duration-300"
    >
      <Link href={`/blogs/${blog.slug}`} className="flex flex-col h-full">

        {/* ── Thumbnail ── */}
        <div className="relative w-full h-52 overflow-hidden bg-gradient-to-br from-primary/10 to-primary/3 shrink-0">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-50">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v13.5a1.5 1.5 0 001.5 1.5z" />
              </svg>
              <span className="text-xs text-gray-300 font-medium">No image</span>
            </div>
          )}

          {/* Category pill — floated over image */}
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold tracking-widest uppercase text-primary shadow-sm">
            {blog.category}
          </span>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-col flex-1 px-6 pt-5 pb-6">

          {/* Meta: date + read time */}
          <div className="flex items-center gap-3 mb-3">
            {date && (
              <span className="text-xs text-dark/40 font-medium">{date}</span>
            )}
            {est && (
              <>
                <span className="w-1 h-1 rounded-full bg-dark/20" />
                <span className="text-xs text-dark/40 font-medium">{est}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="font-display font-bold text-dark text-lg leading-snug mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-dark/55 leading-relaxed line-clamp-3 flex-1 mb-5">
            {blog.excerpt}
          </p>

          {/* Tags */}
          {blog.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {blog.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-dark/50 hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* ── Author row ── */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
            <div className="flex items-center gap-2.5">
              {blog.author_avatar ? (
                <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 ring-2 ring-primary/20">
                  <Image src={blog.author_avatar} alt={blog.author_name} fill className="object-cover" />
                </div>
              ) : (
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ background: 'linear-gradient(135deg, #18D6BF, #0fa896)' }}
                >
                  {blog.author_name?.charAt(0) ?? 'A'}
                </div>
              )}
              <span className="text-xs font-semibold text-dark/70">{blog.author_name}</span>
            </div>

            <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
              Read more
              <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>

        </div>
      </Link>
    </motion.article>
  );
}
