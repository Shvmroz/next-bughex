"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 200px
      const shouldShow = window.scrollY > 200;

      // But hide when reaching the footer or contact section
      const contactSection = document.getElementById("contact");
      const footer = document.querySelector("footer");

      let inTerminalArea = false;
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) inTerminalArea = true;
      }
      if (footer) {
        const rect = footer.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) inTerminalArea = true;
      }

      setIsVisible(shouldShow && !inTerminalArea);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[9999] flex items-center pr-0 group">
          {/* VERTICAL CTA TAB */}
          <Link href="/contact">
            <motion.button
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              whileHover={{ x: -4 }}
              className="relative flex flex-col items-center justify-center py-8 px-4 bg-[#1bb5a2]/90 backdrop-blur-xl rounded-l-2xl border border-white/20 shadow-2xl transition-all active:scale-95 overflow-hidden group/btn"
              style={{
                boxShadow: "0 0 40px rgba(27, 181, 162, 0.3)",
              }}
            >
              {/* SHIMMER EFFECT ON TAB */}
              <motion.div
                animate={{
                  top: ["-100%", "200%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent pointer-events-none"
              />

              <span
                className="whitespace-nowrap font-bold text-[11px] md:text-sm uppercase tracking-[0.3em] text-white"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                Let's talk
              </span>
            </motion.button>
          </Link>
        </div>
      )}
    </AnimatePresence>
  );
}
