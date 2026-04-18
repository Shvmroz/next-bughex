'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactSection from '@/components/home/ContactSection';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <ContactSection />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
