import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Bell, Lock, Palette, Globe, Shield, HelpCircle, Moon, Sun, Monitor } from 'lucide-react';

export const Settings: React.FC = () => {
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        courseUpdates: true,
        achievements: true,
    });

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold mb-8">Настройки</h1>

                {/* Settings Sections */}
                <div className="space-y-6">
                    {/* Appearance */}
                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                                <Palette size={20} />
                            </div>
                            <h2 className="text-xl font-bold">Внешний вид</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-3">Тема</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { value: 'light', icon: Sun, label: 'Светлая' },
                                        { value: 'dark', icon: Moon, label: 'Темная' },
                                        { value: 'system', icon: Monitor, label: 'Системная' },
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => setTheme(option.value as any)}
                                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${theme === option.value
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                                }`}
                                        >
                                            <option.icon size={24} />
                                            <span className="text-sm font-medium">{option.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                                <Bell size={20} />
                            </div>
                            <h2 className="text-xl font-bold">Уведомления</h2>
                        </div>

                        <div className="space-y-4">
                            {[
                                { key: 'email', label: 'Email Уведомления', description: 'Получать обновления на почту' },
                                { key: 'push', label: 'Push Уведомления', description: 'Уведомления в браузере' },
                                { key: 'courseUpdates', label: 'Обновления Курсов', description: 'Новые уроки и контент' },
                                { key: 'achievements', label: 'Достижения', description: 'Когда вы получаете бейджи' },
                            ].map((item) => (
                                <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-[#0f1724]">
                                    <div>
                                        <div className="font-medium">{item.label}</div>
                                        <div className="text-sm text-gray-500">{item.description}</div>
                                    </div>
                                    <button
                                        onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof notifications] }))}
                                        className={`relative w-12 h-6 rounded-full transition-colors ${notifications[item.key as keyof typeof notifications]
                                            ? 'bg-blue-600'
                                            : 'bg-gray-300 dark:bg-gray-600'
                                            }`}
                                    >
                                        <div
                                            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : ''
                                                }`}
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Account */}
                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                                <User size={20} />
                            </div>
                            <h2 className="text-xl font-bold">Аккаунт</h2>
                        </div>

                        <div className="space-y-3">
                            <button className="w-full text-left p-4 rounded-xl bg-gray-50 dark:bg-[#0f1724] hover:bg-gray-100 dark:hover:bg-[#0b1220] transition-colors">
                                <div className="font-medium">Изменить Email</div>
                                <div className="text-sm text-gray-500">alikhan@tamasha.dev</div>
                            </button>
                            <button className="w-full text-left p-4 rounded-xl bg-gray-50 dark:bg-[#0f1724] hover:bg-gray-100 dark:hover:bg-[#0b1220] transition-colors">
                                <div className="font-medium">Изменить Пароль</div>
                                <div className="text-sm text-gray-500">Последнее изменение 30 дней назад</div>
                            </button>
                        </div>
                    </div>

                    {/* Privacy & Security */}
                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400">
                                <Shield size={20} />
                            </div>
                            <h2 className="text-xl font-bold">Приватность и Безопасность</h2>
                        </div>

                        <div className="space-y-3">
                            <button className="w-full text-left p-4 rounded-xl bg-gray-50 dark:bg-[#0f1724] hover:bg-gray-100 dark:hover:bg-[#0b1220] transition-colors">
                                <div className="font-medium">Двухфакторная Аутентификация</div>
                                <div className="text-sm text-gray-500">Добавить дополнительный уровень защиты</div>
                            </button>
                            <button className="w-full text-left p-4 rounded-xl bg-gray-50 dark:bg-[#0f1724] hover:bg-gray-100 dark:hover:bg-[#0b1220] transition-colors">
                                <div className="font-medium">Настройки Приватности</div>
                                <div className="text-sm text-gray-500">Контролируйте, кто может видеть ваш профиль</div>
                            </button>
                            <button className="w-full text-left p-4 rounded-xl bg-gray-50 dark:bg-[#0f1724] hover:bg-gray-100 dark:hover:bg-[#0b1220] transition-colors">
                                <div className="font-medium">Экспорт Данных</div>
                                <div className="text-sm text-gray-500">Скачать ваши данные</div>
                            </button>
                        </div>
                    </div>

                    {/* Language & Region */}
                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                                <Globe size={20} />
                            </div>
                            <h2 className="text-xl font-bold">Язык и Регион</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Язык</label>
                                <select className="w-full p-3 rounded-xl bg-gray-50 dark:bg-[#0f1724] border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option>English</option>
                                    <option>Қазақша</option>
                                    <option>Русский</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Часовой пояс</label>
                                <select className="w-full p-3 rounded-xl bg-gray-50 dark:bg-[#0f1724] border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option>GMT+6 (Almaty)</option>
                                    <option>GMT+0 (UTC)</option>
                                    <option>GMT-5 (EST)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 border-2 border-red-200 dark:border-red-900/50">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400">
                                <HelpCircle size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-red-600 dark:text-red-400">Опасная Зона</h2>
                        </div>

                        <div className="space-y-3">
                            <button className="w-full text-left p-4 rounded-xl bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors border border-red-200 dark:border-red-900/50">
                                <div className="font-medium text-red-600 dark:text-red-400">Удалить Аккаунт</div>
                                <div className="text-sm text-red-500 dark:text-red-400/70">Навсегда удалить ваш аккаунт и все данные</div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="mt-8 flex justify-end gap-4">
                    <button className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium">
                        Отмена
                    </button>
                    <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors font-medium shadow-lg shadow-blue-500/30">
                        Сохранить Изменения
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
