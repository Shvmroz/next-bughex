'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Logo from './Logo';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#about' },
  { label: 'Portfolio', href: '/#portfolio' },
  { label: 'Blog', href: '/blogs' },
  { label: 'Contact', href: '/#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const heroHeight = window.innerHeight;
      const headerHeight = 80;
      setScrolled(window.scrollY >= (heroHeight - headerHeight));
    };

    // Set initial state
    onScroll();

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
        backdropFilter: scrolled ? 'blur(25px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid transparent',
        boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.05)' : 'none',
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div
        className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-500 ${scrolled ? 'py-2.5' : 'py-5'
          }`}
      >
        <Link href="/" className="group">
          <Logo
            width={40}
            height={40}
            textColor={scrolled ? 'text-dark' : 'text-white'}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
            >
              <Link
                href={link.href}
                className={`text-sm font-semibold transition-colors duration-300 relative group ${scrolled ? 'text-dark/70 hover:text-primary' : 'text-white/80 hover:text-white'
                  }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${scrolled ? 'bg-primary' : 'bg-white'
                  }`} />
              </Link>
            </motion.div>
          ))}
        </nav>

        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link href="/#contact">
            <button className="btn">
              <i className="animation"></i>
              Start Project
              <i className="animation"></i>
            </button>
          </Link>
        </motion.div>
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`w-6 h-0.5 transition-all ${scrolled ? 'bg-dark' : 'bg-white'}`} />
          <span className={`w-6 h-0.5 transition-all ${scrolled ? 'bg-dark' : 'bg-white'}`} />
          <span className={`w-6 h-0.5 transition-all ${scrolled ? 'bg-dark' : 'bg-white'}`} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-primary/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-dark/70 hover:text-primary font-semibold transition-colors py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                className="mt-2"
                onClick={() => setMenuOpen(false)}
              >
                <button className="btn w-full">Start Project</button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

