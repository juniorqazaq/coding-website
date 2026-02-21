import React from 'react';
import { motion } from 'framer-motion';
import { Check, Lock, Star, Play, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { pythonCourseData } from '../data/python-course-data';

interface LearningMapProps {
    completedLessons: string[]; // Array of lesson IDs
}

export const LearningMap: React.FC<LearningMapProps> = ({ completedLessons }) => {

    // Flatten lessons for linear map visualization, but keep module info
    const allLessons = pythonCourseData.modules.flatMap(module =>
        module.lessons.map(lesson => ({
            ...lesson,
            moduleId: module.id,
            moduleTitle: module.title,
            moduleIcon: module.icon
        }))
    );

    // Find first incomplete lesson to mark as "current"
    const currentLessonIndex = allLessons.findIndex(l => !completedLessons.includes(l.id));
    const activeLessonId = currentLessonIndex === -1 ? allLessons[allLessons.length - 1].id : allLessons[currentLessonIndex].id;

    return (
        <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden relative">

            {/* Header */}
            <div className="flex items-center justify-between mb-12 relative z-10">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-1">
                        <MapPin className="text-blue-500" />
                        Your Journey
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Python Mastery Quest</p>
                </div>
                <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-bold">
                    Level {Math.floor(completedLessons.length / 3) + 1}
                </div>
            </div>

            {/* Map Container */}
            <div className="relative pl-8 md:pl-20 py-4 space-y-12">

                {/* Connecting Line */}
                <div className="absolute left-[2.25rem] md:left-[5.25rem] top-4 bottom-4 w-1 bg-gray-100 dark:bg-gray-700 rounded-full" />

                {/* Progress Line (Animated) */}
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(completedLessons.length / allLessons.length) * 100}%` }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute left-[2.25rem] md:left-[5.25rem] top-4 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full max-h-[calc(100%-2rem)]"
                />

                {allLessons.map((lesson, index) => {
                    const isCompleted = completedLessons.includes(lesson.id);
                    const isCurrent = lesson.id === activeLessonId;
                    const isLocked = !isCompleted && !isCurrent;

                    return (
                        <div key={lesson.id} className={`relative flex items-center gap-6 md:gap-10 group ${isLocked ? 'opacity-60 grayscale' : ''}`}>

                            {/* Node Point on Line */}
                            <div className="absolute left-[2.25rem] md:left-[5.25rem] -translate-x-1/2 flex items-center justify-center z-10 bg-white dark:bg-[#1e293b] rounded-full p-1">
                                <div className={`
                                    w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                                    ${isCompleted ? 'bg-green-500 text-white' : ''}
                                    ${isCurrent ? 'bg-blue-500 text-white ring-4 ring-blue-500/20 scale-110' : ''}
                                    ${isLocked ? 'bg-gray-200 dark:bg-gray-700 text-gray-400' : ''}
                                `}>
                                    {isCompleted ? <Check size={16} strokeWidth={3} /> :
                                        isCurrent ? <Play size={14} fill="currentColor" /> :
                                            <Lock size={14} />}
                                </div>
                            </div>

                            {/* Content Card */}
                            <Link
                                to={isLocked ? '#' : `/course/python-course/lesson/${lesson.id}`}
                                className={`
                                    flex-1 ml-16 md:ml-32 p-5 rounded-2xl border transition-all duration-300 group
                                    ${isCurrent ? 'bg-white dark:bg-gray-800 border-blue-500 shadow-xl shadow-blue-500/10 scale-105' : ''}
                                    ${isCompleted ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700' : 'bg-gray-50 dark:bg-gray-800/20 border-gray-100 dark:border-gray-800'}
                                    ${!isLocked ? 'hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md' : 'cursor-not-allowed'}
                                `}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <span className="text-xs font-bold uppercase tracking-wider text-blue-500 mb-1">
                                        Module {Math.floor(index / 5) + 1}
                                    </span>
                                    {lesson.type === 'quiz' && <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-xs px-2 py-0.5 rounded-full font-bold">Quiz</span>}
                                    {lesson.type === 'exercise' && <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 text-xs px-2 py-0.5 rounded-full font-bold">Code</span>}
                                </div>
                                <h3 className={`font-bold text-lg mb-1 ${isCurrent ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                                    {lesson.title}
                                </h3>
                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                    <span>{lesson.estimatedTime} min</span>
                                    {isCompleted && <span className="text-green-500 font-bold flex items-center gap-1"><Star size={10} fill="currentColor" /> Completed</span>}
                                </div>
                            </Link>

                        </div>
                    );
                })}

                {/* Finish Line */}
                <div className="relative flex items-center gap-6 md:gap-10 opacity-50">
                    <div className="absolute left-[2.25rem] md:left-[5.25rem] -translate-x-1/2 flex items-center justify-center z-10 bg-white dark:bg-[#1e293b] rounded-full p-1">
                        <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-yellow-900 ring-4 ring-yellow-400/20">
                            <Star size={20} fill="currentColor" />
                        </div>
                    </div>
                    <div className="flex-1 ml-16 md:ml-32 p-4">
                        <h3 className="font-bold text-gray-400 uppercase tracking-widest">Certificate of Mastery</h3>
                    </div>
                </div>

            </div>
        </div>
    );
};
