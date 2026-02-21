import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MOCK_USER } from '../types';
import { Camera, Mail, Calendar, MapPin, Award, BookOpen, Clock, Target, Edit2, Save, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Profile: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(MOCK_USER.name);
    const [bio, setBio] = useState("Увлеченный ученик, исследующий мир веб-разработки");
    const [location, setLocation] = useState("Алматы, Казахстан");

    const handleSave = () => {
        setIsEditing(false);
        // Here you would save to backend
    };

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
                            src={MOCK_USER.avatar}
                            alt={MOCK_USER.name}
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
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{MOCK_USER.level}</div>
                        <div className="text-sm text-gray-500">Уровень</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{MOCK_USER.xp.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">Всего XP</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{MOCK_USER.streak}</div>
                        <div className="text-sm text-gray-500">Дней подряд</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">24</div>
                        <div className="text-sm text-gray-500">Завершено</div>
                    </div>
                </div>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
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
                        <h3 className="text-xl font-bold mb-6">Достижения</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { icon: "🏆", name: "Первый Код", unlocked: true },
                                { icon: "🐛", name: "Охотник на Баги", unlocked: true },
                                { icon: "🌙", name: "Сова", unlocked: true },
                                { icon: "🔥", name: "Огонь", unlocked: false },
                                { icon: "⭐", name: "Звезда", unlocked: false },
                                { icon: "🎯", name: "Перфекционист", unlocked: false },
                            ].map((ach, i) => (
                                <div
                                    key={i}
                                    className={`aspect-square flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${ach.unlocked
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                        : 'border-gray-200 dark:border-gray-700 opacity-40 grayscale'
                                        }`}
                                >
                                    <div className="text-3xl mb-1">{ach.icon}</div>
                                    <div className="text-xs text-center font-medium">{ach.name}</div>
                                </div>
                            ))}
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
