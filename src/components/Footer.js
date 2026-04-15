'use client';

import Link from 'next/link';
import { Icon } from "@iconify/react";
import { motion } from 'framer-motion';
import { footerData, socialLinks, siteMeta } from '@/lib/mock';

export default function Footer() {
  return (
    <footer className="mt-auto w-full relative overflow-hidden" style={{ background: '#1c1c1e' }}>

      {/* Top primary glow sweep */}
      <div className="absolute top-0 left-0 right-0 h-px w-full overflow-hidden">
        <motion.div
          className="w-1/3 h-full bg-gradient-to-r from-transparent via-primary to-transparent"
          animate={{ x: ['-100%', '300%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Animated Glowing Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          className="absolute -right-24 -bottom-24 w-[600px] h-[600px] rounded-full bg-[#18d6c00c] blur-[100px]"
          animate={{
            x: [0, 100, 0],
            y: [0, -80, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute right-[5%] bottom-[-10%] w-[500px] h-[500px] rounded-full bg-white/[0.05] blur-[120px]"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 border-b border-white/10 pb-12">

          {/* Services */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-bold mb-6 text-gradient-animated tracking-widest uppercase">Services</h3>
            <ul className="space-y-3">
              {footerData.Services.map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-white/60 hover:text-primary font-medium transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-3" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Other Columns */}
          {['Industries', 'Insights', 'Quick Links'].map((section, i) => (
            <div key={i} className="lg:col-span-2 md:col-span-1">
              <h3 className="text-sm font-bold mb-6 text-gradient-animated tracking-widest uppercase">{section}</h3>
              <ul className="space-y-3">
                {footerData[section].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-white/60 hover:text-primary font-medium transition-colors duration-200 flex items-center gap-2 group">
                      <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-2" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* BOTTOM */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6">

          <div className="flex flex-col gap-1">
            <span className="font-display font-bold text-xl text-gradient-animated">{siteMeta.tagline}</span>
            <span className="text-xs text-white/30 font-medium tracking-wide">{siteMeta.subTagline}</span>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 overflow-hidden relative group transition-all duration-300 hover:scale-110"
                whileHover={{ y: -2 }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: social.hoverColor }}
                />
                <div className="relative z-10 group-hover:text-white transition-colors duration-300">
                  <Icon icon={social.icon} width={22} />
                </div>
              </motion.a>
            ))}
          </div>

        </div>

        {/* COPYRIGHT */}
        <p className="text-xs text-white/20 font-medium tracking-wide text-center md:text-right w-full mt-6">
          {siteMeta.copyright}
        </p>

      </div>
    </footer >
  );
}
