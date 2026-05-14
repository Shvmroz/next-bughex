'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/blogs/BlogCard';
import { api_blog_detail, api_blogs_list } from '@/DAL/api';
import { useRouter } from 'next/navigation';

export default function BlogDetailPage({ params }) {
    const slug = params.slug;

    const [blog, setBlog] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetched = useRef(false);
    const router = useRouter();

    useEffect(() => {
        if (fetched.current) return;
        fetched.current = true;

        const get_related_blogs = async () => {
            const result = await api_blogs_list();
            let list = [];
            if (Array.isArray(result)) {
                list = result;
            } else if (Array.isArray(result?.data)) {
                list = result.data;
            }

            if (list.length > 0) {
                setRelated(list.filter((b) => b.slug !== slug).slice(0, 3));
            }
        };

        const get_blog_detail = async () => {
            setLoading(true);
            try {
                const result = await api_blog_detail(slug);
                const data = result?.data ?? result;

                if (data && !data.code && !data.message) {
                    setBlog(data);
                    setLoading(false);
                    get_related_blogs();
                } else {
                    setError(result.message || 'Blog post not found.');
                    setLoading(false);
                }
            } catch (err) {
                setError('Failed to fetch blog details.');
                setLoading(false);
            }
        };

        get_blog_detail();
    }, [slug]);

    if (loading) {
        return (
            <>
                <Header />
                <main className="min-h-screen bg-white pt-32 pb-24">
                    <div className="max-w-4xl mx-auto px-6 space-y-6 text-center">
                        {/* Back link */}
                        <div className="h-4 w-28 rounded-full animate-[skeleton_1.8s_ease-in-out_infinite] mx-auto" />
                        {/* Category + date */}
                        <div className="flex items-center justify-center gap-3">
                            <div className="h-6 w-20 rounded-full animate-[skeleton_1.8s_ease-in-out_infinite]" />
                            <div className="h-4 w-24 rounded-full animate-[skeleton_1.8s_ease-in-out_infinite]" />
                        </div>
                        {/* Title */}
                        <div className="h-12 w-3/4 rounded-xl animate-[skeleton_1.8s_ease-in-out_infinite] mx-auto" />
                        <div className="h-8 w-1/2 rounded-xl animate-[skeleton_1.8s_ease-in-out_infinite] mx-auto" />
                        {/* Author row */}
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-12 h-12 rounded-full animate-[skeleton_1.8s_ease-in-out_infinite] shrink-0" />
                            <div className="space-y-2 text-left">
                                <div className="h-4 w-28 rounded-full animate-[skeleton_1.8s_ease-in-out_infinite]" />
                                <div className="h-3 w-16 rounded-full animate-[skeleton_1.8s_ease-in-out_infinite]" />
                            </div>
                        </div>
                        {/* Featured image */}
                        <div className="h-[400px] w-full rounded-3xl animate-[skeleton_1.8s_ease-in-out_infinite]" />
                        {/* Content lines */}
                        <div className="space-y-3 max-w-2xl mx-auto text-left">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className={`h-4 rounded-full animate-[skeleton_1.8s_ease-in-out_infinite] ${i % 3 === 2 ? 'w-4/6' : i % 3 === 1 ? 'w-5/6' : 'w-full'}`} />
                            ))}
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <main className="min-h-screen bg-white flex items-center justify-center">
                    <motion.div
                        className="text-center px-6 max-w-md"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Icon icon="mdi:alert-circle-outline" width={40} className="text-red-500" />
                        </div>
                        <h1 className="font-display font-bold text-3xl text-dark mb-3 tracking-tight">
                            Post Not Found
                        </h1>
                        <p className="text-dark/50 text-base mb-8 font-medium">
                            {error}
                        </p>
                        <button className="btn" onClick={() => router.push('/blogs')}>
                            <i className="animation"></i>
                            Back to Blogs
                            <i className="animation"></i>
                        </button>
                    </motion.div>
                </main>
                <Footer />
            </>
        );
    }

    const date = blog.created_at
        ? new Date(blog.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : null;

    return (
        <>
            <Header />
            <main className="min-h-screen bg-white pb-24">

                {/* HERO SECTION */}
                <section className="pt-32 pb-12 relative overflow-hidden">
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(ellipse 60% 40% at 50% 10%, rgba(24, 214, 191, 0.08) 0%, transparent 70%)',
                        }}
                    />
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Link
                                href="/blogs"
                                className="inline-flex items-center gap-2 text-sm text-dark/40 hover:text-primary font-bold transition-all mb-8 hover:-translate-x-1"
                            >
                                ← Back to Blogs
                            </Link>

                            <div className="flex items-center justify-center gap-3 mb-6">
                                <span className="text-xs px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold tracking-widest uppercase">
                                    {blog.category}
                                </span>
                                {date && <span className="text-xs text-dark/30 font-bold">{date}</span>}
                            </div>

                            <h1 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl text-dark leading-[1.1] mb-8 tracking-tight">
                                {blog.title}
                            </h1>

                            {/* Author Row */}
                            <div className="flex items-center justify-center gap-4 mb-12">
                                {blog.author_avatar ? (
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden ring-4 ring-primary/10">
                                        <Image src={blog.author_avatar} alt={blog.author_name} fill className="object-cover" />
                                    </div>
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg ring-4 ring-primary/10">
                                        {blog.author_name?.charAt(0)}
                                    </div>
                                )}
                                <div className="text-left">
                                    <p className="text-sm font-bold text-dark">{blog.author_name}</p>
                                    <p className="text-xs text-dark/40 font-medium">Author</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* FEATURED IMAGE */}
                <section className="mb-16">
                    <div className="max-w-5xl mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="relative w-full aspect-[21/9] rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10 border border-gray-100"
                        >
                            {blog.featured_image ? (
                                <Image
                                    src={blog.featured_image}
                                    alt={blog.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            ) : (
                                <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
                                    <Icon icon="mdi:image-off-outline" width={64} className="text-gray-200" />
                                </div>
                            )}
                        </motion.div>
                    </div>
                </section>

                {/* CONTENT AREA */}
                <section className="mb-24">
                    <div className="max-w-3xl mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="prose prose-lg prose-primary max-w-none"
                        >
                            <div
                                className="blog-content text-dark/70 leading-[1.8] text-lg font-medium whitespace-pre-wrap"
                                dangerouslySetInnerHTML={{ __html: blog.content }}
                            />
                        </motion.div>

                        {/* Tags */}
                        {blog.tags?.length > 0 && (
                            <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
                                {blog.tags.map(tag => (
                                    <span key={tag} className="text-xs px-4 py-2 rounded-full bg-gray-50 text-dark/40 font-bold hover:text-primary hover:bg-primary/5 transition-all cursor-default">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* RELATED POSTS */}
                {related.length > 0 && (
                    <section className="py-24 bg-[#F8F9FA] rounded-[3rem] mx-4 md:mx-10">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="flex items-end justify-between mb-12">
                                <div>
                                    <p className="text-primary font-bold tracking-widest uppercase text-xs mb-3">Keep Reading</p>
                                    <h2 className="font-display font-bold text-3xl md:text-4xl text-dark tracking-tight">Related Posts</h2>
                                </div>
                                <Link href="/blogs" className="text-sm font-bold text-primary border-b-2 border-primary/20 hover:border-primary transition-all pb-1">
                                    View All
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {related.map((b, i) => (
                                    <BlogCard key={b.id} blog={b} index={i} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

            </main>
            <Footer />
        </>
    );
}
