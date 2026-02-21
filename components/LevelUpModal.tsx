import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../stores/useUIStore';
import { Trophy, Star, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export const LevelUpModal: React.FC = () => {
    const { levelUpData, hideLevelUp } = useUIStore();

    useEffect(() => {
        if (levelUpData) {
            // Trigger confetti when modal appears
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

            const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

            const interval: any = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);

                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
            }, 250);
        }
    }, [levelUpData]);

    return (
        <AnimatePresence>
            {levelUpData && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        onClick={hideLevelUp}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        className="relative w-full max-w-sm bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl overflow-hidden flex flex-col items-center text-center"
                    >
                        {/* Background glowing effects */}
                        <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-yellow-300/30 to-transparent pointer-events-none" />

                        <button
                            onClick={hideLevelUp}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 bg-slate-100 dark:bg-slate-700/50 rounded-full transition-colors z-10"
                        >
                            <X size={20} />
                        </button>

                        <div className="relative mb-6">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 scale-[2] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(253,224,71,0.4)_360deg)] rounded-full mix-blend-overlay"
                            />
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-lg shadow-yellow-500/40 relative z-10">
                                <Trophy className="text-white w-12 h-12" />
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative z-10"
                        >
                            <div className="text-yellow-500 font-black text-sm uppercase tracking-widest mb-2 flex items-center justify-center gap-1">
                                <Star size={16} fill="currentColor" />
                                <span>Новый Уровень!</span>
                                <Star size={16} fill="currentColor" />
                            </div>

                            <h2 className="text-5xl font-black text-slate-900 dark:text-white mb-2">
                                {levelUpData.level}
                            </h2>

                            <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">
                                Ты достиг нового уровня! Продолжай учиться, чтобы стать мастером.
                            </p>

                            <button
                                onClick={hideLevelUp}
                                className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-lg hover:scale-[1.02] active:scale-95 transition-transform"
                            >
                                Продолжить
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
