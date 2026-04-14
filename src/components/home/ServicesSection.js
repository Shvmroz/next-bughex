'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { services } from '@/lib/servicesData';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-32 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(24, 214, 191, 0.04) 0%, transparent 70%)',
        }}
      />
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="What We Do"
          title="Services We Offer"
          subtitle="From mobile apps to enterprise backends, we cover the full spectrum of modern software development."
        />

        <motion.div
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ service }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={item}
      className="relative group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="h-full rounded-2xl p-6 border transition-all duration-500"
        style={{
          background: hovered ? 'rgba(19, 167, 150, 0.05)' : '#ffffff',
          borderColor: hovered ? 'rgba(19, 167, 150, 0.3)' : '#f1f3f5',
          boxShadow: hovered ? '0 10px 30px rgba(19, 167, 150, 0.1)' : '0 2px 10px rgba(0,0,0,0.02)',
        }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-2xl"
          style={{
            background: `linear-gradient(135deg, rgba(19, 167, 150, 0.15), rgba(19, 167, 150, 0.05))`,
            border: '1px solid rgba(19, 167, 150, 0.1)',
          }}
        >
          <span className="text-primary">{service.icon}</span>
        </div>

        <h3 className="font-display font-semibold text-dark text-base mb-2 leading-tight">{service.title}</h3>
        <p className="text-dark/60 text-sm leading-relaxed mb-4">{service.description}</p>

        <ul className="space-y-1.5">
          {service.features.map((feat) => (
            <li key={feat} className="flex items-center gap-2 text-xs text-dark/40 font-medium">
              <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
              {feat}
            </li>
          ))}
        </ul>

        <motion.div
          className="mt-5 flex items-center gap-1 text-primary text-sm font-semibold"
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.2 }}
        >
          Learn more
          <span className="text-base">→</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function SectionHeader({ tag, title, subtitle }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-4"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        <span className="text-xs text-primary font-bold tracking-wider uppercase">{tag}</span>
      </motion.div>
      <motion.h2
        className="font-display text-3xl md:text-5xl font-bold text-dark mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        {title}
      </motion.h2>
      <motion.p
        className="text-dark/60 text-base md:text-lg leading-relaxed font-medium"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        {subtitle}
      </motion.p>
    </div>
  );
}
