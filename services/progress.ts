import { supabase } from '../lib/supabase';
import { useProgressStore } from '../stores/useProgressStore';
import { useAuthStore } from '../stores/useAuthStore';
import { userService } from './user';

export const progressService = {
    getCompletedLessons: async (userId: string, courseId: string): Promise<string[]> => {
        const { data } = await supabase
            .from('course_progress')
            .select('lesson_id')
            .eq('user_id', userId)
            .eq('course_id', courseId)
            .eq('completed', true);

        return data?.map(r => r.lesson_id) ?? [];
    },

    getAllCompletedLessons: async (userId: string): Promise<string[]> => {
        const { data } = await supabase
            .from('course_progress')
            .select('lesson_id')
            .eq('user_id', userId)
            .eq('completed', true);

        return data?.map(r => r.lesson_id) ?? [];
    },

    markLessonComplete: async (courseId: string, lessonId: string): Promise<void> => {
        const userId = useAuthStore.getState().userId;
        if (!userId) return;

        // Optimistic UI update
        useProgressStore.getState().markLessonComplete(lessonId);

        // Persist to Supabase
        await supabase
            .from('course_progress')
            .upsert({
                user_id: userId,
                course_id: courseId,
                lesson_id: lessonId,
                completed: true,
                completed_at: new Date().toISOString(),
            }, { onConflict: 'user_id,course_id,lesson_id' });

        // Award XP + record daily activity
        await userService.updateXP(userId, 30);
        await progressService.recordDailyActivity(userId, 30);
    },

    markQuizComplete: async (courseId: string, lessonId: string, score: number, maxScore: number): Promise<void> => {
        const userId = useAuthStore.getState().userId;
        if (!userId) return;

        useProgressStore.getState().markQuizComplete(lessonId);

        await supabase.from('quiz_results').insert({
            user_id: userId,
            course_id: courseId,
            lesson_id: lessonId,
            score,
            max_score: maxScore,
        });

        const xpEarned = Math.round((score / maxScore) * 50);
        await userService.updateXP(userId, xpEarned);
        await progressService.recordDailyActivity(userId, xpEarned);
    },

    recordDailyActivity: async (userId: string, xpEarned: number): Promise<void> => {
        const today = new Date().toISOString().split('T')[0];

        const { data: existing } = await supabase
            .from('daily_activity')
            .select('id, xp_earned')
            .eq('user_id', userId)
            .eq('activity_date', today)
            .single();

        if (existing) {
            await supabase
                .from('daily_activity')
                .update({ xp_earned: existing.xp_earned + xpEarned })
                .eq('id', existing.id);
        } else {
            await supabase
                .from('daily_activity')
                .insert({ user_id: userId, activity_date: today, xp_earned: xpEarned });
        }

        // Also update streak
        await userService.updateStreak(userId);
    },

    getActivityHistory: async (userId: string): Promise<{ date: string; xp_earned: number }[]> => {
        const ninetyDaysAgo = new Date(Date.now() - 90 * 86400000).toISOString().split('T')[0];

        const { data } = await supabase
            .from('daily_activity')
            .select('activity_date, xp_earned')
            .eq('user_id', userId)
            .gte('activity_date', ninetyDaysAgo)
            .order('activity_date', { ascending: true });

        return data?.map(r => ({ date: r.activity_date, xp_earned: r.xp_earned })) ?? [];
    },
};
