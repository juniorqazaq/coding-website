import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PopularCourses: React.FC = () => {
    const navigate = useNavigate();

    const courses = [
        {
            name: 'Python Masterclass',
            description: 'Универсальный язык для Data Science, ML и веб-разработки. Идеальный старт для новичков.',
            color: '#3776AB',
            icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg'
        },
        {
            name: 'C++ Fundamentals',
            description: 'Высокопроизводительный язык для системного программирования, игр и сложных вычислений.',
            color: '#00599C',
            icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg'
        },
        {
            name: 'Java Enterprise',
            description: 'Стандарт корпоративной разработки. Надежные бэкенд-системы и мобильные приложения.',
            color: '#007396',
            icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg'
        },
        {
            name: 'HTML & CSS',
            description: 'Фундамент веб-разработки. Создавайте красивые, адаптивные и современные интерфейсы.',
            color: '#E34F26',
            icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg'
        },
        {
            name: 'Modern JavaScript',
            description: 'Язык веба. Создавайте интерактивные сайты и полноценные веб-приложения.',
            color: '#F7DF1E',
            icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg'
        },
        {
            name: 'Next.js Framework',
            description: 'React-фреймворк для продакшна. Server-Side Rendering, производительность и SEO.',
            color: '#000000',
            icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg'
        }
    ];

    return (
        <section className="bg-gray-50 py-24 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-blue-600 font-bold tracking-wider uppercase text-sm"
                        >
                            Выбери свой путь
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl font-bold text-gray-900 mt-2"
                        >
                            Популярные Курсы
                        </motion.h2>
                    </div>

                    <motion.button
                        onClick={() => navigate('/courses')}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="hidden md:flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors group"
                    >
                        Все курсы
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, index) => (
                        <motion.div
                            key={course.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            onClick={() => course.name.includes('Python') && navigate('/course/python')}
                            className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 border border-transparent hover:border-blue-100 group cursor-pointer"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gray-50 group-hover:bg-white transition-colors overflow-hidden p-2">
                                    <img src={course.icon} alt={course.name} className="w-full h-full object-contain" />
                                </div>
                                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <ChevronRight size={16} />
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                {course.name}
                            </h3>

                            <p className="text-gray-500 leading-relaxed text-sm">
                                {course.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 flex justify-center md:hidden">
                    <button
                        onClick={() => navigate('/courses')}
                        className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-500/20"
                    >
                        Все курсы
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PopularCourses;
