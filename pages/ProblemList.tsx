import React, { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Circle, Search, Play, Lock } from 'lucide-react';
import { CODING_TOPICS, MOCK_PROBLEMS, Problem } from '../data/coding-data';

export const ProblemList: React.FC = () => {
    const { topicId, difficulty } = useParams<{ topicId: string, difficulty: string }>();
    // Case insensitive matching for difficulty URL param vs Data
    const diffCapitalized = difficulty ? difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase() : 'Easy';

    const topic = CODING_TOPICS.find(t => t.id === topicId);
    // Filter problems
    const problems = MOCK_PROBLEMS.filter(p =>
        p.topicId === topicId &&
        p.difficulty === diffCapitalized
    );

    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<'all' | 'solved' | 'unsolved'>('all');

    const filteredProblems = useMemo(() => problems.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' ? true :
            filter === 'solved' ? p.status === 'solved' :
                p.status !== 'solved'; // simplified for MVP
        return matchesSearch && matchesFilter;
    }), [problems, searchTerm, filter]);

    if (!topic) return <div className="p-10">Тема не найдена</div>;

    return (
        <div className="min-h-screen bg-[#09090f] text-[#f0f0f8] p-6 page-enter">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div className="flex items-center gap-4">
                        <Link to={`/coding/topic/${topicId}`} className="p-3 bg-white dark:bg-[#1e293b] rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all text-gray-500">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <div className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">
                                <span>{topic.title}</span>
                                <span>/</span>
                                <span className={diffCapitalized === 'Easy' ? 'text-green-500' : diffCapitalized === 'Medium' ? 'text-yellow-500' : 'text-red-500'}>
                                    {diffCapitalized}
                                </span>
                            </div>
                            <h1 className="text-3xl font-black text-gray-900 dark:text-white">Задачи</h1>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Поиск задач..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2.5 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-64"
                            />
                        </div>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value as any)}
                            className="px-4 py-2.5 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="all">Все статусы</option>
                            <option value="solved">Решено</option>
                            <option value="unsolved">Не решено</option>
                        </select>
                    </div>
                </div>

                {/* List */}
                <div className="bg-white dark:bg-[#1e293b] rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                    {filteredProblems.length > 0 ? (
                        <div className="divide-y divide-gray-100 dark:divide-gray-800">
                            {filteredProblems.map(problem => (
                                <div key={problem.id} className="p-4 sm:p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-full ${problem.status === 'solved' ? 'text-green-500 bg-green-50 dark:bg-green-900/20' : 'text-gray-300 dark:text-gray-600'}`}>
                                            {problem.status === 'solved' ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg group-hover:text-blue-600 transition-colors">
                                                {problem.title}
                                            </h3>
                                            <div className="flex items-center gap-3 text-xs font-medium text-gray-500 mt-1">
                                                <span className={`px-2 py-0.5 rounded ${problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                    {problem.difficulty}
                                                </span>
                                                <span>+{problem.xp} XP</span>
                                            </div>
                                        </div>
                                    </div>

                                    {problem.status === 'locked' ? (
                                        <button disabled className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-300 flex items-center gap-2 cursor-not-allowed">
                                            <Lock size={16} /> Закрыто
                                        </button>
                                    ) : (
                                        <Link to={`/coding/problem/${problem.id}`}>
                                            <button className="px-6 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-gray-200 dark:shadow-none">
                                                Решить <Play size={16} fill="currentColor" />
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 text-center text-gray-400">
                            <div className="mb-4">🔍</div>
                            <p>Задачи, подходящие под фильтры, не найдены.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
