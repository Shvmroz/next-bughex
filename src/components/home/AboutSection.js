'use client';

import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

const techStack = [
  'Flutter', 'React Native', 'Next.js', 'Node.js',
  'Laravel', 'Swift', 'Kotlin', 'Python',
  'TensorFlow', 'OpenAI', 'Docker', 'AWS',
];

const pillars = [
  {
    icon: '◈',
    title: 'Quality First',
    desc: 'Every line of code is crafted with precision and tested thoroughly before delivery.',
  },
  {
    icon: '⬡',
    title: 'On-Time Delivery',
    desc: 'We respect your timeline and deliver projects on schedule without compromising quality.',
  },
  {
    icon: '◉',
    title: 'Scalable Solutions',
    desc: 'Architecture designed to grow with your business from day one.',
  },
  {
    icon: '◆',
    title: 'Post-Launch Support',
    desc: '6 months of dedicated support after launch to ensure smooth operation.',
  },
];

function VisualBlock() {
  return (
    <div className="relative h-96 flex items-center justify-center">
      <motion.div
        className="absolute w-64 h-64 rounded-3xl"
        style={{
          background: 'linear-gradient(135deg, rgba(19, 167, 150, 0.1), rgba(19, 167, 150, 0.02))',
          border: '1px solid rgba(19, 167, 150, 0.1)',
        }}
        animate={{ rotate: [0, 5, 0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 text-center p-8">
        <div className="mb-6 flex justify-center">
          <svg width="80" height="92" viewBox="0 0 80 92" fill="none">
            <polygon
              points="40,2 78,22 78,70 40,90 2,70 2,22"
              fill="rgba(19, 167, 150, 0.05)"
              stroke="#13a796"
              strokeWidth="2"
            />
            <polygon
              points="40,15 65,29 65,63 40,77 15,63 15,29"
              fill="rgba(19, 167, 150, 0.02)"
              stroke="#13a796"
              strokeWidth="1"
              strokeOpacity="0.3"
            />
            <text x="40" y="55" textAnchor="middle" fill="#13a796" fontSize="22" fontFamily="Space Grotesk" fontWeight="700">
              BH
            </text>
          </svg>
        </div>
        <p className="font-display font-bold text-3xl text-dark">8+ Years</p>
        <p className="text-dark/40 text-sm mt-1">of Excellence</p>
      </div>

      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-primary/5"
          style={{
            width: 200 + i * 80,
            height: 200 + i * 80,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}

      {[
        { label: '150+', sub: 'Projects', pos: '-top-4 -right-4' },
        { label: '50+', sub: 'Clients', pos: '-bottom-4 -left-4' },
        { label: '100%', sub: 'Satisfaction', pos: '-bottom-4 -right-4' },
      ].map((badge) => (
        <div
          key={badge.label}
          className={`absolute ${badge.pos} bg-white border border-[#f1f3f5] shadow-sm rounded-xl px-4 py-2 text-center`}
        >
          <p className="font-display font-bold text-primary text-lg">{badge.label}</p>
          <p className="text-dark/40 text-xs font-semibold">{badge.sub}</p>
        </div>
      ))}
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-xs text-primary font-bold tracking-wider uppercase">About BugHex</span>
            </div>

            <h2 className="font-display text-3xl md:text-5xl font-bold text-dark mb-6 leading-tight">
              Turning Complex Ideas Into{' '}
              <span className="text-gradient-animated">Elegant Solutions</span>
            </h2>

            <p className="text-dark/60 text-base leading-relaxed mb-6 font-medium">
              BugHex is a premium development agency founded by engineers who believe that great software changes lives. We combine technical excellence with design thinking to build products that users love.
            </p>
            <p className="text-dark/60 text-base leading-relaxed mb-8 font-medium">
              Our team of 15+ specialists spans mobile, web, backend, and AI — giving you a single partner for your entire digital product journey.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {pillars.map((p) => (
                <motion.div
                  key={p.title}
                  className="p-4 rounded-xl border border-[#f1f3f5] bg-[#f8f9fa] hover:border-primary/30 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-xl text-primary mb-2 block">{p.icon}</span>
                  <h4 className="font-display font-semibold text-dark text-sm mb-1">{p.title}</h4>
                  <p className="text-dark/40 text-xs leading-relaxed font-semibold">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <VisualBlock />
          </motion.div>
        </div>

        <div className="mt-20">
          <p className="text-center text-xs text-dark/30 tracking-widest uppercase mb-8 font-bold">Tech Stack We Master</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {techStack.map((tech, i) => (
              <motion.span
                key={tech}
                className="px-4 py-2 rounded-full border border-[#f1f3f5] bg-white text-sm text-dark/60 font-semibold hover:border-primary/50 hover:text-primary transition-all duration-300 cursor-default shadow-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
