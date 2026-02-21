import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../stores/useUIStore';

export const XPPopupManager: React.FC = () => {
    const { xpPopups, removeXPPopup } = useUIStore();

    return (
        <div className="fixed top-24 right-8 z-[100] flex flex-col items-end gap-2 pointer-events-none">
            <AnimatePresence>
                {xpPopups.map((popup) => (
                    <XPPopupItem key={popup.id} popup={popup} onComplete={() => removeXPPopup(popup.id)} />
                ))}
            </AnimatePresence>
        </div>
    );
};

const XPPopupItem = ({ popup, onComplete }: { popup: { id: string, amount: number }, onComplete: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 2500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-2xl shadow-lg shadow-blue-500/30 border border-white/20 backdrop-blur-md"
        >
            <div className="flex items-center justify-center bg-white/20 rounded-full w-8 h-8">
                <span className="text-yellow-300 font-bold text-lg leading-none">⚡</span>
            </div>
            <span className="font-black text-xl tracking-tight">+{popup.amount} XP</span>
        </motion.div>
    );
};
