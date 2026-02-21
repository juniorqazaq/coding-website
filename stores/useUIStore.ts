import { create } from 'zustand';

interface UIState {
    xpPopups: { id: string, amount: number }[];
    addXPPopup: (amount: number) => void;
    removeXPPopup: (id: string) => void;
    levelUpData: { level: number } | null;
    showLevelUp: (level: number) => void;
    hideLevelUp: () => void;
    achievementToasts: any[];
    addAchievementToast: (achievement: any) => void;
    removeAchievementToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
    xpPopups: [],
    addXPPopup: (amount) => set((state) => ({
        xpPopups: [...state.xpPopups, { id: Date.now().toString() + Math.random(), amount }]
    })),
    removeXPPopup: (id) => set((state) => ({
        xpPopups: state.xpPopups.filter(p => p.id !== id)
    })),
    levelUpData: null,
    showLevelUp: (level) => set({ levelUpData: { level } }),
    hideLevelUp: () => set({ levelUpData: null }),
    achievementToasts: [],
    addAchievementToast: (achievement) => set((state) => ({
        achievementToasts: [...state.achievementToasts, { ...achievement, toastId: Date.now().toString() }]
    })),
    removeAchievementToast: (toastId) => set((state) => ({
        achievementToasts: state.achievementToasts.filter(t => t.toastId !== toastId)
    })),
}));
