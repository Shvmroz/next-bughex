'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SplashScreen from '@/components/SplashScreen';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import TechSlider from '@/components/home/TechSlider';
import LeadershipSection from '@/components/home/LeadershipSection';
import ContactSection from '@/components/home/ContactSection';
import ScrollTextSection from '@/components/home/ScrollTextSection';
import RecentProjectsSection from '@/components/home/RecentProjectsSection';
import ServicesSection from '@/components/home/ServicesSection';
import { Icon } from '@iconify/react';
import { capabilities } from '@/lib/mock';

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);

  // Disable browser scroll restoration so navigating to "/" always starts at top
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen flex flex-col"
      >
        <Header />
        <main className="flex-grow">
          <HeroSection />
          <TechSlider />
          <RecentProjectsSection />
          <ServicesSection />
          <LeadershipSection />
          <ScrollTextSection />
          <ContactSection />
        </main>
        <Footer />
      </motion.div>
    </>
  );
}
