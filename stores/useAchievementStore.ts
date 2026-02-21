import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useUIStore } from './useUIStore';

export interface Achievement {
    id: string;
    name: string;
    description: string;
    iconName: string;
    colorClass: string;
    unlockedAt: number | null;
}

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
    { id: 'first_code', name: "Первый Код", description: "Завершен первый урок", colorClass: "text-blue-500 bg-blue-500/10", iconName: "Code", unlockedAt: null },
    { id: 'bug_hunter', name: "Охотник на Баги", description: "Исправлено 5 багов", colorClass: "text-red-500 bg-red-500/10", iconName: "Target", unlockedAt: null },
    { id: 'night_owl', name: "Сова", description: "Обучение после полуночи", colorClass: "text-purple-500 bg-purple-500/10", iconName: "Clock", unlockedAt: null },
    { id: 'weekend_warrior', name: "Воин Недели", description: "7 дней подряд", colorClass: "text-orange-500 bg-orange-500/10", iconName: "Flame", unlockedAt: null }
];

interface AchievementState {
    achievements: Achievement[];
    unlockAchievement: (id: string) => void;
}

export const useAchievementStore = create<AchievementState>()(
    persist(
        (set) => ({
            achievements: INITIAL_ACHIEVEMENTS,
            unlockAchievement: (id) => set((state) => {
                // Only unlock if not already unlocked
                const achievement = state.achievements.find(a => a.id === id);
                if (achievement && !achievement.unlockedAt) {
                    useUIStore.getState().addAchievementToast(achievement);
                    return {
                        achievements: state.achievements.map(a =>
                            a.id === id ? { ...a, unlockedAt: Date.now() } : a
                        )
                    };
                }
                return state;
            })
        }),
        { name: 'tamasha-achievements' }
    )
);
