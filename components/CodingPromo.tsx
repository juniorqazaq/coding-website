import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Zap, Swords, Skull, ArrowRight,
    Flame, Star, Heart, Play, Code2, Terminal, Cpu, CheckCircle2,
    Maximize2, Minus, X
} from 'lucide-react';

const CodingPromo: React.FC = () => {
    const [activeLevel, setActiveLevel] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');

    const content = {
        Easy: {
            title: "Начало Пути",
            description: "Освойте основы. Идеально для новичков, чтобы понять логику и синтаксис.",
            color: "text-emerald-500",
            bg: "bg-emerald-50",
            border: "border-emerald-500",
            btn: "bg-emerald-500 shadow-emerald-200",
            code: `def solve_easy(input):\n    # Простая проверка логики\n    if input > 10:\n        return True\n    return False\n\nprint(solve_easy(5))`,
            stats: [
                { label: "Награда", value: "30 XP", icon: Zap, color: "text-yellow-500" },
                { label: "Время", value: "5 мин", icon: Star, color: "text-blue-500" }
            ],
            tags: ["Переменные", "If/Else", "Циклы"]
        },
        Medium: {
            title: "Прокачка",
            description: "Бросьте вызов алгоритмам и оптимизации данных.",
            color: "text-amber-500",
            bg: "bg-amber-50",
            border: "border-amber-500",
            btn: "bg-amber-500 shadow-amber-200",
            code: `function binarySearch(arr, x) {\n    let start = 0, end = arr.length - 1;\n    while (start <= end) {\n        let mid = Math.floor((start + end) / 2);\n        if (arr[mid] === x) return true;\n        else if (arr[mid] < x) start = mid + 1;\n        else end = mid - 1;\n    }\n    return false;\n}`,
            stats: [
                { label: "Награда", value: "70 XP", icon: Zap, color: "text-yellow-500" },
                { label: "Время", value: "15 мин", icon: Star, color: "text-blue-500" }
            ],
            tags: ["Массивы", "Поиск", "O(log n)"]
        },
        Hard: {
            title: "Мастер-Класс",
            description: "Сложные задачи по системному дизайну и спортивному программированию.",
            color: "text-rose-500",
            bg: "bg-rose-50",
            border: "border-rose-500",
            btn: "bg-rose-500 shadow-rose-200",
            code: `// System Design: Load Balancer\nclass LoadBalancer {\n    private servers: string[];\n\n    addServer(serverUrl: string) {\n        this.servers.push(serverUrl);\n    }\n\n    getNextServer(): string {\n        // Round Robin implementation\n        const server = this.servers.shift();\n        this.servers.push(server!);\n        return server!;\n    }\n}`,
            stats: [
                { label: "Награда", value: "150 XP", icon: Zap, color: "text-yellow-500" },
                { label: "Время", value: "30+ мин", icon: Star, color: "text-blue-500" }
            ],
            tags: ["Архитектура", "Классы", "Scale"]
        }
    };

    const activeContent = content[activeLevel];

    return (
        <section className="py-24 bg-gray-50/50 relative overflow-hidden font-sans">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[100px] pointer-events-none -ml-20 -mb-20" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* 1. Typography Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100/50 text-blue-600 font-bold text-xs uppercase tracking-widest mb-6 shadow-sm"
                    >
                        <Code2 size={12} strokeWidth={3} /> Опыт Разработчика
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#111827] mb-6 tracking-tight leading-tight">
                        Создано для <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Создателей.</span><br />
                        Мастерство доступно каждому.
                    </h2>

                    <p className="text-xl text-gray-500 leading-relaxed">
                        От "Hello World" до Системной Архитектуры. <br className="hidden md:block" />
                        Почувствуйте самую интуитивную среду обучения.
                    </p>
                </div>

                {/* 2. Interactive Split Layout */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center mb-32">

                    {/* Left Column: Navigation / Tabs */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-4">
                        {(['Easy', 'Medium', 'Hard'] as const).map((level) => {
                            const isActive = activeLevel === level;
                            const data = content[level];
                            return (
                                <motion.button
                                    key={level}
                                    onClick={() => setActiveLevel(level)}
                                    whileHover={{ scale: 1.02, x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`
                                        group text-left p-6 rounded-3xl border-2 transition-all duration-300 relative overflow-hidden
                                        ${isActive ? `bg-white border-blue-500 shadow-xl shadow-blue-500/10` : 'bg-white/50 border-transparent hover:bg-white hover:shadow-lg hover:border-blue-100'}
                                    `}
                                >
                                    {isActive && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500" />
                                    )}

                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className={`text-xl font-bold ${isActive ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-700'}`}>
                                            {data.title}
                                        </h3>
                                        {isActive && <ArrowRight size={20} className="text-blue-500" />}
                                    </div>
                                    <p className={`text-sm font-medium ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
                                        {data.description.split('.')[0]}.
                                    </p>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Right Column: The Mock IDE Showcase */}
                    <div className="w-full lg:w-2/3 perspective-1000">
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={activeLevel}
                                initial={{ opacity: 0, rotateX: 10, y: 20 }}
                                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                                exit={{ opacity: 0, rotateX: -10, y: -20 }}
                                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                className="bg-[#0f172a] rounded-3xl shadow-2xl shadow-blue-900/30 overflow-hidden border border-gray-700/50"
                            >
                                {/* IDE Header */}
                                <div className="bg-[#1e293b]/50 p-4 flex items-center justify-between border-b border-gray-700/50 backdrop-blur-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                                        </div>
                                        <span className="ml-4 text-xs font-mono text-gray-500">problem_solver.ts</span>
                                    </div>
                                    <div className="flex gap-3 text-gray-600">
                                        <Minus size={14} />
                                        <Maximize2 size={14} />
                                        <X size={14} />
                                    </div>
                                </div>

                                {/* IDE Body */}
                                <div className="p-8 grid md:grid-cols-5 gap-8">
                                    {/* Code Area */}
                                    <div className="md:col-span-3 font-mono text-sm leading-relaxed">
                                        <div className="text-gray-500 mb-2">// {activeContent.description}</div>
                                        <pre className="whitespace-pre-wrap">
                                            <code className="text-blue-300">
                                                {activeContent.code}
                                            </code>
                                        </pre>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mt-8">
                                            {activeContent.tags.map(tag => (
                                                <span key={tag} className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Stats Sidebar inside IDE */}
                                    <div className="md:col-span-2 flex flex-col gap-4 border-l border-gray-700/50 pl-8">
                                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Характеристики</div>
                                        {activeContent.stats.map((stat, i) => (
                                            <div key={i} className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <stat.icon size={14} className={stat.color} fill="currentColor" />
                                                    <span className="text-gray-400 text-xs font-bold">{stat.label}</span>
                                                </div>
                                                <div className="text-xl font-bold text-white">{stat.value}</div>
                                            </div>
                                        ))}

                                        <Link to="/coding" className="mt-auto">
                                            <button className={`w-full py-3 rounded-xl font-bold text-white text-sm shadow-lg transition-all active:scale-95 ${activeContent.btn}`}>
                                                Принять Вызов
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>



            </div>
        </section>
    );
};

export default CodingPromo;
