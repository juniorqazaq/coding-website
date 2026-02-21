import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Play, Zap, Shield, Swords, Skull, CheckCircle2, Circle } from 'lucide-react';
import { CODING_TOPICS } from '../data/coding-data';
import { motion } from 'framer-motion';

const LEVELS = {
    Easy: {
        features: ["Basic Logic", "Simple syntax", "Instant feedback"],
        description: "Start your journey.",
        icon: Shield
    },
    Medium: {
        features: ["Algorithms", "Data Structures", "Optimization"],
        description: "Level up your skills.",
        icon: Swords
    },
    Hard: {
        features: ["System Design", "Competition", "Elite Status"],
        description: "Master class coding.",
        icon: Skull
    }
};

export const TopicDifficulty: React.FC = () => {
    const { topicId } = useParams<{ topicId: string }>();
    const topic = CODING_TOPICS.find(t => t.id === topicId);

    // Mock user progress
    const solvedEasy = 8;
    const requiredForMedium = 5;
    const solvedMedium = 2;
    const requiredForHard = 10;

    if (!topic) return <div className="p-10">Topic not found</div>;

    const DifficultyCard = ({ level, color, locked, solveCount, totalCount, xpPerProblem, reqText, index }: any) => {
        const theme = {
            green: {
                bg: 'bg-white dark:bg-[#1e293b]',
                border: 'border-emerald-500/20',
                iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
                iconColor: 'text-emerald-600 dark:text-emerald-400',
                btn: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20',
                accent: 'text-emerald-600 dark:text-emerald-400'
            },
            yellow: {
                bg: 'bg-white dark:bg-[#1e293b]',
                border: 'border-amber-500/20',
                iconBg: 'bg-amber-100 dark:bg-amber-900/30',
                iconColor: 'text-amber-600 dark:text-amber-400',
                btn: 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20',
                accent: 'text-amber-600 dark:text-amber-400'
            },
            red: {
                bg: 'bg-white dark:bg-[#1e293b]',
                border: 'border-rose-500/20',
                iconBg: 'bg-rose-100 dark:bg-rose-900/30',
                iconColor: 'text-rose-600 dark:text-rose-400',
                btn: 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20',
                accent: 'text-rose-600 dark:text-rose-400'
            }
        }[color as "green" | "yellow" | "red"];

        const levelInfo = LEVELS[level as keyof typeof LEVELS];
        const Icon = levelInfo.icon;

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                    relative overflow-hidden rounded-[2rem] p-8 h-[500px] flex flex-col
                    transition-all duration-300
                    ${locked
                        ? 'bg-gray-50 dark:bg-[#111827] border-2 border-gray-100 dark:border-gray-800 opacity-80'
                        : `${theme.bg} border-2 ${theme.border} shadow-xl shadow-gray-200/50 dark:shadow-none hover:-translate-y-2`
                    }
                `}
            >
                {/* Header */}
                <div className="flex flex-col items-center mb-8">
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-4 ${locked ? 'bg-gray-100 dark:bg-gray-800 text-gray-400' : `${theme.iconBg} ${theme.iconColor}`}`}>
                        <Icon size={40} />
                    </div>
                    <h3 className={`text-2xl font-black ${locked ? 'text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                        {level}
                    </h3>
                    <p className={`text-sm font-bold uppercase tracking-wider mt-2 ${locked ? 'text-gray-400' : theme.accent}`}>
                        {levelInfo.description}
                    </p>
                </div>

                {/* Features List */}
                <div className="flex-1 space-y-4">
                    {levelInfo.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                            {locked ? (
                                <Circle size={18} className="text-gray-300 dark:text-gray-700" />
                            ) : (
                                <CheckCircle2 size={18} className={theme.accent} />
                            )}
                            <span className={`font-medium ${locked ? 'text-gray-400' : 'text-gray-600 dark:text-gray-300'}`}>
                                {feature}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Footer/Action */}
                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Reward</span>
                        <div className={`flex items-center gap-1 font-bold ${locked ? 'text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                            <Zap size={14} className={locked ? 'text-gray-400' : 'text-yellow-500 fill-yellow-500'} />
                            {xpPerProblem} XP
                        </div>
                    </div>

                    {locked ? (
                        <div className="w-full py-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-400 font-bold text-center text-sm flex items-center justify-center">
                            {reqText}
                        </div>
                    ) : (
                        <Link to={`/coding/topic/${topicId}/${level}`}>
                            <button className={`w-full ${theme.btn} py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg`}>
                                Start Coding
                            </button>
                        </Link>
                    )}
                </div>
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0b1220] p-6">
            <div className="max-w-7xl mx-auto py-8">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-6"
                    >
                        <Play size={10} fill="currentColor" />
                        Interactive Arena
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight mb-4"
                    >
                        Practice Coding.<br />
                        <span className="text-blue-600">Playful & Powerful.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Gamified challenges designed to take you from beginner to expert. No setup needed. Just code.
                    </motion.p>
                </div>

                {/* Difficulty Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <DifficultyCard
                        level="Easy"
                        color="green"
                        locked={false}
                        solveCount={solvedEasy}
                        totalCount={15}
                        xpPerProblem={30}
                        index={0}
                    />
                    <DifficultyCard
                        level="Medium"
                        color="yellow"
                        locked={solvedEasy < requiredForMedium}
                        reqText={`Solve ${requiredForMedium - solvedEasy} more Easy problems`}
                        solveCount={solvedMedium}
                        totalCount={15}
                        xpPerProblem={70}
                        index={1}
                    />
                    <DifficultyCard
                        level="Hard"
                        color="red"
                        locked={solvedMedium < requiredForHard}
                        reqText="Requires Master Rank"
                        solveCount={0}
                        totalCount={10}
                        xpPerProblem={150}
                        index={2}
                    />
                </div>
            </div>
        </div>
    );
};

