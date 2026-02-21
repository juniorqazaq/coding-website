import { create } from 'zustand';

export interface LeaderboardEntry {
    id: string;
    name: string;
    xp: number;
    rank: number;
    avatar: string;
    isCurrentUser?: boolean;
}

const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
    { id: 'u1', name: 'Alex', xp: 2820, rank: 1, avatar: '👨‍💻' },
    { id: 'u2', name: 'Riley', xp: 2500, rank: 2, avatar: '👩‍💻' },
    { id: 'u3', name: 'Lindia', xp: 880, rank: 3, avatar: '👨‍🎓' },
    { id: 'u4', name: 'Jacob', xp: 420, rank: 4, avatar: '👩‍🎓' },
    { id: 'u5', name: 'Yixing', xp: 220, rank: 5, avatar: '👨‍🔬' },
];

interface LeaderboardState {
    entries: LeaderboardEntry[];
}

export const useLeaderboardStore = create<LeaderboardState>((set) => ({
    entries: INITIAL_LEADERBOARD,
}));
