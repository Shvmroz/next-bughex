'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState('cover');
  const [allDone, setAllDone] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const COLS = isMobile ? 8 : 16;
  const ROWS = isMobile ? 12 : 10;
  const totalFragments = COLS * ROWS;
  const completedRef = useRef(0);

  const fragments = useMemo(() => {
    return Array.from({ length: totalFragments }, (_, i) => ({
      id: i,
      col: i % COLS,
      row: Math.floor(i / COLS),
      delay: Math.random() * 1.2, // Reduced delay for faster exit
    }));
  }, [totalFragments, COLS]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('dissolve');
    }, 400); // Faster initial wait
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (allDone) {
      onComplete();
    }
  }, [allDone, onComplete]);

  const handleFragmentDone = () => {
    completedRef.current += 1;
    if (completedRef.current >= totalFragments) {
      setAllDone(true);
    }
  };

  return (
    <AnimatePresence>
      {!allDone && (
        <div className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 grid"
            style={{
              gridTemplateColumns: `repeat(${COLS}, 1fr)`,
              gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            }}
          >
            {fragments.map((frag) => (
              <Pixel
                key={frag.id}
                frag={frag}
                dissolve={phase === 'dissolve'}
                onDone={handleFragmentDone}
              />
            ))}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Pixel({ frag, dissolve, onDone }) {
  // Faster, more subtle fragments for mobile performance
  const opacity = 0.6 + ((frag.col + frag.row) % 3) * 0.1;

  return (
    <motion.div
      style={{
        background: `rgba(27, 181, 162, ${opacity})`,
        border: 'none', // Removed borders as requested
      }}
      initial={{ opacity: 0 }}
      animate={dissolve
        ? { opacity: 0, scale: 0.8 }
        : { opacity: 1, scale: 1 }
      }
      transition={
        dissolve
          ? {
            delay: frag.delay,
            duration: 0.4,
            ease: "easeOut",
          }
          : { duration: 0.3 }
      }
      onAnimationComplete={dissolve ? onDone : undefined}
    />
  );
}
