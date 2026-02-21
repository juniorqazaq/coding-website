import { create } from 'zustand';
import type { RankedLeaderboardEntry } from '../services/leaderboard';

interface LeaderboardState {
    entries: RankedLeaderboardEntry[];
    isLoading: boolean;
    setEntries: (entries: RankedLeaderboardEntry[]) => void;
    setLoading: (loading: boolean) => void;
}

export const useLeaderboardStore = create<LeaderboardState>((set) => ({
    entries: [],
    isLoading: false,
    setEntries: (entries) => set({ entries, isLoading: false }),
    setLoading: (loading) => set({ isLoading: loading }),
}));
