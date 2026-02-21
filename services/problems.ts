import { supabase } from '../lib/supabase';
import { userService } from './user';
import { progressService } from './progress';
import { useAuthStore } from '../stores/useAuthStore';

export interface Problem {
    id: string;
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    topicId: string;
}

export interface SubmitResult {
    success: boolean;
    score: number;
    message: string;
    xpEarned: number;
}

export const problemsService = {
    submitSolution: async (
        problemId: string,
        code: string,
        status: 'correct' | 'wrong' | 'error'
    ): Promise<SubmitResult> => {
        const userId = useAuthStore.getState().userId;

        const xpEarned = status === 'correct' ? 50 : 0;

        if (userId) {
            // Save submission to Supabase
            await supabase.from('problem_submissions').insert({
                user_id: userId,
                problem_id: problemId,
                code,
                status,
                xp_earned: xpEarned,
            });

            if (status === 'correct') {
                // Update XP and total_solved
                await userService.updateXP(userId, xpEarned);
                await supabase.rpc('increment_total_solved' as never, { user_id_param: userId }).maybeSingle();
                // Fallback: direct update in case RPC doesn't exist
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('total_solved')
                    .eq('id', userId)
                    .single();
                if (profile) {
                    await supabase
                        .from('profiles')
                        .update({ total_solved: profile.total_solved + 1 })
                        .eq('id', userId);
                }
                await progressService.recordDailyActivity(userId, xpEarned);
            }
        }

        return {
            success: status === 'correct',
            score: status === 'correct' ? 100 : 0,
            message: status === 'correct'
                ? 'Задача решена! Отличная работа! 🎉'
                : status === 'wrong'
                    ? 'Неверно. Проверьте логику и попробуйте снова.'
                    : 'Ошибка выполнения. Проверьте синтаксис.',
            xpEarned,
        };
    },

    getSubmissions: async (problemId: string): Promise<{ status: string; submitted_at: string }[]> => {
        const userId = useAuthStore.getState().userId;
        if (!userId) return [];

        const { data } = await supabase
            .from('problem_submissions')
            .select('status, submitted_at')
            .eq('user_id', userId)
            .eq('problem_id', problemId)
            .order('submitted_at', { ascending: false });

        return data ?? [];
    },
};
