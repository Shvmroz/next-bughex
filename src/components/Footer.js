'use client';

import Link from 'next/link';
import { Icon } from "@iconify/react";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { footerData, socialLinks, siteMeta } from '@/lib/mock';
import Logo from './Logo';

export default function Footer() {
  const email = 'hr@thebughex.com';

  return (
    <>
      <section data-theme="dark" data-nav-blur="true" className="py-28 bg-[#0a0a0f] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover opacity-60"
          >
            <source src="/video/footer_video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#0a0a0f]/30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/20 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none mix-blend-overlay" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to build the future?
          </h2>
          <p className="text-white/70 text-lg mb-10 font-medium">
            Contact our Dubai team directly to discuss how BugHex can architect your next big project.
          </p>
          <Link href="/contact">
            <button className="btn bg-white text-dark hover:bg-primary hover:text-white shadow-2xl border-none">
              <i className="animation"></i>
              Let&apos;s Talk
              <i className="animation"></i>
            </button>
          </Link>
        </div>
      </section>

      <footer data-theme="dark" data-nav-blur="true" className="bg-[#0a0a0f] text-white pt-12 md:pt-32 pb-6 shadow-sm relative overflow-hidden">
        {/* Background Decorative Element */}
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.03] blur-[120px] pointer-events-none"
          style={{ background: 'var(--primary)' }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 mb-10 md:mb-16">

            {/* BRAND COLUMN */}
            <div className="lg:col-span-4 space-y-10">
              <Link href="/" className="inline-block" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
                <Logo staticLogo={true} isDark={false} />
              </Link>

              <p className="text-white/40 text-base leading-relaxed max-w-sm font-medium">
                {siteMeta.tagline}</p>

              <div className="space-y-4">
                <p className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase">Connect With Us</p>
                <div className="flex items-center gap-x-3 md:gap-x-5 flex-nowrap overflow-x-auto no-scrollbar">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-all duration-300 hover:scale-110 active:opacity-70"
                    >
                      <Icon
                        icon={social.icon}
                        width={30}
                        style={{ color: social.hoverColor }}
                      />
                    </a>
                  ))}
                  <span className="text-[13px] text-white/30 uppercase font-bold px-1">or</span>
                  <a
                    href={`mailto:${email}`}
                    className="group flex items-center gap-2 text-white/40 hover:text-primary transition-all duration-300 font-medium text-sm"
                  >
                    <Image
                      src="/bughex-logo.png"
                      width={25}
                      height={25}
                      className="w-[25px] h-[25px] object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                      alt="Bughex"
                    />
                    {email}
                  </a>
                </div>
              </div>
            </div>

            {/* LINKS COLUMNS */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-6 md:gap-y-10">
                {Object.entries(footerData).map(([title, links]) => (
                  <div key={title} className="space-y-4 md:space-y-8">
                    <h4 className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase">
                      {title}
                    </h4>
                    <ul className="space-y-4">
                      {links.map((link) => (
                        <li key={link.label}>
                          {title === 'Technologies' || title === 'Industries' ? (
                            // Plain text with icon, no hover, no link
                            <span className="text-sm text-white/40 flex items-center gap-2.5">
                              <Icon icon={link.icon} width={16} className="flex-shrink-0 opacity-70" />
                              {link.label}
                            </span>
                          ) : (
                            // Insights & Quick Links — clickable
                            <Link
                              href={link.href || '#'}
                              className="text-sm text-white/50 hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                            >
                              <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-2" />
                              {link.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-center items-center">
            <p className="text-[11px] text-white/30 uppercase">
              {siteMeta.copyright}
            </p>
          </div>
        </div>
      </footer>
    </>

  );
}
