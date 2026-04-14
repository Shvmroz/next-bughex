'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none opacity-60"
      >
        <source src="/vecteezy_futuristic.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 flex flex-col items-center text-center">


        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 max-w-5xl text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          We Build{' '}
          <span className="text-gradient">Digital</span>
          <br />
          Products That{' '}
          <span className="text-gradient">Matter</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed mb-10 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Premium development agency delivering Flutter, React Native, AI, and full-stack solutions. We transform ideas into market-leading products.
        </motion.p>

      </div>

    </section>
  );
}



