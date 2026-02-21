import { supabase } from '../lib/supabase';
import { useAchievementStore } from '../stores/useAchievementStore';
import type { Profile } from '../types/database';

interface AchievementCondition {
    id: string;
    check: (profile: Profile, completedLessons: number, unlockedIds: string[]) => boolean;
}

const ACHIEVEMENT_CONDITIONS: AchievementCondition[] = [
    {
        id: 'first_code',
        check: (_, completedLessons) => completedLessons >= 1,
    },
    {
        id: 'bug_hunter',
        check: (profile) => profile.total_solved >= 5,
    },
    {
        id: 'weekend_warrior',
        check: (profile) => profile.streak >= 7,
    },
    {
        id: 'night_owl',
        check: (profile) => {
            const hour = new Date().getHours();
            return profile.total_minutes_studied > 0 && hour >= 0 && hour < 4;
        },
    },
];

export const achievementService = {
    getUserAchievements: async (userId: string): Promise<string[]> => {
        const { data } = await supabase
            .from('user_achievements')
            .select('achievement_id')
            .eq('user_id', userId);

        return data?.map(r => r.achievement_id) ?? [];
    },

    checkAndUnlockAchievements: async (userId: string): Promise<void> => {
        const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (!profile) return;

        const { data: progressData } = await supabase
            .from('course_progress')
            .select('lesson_id')
            .eq('user_id', userId)
            .eq('completed', true);

        const completedCount = progressData?.length ?? 0;
        const alreadyUnlocked = await achievementService.getUserAchievements(userId);

        for (const condition of ACHIEVEMENT_CONDITIONS) {
            if (alreadyUnlocked.includes(condition.id)) continue;

            if (condition.check(profile, completedCount, alreadyUnlocked)) {
                // Save to Supabase
                await supabase.from('user_achievements').insert({
                    user_id: userId,
                    achievement_id: condition.id,
                });

                // Trigger in-app toast via Zustand
                useAchievementStore.getState().unlockAchievement(condition.id);
            }
        }
    },

    syncFromDatabase: async (userId: string): Promise<void> => {
        const unlockedIds = await achievementService.getUserAchievements(userId);
        useAchievementStore.getState().syncFromDatabase(unlockedIds);
    },
};
