import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from './Logo';

export const PageLoader: React.FC = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50 dark:bg-[#0b1220]">
            {/* Top Loading Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden bg-gray-200 dark:bg-gray-800">
                <motion.div
                    className="h-full bg-blue-600"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "linear",
                    }}
                />
            </div>

            {/* Centered Logo with Pulse */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-4"
            >
                <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut",
                    }}
                >
                    <Logo />
                </motion.div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium animate-pulse">Загрузка...</p>
            </motion.div>
        </div>
    );
};
