import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { Search, MonitorPlay, Users, Settings as SettingsIcon, LogOut, Moon, LayoutDashboard, User, Trophy, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CommandPalette: React.FC = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { logout } = useAuthStore();

    // Toggle theme manually (mock implementation for toggle)
    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
        setOpen(false);
    };

    const handleLogout = () => {
        logout();
        setOpen(false);
        navigate('/');
    };

    const runCommand = (command: () => void) => {
        setOpen(false);
        command();
    };

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[200] flex items-start justify-center pt-32 px-4 shadow-red-500">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-gray-900/50 dark:bg-black/60 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="relative w-full max-w-xl mx-auto rounded-xl overflow-hidden bg-white dark:bg-[#1e293b] shadow-2xl border border-gray-200 dark:border-gray-800"
                    >
                        <Command className="w-full h-full flex flex-col text-slate-700 dark:text-slate-300">
                            <div className="flex items-center border-b border-gray-100 dark:border-gray-800 px-4" cmdk-input-wrapper="">
                                <Search className="w-5 h-5 text-slate-500 shrink-0 mr-2" />
                                <Command.Input
                                    autoFocus
                                    className="flex h-14 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50 text-slate-900 dark:text-white"
                                    placeholder="Что хотите найти?"
                                />
                                <div className="text-xs font-mono text-slate-400 border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 rounded">ESC</div>
                            </div>

                            <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-hide">
                                <Command.Empty className="py-6 text-center text-sm">Ничего не найдено.</Command.Empty>

                                <Command.Group heading="Страницы" className="px-2 py-1.5 text-xs font-medium text-slate-500 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-2.5 [&_[cmdk-item]]:my-1 [&_[cmdk-item]]:rounded-md [&_[cmdk-item]]:flex [&_[cmdk-item]]:items-center [&_[cmdk-item]]:gap-2 [&_[cmdk-item]]:cursor-pointer [&_[cmdk-item]]:text-sm aria-selected:bg-slate-100 dark:aria-selected:bg-slate-800">
                                    <Command.Item onSelect={() => runCommand(() => navigate('/dashboard'))} className="hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                        <LayoutDashboard className="w-4 h-4 text-slate-400" />
                                        <span>Дашборд</span>
                                    </Command.Item>
                                    <Command.Item onSelect={() => runCommand(() => navigate('/my-courses'))} className="hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                        <BookOpen className="w-4 h-4 text-slate-400" />
                                        <span>Мои курсы</span>
                                    </Command.Item>
                                    <Command.Item onSelect={() => runCommand(() => navigate('/profile'))} className="hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                        <User className="w-4 h-4 text-slate-400" />
                                        <span>Профиль</span>
                                    </Command.Item>
                                    <Command.Item onSelect={() => runCommand(() => navigate('/coding'))} className="hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                        <MonitorPlay className="w-4 h-4 text-slate-400" />
                                        <span>Арена</span>
                                    </Command.Item>
                                    <Command.Item onSelect={() => runCommand(() => navigate('/settings'))} className="hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                        <SettingsIcon className="w-4 h-4 text-slate-400" />
                                        <span>Настройки</span>
                                    </Command.Item>
                                    <Command.Item onSelect={() => runCommand(() => navigate('/leaderboard'))} className="hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                        <Trophy className="w-4 h-4 text-slate-400" />
                                        <span>Лидерборд</span>
                                    </Command.Item>
                                </Command.Group>

                                <Command.Group heading="Курсы" className="px-2 py-1.5 text-xs font-medium text-slate-500 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-2.5 [&_[cmdk-item]]:my-1 [&_[cmdk-item]]:rounded-md [&_[cmdk-item]]:flex [&_[cmdk-item]]:items-center [&_[cmdk-item]]:gap-2 [&_[cmdk-item]]:cursor-pointer [&_[cmdk-item]]:text-sm aria-selected:bg-slate-100 dark:aria-selected:bg-slate-800">
                                    <Command.Item onSelect={() => runCommand(() => navigate('/course/python'))} className="hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                        <BookOpen className="w-4 h-4 text-slate-400" />
                                        <span>Python для начинающих</span>
                                    </Command.Item>
                                </Command.Group>

                                <Command.Group heading="Действия" className="px-2 py-1.5 text-xs font-medium text-slate-500 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-2.5 [&_[cmdk-item]]:my-1 [&_[cmdk-item]]:rounded-md [&_[cmdk-item]]:flex [&_[cmdk-item]]:items-center [&_[cmdk-item]]:gap-2 [&_[cmdk-item]]:cursor-pointer [&_[cmdk-item]]:text-sm aria-selected:bg-slate-100 dark:aria-selected:bg-slate-800">
                                    <Command.Item onSelect={() => runCommand(toggleTheme)} className="hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                        <Moon className="w-4 h-4 text-slate-400" />
                                        <span>Сменить тему</span>
                                    </Command.Item>
                                    <Command.Item onSelect={() => runCommand(handleLogout)} className="hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                        <LogOut className="w-4 h-4 text-red-400" />
                                        <span className="text-red-500 dark:text-red-400">Выйти из аккаунта</span>
                                    </Command.Item>
                                </Command.Group>
                            </Command.List>
                        </Command>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
