import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Check, ArrowRight, Lock, Mail, User, Chrome, Github, Facebook } from 'lucide-react';
import { Logo } from '../components/Logo';
import { AuthVisuals } from '../components/AuthVisuals';

export const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate network delay
        setTimeout(() => {
            localStorage.setItem('isAuthenticated', 'true');
            setIsLoading(false);
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen w-full flex bg-slate-50 text-slate-900 selection:bg-cyan-500/30 overflow-hidden relative">
            {/* Ambient Background Effects (Global) */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full bg-cyan-400/20 blur-[120px] mix-blend-multiply" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-400/20 blur-[120px] mix-blend-multiply" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
            </div>

            {/* Left Panel - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-12 xl:p-16 z-10 relative">
                <div className="max-w-md w-full mx-auto relative">
                    {/* Glassmorphic Form Container */}
                    <div className="bg-white/70 backdrop-blur-2xl border border-white p-8 sm:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                        <Link to="/" className="inline-flex items-center gap-3 group mb-10 transition-opacity hover:opacity-80">
                            <div className="relative">
                                <div className="absolute inset-0 bg-cyan-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
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
                            <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Create an account</h1>
                            <p className="text-slate-500 mb-10 text-lg font-medium">Start your free journey today. No credit card required.</p>

                            <form onSubmit={handleRegister} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-widest">Full Name</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
                                        </div>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-white/50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all font-medium backdrop-blur-sm"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-widest">Email Address</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
                                        </div>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-white/50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all font-medium backdrop-blur-sm"
                                            placeholder="name@company.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-widest">Password</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-white/50 border border-slate-200 rounded-xl pl-11 pr-12 py-3.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all font-medium backdrop-blur-sm"
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

                                <div className="flex items-start gap-3 pt-2">
                                    <label className="flex items-center cursor-pointer group mt-0.5">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                checked={agreeTerms}
                                                onChange={(e) => setAgreeTerms(e.target.checked)}
                                                className="sr-only"
                                            />
                                            <div className={`w-5 h-5 border-2 rounded transition-all ${agreeTerms ? 'bg-cyan-600 border-cyan-600' : 'border-slate-300 bg-white group-hover:border-cyan-400'}`}>
                                                {agreeTerms && <Check size={12} className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" strokeWidth={3} />}
                                            </div>
                                        </div>
                                    </label>
                                    <p className="text-sm text-slate-600 leading-snug">
                                        I agree to the <a href="#" className="font-bold text-cyan-600 hover:text-cyan-700 transition-colors">Terms of Service</a> and <a href="#" className="font-bold text-cyan-600 hover:text-cyan-700 transition-colors">Privacy Policy</a>
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:shadow-cyan-500/20 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 mt-6"
                                >
                                    {isLoading ? (
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Create Account
                                            <ArrowRight size={20} />
                                        </>
                                    )}
                                </button>

                                <div className="relative my-8">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-slate-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase tracking-widest">
                                        <span className="px-4 bg-white/70 backdrop-blur-md text-slate-400 font-bold rounded-full">Or register with</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <button type="button" className="flex items-center justify-center gap-3 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl py-3 text-slate-700 transition-all font-bold shadow-sm group">
                                        <Chrome className="w-5 h-5 text-slate-700 group-hover:text-blue-600 transition-colors" />
                                        Google
                                    </button>
                                    <button type="button" className="flex items-center justify-center gap-3 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl py-3 text-slate-700 transition-all font-bold shadow-sm group">
                                        <Github className="w-5 h-5 text-slate-700 group-hover:text-cyan-600 transition-colors" />
                                        GitHub
                                    </button>
                                </div>
                            </form>

                            <p className="text-center mt-8 text-slate-500 text-sm font-medium">
                                Already have an account?{' '}
                                <Link to="/login" className="text-cyan-600 hover:text-cyan-700 font-bold transition-colors">
                                    Log in
                                </Link>
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Marketing / Visuals */}
            <div className="hidden lg:flex w-1/2 relative bg-[#0B1221] items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10" />

                {/* Visual Graphics container */}
                <div className="relative z-10 w-full max-w-2xl px-12 flex flex-col items-center">
                    <div className="mb-12 w-full scale-100 transform hover:scale-[1.02] transition-transform duration-700">
                        <AuthVisuals />
                    </div>

                    <div className="text-center max-w-lg mx-auto bg-[#121A2F]/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 shadow-2xl">
                        <h2 className="text-3xl font-black text-white mb-4 tracking-tight">
                            Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Web Development</span>
                        </h2>
                        <p className="text-slate-400 text-lg font-light leading-relaxed">
                            Learn from industry experts and build real-world projects that will help you land your dream job.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
