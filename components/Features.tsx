import React from 'react';
import { Rocket, Users, Code, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const Features: React.FC = () => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section className="py-24 bg-gray-50 relative overflow-hidden">
            {/* Decorative blob */}
            <div className="absolute top-1/3 left-0 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                            Всё для твоего <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">Экспоненциального Роста</span>
                        </h2>
                        <p className="text-lg text-gray-600">
                            Мы объединили лучшие методики обучения и современные технологии в одну экосистему.
                        </p>
                    </motion.div>
                </div>

                {/* Bento Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >

                    {/* Large Card Left */}
                    <motion.div variants={item} className="md:col-span-2 bg-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden group hover:border-primary-100 transition-colors">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-[60px] -mr-16 -mt-16 transition-all group-hover:bg-primary-100/70"></div>

                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-primary-600 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg shadow-primary-500/30">
                                <Rocket className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Адаптивное Обучение</h3>
                            <p className="text-gray-500 text-lg leading-relaxed max-w-lg mb-8">
                                Наш алгоритм анализирует ваш код и стиль обучения, подстраивая программу в реальном времени. Забудьте о скучных лекциях — только практика, актуальная именно для вас.
                            </p>

                            <div className="flex gap-3 flex-wrap">
                                {['Python', 'JavaScript', 'React', 'System Design'].map(tag => (
                                    <span key={tag} className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {/* Visual Abstract UI */}
                        <div className="absolute bottom-0 right-0 w-1/3 h-full opacity-10 md:opacity-100 pointer-events-none translate-y-12 translate-x-12">
                            <div className="w-full h-full bg-gradient-to-tl from-gray-100 to-white border border-gray-200 rounded-tl-3xl shadow-inner p-4">
                                <div className="space-y-3">
                                    <div className="h-2 w-3/4 bg-gray-200 rounded-full"></div>
                                    <div className="h-2 w-1/2 bg-gray-200 rounded-full"></div>
                                    <div className="h-20 w-full bg-primary-50 rounded-xl border border-primary-100"></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Tall Card Right */}
                    <motion.div variants={item} className="md:row-span-2 bg-gray-900 text-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-gray-900/20 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-b from-gray-800/50 to-gray-900"></div>
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

                        <div className="relative z-10 h-full flex flex-col">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                                <Code className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Cloud IDE</h3>
                            <p className="text-gray-400 leading-relaxed mb-auto">
                                Мощный редактор кода прямо в браузере. Поддержка всех фреймворков, терминал и коллаборация.
                            </p>

                            <div className="mt-8 bg-gray-800/80 backdrop-blur rounded-xl p-4 border border-gray-700 font-mono text-xs">
                                <div className="flex items-center gap-2 mb-3 border-b border-gray-700 pb-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span className="ml-auto text-gray-500">server.js</span>
                                </div>
                                <div className="space-y-1">
                                    <p><span className="text-blue-400">import</span> express <span className="text-blue-400">from</span> 'express';</p>
                                    <p><span className="text-blue-400">const</span> app = <span className="text-sky-400">express</span>();</p>
                                    <p>app.<span className="text-blue-400">listen</span>(3000);</p>
                                    <p className="text-green-400 mt-2">{'// Server running...'}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Small Card 1 */}
                    <motion.div variants={item} className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 hover:scale-[1.02] transition-transform duration-300">
                        <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center mb-4">
                            <Users className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Комьюнити</h3>
                        <p className="text-sm text-gray-500">
                            Доступ к закрытому Discord серверу с менторами и студентами.
                        </p>
                    </motion.div>

                    {/* Small Card 2 */}
                    <motion.div variants={item} className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-400/10 rounded-full blur-xl"></div>
                        <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center mb-4 relative z-10">
                            <Trophy className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 relative z-10">Сертификаты</h3>
                        <p className="text-sm text-gray-500 relative z-10">
                            Подтверждаемые сертификаты для твоего LinkedIn профиля.
                        </p>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
};

export default Features;
