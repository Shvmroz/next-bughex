"use client";

import { motion } from "framer-motion";
export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none opacity-40 mix-blend-screen"
      >
        <source src="/video/hero_section_video.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <motion.div
            className="absolute -inset-10 bg-primary/20 blur-[100px] rounded-full -z-10"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.h1
            className="font-display text-4xl md:text-7xl lg:text-[100px] font-bold leading-[1] mb-8 tracking-tighter text-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            We Build <span className="text-gradient-animated">Digital</span>
            <br />
            Products That <span className="text-gradient-animated">Matter</span>
          </motion.h1>
        </motion.div>
      </div>
    </section>
  );
}
