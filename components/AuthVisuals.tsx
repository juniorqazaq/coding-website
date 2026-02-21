import React from 'react';
import { motion } from 'framer-motion';
import {
    Terminal, Database, Code2, Cpu,
    Activity, ChevronRight, Circle,
    GitBranch, Star, Trophy, Users
} from 'lucide-react';

export const AuthVisuals: React.FC = () => {
    return (
        <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center">

            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px] pointer-events-none" />

            {/* Main Mock IDE Window */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full bg-[#0f172a] rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden"
            >
                {/* IDE Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#1e293b] border-b border-gray-700/50">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                        </div>
                        <div className="ml-4 flex items-center gap-2 text-xs text-blue-300 bg-blue-900/30 px-2 py-1 rounded border border-blue-500/20">
                            <Code2 size={12} />
                            <span>algorithm.ts</span>
                        </div>
                    </div>
                </div>

                {/* IDE Content */}
                <div className="p-6 font-mono text-xs md:text-sm leading-relaxed overflow-hidden">
                    <div className="flex">
                        <div className="flex-none w-8 text-gray-600 select-none text-right pr-4 border-r border-gray-800">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <div key={i}>{i}</div>)}
                        </div>
                        <div className="pl-4 text-blue-100">
                            <div><span className="text-purple-400">interface</span> <span className="text-yellow-300">UserProgress</span> {'{'}</div>
                            <div className="pl-4">rank: <span className="text-blue-300">string</span>;</div>
                            <div className="pl-4">solved: <span className="text-blue-300">number</span>;</div>
                            <div className="pl-4">streak: <span className="text-blue-300">number</span>;</div>
                            <div>{'}'}</div>
                            <br />
                            <div><span className="text-purple-400">const</span> <span className="text-blue-400">levelUp</span> = (xp) <span className="text-purple-400">=&gt;</span> {'{'}</div>
                            <div className="pl-4"><span className="text-purple-400">if</span> (xp &gt; <span className="text-orange-300">1000</span>) {'{'}</div>
                            <div className="pl-8"><span className="text-purple-400">return</span> <span className="text-green-300">"Master"</span>;</div>
                            <div className="pl-4">{'}'}</div>
                            <div>{'}'}</div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Floating Stats Card (Top Right) */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -right-8 -top-8 bg-[#1e293b]/90 backdrop-blur-xl border border-gray-700/50 p-4 rounded-xl shadow-2xl z-20 w-48"
            >
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-gray-400 uppercase">Лучшие Решатели</span>
                    <Trophy size={14} className="text-yellow-500" />
                </div>
                <div className="space-y-3">
                    {[
                        { name: "Alex K.", points: "2,450", color: "bg-blue-500" },
                        { name: "Sarah J.", points: "2,100", color: "bg-purple-500" },
                        { name: "Mike R.", points: "1,890", color: "bg-cyan-500" },
                    ].map((user, i) => (
                        <div key={i} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${user.color}`} />
                                <span className="text-gray-300">{user.name}</span>
                            </div>
                            <span className="font-mono text-blue-200">{user.points}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Floating Activity Graph (Bottom Left) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute -left-8 -bottom-4 bg-[#1e293b]/90 backdrop-blur-xl border border-gray-700/50 p-4 rounded-xl shadow-2xl z-20"
            >
                <div className="flex items-center gap-2 mb-3">
                    <Activity size={16} className="text-emerald-400" />
                    <span className="text-xs font-bold text-gray-300">Серия Активности</span>
                </div>
                <div className="flex gap-1">
                    {[...Array(7)].map((_, i) => (
                        <div key={i} className="flex flex-col gap-1">
                            {[...Array(5)].map((_, j) => (
                                <motion.div
                                    key={`${i}-${j}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 + (i * 0.1) + (j * 0.05) }}
                                    className={`w-3 h-3 rounded-sm ${Math.random() > 0.6 ? 'bg-emerald-500' :
                                        Math.random() > 0.3 ? 'bg-emerald-500/50' : 'bg-gray-700'
                                        }`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
                <div className="mt-2 text-[10px] text-emerald-400 font-bold text-right">
                    +124% на этой неделе
                </div>
            </motion.div>

        </div>
    );
};
