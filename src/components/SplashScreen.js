'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COLS = 16;
const ROWS = 10;

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState('cover');
  const [allDone, setAllDone] = useState(false);
  const completedRef = useRef(0);
  const totalFragments = COLS * ROWS;

  const fragments = useRef(
    Array.from({ length: totalFragments }, (_, i) => ({
      id: i,
      col: i % COLS,
      row: Math.floor(i / COLS),
      delay: Math.random() * 1.8,
    }))
  ).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('dissolve');
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (allDone) {
      setTimeout(() => onComplete(), 100);
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
      {phase !== 'done' && (
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
  const opacity = 0.55 + ((frag.col + frag.row) % 4) * 0.1;

  return (
    <motion.div
      style={{
        background: `rgba(19, 167, 150, ${opacity})`,
        borderRight: '1px solid rgba(19, 167, 150, 0.2)',
        borderBottom: '1px solid rgba(19, 167, 150, 0.2)',
      }}
      initial={{ opacity: 1, scale: 1 }}
      animate={dissolve ? { opacity: 0, scale: 0.6 } : { opacity: 1, scale: 1 }}
      transition={
        dissolve
          ? {
              delay: frag.delay,
              duration: 0.5,
              ease: [0.43, 0.13, 0.23, 0.96],
            }
          : { duration: 0 }
      }
      onAnimationComplete={dissolve ? onDone : undefined}
    />
  );
}
