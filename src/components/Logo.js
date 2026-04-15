'use client';

import { motion } from 'framer-motion';

export default function Logo({ isDark = false }) {
    const fullLogoSrc = isDark ? '/full-logo-dark.png' : '/full-logo.png';

    return (
        <motion.div
            className="relative flex items-center group cursor-pointer h-10 select-none"
            initial="initial"
            whileHover="active"
        >
            {/* 
          1. THE ICON (bughex-logo.png)
      */}
            <div className="relative z-20 w-10 h-10 flex-shrink-0">
                <img
                    src="/bughex-logo.png"
                    alt="Bughex Icon"
                    className="w-full h-full object-contain"
                />
            </div>

            {/* 
          2. THE FULL LOGO 
      */}
            <motion.div
                className="absolute left-0 top-0 z-10 h-10 overflow-hidden flex items-center"
                variants={{
                    initial: {
                        width: 40,
                        opacity: 0
                    },
                    active: {
                        width: 160,
                        opacity: 1
                    }
                }}
                transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1]
                }}
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