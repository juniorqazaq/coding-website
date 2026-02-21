import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useUIStore } from './useUIStore';
import type { Profile } from '../types/database';

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
    username: string;
    isLoading: boolean;

    // Actions
    addXP: (amount: number) => void;
    incrementStreak: () => void;
    resetStreak: () => void;
    incrementSolved: () => void;
    addStudyMinutes: (minutes: number) => void;
    completeOnboarding: (skillLevel: string, goal: string, dailyGoalMinutes: number) => void;
    setProfile: (profile: Partial<Profile>) => void;
    reset: () => void;
}

const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500, 5500, 6600, 8000, 10000];

const defaultState = {
    xp: 0,
    level: 1,
    streak: 0,
    totalSolved: 0,
    onboardingCompleted: false,
    skillLevel: null,
    goal: null,
    dailyGoalMinutes: null,
    totalMinutesStudied: 0,
    username: '',
    isLoading: false,
};

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            ...defaultState,

            addXP: (amount) => set((state) => {
                const newXp = state.xp + amount;
                useUIStore.getState().addXPPopup(amount);
                let newLevel = 1;
                for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
                    if (newXp >= LEVEL_THRESHOLDS[i]) newLevel = i + 1;
                    else break;
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
                dailyGoalMinutes,
            }),

            setProfile: (profile) => set((state) => ({
                xp: profile.xp ?? state.xp,
                level: profile.level ?? state.level,
                streak: profile.streak ?? state.streak,
                totalSolved: profile.total_solved ?? state.totalSolved,
                totalMinutesStudied: profile.total_minutes_studied ?? state.totalMinutesStudied,
                onboardingCompleted: profile.onboarding_completed ?? state.onboardingCompleted,
                skillLevel: profile.skill_level ?? state.skillLevel,
                goal: profile.goal ?? state.goal,
                dailyGoalMinutes: profile.daily_goal_minutes ?? state.dailyGoalMinutes,
                username: profile.username ?? state.username,
            })),

            reset: () => set(defaultState),
        }),
        {
            name: 'tamasha-user-storage',
            // Only persist theme-adjacent prefs + onboarding flag
            partialize: (state) => ({
                onboardingCompleted: state.onboardingCompleted,
                skillLevel: state.skillLevel,
                goal: state.goal,
                dailyGoalMinutes: state.dailyGoalMinutes,
            }),
        }
    )
);
