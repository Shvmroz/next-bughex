'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CapabilitiesSection from '@/components/home/CapabilitiesSection';
import { Icon } from '@iconify/react';
import { capabilities } from '@/lib/mock';

const NAV_HEIGHT = 64; // 🔥 adjust if your header is different

const storySlides = [
  {
    id: 1,
    title: 'BugHex — A Dubai-Based Digital Powerhouse.',
    body: 'A decade of delivering high-performance digital products for global clients across multiple industries.'
  },
  {
    id: 2,
    title: 'Engineering Meets Intelligence.',
    body: 'From React and Flutter to backend systems, we integrate AI-driven logic and automation into every layer of development.'
  },
  {
    id: 3,
    title: 'Built for Scale and Speed.',
    body: 'Our platforms are architected to handle massive user loads with performance, reliability, and intelligent optimization.'
  },
  {
    id: 4,
    title: 'AI at the Core.',
    body: 'We design smart systems powered by machine learning, automation, and real-time decision-making capabilities.'
  },
  {
    id: 5,
    title: 'We Don’t Just Build—We Evolve.',
    body: 'Continuously improving products through data, AI insights, and adaptive technology to keep you ahead of the market.'
  }
];


// ✅ FIXED TRIGGER
function SlideTrigger({ index, onEnter }) {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    threshold: 0.6,
  });

  useEffect(() => {
    if (isInView) onEnter(index);
  }, [isInView, index, onEnter]);

  return <div ref={ref} className="h-[100svh] w-full" />;
}

export default function AboutPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  });

  // Floating Background Gradients
  const blob1X = useTransform(scrollYProgress, [0, 1], ['-10%', '70%']);
  const blob1Y = useTransform(scrollYProgress, [0, 1], ['20%', '70%']);
  const blob2X = useTransform(scrollYProgress, [0, 1], ['95%', '5%']);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ['40%', '-10%']);
  const blob3X = useTransform(scrollYProgress, [0, 1], ['-20%', '10%']);
  const blob3Y = useTransform(scrollYProgress, [0, 1], ['-15%', '20%']);
  const blob1Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.4, 0.8]);
  const blob2Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.3, 0.7, 1.3]);
  const blob3Scale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);
  const blobOpacity = useTransform(scrollYProgress, [0, 1], [0.8, 0.8]);

  useEffect(() => {
    document.documentElement.classList.add(
      'snap-y',
      'snap-mandatory',
      'scroll-smooth'
    );

    return () => {
      document.documentElement.classList.remove(
        'snap-y',
        'snap-mandatory',
        'scroll-smooth'
      );
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">

        {/* HERO STORY */}
        <section ref={heroRef} className="relative bg-[#FAFBFC]">

          {/* Sticky Content */}
          <div
            className="sticky flex items-center justify-center overflow-hidden z-20 pointer-events-none"
            style={{
              top: `${NAV_HEIGHT}px`,
              height: `calc(100svh - ${NAV_HEIGHT}px)`
            }}
          >
            {/* Scroll-Driven Floating Gradients */}
            <motion.div
              style={{
                x: blob1X,
                y: blob1Y,
                scale: blob1Scale,
                opacity: blobOpacity,
              }}
              className="absolute w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10"
            />
            <motion.div
              style={{
                x: blob2X,
                y: blob2Y,
                scale: blob2Scale,
                opacity: blobOpacity,
              }}
              className="absolute w-[500px] h-[500px] bg-[#1bb5a2]/20 rounded-full blur-[100px] -z-10"
            />

            <motion.div
              style={{
                x: blob3X,
                y: blob3Y,
                scale: blob3Scale,
                opacity: blobOpacity,
              }}
              className="absolute w-[200px] h-[200px] bg-[#b302ff]/20 rounded-full blur-[100px] -z-10"
            />

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center w-full">

              <div className="relative flex items-center justify-center min-h-[250px]">

                <AnimatePresence mode="wait">
                  <motion.div
                    key={storySlides[activeIndex].id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex flex-col items-center justify-center"
                  >

                    <p className="
                      text-dark/70 font-medium leading-snug text-center
                      text-xl sm:text-2xl md:text-4xl lg:text-5xl
                      px-2 sm:px-4
                    ">

                      <span className="
                        block font-bold text-dark mb-3 sm:mb-4
                        text-2xl sm:text-3xl md:text-5xl
                      ">
                        {storySlides[activeIndex].title}
                      </span>

                      <span className="block text-sm sm:text-base md:text-lg lg:text-xl">
                        {storySlides[activeIndex].body}
                      </span>

                    </p>

                  </motion.div>
                </AnimatePresence>

              </div>

            </div>
          </div>

          {/* SCROLL TRIGGERS */}
          <div className="relative z-10">
            {storySlides.map((slide, i) => (
              <SlideTrigger
                key={slide.id}
                index={i}
                onEnter={setActiveIndex}
              />
            ))}
          </div>

        </section>

        {/* STATS */}
        <section className="py-20 bg-dark text-white">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '10+', label: 'Years in Dubai' },
              { value: '150+', label: 'Products Shipped' },
              { value: '50+', label: 'Global Clients' },
              { value: '100%', label: 'Client Satisfaction' },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-3xl md:text-5xl font-bold text-primary mb-2">
                  {s.value}
                </p>
                <p className="text-xs uppercase tracking-widest text-white/50">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CAPABILITIES */}
        <CapabilitiesSection
          title="Capabilities"
          tag="Our Expertise"
          subtitle="AI, Web, Mobile, and Security engineering at scale."
          items={capabilities.map((cap) => ({
            ...cap,
            description: cap.body,
            features: cap.tags,
            icon: <Icon icon={cap.icon} width={32} />,
          }))}
        />

      </main>

      <Footer />
    </div>
  );
}