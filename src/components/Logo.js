'use client';

import { motion } from 'framer-motion';

export default function Logo({ isDark = false, staticLogo = false }) {
  const fullLogoSrc = isDark ? '/full-logo-dark.png' : '/full-logo.png';

  return (
    <motion.div
      className="relative flex items-center group cursor-pointer h-10 select-none"
      initial={staticLogo ? false : 'initial'}
      whileHover={staticLogo ? undefined : 'active'}
      animate={staticLogo ? 'active' : 'initial'}
    >
      {/* Icon */}
      <div className="relative z-20 w-10 h-10 flex-shrink-0">
        <img
          src="/bughex-logo.png"
          alt="Bughex Icon"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Full Logo */}
      <motion.div
        className="absolute left-0 top-0 z-10 h-10 overflow-hidden flex items-center"
        variants={{
          initial: {
            width: 40,
            opacity: 0,
          },
          active: {
            width: 160,
            opacity: 1,
          },
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        animate={staticLogo ? 'active' : undefined}
      >
        <img
          src={fullLogoSrc}
          alt="Bughex Full"
          className="h-8 max-w-none object-contain"
          style={{ width: '180px' }}
        />
      </motion.div>
    </motion.div>
  );
}