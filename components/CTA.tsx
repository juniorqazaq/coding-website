import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CTA: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white mb-20">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative rounded-[2.5rem] overflow-hidden bg-[#0B1221] min-h-[480px] flex items-center justify-center text-center px-6 md:px-12 py-16"
                >
                    {/* Subtle Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#121c36] via-[#0B1221] to-[#060a14] pointer-events-none"></div>

                    {/* Content */}
                    <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">

                        {/* Badge */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 bg-[#1C263B] border border-[#2A3655] rounded-full px-5 py-2 mb-10"
                        >
                            <Sparkles className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm font-medium text-gray-200">Старт нового потока через 2 дня</span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl lg:text-[4rem] font-black text-white mb-8 tracking-tight leading-[1.1]"
                        >
                            Готов трансформировать <br /> свою карьеру?
                        </motion.h2>

                        {/* Subtext */}
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
                        >
                            Присоединяйся к 10,000+ разработчикам. Получи доступ к интерактивным курсам, Code Review от экспертов и закрытому сообществу.
                        </motion.p>

                        {/* Buttons */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                        >
                            <button
                                onClick={() => navigate('/courses')}
                                className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 min-w-[200px]"
                            >
                                Начать обучение бесплатно
                                <ArrowRight className="w-5 h-5" />
                            </button>

                            <button
                                className="px-8 py-4 bg-[#1C263B] text-white font-bold rounded-xl hover:bg-[#25324d] transition-colors min-w-[200px]"
                            >
                                Программа курса
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTA;
