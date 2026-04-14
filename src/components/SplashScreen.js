'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COLS = 12;
const ROWS = 8;

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState('show');
  const [fragmentsDone, setFragmentsDone] = useState(false);
  const totalFragments = COLS * ROWS;
  const completedRef = useRef(0);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setPhase('fragment');
    }, 800);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (fragmentsDone) {
      setTimeout(() => {
        onComplete();
      }, 200);
    }
  }, [fragmentsDone, onComplete]);

  const fragments = Array.from({ length: totalFragments }, (_, i) => ({
    id: i,
    col: i % COLS,
    row: Math.floor(i / COLS),
    delay: Math.random() * 1.5,
    direction: {
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400,
      rotate: (Math.random() - 0.5) * 180,
    },
  }));

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-hidden bg-white"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {phase === 'show' && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="relative">
                <motion.div
                  className="absolute -inset-8 rounded-full"
                  style={{
                    background: 'radial-gradient(ellipse, rgba(19, 167, 150, 0.2) 0%, transparent 70%)',
                  }}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <HexLogo />
              </div>
              <motion.p
                className="mt-6 text-xl font-display font-bold tracking-[0.2em] text-dark/40"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                BUGHEX
              </motion.p>
            </motion.div>
          )}

          {phase === 'fragment' && (
            <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}>
              {fragments.map((frag) => (
                <Fragment
                  key={frag.id}
                  frag={frag}
                  onDone={() => {
                    completedRef.current += 1;
                    if (completedRef.current >= totalFragments) {
                      setFragmentsDone(true);
                    }
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Fragment({ frag, onDone }) {
  return (
    <motion.div
      className="relative overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at ${frag.col * 8}% ${frag.row * 12}%, rgba(19, 167, 150, 0.1) 0%, #ffffff 100%)`,
        borderRight: '1px solid rgba(19, 167, 150, 0.05)',
        borderBottom: '1px solid rgba(19, 167, 150, 0.05)',
      }}
      initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
      animate={{
        opacity: 0,
        x: frag.direction.x,
        y: frag.direction.y,
        rotate: frag.direction.rotate,
        scale: 0.2,
      }}
      transition={{
        delay: frag.delay,
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      onAnimationComplete={onDone}
    >
      {frag.col === Math.floor(COLS / 2) && frag.row === Math.floor(ROWS / 2) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <HexLogo size="small" />
        </div>
      )}
    </motion.div>
  );
}

function HexLogo({ size = 'large' }) {
  const s = size === 'large' ? 80 : 40;
  return (
    <svg width={s} height={s * 1.15} viewBox="0 0 80 92" fill="none">
      <polygon
        points="40,2 78,22 78,70 40,90 2,70 2,22"
        fill="rgba(19, 167, 150, 0.08)"
        stroke="#13a796"
        strokeWidth="2"
      />
      <polygon
        points="40,14 66,28 66,64 40,78 14,64 14,28"
        fill="rgba(19, 167, 150, 0.04)"
        stroke="#13a796"
        strokeWidth="1"
        strokeOpacity="0.3"
      />
      <text
        x="40"
        y="52"
        textAnchor="middle"
        fill="#13a796"
        fontSize={size === 'large' ? '20' : '10'}
        fontFamily="Space Grotesk"
        fontWeight="700"
      >
        BH
      </text>
    </svg>
  );
}
