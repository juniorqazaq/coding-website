import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Star, Trophy, ArrowRight, Lock, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CODING_TOPICS, Topic } from '../data/coding-data';

export const CodingArena: React.FC = () => {
    // --- Mock User State ---
    const [streak] = useState(5);
    const [xp] = useState(12450);

    // --- Components ---
    const StatsBar = () => (
        <div className="bg-white/80 dark:bg-[#0b1220]/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white shadow-lg shadow-indigo-500/20">
                        <Zap size={20} fill="currentColor" />
                    </div>
                    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 text-lg tracking-tight">Arena</span>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-orange-500/10 rounded-full border border-orange-100 dark:border-orange-500/20 text-orange-600 dark:text-orange-400 font-bold text-sm">
                        <Flame size={18} fill="currentColor" />
                        <span>{streak} Day Streak</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 dark:bg-yellow-500/10 rounded-full border border-yellow-100 dark:border-yellow-500/20 text-yellow-600 dark:text-yellow-400 font-bold text-sm">
                        <Trophy size={18} fill="currentColor" />
                        <span>{xp.toLocaleString()} XP</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const TopicCard = ({ topic, index }: { topic: Topic, index: number }) => {
        const Icon = topic.icon;
        const progress = Math.round((topic.solvedProblems / topic.totalProblems) * 100);

        // Premium Gradients
        const gradients: Record<string, string> = {
            'purple': 'from-purple-500/20 via-purple-500/5 to-transparent border-purple-200 dark:border-purple-500/30 hover:border-purple-500 dark:hover:border-purple-400',
            'blue': 'from-blue-500/20 via-blue-500/5 to-transparent border-blue-200 dark:border-blue-500/30 hover:border-blue-500 dark:hover:border-blue-400',
            'emerald': 'from-emerald-500/20 via-emerald-500/5 to-transparent border-emerald-200 dark:border-emerald-500/30 hover:border-emerald-500 dark:hover:border-emerald-400',
            'orange': 'from-orange-500/20 via-orange-500/5 to-transparent border-orange-200 dark:border-orange-500/30 hover:border-orange-500 dark:hover:border-orange-400',
            'pink': 'from-pink-500/20 via-pink-500/5 to-transparent border-pink-200 dark:border-pink-500/30 hover:border-pink-500 dark:hover:border-pink-400',
            'cyan': 'from-cyan-500/20 via-cyan-500/5 to-transparent border-cyan-200 dark:border-cyan-500/30 hover:border-cyan-500 dark:hover:border-cyan-400',
        };

        const iconColors: Record<string, string> = {
            'purple': 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-500/20',
            'blue': 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/20',
            'emerald': 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/20',
            'orange': 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-500/20',
            'pink': 'text-pink-600 dark:text-pink-400 bg-pink-100 dark:bg-pink-500/20',
            'cyan': 'text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-500/20',
        };

        const bgClass = gradients[topic.color] || gradients['blue'];
        const iconClass = iconColors[topic.color] || iconColors['blue'];

        return (
            <Link to={`/coding/topic/${topic.id}`}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`group relative h-full bg-white dark:bg-[#131b2c] rounded-[2rem] p-8 border transition-all duration-300 shadow-sm hover:shadow-2xl overflow-hidden ${bgClass}`}
                >
                    {/* Background Glow */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${topic.color === 'purple' ? 'from-purple-500' : 'from-blue-500'} to-transparent opacity-10 blur-3xl rounded-full -mr-10 -mt-10 group-hover:opacity-20 transition-opacity`} />

                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500 ${iconClass}`}>
                                <Icon size={32} />
                            </div>
                            {progress === 100 && (
                                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-orange-500/20 flex items-center gap-1">
                                    <Star size={12} fill="currentColor" /> Mastered
                                </div>
                            )}
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all">
                            {topic.title}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed font-medium">
                            {topic.description}
                        </p>

                        <div className="mt-auto">
                            <div className="flex justify-between text-xs font-bold text-gray-400 dark:text-gray-500 mb-3 uppercase tracking-wider">
                                <span>Progress</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className={`h-full rounded-full bg-current ${topic.color === 'purple' ? 'text-purple-500' : topic.color === 'emerald' ? 'text-emerald-500' : topic.color === 'orange' ? 'text-orange-500' : 'text-blue-500'}`}
                                />
                            </div>

                            <div className="mt-6 flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 duration-300">
                                Enter Arena <ArrowRight size={16} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </Link>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-[#0b1220]">
            <StatsBar />

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="mb-16 text-center max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest mb-6 border border-blue-100 dark:border-blue-500/20"
                    >
                        <Sparkles size={14} /> Ultimate Coding Practice
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight"
                    >
                        master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">code.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed"
                    >
                        Select a domain below. Level up your skills from beginner to expert with our gamified learning path.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {CODING_TOPICS.map((topic, idx) => (
                        <TopicCard key={topic.id} topic={topic} index={idx} />
                    ))}
                </div>
            </div>
        </div>
    );
};
