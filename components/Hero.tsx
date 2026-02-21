import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Play, ArrowRight, Laptop } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
    const navigate = useNavigate();

    // Floating animation
    const float = (delay: number): Variants => ({
        animate: {
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            transition: {
                duration: 6,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut"
            }
        }
    });

    return (
        <section className="relative min-h-screen bg-white overflow-hidden flex flex-col pt-20">
            {/* Background Gradient Spotlights */}
            <div className="absolute top-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-sky-100/40 rounded-full blur-[100px]" />
            </div>

            {/* Main Content Area */}
            <div className="flex-grow flex items-center justify-center relative z-10 px-4">
                <div className="max-w-7xl mx-auto w-full text-center relative">

                    {/* Floating Programming Language Logos - No Backgrounds, More Items */}
                    <div className="hidden md:block absolute inset-0 pointer-events-none -z-10">
                        {/* C++ (Top Left) */}
                        <motion.div variants={float(0)} animate="animate" className="absolute top-0 left-10 lg:left-20 opacity-50 hover:opacity-100 transition-opacity">
                            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg" alt="C++" className="w-20 h-20" />
                        </motion.div>

                        {/* Python (Bottom Left) */}
                        <motion.div variants={float(2)} animate="animate" className="absolute bottom-20 left-20 lg:left-32 opacity-50 hover:opacity-100 transition-opacity">
                            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="Python" className="w-24 h-24" />
                        </motion.div>

                        {/* JavaScript (Top Right) */}
                        <motion.div variants={float(1)} animate="animate" className="absolute top-10 right-10 lg:right-32 opacity-50 hover:opacity-100 transition-opacity">
                            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="JavaScript" className="w-20 h-20" />
                        </motion.div>

                        {/* React (Bottom Right) */}
                        <motion.div variants={float(3)} animate="animate" className="absolute bottom-32 right-20 lg:right-48 opacity-50 hover:opacity-100 transition-opacity">
                            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="React" className="w-20 h-20" />
                        </motion.div>

                        {/* Java (Middle Right) */}
                        <motion.div variants={float(1.5)} animate="animate" className="absolute top-1/2 right-10 opacity-40 hover:opacity-100 transition-opacity">
                            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" alt="Java" className="w-16 h-16" />
                        </motion.div>

                        {/* HTML5 (Top Center-Left) */}
                        <motion.div variants={float(2.5)} animate="animate" className="absolute top-20 left-1/4 opacity-40 hover:opacity-100 transition-opacity">
                            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" alt="HTML5" className="w-16 h-16" />
                        </motion.div>

                        {/* CSS3 (Top Center-Right) */}
                        <motion.div variants={float(0.5)} animate="animate" className="absolute top-24 right-1/4 opacity-40 hover:opacity-100 transition-opacity">
                            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" alt="CSS3" className="w-16 h-16" />
                        </motion.div>

                        {/* Swift (Bottom Center-Left) */}
                        <motion.div variants={float(3.5)} animate="animate" className="absolute bottom-40 left-1/3 opacity-40 hover:opacity-100 transition-opacity">
                            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/swift/swift-original.svg" alt="Swift" className="w-14 h-14" />
                        </motion.div>

                        {/* Go (Bottom Center-Right) */}
                        <motion.div variants={float(4)} animate="animate" className="absolute bottom-10 right-1/3 opacity-40 hover:opacity-100 transition-opacity">
                            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original-wordmark.svg" alt="Go" className="w-20 h-20" />
                        </motion.div>

                        {/* Docker (Middle Left) */}
                        <motion.div variants={float(1.2)} animate="animate" className="absolute top-1/2 left-8 opacity-40 hover:opacity-100 transition-opacity">
                            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg" alt="Docker" className="w-16 h-16" />
                        </motion.div>

                        {/* TypeScript (Top Far Left) */}
                        <motion.div variants={float(0.8)} animate="animate" className="absolute top-32 left-10 opacity-40 hover:opacity-100 transition-opacity">
                            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="TypeScript" className="w-12 h-12" />
                        </motion.div>

                        {/* Node.js (Bottom Far Right) */}
                        <motion.div variants={float(2.2)} animate="animate" className="absolute bottom-10 right-10 opacity-40 hover:opacity-100 transition-opacity">
                            <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" alt="NodeJS" className="w-16 h-16" />
                        </motion.div>

                    </div>

                    {/* Typography */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6 relative z-20">
                            Построй Свой Фундамент <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                                Программиста
                            </span>
                        </h1>

                        <div className="flex items-center justify-center gap-2 text-blue-600 font-bold mb-6 text-lg relative z-20">
                            <span>Основы Computer Science с Tamasha</span>
                        </div>

                        <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-12 leading-relaxed relative z-20">
                            Изучи основы программирования, структуры данных, алгоритмы, ООП и базы данных. Реши более 500 задач, чтобы стать программистом мирового уровня.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center relative z-20">
                            <button
                                onClick={() => navigate('/courses')}
                                className="px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-600/30 transition-all transform hover:scale-105 flex items-center gap-2"
                            >
                                <Laptop size={20} />
                                Присоединиться
                            </button>
                            <button
                                className="px-12 py-5 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold text-lg rounded-2xl transition-all flex items-center gap-2 border border-blue-100"
                            >
                                <Play size={20} fill="currentColor" />
                                Начать Сейчас
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Infinite Banner */}
            <div className="w-full bg-gradient-to-r from-blue-600 to-blue-700 py-6 overflow-hidden relative mt-20">
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-blue-600 to-transparent z-10"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-blue-700 to-transparent z-10"></div>

                <div className="flex items-center">
                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="flex items-center whitespace-nowrap gap-12"
                    >
                        {[1, 2].map((i) => (
                            <React.Fragment key={i}>
                                {["Основы программирования", "Структуры данных", "Алгоритмы", "Спортивное программирование", "Python для ML", "Веб-разработка", "System Design", "Облачные вычисления"].map((topic, index) => (
                                    <div key={index} className="flex items-center gap-3 text-white/90 text-lg font-bold">
                                        {index > 0 && <ArrowRight className="w-5 h-5 opacity-50" />}
                                        {topic}
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
