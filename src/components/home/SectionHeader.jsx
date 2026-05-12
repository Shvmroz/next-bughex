"use client";

import { motion } from "framer-motion";

export default function SectionHeader({
  tag,
  title,
  subtitle,
  align = "center",
  dark = false,
}) {
  const parts = title.trim().split(/\s+/);
  const lastWord =
    parts.length > 1 ? parts.pop() : parts.length === 1 ? parts[0] : "";
  const restOfTitle = parts.length > 0 ? parts.join(" ") : "";

  const alignmentClass =
    align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-4xl ${alignmentClass} mb-12`}>
      {tag && (
        <motion.span
          className="text-[10px] font-bold tracking-[0.4em] text-primary uppercase mb-6 block"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {tag}
        </motion.span>
      )}

      <motion.h2
        className="font-display text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-[1.1]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className={dark ? "text-white" : "text-dark"}>
          {restOfTitle}{" "}
        </span>
        {lastWord && <span className="text-gradient-animated">{lastWord}</span>}
      </motion.h2>

      {subtitle && (
        <motion.p
          className={`text-lg md:text-xl leading-relaxed font-medium max-w-2xl ${
            alignmentClass === "text-center mx-auto" ? "mx-auto" : ""
          } ${dark ? "text-white/60" : "text-dark/50"}`}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
