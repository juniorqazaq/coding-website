import React from 'react';
import { ArrowUp, CornerDownRight, Asterisk, Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-white text-gray-900 pt-32 pb-12 relative overflow-hidden font-sans selection:bg-blue-500 selection:text-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-start justify-between mb-24 relative">
                    <div className="max-w-5xl relative z-10">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-gray-900"
                        >
                            <span className="text-blue-500 font-mono text-4xl align-top mr-2">//</span>
                            Начни Кодить <br />
                            <span className="text-gray-400">и Построй</span> <br />
                            Свое Будущее.
                        </motion.h2>

                        {/* Decorative Arrow */}
                        <div className="hidden lg:block absolute right-[-150px] bottom-[-50px] pointer-events-none opacity-20">
                            <svg width="400" height="150" viewBox="0 0 400 150" fill="none" className="text-blue-600">
                                <path d="M10 10 C 100 10, 300 50, 350 100" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 10" />
                                <path d="M340 90 L 350 100 L 360 90" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>

                    <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="hidden md:block opacity-10"
                    >
                        <Asterisk size={120} className="text-blue-600" />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* Left Column: Contact Details */}
                    <div className="lg:col-span-5 space-y-16">
                        <div>
                            <p className="text-gray-500 text-xl leading-relaxed max-w-sm">
                                Готовы начать свой путь? <br />
                                <span className="text-gray-900 font-semibold">Свяжитесь с нами.</span>
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-4">Контакты</p>
                                <div className="space-y-4">
                                    <a href="tel:1-800-888-4939" className="block text-3xl font-bold hover:text-blue-600 transition-colors">1-800-888-4939</a>
                                    <a href="mailto:hello@tamasha.edu" className="block text-xl text-gray-500 hover:text-gray-900 transition-colors">hello@tamasha.edu</a>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1">
                                    <Twitter size={20} />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-pink-600 hover:text-white transition-all transform hover:-translate-y-1">
                                    <Instagram size={20} />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-700 hover:text-white transition-all transform hover:-translate-y-1">
                                    <Linkedin size={20} />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-black hover:text-white transition-all transform hover:-translate-y-1">
                                    <Github size={20} />
                                </a>
                            </div>

                            {/* Large Brand Text */}
                            <div className="pt-12">
                                <h1 className="text-[120px] font-black tracking-tighter select-none leading-none opacity-50 xl:opacity-100" style={{
                                    WebkitTextStroke: '2px #E2E8F0',
                                    color: 'transparent'
                                }}>
                                    TAMASHA
                                </h1>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="lg:col-span-1"></div>

                    <div className="lg:col-span-6 bg-gray-50 p-10 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group hover:border-blue-100 transition-colors">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Asterisk size={100} />
                        </div>

                        <form className="space-y-8 relative z-10">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Ваше имя</label>
                                    <input
                                        type="text"
                                        className="w-full bg-transparent border-b-2 border-gray-200 text-xl md:text-2xl text-gray-900 px-0 py-2 focus:outline-none focus:border-blue-600 transition-all placeholder-gray-300 font-medium"
                                        placeholder="Иван Иванов"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Ваш email</label>
                                    <input
                                        type="email"
                                        className="w-full bg-transparent border-b-2 border-gray-200 text-xl md:text-2xl text-gray-900 px-0 py-2 focus:outline-none focus:border-blue-600 transition-all placeholder-gray-300 font-medium"
                                        placeholder="ivan@example.com"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex items-center justify-between">
                                <button type="button" className="group flex items-center gap-4 bg-gray-900 text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-blue-600 transition-all shadow-xl shadow-gray-900/10 hover:shadow-blue-600/20 transform hover:-translate-y-1">
                                    Отправить сообщение
                                    <CornerDownRight size={24} className="text-gray-400 group-hover:text-white transition-colors" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-32 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-gray-400 text-sm font-medium">© 2024 Tamasha Learning Inc.</p>

                    <button
                        onClick={scrollToTop}
                        className="w-14 h-14 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-50 hover:border-gray-200 transition-all shadow-sm hover:shadow-md group"
                    >
                        <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>

            </div >
        </footer >
    );
};

export default Footer;
