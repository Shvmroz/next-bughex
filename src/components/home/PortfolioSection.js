'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import SectionHeader from './SectionHeader';

const projects = [
  {
    id: 1,
    title: 'MedTrack Pro',
    category: 'Flutter',
    description: 'Healthcare app with real-time patient monitoring, appointment booking, and AI diagnostic assistance.',
    tags: ['Flutter', 'Firebase', 'AI'],
    gradient: 'from-primary/20 to-teal-600/10',
    icon: '⬡',
  },
  {
    id: 2,
    title: 'FinanceFlow',
    category: 'React Native',
    description: 'Cross-platform fintech solution for personal finance management with bank-grade security.',
    tags: ['React Native', 'Node.js', 'PostgreSQL'],
    gradient: 'from-cyan-500/20 to-primary/10',
    icon: '◈',
  },
  {
    id: 3,
    title: 'ShopSphere',
    category: 'Laravel',
    description: 'Enterprise e-commerce platform with multi-vendor support, analytics, and AI recommendations.',
    tags: ['Laravel', 'React', 'Redis'],
    gradient: 'from-teal-400/20 to-emerald-500/10',
    icon: '◉',
  },
  {
    id: 4,
    title: 'AIWriter Studio',
    category: 'AI',
    description: 'Content creation platform powered by GPT-4, with brand voice customization and SEO optimization.',
    tags: ['Next.js', 'OpenAI', 'Node.js'],
    gradient: 'from-primary/20 to-cyan-600/10',
    icon: '◆',
  },
  {
    id: 5,
    title: 'DeliverEase',
    category: 'Android/iOS',
    description: 'Last-mile delivery solution with real-time tracking, route optimization, and driver app.',
    tags: ['Android', 'iOS', 'Node.js'],
    gradient: 'from-emerald-400/20 to-primary/10',
    icon: '⬢',
  },
  {
    id: 6,
    title: 'DataPulse',
    category: 'Backend',
    description: 'Real-time analytics dashboard processing millions of events per second with WebSocket updates.',
    tags: ['Node.js', 'Kafka', 'ClickHouse'],
    gradient: 'from-teal-500/20 to-primary/10',
    icon: '◇',
  },
];

const categories = ['All', 'Flutter', 'React Native', 'Laravel', 'AI', 'Android/iOS', 'Backend'];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="Our Work"
          title="Featured Projects"
          subtitle="A selection of our most impactful work across industries and technologies."
        />

        <motion.div
          className="mt-10 flex flex-wrap gap-3 justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === cat
                ? 'bg-primary text-white shadow-md'
                : 'border border-[#f1f3f5] bg-white text-dark/50 hover:border-primary/50 hover:text-primary shadow-sm'
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
              className="group cursor-pointer"
            >
              <div
                className="rounded-2xl p-6 border border-[#f1f3f5] hover:border-primary/30 transition-all duration-500 h-full bg-white shadow-sm hover:shadow-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{
                      background: 'rgba(19, 167, 150, 0.1)',
                      border: '1px solid rgba(19, 167, 150, 0.2)',
                    }}
                  >
                    <span className="text-primary">{project.icon}</span>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full border border-primary/20 text-primary bg-primary/5 uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>

                <h3 className="font-display font-bold text-dark text-lg mb-2">{project.title}</h3>
                <p className="text-dark/60 text-sm leading-relaxed mb-4 font-medium">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-md bg-[#f8f9fa] text-dark/40 font-bold border border-[#f1f3f5]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <motion.div
                  className="flex items-center gap-1 text-primary text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ x: 0 }}
                  whileHover={{ x: 4 }}
                >
                  View Case Study →
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
