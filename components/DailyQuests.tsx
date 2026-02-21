import React from 'react';
import { CheckCircle, Circle, Flame, Target } from 'lucide-react';
import { useUserStore } from '../stores/useUserStore';

export const DailyQuests: React.FC = () => {
    const { xp, totalSolved } = useUserStore();

    // Mock quests for now. In a real app, these would be generated daily.
    const quests = [
        { id: 1, title: 'Заработайте 50 XP', target: 50, current: Math.min(xp, 50), completed: xp >= 50, icon: <Flame size={16} className="text-orange-500" /> },
        { id: 2, title: 'Решите 3 задачи', target: 3, current: Math.min(totalSolved, 3), completed: totalSolved >= 3, icon: <Target size={16} className="text-blue-500" /> },
        { id: 3, title: 'Изучите новый урок', target: 1, current: 0, completed: false, icon: <CheckCircle size={16} className="text-green-500" /> },
    ];

    return (
        <div className="bg-white dark:bg-[#161b22] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>

            <div className="flex items-center justify-between mb-6 relative">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-orange-100 dark:bg-orange-500/20 text-orange-500 rounded-xl relative">
                        <Target size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">Ежедневные Квесты</h2>
                        <p className="text-xs text-gray-500 font-medium">Обновляется через 12ч 45м</p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {quests.map(quest => (
                    <div key={quest.id} className={`p-4 rounded-xl border transition-all ${quest.completed ? 'bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-900/30' : 'bg-gray-50 dark:bg-[#0d1117] border-gray-100 dark:border-gray-800'}`}>
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                {quest.completed ? (
                                    <CheckCircle size={18} className="text-orange-500 shrink-0" />
                                ) : (
                                    <Circle size={18} className="text-gray-300 dark:text-gray-600 shrink-0" />
                                )}
                                <span className={`text-sm font-bold ${quest.completed ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                                    {quest.title}
                                </span>
                            </div>
                            <span className="text-xs font-bold text-gray-400">
                                {quest.current} / {quest.target}
                            </span>
                        </div>

                        {/* Progress bar */}
                        <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-1000 ${quest.completed ? 'bg-orange-500' : 'bg-blue-500'}`}
                                style={{ width: `${(quest.current / quest.target) * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
