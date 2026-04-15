'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

const navLinks = [
  { label: 'WHAT WE DO', href: '/#services', hasDropdown: true },
  { label: 'OUR PROJECTS', href: '/projects', hasDropdown: true },
  { label: 'WHO WE HELP', href: '#', hasDropdown: false },
  { label: 'WHO WE ARE', href: '#', hasDropdown: false },
];

const megaMenuData = {
  'WHAT WE DO': [
    { title: 'Company Overview', subtitle: 'Our mission and roadmap' },
    { title: 'Leadership', subtitle: 'Meet our visionaries' },
    { title: 'Careers', subtitle: 'Join our growing team' }
  ],
  'OUR PROJECTS': [
    { title: 'E-Commerce Solutions', subtitle: 'Modern sales platforms' },
    { title: 'AI & ML Products', subtitle: 'Intelligent automation' },
    { title: 'Enterprise Apps', subtitle: 'Scaling business operations' },
    { title: 'Mobile Ecosystems', subtitle: 'Flutter & Native experiences' }
  ],
  'default': [
    { title: 'Insights', subtitle: 'Latest from BugHex' },
    { title: 'Contact', subtitle: 'Get in touch' }
  ]
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [navHovered, setNavHovered] = useState(false);
  const [winWidth, setWinWidth] = useState(0);
  const pathname = usePathname();
  const isProjectsPage = pathname.startsWith('/projects');

  const { scrollYProgress } = useScroll();
  const scaleX = scrollYProgress;
  const bugX = useTransform(scaleX, (v) => v * (winWidth - 20));

  useEffect(() => {
    const updateWidth = () => setWinWidth(window.innerWidth);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isLightContent = !scrolled && !isProjectsPage;
  const isGlass = activeDropdown && !scrolled && !isProjectsPage;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 px-0"
      onMouseEnter={() => setNavHovered(true)}
      onMouseLeave={() => {
        setNavHovered(false);
        setActiveDropdown(null);
      }}
    >
      {/* Scroll progress bar - HIDDEN on any hover or at top */}
      <div
        className={`fixed top-[70px] left-0 right-0 h-[3px] overflow-visible pointer-events-none z-[60] ${scrolled && !navHovered && !activeDropdown && !menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        style={{ transition: 'opacity 0s' }}
      >
        <div className={`absolute inset-0 w-full h-full ${isLightContent ? 'bg-white/10' : 'bg-dark/5'}`} />
        <motion.div
          className="absolute inset-x-0 bottom-0 h-full bg-primary origin-left"
          style={{ scaleX }}
        />
        <motion.img
          src="/bug.png"
          alt=""
          className="absolute -bottom-[9px] w-5 h-5 object-contain"
          style={{ x: bugX, left: 0 }}
        />
      </div>

      <motion.header
        className={`relative h-[70px] flex items-center transition-all duration-500 border-b ${scrolled || isProjectsPage
          ? 'bg-white shadow-sm border-gray-100'
          : isGlass
            ? 'bg-black/60 backdrop-blur-4xl border-white/[0.03] shadow-2xl'
            : 'bg-transparent border-transparent'
          }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="w-full max-w-[1440px] mx-auto px-6 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex-shrink-0 w-[200px]">
            <Link href="/">
              <Logo isDark={!isLightContent} />
            </Link>
          </div>

          {/* NAV LINKS */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative py-6 group"
                onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.label)}
              >
                <Link
                  href={link.href}
                  className={`text-[11px] font-bold tracking-widest transition-colors duration-200 flex items-center gap-1.5 ${isLightContent ? 'text-white hover:text-white/80' : 'text-dark hover:text-primary'}`}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <svg className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
              </div>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="hidden lg:flex items-center">
            <Link href="/#contact">
              <button className="btn">
                <i className="animation"></i>
                LET'S TALK
                <i className="animation"></i>
              </button>
            </Link>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            className="lg:hidden flex flex-col gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`w-6 h-0.5 transition-all ${isLightContent ? 'bg-white' : 'bg-dark'}`} />
            <span className={`w-6 h-0.5 transition-all ${isLightContent ? 'bg-white' : 'bg-dark'}`} />
            <span className={`w-6 h-0.5 transition-all ${isLightContent ? 'bg-white' : 'bg-dark'}`} />
          </button>
        </div>
      </motion.header>

      {/* DROPDOWN / MEGA MENU */}
      <AnimatePresence>
        {activeDropdown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute top-[70px] left-0 right-0 z-40 overflow-hidden ${scrolled || isProjectsPage ? 'bg-white border-b border-gray-100 shadow-xl' : 'bg-black/60 backdrop-blur-4xl border-b border-white/[0.03] shadow-2xl'}`}
            onMouseEnter={() => setActiveDropdown(activeDropdown)}
          >
            <div className="max-w-7xl mx-auto px-12 py-16">
              <div className="flex flex-col gap-8">
                {(megaMenuData[activeDropdown] || megaMenuData['default']).map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link href="#" className="group inline-block">
                      <h4 className={`text-3xl font-bold transition-colors duration-200 tracking-tight ${isLightContent ? 'text-white group-hover:text-primary' : 'text-dark group-hover:text-primary'}`}>
                        {item.title}
                      </h4>
                      <p className={`text-sm mt-1 font-medium ${isLightContent ? 'text-white/40' : 'text-gray-400'}`}>
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
    </div>
  );
}
