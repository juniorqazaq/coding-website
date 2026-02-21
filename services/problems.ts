import { supabase } from '../lib/supabase';
import { userService } from './user';
import { progressService } from './progress';
import { useAuthStore } from '../stores/useAuthStore';
import type { ProblemSubmission } from '../types/database';

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
            // Save submission — use explicit type cast to bypass generic inference issue
            const submission: Omit<ProblemSubmission, 'id' | 'submitted_at'> = {
                user_id: userId,
                problem_id: problemId,
                code,
                status,
                xp_earned: xpEarned,
            };
            await (supabase.from('problem_submissions') as ReturnType<typeof supabase.from>).insert(submission as never);

            if (status === 'correct') {
                await userService.updateXP(userId, xpEarned);

                // Increment total_solved directly
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('total_solved')
                    .eq('id', userId)
                    .single();

                if (profileData) {
                    await supabase
                        .from('profiles')
                        .update({ total_solved: (profileData as { total_solved: number }).total_solved + 1 })
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

        return (data ?? []) as { status: string; submitted_at: string }[];
    },
};
