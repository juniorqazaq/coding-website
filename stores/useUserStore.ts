import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useUIStore } from './useUIStore';

interface UserState {
    xp: number;
    level: number;
    streak: number;
    totalSolved: number;
    onboardingCompleted: boolean;
    skillLevel: string | null;
    goal: string | null;
    dailyGoalMinutes: number | null;
    totalMinutesStudied: number;

    // Actions
    addXP: (amount: number) => void;
    incrementStreak: () => void;
    resetStreak: () => void;
    incrementSolved: () => void;
    addStudyMinutes: (minutes: number) => void;
    completeOnboarding: (skillLevel: string, goal: string, dailyGoalMinutes: number) => void;
}

const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500, 5500, 6600, 8000, 10000];

const initialState: Omit<UserState, 'addXP' | 'incrementStreak' | 'resetStreak' | 'incrementSolved' | 'addStudyMinutes' | 'completeOnboarding'> = {
    xp: 1250,
    level: 3,
    streak: 5,
    totalSolved: 12,
    onboardingCompleted: false,
    skillLevel: null,
    goal: null,
    dailyGoalMinutes: null,
    totalMinutesStudied: 0,
};

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            ...initialState,

            addXP: (amount) => set((state) => {
                const newXp = state.xp + amount;
                useUIStore.getState().addXPPopup(amount);
                // Determine level based on XP thresholds (simple approach)
                let newLevel = 1;
                for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
                    if (newXp >= LEVEL_THRESHOLDS[i]) {
                        newLevel = i + 1;
                    } else {
                        break;
                    }
                }

                if (newLevel > state.level) {
                    useUIStore.getState().showLevelUp(newLevel);
                }

                return { xp: newXp, level: newLevel };
            }),

            incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),
            resetStreak: () => set({ streak: 0 }),
            incrementSolved: () => set((state) => ({ totalSolved: state.totalSolved + 1 })),
            addStudyMinutes: (minutes) => set((state) => ({ totalMinutesStudied: state.totalMinutesStudied + minutes })),
            completeOnboarding: (skillLevel, goal, dailyGoalMinutes) => set({
                onboardingCompleted: true,
                skillLevel,
                goal,
                dailyGoalMinutes
            }),
        }),
        {
            name: 'tamasha-user-storage',
        }
    )
);
