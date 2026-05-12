'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { navLinks, megaMenuData } from '@/lib/mock';
import { api_services_list } from '@/DAL/api';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [winWidth, setWinWidth] = useState(0);
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [isBlurSection, setIsBlurSection] = useState(false);
  const [dynamicServices, setDynamicServices] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const result = await api_services_list();
        const list = Array.isArray(result) ? result : result?.data ?? [];
        setDynamicServices(list);
      } catch (err) {
        console.error("Header services fetch failed:", err);
      }
    };
    fetchServices();
  }, []);

  const menuWithServices = {
    ...megaMenuData,
    'SERVICES': dynamicServices.map(s => ({
      category: s.name,
      items: (s.technologies || []).map(t => ({
        label: t,
        href: '/services'
      }))
    }))
  };

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
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      let dark = false;
      let blur = false;

      const darkSections = document.querySelectorAll('[data-theme="dark"]');
      darkSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 70 && rect.bottom >= 0) {
          dark = true;
        }
      });

      const blurSections = document.querySelectorAll('[data-nav-blur="true"]');
      blurSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 70 && rect.bottom >= 0) {
          blur = true;
        }
      });

      setIsDarkSection(dark);
      setIsBlurSection(blur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHeroTransparent = isHeroPage && !scrolled;
  const isDarkTheme = isHeroTransparent || isDarkSection;

  const headerBg = (isBlurSection && !activeDropdown && !menuOpen)
    ? 'bg-black/40 backdrop-blur-md border-white/5'
    : (isDarkTheme && !activeDropdown && !menuOpen)
      ? 'bg-transparent border-transparent'
      : (isDarkTheme && (activeDropdown || menuOpen))
        ? 'bg-black/90 backdrop-blur-md border-white/5'
        : 'bg-white border-gray-100 shadow-sm';


  const dropdownBg =
    isDarkTheme && (activeDropdown || menuOpen)
      ? 'bg-black/90 backdrop-blur-md border-white/5'
      : 'bg-white border-gray-200/60 shadow-xl';


  const textColor = isDarkTheme ? 'text-white hover:text-primary' : 'text-dark hover:text-primary';
  const chevronColor = isDarkTheme ? 'stroke-white' : 'stroke-dark/60';
  const dropdownTextColor = isDarkTheme && activeDropdown ? 'text-white' : 'text-dark/90';
  const dropdownSubColor = isDarkTheme && activeDropdown ? 'text-white/60' : 'text-dark/60';
  const hamburgerLines = isDarkTheme ? 'bg-white' : 'bg-dark';

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
          style={{ x: bugX, left: 0, rotate: 90 }}
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
            <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
              <Logo isDark={!isDarkTheme} />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative py-6"
                onMouseEnter={() => link.hasDropdown ? setActiveDropdown(link.label) : setActiveDropdown(null)}
              >
                {link.href ? (
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
                ) : (
                  <button
                    className={`text-[11px] font-bold tracking-widest transition-colors duration-200 flex items-center gap-1.5 outline-none cursor-pointer ${textColor}`}
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
                  </button>
                )}
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
            className="lg:hidden flex flex-col gap-1.5 relative z-[70] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`w-6 h-0.5 transition-all duration-300 ${hamburgerLines} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 transition-all duration-300 ${hamburgerLines} ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 transition-all duration-300 ${hamburgerLines} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {activeDropdown && menuWithServices[activeDropdown] && (
          <motion.div

            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`absolute top-[70px] left-0 right-0 z-40 border-b shadow-2xl ${dropdownBg}`}
            onMouseEnter={() => setActiveDropdown(activeDropdown)}
          >
            <div className="max-w-7xl mx-auto px-12 py-8">

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12">
                {menuWithServices[activeDropdown].map((group, idx) => (
                  <motion.div
                    key={group.category}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h3 className={`text-lg font-bold border-b border-gray-100 pb-4 tracking-tight ${dropdownTextColor}`}>
                      {group.category}
                    </h3>
                    <ul className="space-y-4">
                      {group.items.map((item) => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            onClick={() => setActiveDropdown(null)}
                            className={`text-[13px] font-medium flex items-center gap-2 group transition-all duration-300 ${dropdownSubColor} hover:text-primary`}
                          >
                            <span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-3" />
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
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
            className={`lg:hidden absolute top-[70px] left-0 right-0 z-40 border-b shadow-2xl overflow-hidden ${isDarkTheme ? 'bg-black/90 backdrop-blur-md border-white/5' : 'bg-white/95 backdrop-blur-xl border-gray-100'}`}
          >
            <div className="px-8 py-8 flex flex-col gap-2">
              {navLinks.map((link) => (
                link.href ? (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`text-xs font-bold tracking-[0.2em] hover:text-primary transition-all duration-300 py-4 border-b ${isDarkTheme ? 'text-white/80 border-white/5' : 'text-dark border-gray-50'}`}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.label}
                    className={`text-xs font-bold tracking-[0.2em] hover:text-primary transition-all duration-300 py-4 border-b text-left w-full cursor-default ${isDarkTheme ? 'text-white/80 border-white/5' : 'text-dark border-gray-50'}`}
                  >
                    {link.label}
                  </button>
                )
              ))}
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="mt-6">
                <button className="btn w-full">
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
