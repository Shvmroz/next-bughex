'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

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
            {/* Icon — always visible, no masking background */}
            <div className="relative z-20 flex-shrink-0 flex items-center justify-center rounded-lg">
                <Image
                    src="/bughex-logo.png"
                    alt="Bughex Icon"
                    width={32}
                    height={36}
                    className="w-8 h-9 object-contain"
                />
            </div>

            {/* Full logo text — slides out to the right from its own container */}
            <motion.div
                className="overflow-hidden flex items-center"
                variants={{
                    initial: { width: 0, opacity: 0 },
                    active: { width: 80, opacity: 1 },
                }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                animate={staticLogo ? 'active' : undefined}
            >
                <Image
                    src={fullLogoSrc}
                    alt="Bughex Full"
                    width={80}
                    height={32}
                    className="h-8 object-contain"
                />
            </motion.div>
        </motion.div>
    );
}
