import React from 'react';
import { Users } from 'lucide-react';
import { useLeaderboardStore } from '../stores/useLeaderboardStore';

export const Leaderboard: React.FC = () => {
    const { entries } = useLeaderboardStore();

    return (
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                    <Users className="text-blue-500" />
                    Лидерборд
                </h2>
                <span className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-500">Эта неделя</span>
            </div>
            <div className="space-y-4">
                {entries.map((user, index) => (
                    <div key={user.id} className="flex items-center gap-4">
                        <span className={`w-6 text-center font-bold ${user.rank <= 3 ? 'text-blue-500' : 'text-gray-400'}`}>
                            {user.rank}
                        </span>
                        <div className={`flex items-center gap-3 flex-1 p-2 rounded-xl ${user.isCurrentUser ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/30' : 'bg-gray-50 dark:bg-[#0f1724]'}`}>
                            <span className="text-xl">{user.avatar}</span>
                            <div>
                                <div className="font-semibold text-sm text-gray-900 dark:text-gray-100">{user.name}</div>
                                <div className="text-xs text-gray-500">{user.xp.toLocaleString()} XP</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
