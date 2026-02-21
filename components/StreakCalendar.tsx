import React from 'react';
import { Flame, Check } from 'lucide-react';
import { useUserStore } from '../stores/useUserStore';

export const StreakCalendar: React.FC = () => {
    const { streak } = useUserStore();

    const days = ['Пн', 'Вто', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const currentDay = new Date().getDay(); // 0 is Sunday
    const normalizedDay = currentDay === 0 ? 6 : currentDay - 1; // 0 for Monday, 6 for Sunday

    return (
        <div className="bg-white dark:bg-[#161b22] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>

            <div className="flex items-center justify-between mb-8 relative">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-100 dark:bg-blue-500/20 text-blue-500 rounded-xl">
                        <Flame size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{streak} Дней Подряд</h2>
                        <p className="text-xs text-gray-500 font-medium">Отличный темп, так держать!</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center gap-2">
                {days.map((day, idx) => {
                    const isPast = idx < normalizedDay;
                    const isToday = idx === normalizedDay;
                    const isGuessed = isPast && Math.random() > 0.3; // Simulated past history

                    return (
                        <div key={idx} className="flex flex-col items-center gap-2">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all relative ${isToday ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/40 scale-110' :
                                        isGuessed ? 'bg-orange-100 dark:bg-orange-500/20 text-orange-500 border border-orange-200 dark:border-orange-500/30' :
                                            'bg-gray-50 dark:bg-[#0d1117] text-gray-400 border border-gray-100 dark:border-gray-800'
                                    }`}
                            >
                                {isGuessed ? <Check size={14} strokeWidth={3} /> : (isToday ? <Flame size={14} fill="currentColor" /> : '')}
                                {isToday && (
                                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-[#161b22] rounded-full"></span>
                                )}
                            </div>
                            <span className={`text-[10px] uppercase font-bold tracking-wider ${isToday ? 'text-blue-500' : 'text-gray-400'}`}>
                                {day}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
