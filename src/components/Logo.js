'use client';

import { motion } from 'framer-motion';

export default function Logo({ width = 40, height = 40, className = "", textColor = "text-dark", scrolled = false }) {
    const bugSize = width * 0.6;

    const resolvedTextColor = scrolled ? 'text-primary' : textColor;

    return (
        <div className={`flex items-center gap-0 ${className}`}>
            <div className="relative flex-shrink-0" style={{ width, height }}>
                <img
                    src="/bughex-logo.png"
                    alt="Logo Icon"
                    className="w-full h-full relative z-10"
                />
            </div>

            <div className="relative">
                <span className={`font-display font-bold uppercase tracking-tight flex items-center transition-colors duration-500 ${resolvedTextColor}`}
                    style={{ fontSize: 40 }}>
                    UG<span className="text-primary">H</span>E
                    <span className="relative flex items-center">
                        X
                        <motion.img
                            src="/bug.png"
                            alt="Bug"
                            className="pointer-events-none ml-1"
                            style={{
                                width: bugSize,
                                height: bugSize,
                            }}
                            animate={{
                                scale: [1, 1.25, 1, 1.25, 1],
                                y: [0, -2, 0, -2, 0]
                            }}
                            transition={{
                                duration: 4.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </span>
                </span>
            </div>
        </div>
    );
}
