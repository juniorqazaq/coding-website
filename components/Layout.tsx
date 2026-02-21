import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';
import { useAuthStore } from '../stores/useAuthStore';
import { MOCK_USER } from '../types';
import {
  LayoutDashboard,
  BookOpen,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  GraduationCap,
  HelpCircle,
  Bell,
  ChevronLeft,
  ChevronRight,
  Gamepad2
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Logo } from './Logo';
import { motion, AnimatePresence } from 'framer-motion';
import { CommandPalette } from './CommandPalette';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { xp, level, username } = useUserStore();
  const { profile, logout } = useAuthStore();

  // Use profile data; fall back to MOCK_USER for display
  const displayName = profile?.username ?? username ?? MOCK_USER.name;
  const displayAvatar = MOCK_USER.avatar; // avatar from profile in future

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile Menu
  const [isCollapsed, setIsCollapsed] = useState(false); // Desktop Collapsible
  const location = useLocation();

  const mainMenu = [
    { name: 'Дашборд', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Мои Курсы', href: '/my-courses', icon: BookOpen },
    { name: 'Кодинг', href: '/coding', icon: Gamepad2 },
    { name: 'Профиль', href: '/profile', icon: User },
  ];

  const settingsMenu = [
    { name: 'Настройки', href: '/settings', icon: Settings },
    { name: 'Уведомления', href: '/notifications', icon: Bell },
  ];

  const isActive = (path: string) => location.pathname === path;

  const NavItem = ({ item }: { item: { name: string, href: string, icon: any } }) => {
    const Icon = item.icon;
    const active = isActive(item.href);
    return (
      <Link
        to={item.href}
        onClick={() => setIsSidebarOpen(false)}
        className={`
          flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 font-medium text-sm group relative
          ${active
            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'}
          ${isCollapsed ? 'justify-center' : ''}
        `}
      >
        <Icon size={22} className="shrink-0" />

        {!isCollapsed && (
          <span className="whitespace-nowrap overflow-hidden transition-all duration-300 origin-left">
            {item.name}
          </span>
        )}

        {/* Tooltip for collapsed mode */}
        {isCollapsed && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap pointer-events-none">
            {item.name}
          </div>
        )}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b1220] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <CommandPalette />
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-[#1f2937] border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-white">
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white">
            <GraduationCap size={20} />
          </div>
          Tamasha
        </Link>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-gray-600 dark:text-gray-300">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-40 bg-white dark:bg-[#1f2937] border-r border-gray-200 dark:border-gray-800 transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static flex flex-col justify-between
            ${isSidebarOpen ? 'translate-x-0 w-[280px]' : '-translate-x-full lg:translate-x-0'}
            ${isCollapsed ? 'lg:w-[80px]' : 'lg:w-[280px]'}
          `}
        >
          <div className="h-full flex flex-col overflow-y-auto custom-scrollbar overflow-x-hidden">
            {/* Header Section */}
            <div className={`p-6 pb-2 transition-all duration-300 ${isCollapsed ? 'items-center' : ''} flex flex-col`}>

              {/* Collapse Toggle (Desktop Only) */}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:flex items-center justify-start w-full p-1 mb-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              </button>

              {/* Brand */}
              <Link to="/dashboard" className={`flex items-center gap-3 mb-4 ${isCollapsed ? 'justify-center' : ''}`}>
                <Logo size="md" />
                {!isCollapsed && (
                  <span className="text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">Tamasha</span>
                )}
              </Link>

              {/* User Stats Mini-Card */}
              {!isCollapsed ? (
                <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl flex items-center gap-3 border border-gray-100 dark:border-gray-700">
                  <img src={displayAvatar} className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-600" alt="avatar" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold truncate dark:text-gray-200">{displayName}</div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-bold tracking-wide mt-0.5">Ур. {level} • {xp.toLocaleString()} XP</div>
                  </div>
                </div>
              ) : (
                <div className="mb-4 flex justify-center group relative">
                  <Link to="/profile">
                    <img
                      src={displayAvatar}
                      className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-400 transition-all hover:scale-105"
                      alt="avatar"
                    />
                  </Link>
                  {/* Tooltip */}
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap pointer-events-none">
                    {displayName}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Sections */}
            <div className="px-3 space-y-4 mt-2">
              {/* Main Menu */}
              <div>
                {!isCollapsed && <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3 whitespace-nowrap">Главное Меню</div>}
                {isCollapsed && <div className="h-px bg-gray-200 dark:bg-gray-800 my-4 mx-2"></div>}
                <div className="space-y-1">
                  {mainMenu.map((item) => (
                    <NavItem key={item.name} item={item} />
                  ))}
                </div>
              </div>

              {/* Settings */}
              <div>
                {!isCollapsed && <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3 whitespace-nowrap">Настройки</div>}
                {isCollapsed && <div className="h-px bg-gray-200 dark:bg-gray-800 my-4 mx-2"></div>}
                <div className="space-y-1">
                  {settingsMenu.map((item) => (
                    <NavItem key={item.name} item={item} />
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-auto p-4 space-y-1 mb-4">
              <button className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all text-sm font-medium ${isCollapsed ? 'justify-center' : ''}`}>
                <HelpCircle size={20} className="shrink-0" />
                {!isCollapsed && <span>Центр помощи</span>}
              </button>

              <Link
                to="/login"
                onClick={() => logout()}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-sm font-medium ${isCollapsed ? 'justify-center' : ''}`}
              >
                <LogOut size={20} className="shrink-0" />
                {!isCollapsed && <span>Выйти из Аккаунта</span>}
              </Link>

              <div className={`pt-4 px-2 flex items-center justify-between ${isCollapsed ? 'flex-col gap-4' : ''}`}>
                {!isCollapsed && <span className="text-xs text-gray-400 font-medium whitespace-nowrap">Темная Тема</span>}
                <ThemeToggle />
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 overflow-hidden relative bg-gray-50 dark:bg-[#0b1220]">
          <div className="h-full overflow-y-auto p-4 md:p-8 scroll-smooth will-change-transform">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="max-w-7xl mx-auto min-h-full"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};
