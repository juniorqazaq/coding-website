import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MOCK_USER } from '../types';
import { Camera, Mail, Calendar, MapPin, Award, BookOpen, Clock, Target, Edit2, Save, X, Share2, Check, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useAchievementStore } from '../stores/useAchievementStore';
import { StreakCalendar } from '../components/StreakCalendar';
import { ProfileSkeleton } from '../components/skeletons/ProfileSkeleton';
import * as LucideIcons from 'lucide-react';

export const Profile: React.FC = () => {
    const { xp, level, streak, totalSolved } = useUserStore();
    const { user } = useAuthStore();
    const { achievements } = useAchievementStore();
    const displayUser = user || MOCK_USER;

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(displayUser.name);
    const [bio, setBio] = useState("Увлеченный ученик, исследующий мир веб-разработки");
    const [location, setLocation] = useState("Алматы, Казахстан");
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const handleCopyLink = () => {
        const profileSlug = displayUser.name.toLowerCase().replace(/\s+/g, '-');
        navigator.clipboard.writeText(`${window.location.origin}/profile/${profileSlug}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500, 5500, 6600, 8000, 10000];
    const currentLevelXP = LEVEL_THRESHOLDS[level - 1] || 0;
    const nextLevelXP = LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
    const progressXP = xp - currentLevelXP;
    const requiredXP = nextLevelXP - currentLevelXP;
    const progressPercent = Math.min(100, Math.max(0, (progressXP / requiredXP) * 100));

    const handleSave = () => {
        setIsEditing(false);
        // Here you would save to backend
    };

    if (loading) return <ProfileSkeleton />;

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Profile Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#1e293b] rounded-3xl p-8 mb-8 border border-gray-200 dark:border-gray-700 shadow-sm"
            >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Avatar Section */}
                    <div className="relative group">
                        <img
                            src={displayUser.avatar}
                            alt={displayUser.name}
                            className="w-32 h-32 rounded-full border-4 border-blue-500"
                        />
                        <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera size={18} />
                        </button>
                    </div>

                    {/* Info Section */}
                    <div className="flex-grow">
                        {isEditing ? (
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="text-3xl font-bold bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    className="w-full bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={2}
                                />
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        ) : (
                            <>
                                <h1 className="text-3xl font-bold mb-2">{name}</h1>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">{bio}</p>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} />
                                        <span>{location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} />
                                        <span>На платформе с Декабря 2024</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail size={16} />
                                        <span>alikhan@tamasha.dev</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Edit Button */}
                    <div className="flex gap-2">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <Save size={18} />
                                    Сохранить
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                >
                                    <X size={18} />
                                    Отмена
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            >
                                <Edit2 size={18} />
                                Редактировать
                            </button>
                        )}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{level}</div>
                        <div className="text-sm text-gray-500">Уровень</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{xp.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">Всего XP</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{streak}</div>
                        <div className="text-sm text-gray-500">Дней подряд</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalSolved}</div>
                        <div className="text-sm text-gray-500">Задач решено</div>
                    </div>
                </div>

                {/* Level Progress */}
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-end mb-2">
                        <div>
                            <span className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Прогресс Уровня</span>
                            <h4 className="font-bold text-lg mt-1">До {level + 1} Уровня осталось {requiredXP - progressXP} XP</h4>
                        </div>
                        <span className="text-sm text-gray-500 font-medium">{xp} / {nextLevelXP} XP</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 h-3 rounded-full overflow-hidden shadow-inner">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                        />
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <button
                        onClick={handleCopyLink}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors font-medium ${copied ? 'bg-green-50 text-green-600 border border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'}`}
                    >
                        {copied ? <Check size={18} /> : <Share2 size={18} />}
                        {copied ? 'Скопировано!' : 'Поделиться профилем'}
                    </button>
                </div>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Streak Calendar */}
                    <StreakCalendar />

                    {/* Learning Activity */}
                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-bold mb-6">Недавняя Активность</h3>
                        <div className="space-y-4">
                            {[
                                { icon: BookOpen, title: "Завершен React Fundamentals - Урок 2", time: "2 часа назад", color: "text-blue-500 bg-blue-500/10" },
                                { icon: Award, title: "Получено достижение 'Охотник на Баги'", time: "1 день назад", color: "text-yellow-500 bg-yellow-500/10" },
                                { icon: Target, title: "Начат курс TypeScript Mastery", time: "3 дня назад", color: "text-green-500 bg-green-500/10" },
                                { icon: Clock, title: "Удержан стрик 5 дней", time: "5 дней назад", color: "text-blue-500 bg-blue-500/10" },
                            ].map((activity, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-[#0f1724] hover:bg-gray-100 dark:hover:bg-[#0b1220] transition-colors">
                                    <div className={`p-2 rounded-lg ${activity.color}`}>
                                        <activity.icon size={20} />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-medium">{activity.title}</p>
                                        <p className="text-sm text-gray-500">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Courses in Progress */}
                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">Текущие Курсы</h3>
                            <Link to="/courses" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Все</Link>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0f1724] hover:bg-gray-100 dark:hover:bg-[#0b1220] transition-colors cursor-pointer">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h4 className="font-semibold">React Fundamentals</h4>
                                        <p className="text-sm text-gray-500">Пройдено 5 из 12 уроков</p>
                                    </div>
                                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold rounded">Новичок</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    {/* Achievements */}
                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold">Мои достижения</h3>
                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2.5 py-1 rounded-lg">
                                {achievements.filter(a => a.unlockedAt).length} / {achievements.length}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {achievements.map((ach) => {
                                const isUnlocked = !!ach.unlockedAt;
                                const IconComponent = (LucideIcons as any)[ach.iconName] || LucideIcons.Award;

                                return (
                                    <div
                                        key={ach.id}
                                        className={`aspect-square flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all relative group overflow-hidden ${isUnlocked
                                            ? 'border-blue-500/30 bg-blue-50/50 dark:bg-blue-900/10 hover:border-blue-500 dark:border-blue-500/30'
                                            : 'border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50'
                                            }`}
                                    >
                                        {!isUnlocked && (
                                            <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-[1px] z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Lock size={20} className="text-gray-500" />
                                            </div>
                                        )}
                                        <div className={`p-2 rounded-xl mb-2 ${isUnlocked ? ach.colorClass : 'bg-gray-200 dark:bg-gray-700 text-gray-400'}`}>
                                            <IconComponent size={24} />
                                        </div>
                                        <div className={`text-[10px] text-center font-bold leading-tight ${isUnlocked ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                                            {ach.name}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-bold mb-6">Скиллы</h3>
                        <div className="space-y-4">
                            {[
                                { name: "React", level: 75 },
                                { name: "JavaScript", level: 85 },
                                { name: "TypeScript", level: 45 },
                                { name: "CSS", level: 70 },
                            ].map((skill, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="font-medium">{skill.name}</span>
                                        <span className="text-gray-500">{skill.level}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
                                            style={{ width: `${skill.level}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
