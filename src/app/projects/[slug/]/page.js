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
                    <h2 key={i} className="font-display font-bold text-2xl text-dark mt-10 mb-4 tracking-tight">
                        {para.replace('## ', '')}
                    </h2>
                );
            }
            if (para.startsWith('- ')) {
                const items = para.split('\n').filter((l) => l.startsWith('- '));
                return (
                    <ul key={i} className="space-y-4 mb-8 pl-4">
                        {items.map((item, j) => {
                            const parts = item.replace('- ', '').split('**');
                            return (
                                <li key={j} className="text-dark/70 text-base leading-relaxed flex gap-3">
                                    <span className="text-primary mt-1.5 flex-shrink-0">◆</span>
                                    <span>
                                        {parts.map((p, k) =>
                                            k % 2 === 1 ? <strong key={k} className="text-dark font-bold">{p}</strong> : p
                                        )}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                );
            }
            return (
                <p key={i} className="text-dark/70 text-base leading-relaxed mb-6 font-medium">
                    {para}
                </p>
            );
        });

    return (
        <>
            <Header />
            <main className="min-h-screen bg-white">
                <section className="pt-32 pb-12 relative overflow-hidden">
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(ellipse 60% 40% at 50% 20%, rgba(24, 214, 191, 0.08) 0%, transparent 70%)',
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

                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <span className="text-xs px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold tracking-wide">
                                    {blog.category}
                                </span>
                                <span className="text-xs text-dark/30 font-bold">{blog.readTime}</span>
                                <span className="text-xs text-dark/30 font-bold">{blog.date}</span>
                            </div>

                            <h1 className="font-display font-bold text-3xl md:text-5xl text-dark leading-tight mb-6 tracking-tight">
                                {blog.title}
                            </h1>

                            <p className="text-dark/60 text-lg md:text-xl leading-relaxed mb-8 font-medium italic border-l-4 border-primary/20 pl-6">{blog.excerpt}</p>

                            <div className="flex items-center gap-4 pb-8 border-b border-gray-100">
                                <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md shadow-primary/20"
                                    style={{ background: 'linear-gradient(135deg, #18D6BF, #129586)' }}
                                >
                                    {blog.author.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-display font-bold text-dark text-base">{blog.author}</p>
                                    <p className="text-dark/40 text-xs font-bold uppercase tracking-wider">{blog.authorRole}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section className="pb-16 relative">
                    <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary/[0.03] to-transparent pointer-events-none" />
                    <div className="max-w-4xl mx-auto px-6 relative z-10">
                        <motion.div
                            className="rounded-3xl h-72 mb-12 flex items-center justify-center relative overflow-hidden shadow-2xl shadow-primary/5"
                            style={{
                                background: 'linear-gradient(135deg, rgba(24, 214, 191, 0.15), rgba(24, 214, 191, 0.05))',
                                border: '1px solid rgba(24, 214, 191, 0.2)',
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="absolute inset-0 grid-bg opacity-30" />
                            <div className="relative z-10 text-center scale-125">
                                <span className="text-8xl text-primary/30 font-display font-bold">{blog.category.charAt(0)}</span>
                                <p className="text-sm text-primary/60 font-display tracking-[0.2em] uppercase mt-2 font-bold">{blog.category}</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="prose prose-lg max-w-none"
                        >
                            {contentHtml}
                        </motion.div>

                        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col gap-4">
                            <p className="text-xs text-dark/30 uppercase tracking-[0.2em] font-bold">Project Tags</p>
                            <div className="flex flex-wrap gap-2">
                                {blog.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs px-4 py-2 rounded-full border border-gray-100 bg-gray-50/50 text-dark/50 hover:border-primary/30 hover:text-primary transition-all cursor-default font-bold uppercase tracking-wider"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex items-end justify-between mb-12">
                            <div>
                                <p className="text-primary font-bold tracking-widest uppercase text-xs mb-3">Recomendations</p>
                                <h2 className="font-display font-bold text-3xl md:text-4xl text-dark tracking-tight">More Case Studies</h2>
                            </div>
                            <Link href="/projects" className="text-sm font-bold text-primary border-b-2 border-primary/20 hover:border-primary transition-all pb-1">
                                View All Projects
                            </Link>
                        </div>
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
