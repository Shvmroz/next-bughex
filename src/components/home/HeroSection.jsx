"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import HeroVisualEffect from "./HeroVisualEffect";

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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: [0, -10, 0],
            }}
            transition={{
              opacity: { delay: 0.6, duration: 0.8 },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
            className="mt-4"
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-semibold transition-all hover:bg-white hover:text-dark hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <span className="relative z-10">Let's Talk</span>
              <div className="relative z-10 w-8 h-8 rounded-full bg-primary flex items-center justify-center group-hover:bg-dark transition-colors">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white group-hover:text-primary transition-colors"
                >
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
