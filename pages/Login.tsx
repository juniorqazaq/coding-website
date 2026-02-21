import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { authService } from '../services/auth';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Check, ArrowRight, Lock, Mail, Github, Chrome, Facebook } from 'lucide-react';
import { Logo } from '../components/Logo';
import { AuthVisuals } from '../components/AuthVisuals';

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { login } = useAuthStore();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const user = await authService.login(email, password);
            login(user);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-slate-50 dark:bg-[#0b1220] text-slate-900 dark:text-white selection:bg-blue-500/30 dark:selection:bg-blue-500/50 overflow-hidden relative">
            {/* Clean Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-slate-50 dark:bg-[#0b1220]" />
            </div>

            {/* Centered Form */}
            <div className="w-full flex flex-col justify-center items-center p-8 lg:p-12 xl:p-16 z-10 relative min-h-screen">
                <div className="max-w-md w-full mx-auto relative">
                    {/* Glassmorphic Form Container */}
                    <div className="bg-white/70 dark:bg-[#1e293b]/70 backdrop-blur-2xl border border-white dark:border-white/5 p-8 sm:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none">
                        <Link to="/" className="inline-flex items-center gap-3 group mb-10 transition-opacity hover:opacity-80">
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 text-blue-600 flex items-center justify-center shadow-sm">
                                    <span className="font-mono font-bold text-lg tracking-tighter">{'</>'}</span>
                                </div>
                            </div>
                            <span className="text-2xl font-black text-slate-900 tracking-tight">
                                Tamasha
                            </span>
                        </Link>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">С возвращением!</h1>
                            <p className="text-slate-500 dark:text-slate-400 mb-10 text-lg font-medium">Пожалуйста, войдите в свой аккаунт.</p>

                            <form onSubmit={handleLogin} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-widest">Email Address</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                        </div>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-white/50 dark:bg-[#0b1220]/50 border border-slate-200 dark:border-slate-800 rounded-xl pl-11 pr-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-500 transition-all font-medium backdrop-blur-sm"
                                            placeholder="name@company.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center ml-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Password</label>
                                        <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
                                            Забыли пароль?
                                        </a>
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-white/50 dark:bg-[#0b1220]/50 border border-slate-200 dark:border-slate-800 rounded-xl pl-11 pr-12 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium backdrop-blur-sm"
                                            placeholder="••••••••"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <label className="flex items-center cursor-pointer group">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                                className="sr-only"
                                            />
                                            <div className={`w-5 h-5 border-2 rounded transition-all ${rememberMe ? 'bg-blue-600 border-blue-600' : 'border-slate-300 bg-white group-hover:border-blue-400'}`}>
                                                {rememberMe && <Check size={12} className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" strokeWidth={3} />}
                                            </div>
                                        </div>
                                        <span className="ml-3 text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Запомнить меня</span>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 mt-6"
                                >
                                    {isLoading ? (
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Войти
                                            <ArrowRight size={20} />
                                        </>
                                    )}
                                </button>

                                <div className="relative my-8">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase tracking-widest">
                                        <span className="px-4 bg-white/70 dark:bg-[#1e293b]/70 backdrop-blur-md text-slate-400 font-bold rounded-full">Или продолжить через</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <button type="button" className="flex items-center justify-center gap-3 bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl py-3 text-slate-700 dark:text-slate-300 transition-all font-bold shadow-sm group">
                                        <Chrome className="w-5 h-5 text-slate-700 dark:text-slate-300 group-hover:text-blue-600 transition-colors" />
                                        Google
                                    </button>
                                    <button type="button" className="flex items-center justify-center gap-3 bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-blue-200 rounded-xl py-3 text-slate-700 dark:text-slate-300 transition-all font-bold shadow-sm group">
                                        <Facebook className="w-5 h-5 text-[#1877F2] group-hover:scale-110 transition-transform" />
                                        Facebook
                                    </button>
                                </div>
                            </form>

                            <p className="text-center mt-8 text-slate-500 text-sm font-medium">
                                Нет аккаунта?{' '}
                                <Link to="/register" className="text-blue-600 hover:text-blue-700 font-bold transition-colors">
                                    Зарегистрироваться
                                </Link>
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

        </div>
    );
};