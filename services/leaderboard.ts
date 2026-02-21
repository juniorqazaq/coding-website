import { supabase } from '../lib/supabase';
import { useLeaderboardStore } from '../stores/useLeaderboardStore';
import type { LeaderboardEntry } from '../types/database';

export interface RankedLeaderboardEntry extends LeaderboardEntry {
    rank: number;
}

export const leaderboardService = {
    getLeaderboard: async (): Promise<RankedLeaderboardEntry[]> => {
        const { data, error } = await supabase
            .from('leaderboard')
            .select('*');

        if (error || !data) return [];

        const ranked = data.map((entry, index) => ({
            ...entry,
            rank: index + 1,
        }));

        // Update leaderboard store
        useLeaderboardStore.getState().setEntries(ranked);

        return ranked;
    },

    getUserRank: async (userId: string): Promise<number> => {
        const { data: userProfile } = await supabase
            .from('profiles')
            .select('xp')
            .eq('id', userId)
            .single();

        if (!userProfile) return 0;

        const { count } = await supabase
            .from('profiles')
            .select('id', { count: 'exact', head: true })
            .gt('xp', userProfile.xp);

        return (count ?? 0) + 1;
    },
};
