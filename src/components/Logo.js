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
      {/* Full logo — sits behind the icon, slides in from left */}
      <motion.div
        className="absolute left-0 top-0 h-10 overflow-hidden flex items-center z-10"
        variants={{
          initial: { width: 40 },
          active: { width: 160 },
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        animate={staticLogo ? 'active' : undefined}
      >
        <img
          src={fullLogoSrc}
          alt="Bughex Full"
          className="h-8 max-w-none object-contain"
          style={{ width: '160px', minWidth: '160px' }}
        />
      </motion.div>

      {/* Icon — always on top, with solid background to mask the full logo sliding behind */}
      <div
        className="relative z-20 w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg"
        style={{ background: isDark ? '#0a0a0f' : '#ffffff' }}
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
