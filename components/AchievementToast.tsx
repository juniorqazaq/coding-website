import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../stores/useUIStore';
import * as LucideIcons from 'lucide-react';

export const AchievementToastManager: React.FC = () => {
    const { achievementToasts, removeAchievementToast } = useUIStore();

    return (
        <div className="fixed bottom-4 right-4 z-[150] flex flex-col items-end gap-3 pointer-events-none">
            <AnimatePresence>
                {achievementToasts.map((toast) => (
                    <AchievementToastItem
                        key={toast.toastId}
                        toast={toast}
                        onComplete={() => removeAchievementToast(toast.toastId)}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

const AchievementToastItem = ({ toast, onComplete }: { toast: any, onComplete: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 5000); // 5 seconds display
        return () => clearTimeout(timer);
    }, [onComplete]);

    const IconComponent = (LucideIcons as any)[toast.iconName] || LucideIcons.Award;

    return (
        <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="flex items-center gap-4 bg-white dark:bg-[#1e293b] p-4 rounded-2xl shadow-xl shadow-blue-900/10 border border-gray-100 dark:border-gray-800 pointer-events-auto max-w-sm"
        >
            <div className={`p-3 rounded-2xl shrink-0 ${toast.colorClass}`}>
                <IconComponent size={24} />
            </div>
            <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">Достижение Разблокировано</p>
                <h4 className="font-bold text-gray-900 dark:text-white text-base leading-tight">{toast.name}</h4>
                <p className="text-sm text-gray-500 line-clamp-1">{toast.description}</p>
            </div>
        </motion.div>
    );
};
