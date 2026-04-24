'use client';

import { motion } from 'framer-motion';

export default function Logo({ isDark = false, staticLogo = false }) {
  const fullLogoSrc = isDark ? '/full-logo-dark.png' : '/full-logo.png';

  return (
    <motion.div
      className="relative flex items-center group cursor-pointer select-none"
      style={{ height: 40, width: 160 }}
      initial={staticLogo ? false : 'initial'}
      whileHover={staticLogo ? undefined : 'active'}
      animate={staticLogo ? 'active' : 'initial'}
    >
      {/* Full logo — slides in from left within its own container */}
      <motion.div
        className="absolute left-0 top-0 h-10 overflow-hidden flex items-center"
        variants={{
          initial: { width: 0, opacity: 0 },
          active: { width: 120, opacity: 1 },
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        animate={staticLogo ? 'active' : undefined}
        style={{ zIndex: 5 }}
      >
        <img
          src={fullLogoSrc}
          alt="Bughex Full"
          className="h-8 max-w-none object-contain"
          style={{ width: '120px', minWidth: '120px' }}
        />
      </motion.div>

      {/* Icon — always visible */}
      <div
        className="relative z-10 w-10 h-10 flex-shrink-0 flex items-center justify-center"
      >
        <img
          src="/bughex-logo.png"
          alt="Bughex Icon"
          className="w-8 h-8 object-contain"
        />
      </div>
    </motion.div>
  );
}
