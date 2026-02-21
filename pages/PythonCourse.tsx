import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { pythonCourseData } from '../data/python-course-data';
import { BookOpen, Clock, Award, Code, Database, GitBranch, CheckCircle2, Circle, Lock, Home as LucideHome, Play, ChevronRight, Zap, Target } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
    BookOpen,
    Code,
    Database,
    GitBranch,
};

export default function PythonCourse() {
    const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

    useEffect(() => {
        const saved = localStorage.getItem('python-course-progress');
        if (saved) {
            setCompletedLessons(new Set(JSON.parse(saved)));
        }
    }, []);

    const calculateProgress = (moduleId: string) => {
        const module = pythonCourseData.modules.find(m => m.id === moduleId);
        if (!module) return 0;

        const completed = module.lessons.filter(lesson =>
            completedLessons.has(lesson.id)
        ).length;

        return Math.round((completed / module.lessons.length) * 100);
    };

    const totalProgress = () => {
        const totalLessons = pythonCourseData.modules.reduce(
            (sum, module) => sum + module.lessons.length,
            0
        );
        return Math.round((completedLessons.size / totalLessons) * 100);
    };

    const isModuleLocked = (moduleIndex: number) => {
        if (moduleIndex === 0) return false;
        const prevModule = pythonCourseData.modules[moduleIndex - 1];
        return !prevModule.lessons.every(l => completedLessons.has(l.id));
    };

    const isLessonLocked = (moduleIndex: number, lessonIndex: number) => {
        if (moduleIndex === 0 && lessonIndex === 0) return false;

        const allLessons: { mIndex: number, lId: string }[] = [];
        pythonCourseData.modules.forEach((m, mIdx) => {
            m.lessons.forEach(l => {
                allLessons.push({ mIndex: mIdx, lId: l.id });
            });
        });

        const currentAbsoluteIndex = allLessons.findIndex(item =>
            item.mIndex === moduleIndex && item.lId === pythonCourseData.modules[moduleIndex].lessons[lessonIndex].id
        );

        if (currentAbsoluteIndex <= 0) return false;

        const prevLessonId = allLessons[currentAbsoluteIndex - 1].lId;
        return !completedLessons.has(prevLessonId);
    };

    return (
        <div className="min-h-screen bg-[#070B14] text-slate-200 selection:bg-indigo-500/30 font-sans relative overflow-hidden transition-colors duration-500">
            {/* Ambient Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-blue-600/10 blur-[150px] mix-blend-screen" />
                <div className="absolute top-[30%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[150px] mix-blend-screen" />
                <div className="absolute bottom-[-20%] right-[20%] w-[700px] h-[700px] rounded-full bg-purple-600/10 blur-[150px] mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            </div>

            {/* --- HERO SECTION --- */}
            <div className="relative z-10 pt-16 pb-24 lg:pt-24 lg:pb-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-10 animate-fade-in-up">
                        <Link to="/dashboard" className="hover:text-white transition-colors flex items-center gap-1">
                            <LucideHome size={16} /> Home
                        </Link>
                        <ChevronRight size={14} className="text-slate-600" />
                        <Link to="/my-courses" className="hover:text-white transition-colors">Courses</Link>
                        <ChevronRight size={14} className="text-slate-600" />
                        <span className="text-indigo-400">Python Masterclass</span>
                    </nav>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="animate-fade-in-up flex flex-col items-start" style={{ animationDelay: '0.1s' }}>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-bold tracking-wide uppercase mb-8 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                                <Zap size={16} className="fill-indigo-400" />
                                Best Seller Course
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 animate-gradient-x drop-shadow-sm">Python</span><br />
                                Programming <br />
                                Masterclass
                            </h1>
                            <p className="text-xl text-slate-400 leading-relaxed mb-10 max-w-xl font-light">
                                From zero to hero. Learn professional Python development through building real-world applications, data analysis, and automation scripts.
                            </p>

                            <div className="flex flex-wrap gap-5">
                                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-bold text-lg shadow-[0_0_40px_rgba(79,70,229,0.4)] transition-all transform hover:-translate-y-1 flex items-center gap-3 group border border-white/10 hover:border-white/20">
                                    Start Learning
                                    <Play size={20} className="fill-white group-hover:scale-110 transition-transform" />
                                </button>
                                <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 rounded-2xl font-bold text-lg transition-all flex items-center gap-3 backdrop-blur-md">
                                    Download Syllabus
                                    <BookOpen size={20} className="text-indigo-400" />
                                </button>
                            </div>
                        </div>

                        {/* Hero Visual/Stats */}
                        <div className="relative animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                            {/* Floating Card: Progress */}
                            <div className="absolute -top-10 -right-10 z-20 bg-[#121A2F]/80 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] skew-y-2 transform hover:scale-105 transition-transform duration-500">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="p-3 bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-2xl border border-green-500/20">
                                        <Award className="w-8 h-8 text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">Current Progress</p>
                                        <p className="text-3xl font-black text-white drop-shadow-md">{totalProgress()}%</p>
                                    </div>
                                </div>
                                <div className="h-2 w-56 bg-slate-800 rounded-full overflow-hidden border border-white/5">
                                    <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]" style={{ width: `${totalProgress()}%` }} />
                                </div>
                            </div>

                            {/* Floating Card: Modules */}
                            <div className="absolute bottom-10 -left-12 z-20 bg-[#121A2F]/80 backdrop-blur-2xl border border-white/10 p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] -skew-y-2 transform hover:scale-105 transition-transform duration-500">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-purple-500/20 rounded-2xl border border-purple-500/20">
                                        <Database className="w-8 h-8 text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-black text-white drop-shadow-md">{pythonCourseData.modules.length}</p>
                                        <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">Modules</p>
                                    </div>
                                </div>
                            </div>

                            {/* Main Glass Visual */}
                            <div className="relative z-10 bg-[#121A2F]/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-12 aspect-square flex items-center justify-center shadow-[0_0_80px_rgba(79,70,229,0.15)] group overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpIi8+PC9zdmc+')] [mask-image:linear-gradient(to_bottom_right,white,transparent)]" />
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg"
                                    alt="Python Logo"
                                    className="w-56 h-56 drop-shadow-[0_0_60px_rgba(59,130,246,0.6)] animate-pulse-slow object-contain relative z-10 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-700"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- METRICS BAR --- */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-24 relative z-20">
                <div className="bg-[#121A2F]/60 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
                    {[
                        { label: 'Total Duration', value: '24h 30m', icon: Clock, color: 'text-blue-400', bg: 'bg-blue-400/10' },
                        { label: 'Skill Level', value: 'Beginner', icon: Target, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
                        { label: 'Lessons', value: '142', icon: BookOpen, color: 'text-purple-400', bg: 'bg-purple-400/10' },
                        { label: 'Certificate', value: 'Included', icon: Award, color: 'text-amber-400', bg: 'bg-amber-400/10' },
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col items-center text-center transform hover:-translate-y-1 transition-transform">
                            <div className={`p-4 rounded-2xl ${stat.bg} mb-4 border border-white/5 shadow-inner`}>
                                <stat.icon size={28} className={`${stat.color}`} />
                            </div>
                            <p className="text-xl font-black text-white mb-1 tracking-tight">{stat.value}</p>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- COURSE CONTENT --- */}
            <div className="max-w-5xl mx-auto px-6 pb-32 relative z-20">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                    <div>
                        <h2 className="text-4xl font-black text-white mb-2 tracking-tight">Course Syllabus</h2>
                        <p className="text-slate-400 text-lg rounded-full">Your journey from beginner to Python mastery</p>
                    </div>
                    <div className="px-5 py-2.5 bg-[#121A2F] border border-white/10 rounded-full flex items-center gap-3 backdrop-blur-md">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        <span className="text-sm font-bold text-slate-300">
                            <span className="text-white">{completedLessons.size}</span> / {pythonCourseData.totalLessons} Lessons
                        </span>
                    </div>
                </div>

                <div className="space-y-8 relative">
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-[2.25rem] top-8 bottom-8 w-px bg-gradient-to-b from-indigo-500/50 via-purple-500/20 to-transparent hidden md:block" />

                    {pythonCourseData.modules.map((module, moduleIndex) => {
                        const Icon = iconMap[module.icon] || BookOpen;
                        const progress = calculateProgress(module.id);
                        const locked = isModuleLocked(moduleIndex);

                        return (
                            <div
                                key={module.id}
                                className={`relative group rounded-[2rem] border transition-all duration-500 overflow-hidden
                                ${locked
                                        ? 'bg-[#0f1524]/60 border-white/5 opacity-80 backdrop-blur-sm'
                                        : 'bg-[#121A2F]/80 backdrop-blur-xl border-white/10 shadow-2xl hover:border-indigo-500/30'
                                    }`}
                            >
                                {/* Glowing Top Edge */}
                                {!locked && (
                                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5">
                                        <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)] transition-all duration-1000" style={{ width: `${progress}%` }} />
                                    </div>
                                )}

                                <div className="p-8 lg:p-10">
                                    <div className="flex flex-col md:flex-row items-start gap-8 z-10 relative">
                                        {/* Icon Container */}
                                        <div className={`p-5 rounded-3xl flex-shrink-0 transition-all border
                                            ${locked
                                                ? 'bg-[#1A2234] border-white/5 text-slate-500'
                                                : 'bg-gradient-to-br from-[#1E293B] to-[#0F172A] border-indigo-500/20 text-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.15)] group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(99,102,241,0.3)] duration-500'
                                            }`}>
                                            {locked ? <Lock size={32} /> : <Icon size={32} />}
                                        </div>

                                        <div className="flex-1 w-full">
                                            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                                                <div>
                                                    <p className="text-sm font-black text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                        <span className="w-8 h-px bg-indigo-500/50 block" />
                                                        Module {moduleIndex + 1}
                                                    </p>
                                                    <h3 className={`text-3xl font-black tracking-tight ${locked ? 'text-slate-500' : 'text-white'}`}>
                                                        {module.title}
                                                    </h3>
                                                </div>
                                                {!locked && (
                                                    <div className="text-right bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                                                        <span className="text-2xl font-black text-white">{progress}%</span>
                                                        <span className="text-xs text-slate-400 font-bold ml-1">DONE</span>
                                                    </div>
                                                )}
                                            </div>

                                            <p className={`text-lg leading-relaxed mb-8 max-w-3xl ${locked ? 'text-slate-600' : 'text-slate-400 font-light'}`}>
                                                {module.description}
                                            </p>

                                            {/* Lesson Grid */}
                                            <div className="grid lg:grid-cols-2 gap-4">
                                                {module.lessons.map((lesson, lessonIndex) => {
                                                    const isCompleted = completedLessons.has(lesson.id);
                                                    const isLockedLesson = isLessonLocked(moduleIndex, lessonIndex);
                                                    const LessonWrapper = isLockedLesson ? 'div' : Link;

                                                    return (
                                                        <LessonWrapper
                                                            key={lesson.id}
                                                            to={!isLockedLesson ? `/course/python/module/${module.id}/lesson/${lesson.id}` : undefined}
                                                            className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300
                                                            ${isLockedLesson
                                                                    ? 'border-transparent bg-white/[0.02] cursor-not-allowed'
                                                                    : 'border-white/5 hover:border-indigo-500/30 hover:bg-white/[0.04] cursor-pointer bg-white/[0.03] group/lesson shadow-lg shadow-black/20'
                                                                }`}
                                                        >
                                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all shadow-inner
                                                                ${isCompleted
                                                                    ? 'bg-gradient-to-br from-green-400 to-emerald-600 text-white shadow-[0_0_15px_rgba(52,211,153,0.4)] border border-green-400/50'
                                                                    : isLockedLesson
                                                                        ? 'bg-[#1A2234] text-slate-600 border border-white/5'
                                                                        : 'bg-[#1E293B] text-slate-400 border border-white/10 group-hover/lesson:border-indigo-500/50 group-hover/lesson:text-indigo-300'
                                                                }`}>
                                                                {isCompleted ? <CheckCircle2 size={18} /> : lessonIndex + 1}
                                                            </div>

                                                            <div className="flex-1 min-w-0">
                                                                <p className={`font-bold truncate text-[15px] ${isLockedLesson ? 'text-slate-600' : 'text-slate-200 group-hover/lesson:text-white transition-colors'}`}>
                                                                    {lesson.title}
                                                                </p>
                                                            </div>

                                                            {!isLockedLesson && (
                                                                <div className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest border
                                                                    ${lesson.type === 'theory' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                                                        lesson.type === 'quiz' ? 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20' :
                                                                            'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                                                                    {lesson.type}
                                                                </div>
                                                            )}
                                                        </LessonWrapper>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
