import React, { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

const faqData: FaqItem[] = [
    {
        id: '1',
        question: 'Курсы подходят для новичков?',
        answer: 'Абсолютно. Наша AI-система анализирует ваш текущий уровень и строит персональный трек обучения. Мы начинаем с фундаментальных концепций и плавно переходим к архитектуре сложных систем.'
    },
    {
        id: '2',
        question: 'Выдается ли сертификат?',
        answer: 'Да. Наши сертификаты защищены блокчейн-технологией. После выполнения финального Capstone-проекта вы получаете верифицированный диплом, который интегрируется с LinkedIn одним кликом.'
    },
    {
        id: '3',
        question: 'Какие языки я могу изучить?',
        answer: 'Наш стек сфокусирован на востребованных технологиях рынка: Python (Data Science & Backend), JavaScript/TypeScript (Fullstack), Go и Rust. Библиотека курсов обновляется ежемесячно.'
    },
    {
        id: '4',
        question: 'Как работает AI-ментор?',
        answer: 'Наш AI доступен 24/7. Он не просто ищет ошибки в синтаксисе, но и объясняет логику, предлагает оптимизацию кода (Big O notation) и помогает с дебаггингом в реальном времени.'
    }
];

const FAQ: React.FC = () => {
    const [openId, setOpenId] = useState<string | null>('1');

    const toggle = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section className="py-24 bg-gray-50 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary-200/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-blue-200/20 rounded-full blur-[80px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block p-3 bg-white rounded-2xl shadow-sm mb-6"
                    >
                        <MessageCircle className="w-6 h-6 text-primary-600" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4"
                    >
                        Частые вопросы
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500 text-lg"
                    >
                        Всё, что нужно знать о платформе Tamasha
                    </motion.p>
                </div>

                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            key={item.id}
                            className={`border rounded-3xl overflow-hidden transition-all duration-500 ${openId === item.id
                                ? 'border-primary-500/30 bg-white shadow-xl shadow-primary-900/5 ring-1 ring-primary-500/20'
                                : 'border-transparent bg-white shadow-sm hover:shadow-md'
                                }`}
                        >
                            <button
                                onClick={() => toggle(item.id)}
                                className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none group"
                            >
                                <div className="flex items-center gap-5">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${openId === item.id ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-primary-50 group-hover:text-primary-600'}`}>
                                        <span className="font-mono font-bold text-sm">0{index + 1}</span>
                                    </div>
                                    <span className={`text-lg font-bold transition-colors ${openId === item.id ? 'text-gray-900' : 'text-gray-700'}`}>
                                        {item.question}
                                    </span>
                                </div>
                                <div className={`transition-transform duration-300 ${openId === item.id ? 'rotate-180' : ''}`}>
                                    <ChevronDown className={`w-5 h-5 ${openId === item.id ? 'text-primary-600' : 'text-gray-400'}`} />
                                </div>
                            </button>

                            <AnimatePresence>
                                {openId === item.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-8 pb-8 pl-[4.5rem] pt-0">
                                            <p className="text-gray-600 leading-relaxed text-base">
                                                {item.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
