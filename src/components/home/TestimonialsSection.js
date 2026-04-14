'use client';

import { motion } from 'framer-motion';
import { testimonials } from '@/lib/servicesData';
import { SectionHeader } from './ServicesSection';

export default function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-white">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(19, 167, 150, 0.03) 0%, transparent 70%)',
        }}
      />
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          tag="Client Stories"
          title="What Our Clients Say"
          subtitle="Don't just take our word for it — hear from the teams we've helped build remarkable products."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div
                className="rounded-2xl p-7 border border-[#f1f3f5] hover:border-primary/20 transition-all duration-500 h-full bg-white shadow-sm hover:shadow-lg"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <span key={idx} className="text-primary text-sm">★</span>
                  ))}
                </div>

                <blockquote className="text-dark/70 text-sm leading-relaxed mb-6 italic font-medium">
                  &ldquo;{t.text}&rdquo;
                </blockquote>

                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm text-white"
                    style={{ background: 'linear-gradient(135deg, #13a796, #29d9c5)' }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-display font-bold text-dark text-sm">{t.name}</p>
                    <p className="text-dark/40 text-xs font-bold">{t.role}</p>
                  </div>
                </div>

                <div
                  className="absolute top-6 right-6 text-5xl font-display font-bold text-primary/5 leading-none select-none"
                >
                  &ldquo;
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-8 py-6 px-10 rounded-2xl border border-primary/20 bg-primary/5 shadow-sm">
            {[
              { val: '4.9/5', label: 'Average Rating' },
              { val: '150+', label: 'Happy Clients' },
              { val: '100%', label: 'Recommended Us' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display font-bold text-2xl text-primary">{stat.val}</p>
                <p className="text-xs text-dark/40 mt-1 font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
