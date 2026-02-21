import React, { useState, useEffect } from 'react';
import { Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path: string) => location.pathname === path;

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen
                ? 'bg-white/70 backdrop-blur-xl shadow-sm border-b border-gray-100/50'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center cursor-pointer group"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
                            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 text-blue-600 flex items-center justify-center mr-3 shadow-sm group-hover:scale-105 transition-transform">
                                <span className="font-mono font-bold text-sm tracking-tighter">{'</>'}</span>
                            </div>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent group-hover:from-primary-600 group-hover:to-primary-500 transition-all">
                            Tamasha
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1">
                        {[
                            { path: '/', label: 'Главная' },
                            { path: '/courses', label: 'Курсы' },
                            { path: '/pricing', label: 'Тарифы' }
                        ].map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${isActive(link.path) ? 'text-primary-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                {link.label}
                                {isActive(link.path) && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute inset-0 bg-primary-50 rounded-full -z-10 border border-primary-100"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button className="p-2.5 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-all">
                            <Moon className="w-5 h-5" />
                        </button>

                        <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium text-sm px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors">
                            Войти
                        </Link>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/register')}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-lg shadow-blue-500/25 ring-2 ring-transparent hover:ring-blue-500/20 transition-all"
                        >
                            Регистрация
                        </motion.button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 overflow-hidden"
                    >
                        <div className="px-4 py-6 space-y-3">
                            <Link
                                to="/"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block w-full text-left px-4 py-3 text-base font-medium rounded-xl transition-colors ${isActive('/') ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                Главная
                            </Link>
                            <Link
                                to="/courses"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block w-full text-left px-4 py-3 text-base font-medium rounded-xl transition-colors ${isActive('/courses') ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                Курсы
                            </Link>
                            <Link
                                to="/pricing"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block w-full text-left px-4 py-3 text-base font-medium rounded-xl transition-colors ${isActive('/pricing') ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                Тарифы
                            </Link>
                            <div className="h-px bg-gray-100 my-4"></div>
                            <div className="grid grid-cols-2 gap-4">
                                <Link to="/login" className="text-center py-3 text-gray-600 font-medium border border-gray-200 rounded-xl hover:border-gray-300 block">
                                    Войти
                                </Link>
                                <Link to="/register" className="text-center py-3 bg-primary-600 text-white font-medium rounded-xl shadow-lg shadow-primary-500/20 block">
                                    Регистрация
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Navbar;
