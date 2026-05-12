"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import HeroVisualEffect from "./HeroVisualEffect";
import LetsTalkFloating from "./LetsTalkFloating";

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
          <div className="absolute -inset-20 flex items-center justify-center -z-10 overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-[150%] h-[150%] bg-[conic-gradient(from_0deg,transparent_20%,#1bb5a2_50%,transparent_80%)] opacity-30 blur-[120px]"
            />
          </div>

          <motion.h1
            className="font-display text-4xl md:text-7xl lg:text-[100px] font-bold leading-[1] mb-8 tracking-tighter text-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: 1,
              y: [0, -15, 0],
            }}
            transition={{
              opacity: { delay: 0.3, duration: 1 },
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.3, // Start bobbing after entry
              },
            }}
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
