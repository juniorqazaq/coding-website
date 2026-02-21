import React, { useState } from 'react';
import { Search, Filter, Play, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const MyCourses: React.FC = () => {
    const [filter, setFilter] = useState('Все');

    const myCourses = [
        {
            id: 1,
            title: 'Python Programming Masterclass',
            progress: 35,
            totalLessons: 42,
            completedLessons: 15,
            image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80',
            lastAccessed: '2 часа назад',
            category: 'Backend'
        },
        {
            id: 2,
            title: 'React.js Zero to Hero',
            progress: 12,
            totalLessons: 55,
            completedLessons: 7,
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
            lastAccessed: '1 день назад',
            category: 'Frontend'
        }
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Мое Обучение</h1>
                <p className="text-gray-500 dark:text-gray-400">Продолжите с того места, где остановились</p>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Поиск по курсам..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white"
                    />
                </div>
                <div className="flex gap-2">
                    {['Все', 'В процессе', 'Завершенные'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${filter === tab
                                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {myCourses.map((course) => (
                    <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:shadow-primary-500/5 transition-all group relative"
                    >
                        <Link to={course.title.includes('Python') ? '/course/python' : '#'} className="absolute inset-0 z-10" />

                        <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                            <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-primary-600 transition-colors">
                                    <Play size={20} fill="currentColor" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <span className="px-2.5 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-xs font-bold rounded-lg uppercase tracking-wider">
                                        {course.category}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-gray-400">
                                        <Clock size={12} /> {course.lastAccessed}
                                    </span>
                                </div>
                                <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-primary-600 transition-colors">
                                    {course.title}
                                </h3>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-medium">
                                    <span className="text-gray-500 dark:text-gray-400">{course.completedLessons}/{course.totalLessons} Уроков</span>
                                    <span className="text-gray-900 dark:text-white">{course.progress}%</span>
                                </div>
                                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary-600 rounded-full transition-all duration-1000"
                                        style={{ width: `${course.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            <button className="w-full py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all z-20 relative">
                                Продолжить
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
