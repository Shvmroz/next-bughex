'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { navLinks, megaMenuData } from '@/lib/mock';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [winWidth, setWinWidth] = useState(0);
  const pathname = usePathname();

  const isHeroPage = pathname === '/';
  const { scrollYProgress } = useScroll();
  const bugX = useTransform(scrollYProgress, (v) => v * (winWidth - 20));

  useEffect(() => {
    const updateWidth = () => setWinWidth(window.innerWidth);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isTransparent = isHeroPage && !scrolled && !activeDropdown;
  const headerBg = isTransparent
    ? 'bg-transparent border-transparent'
    : activeDropdown && isHeroPage && !scrolled
    ? 'bg-[#0a0a0f]/90 backdrop-blur-xl border-white/[0.06]'
    : 'bg-white border-gray-100 shadow-sm';

  const dropdownBg =
    activeDropdown && isHeroPage && !scrolled
      ? 'bg-[#0a0a0f]/90 backdrop-blur-xl border-white/[0.06]'
      : 'bg-white border-gray-100';

  const textColor = isTransparent ? 'text-white hover:text-primary' : 'text-dark hover:text-primary';
  const chevronColor = isTransparent ? 'stroke-white' : 'stroke-dark/60';
  const dropdownTextColor = activeDropdown && isHeroPage && !scrolled ? 'text-white' : 'text-dark';
  const dropdownSubColor =
    activeDropdown && isHeroPage && !scrolled ? 'text-white/40' : 'text-dark/40';

  const showScrollBar = scrolled && !activeDropdown && !menuOpen;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50"
      onMouseLeave={() => setActiveDropdown(null)}
    >
      {/* Scroll progress bar */}
      <div
        className={`fixed top-[70px] left-0 right-0 h-[3px] overflow-visible pointer-events-none z-[60] transition-opacity duration-300 ${showScrollBar ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="absolute inset-0 w-full h-full bg-dark/5" />
        <motion.div
          className="absolute inset-x-0 bottom-0 h-full bg-primary origin-left"
          style={{ scaleX: scrollYProgress }}
        />
        <motion.img
          src="/bug.png"
          alt=""
          className="absolute -bottom-[9px] w-5 h-5 object-contain"
          style={{ x: bugX, left: 0 }}
        />
      </div>

      <motion.header
        className={`relative h-[70px] flex items-center transition-all duration-300 border-b ${headerBg}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="w-full max-w-[1440px] mx-auto px-6 flex items-center justify-between">
          <div className="flex-shrink-0 w-[200px]">
            <Link href="/">
              <Logo isDark={!isTransparent} />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative py-6"
                onMouseEnter={() => link.hasDropdown ? setActiveDropdown(link.label) : setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`text-[11px] font-bold tracking-widest transition-colors duration-200 flex items-center gap-1.5 ${textColor}`}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <svg
                      className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        className={chevronColor}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </Link>
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center">
            <Link href="/contact">
              <button className="btn">
                <i className="animation"></i>
                LET&apos;S TALK
                <i className="animation"></i>
              </button>
            </Link>
          </div>

          <button
            className="lg:hidden flex flex-col gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`w-6 h-0.5 transition-all ${isTransparent ? 'bg-white' : 'bg-dark'}`} />
            <span className={`w-6 h-0.5 transition-all ${isTransparent ? 'bg-white' : 'bg-dark'}`} />
            <span className={`w-6 h-0.5 transition-all ${isTransparent ? 'bg-white' : 'bg-dark'}`} />
          </button>
        </div>
      </motion.header>

      {/* MEGA MENU DROPDOWN */}
      <AnimatePresence>
        {activeDropdown && megaMenuData[activeDropdown] && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`absolute top-[70px] left-0 right-0 z-40 border-b shadow-2xl ${dropdownBg}`}
            onMouseEnter={() => setActiveDropdown(activeDropdown)}
          >
            <div className="max-w-7xl mx-auto px-12 py-14">
              <div className="grid grid-cols-2 gap-x-16 gap-y-8">
                {megaMenuData[activeDropdown].map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.2 }}
                  >
                    <Link href={item.href || '#'} className="group inline-block">
                      <h4
                        className={`text-2xl font-bold transition-colors duration-200 tracking-tight group-hover:text-primary ${dropdownTextColor}`}
                      >
                        {item.title}
                      </h4>
                      <p className={`text-sm mt-1 font-medium ${dropdownSubColor}`}>
                        {item.subtitle}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-bold tracking-widest text-dark hover:text-primary transition-colors py-2 border-b border-gray-50"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/contact" onClick={() => setMenuOpen(false)}>
                <button className="btn w-full mt-2">
                  <i className="animation"></i>
                  LET&apos;S TALK
                  <i className="animation"></i>
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
