'use client';

import { useState } from 'react';
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
export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);

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
          <LeadershipSection />
          <ScrollTextSection />
          <ContactSection />
        </main>
        <Footer />
      </motion.div>
    </>
  );
}
