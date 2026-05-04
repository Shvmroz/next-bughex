'use client';

import Link from 'next/link';
import { Icon } from "@iconify/react";
import { motion } from 'framer-motion';
import { footerData, socialLinks, siteMeta, contactSectionContent } from '@/lib/mock';
import Logo from './Logo';

export default function Footer() {
  const email = contactSectionContent.contactInfo.find(info => info.label === 'Email')?.value || 'hello@bughex.dev';

  const allSocials = [
    ...socialLinks,
    {
      name: 'Email',
      icon: 'mdi:email',
      href: `mailto:${email}`,
      hoverColor: '#1bb5a2'
    }
  ];

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
      
      <footer data-theme="dark" data-nav-blur="true" className="bg-[#0a0a0f] text-white pt-10 md:pt-32 pb-6 shadow-sm relative overflow-hidden">
        {/* Background Decorative Element */}
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.03] blur-[120px] pointer-events-none"
          style={{ background: 'var(--primary)' }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 mb-8 lg:mb-16">

            {/* BRAND COLUMN */}
            <div className="lg:col-span-4 space-y-5 lg:space-y-10">
              <Link href="/" className="inline-block" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
                <Logo staticLogo={true} isDark={false} />
              </Link>

              <p className="text-white/40 text-base leading-relaxed max-w-sm font-medium">
                {siteMeta.tagline}</p>

              <div className="flex flex-wrap gap-4">
                {allSocials.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/30 transition-all duration-300 hover:text-white hover:border-primary/50 group relative overflow-hidden"
                    whileHover={{ y: -5 }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                      style={{ background: social.hoverColor }}
                    />
                    <Icon icon={social.icon} width={22} className="relative z-10" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* LINKS COLUMNS */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 lg:gap-x-8 lg:gap-y-12">
                {Object.entries(footerData).map(([title, links]) => (
                  <div key={title} className="space-y-4 lg:space-y-8">
                    <h4 className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase">
                      {title}
                    </h4>
                    <ul className="space-y-2.5 lg:space-y-4">
                      {links.map((link) => (
                        <li key={link.label}>
                          {title === 'Services' || title === 'Industries' ? (
                            // Plain text with icon, no hover, no link
                            <span className="text-sm text-white/40 flex items-center gap-2.5">
                              <Icon icon={link.icon} width={16} className="flex-shrink-0 opacity-70" />
                              {link.label}
                            </span>
                          ) : (
                            // Insights & Quick Links — clickable
                            <Link
                              href={link.href}
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
            <p className="text-[11px] text-white/50 uppercase">
              {siteMeta.copyright}
            </p>
          </div>
        </div>
      </footer>
    </>

  );
}
