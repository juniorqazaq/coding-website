import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Logo } from '../components/Logo';

const STEPS = [
    {
        title: "Какой у тебя уровень знаний?",
        field: "skillLevel",
        options: [
            { id: 'beginner', label: 'Новичок', icon: '🌱', desc: 'Никогда не программировал' },
            { id: 'intermediate', label: 'Знаю основы', icon: '⚡', desc: 'Учил в школе / университете' },
            { id: 'advanced', label: 'Опытный', icon: '🔥', desc: 'Пишу код уверенно' }
        ]
    },
    {
        title: "Какая твоя главная цель?",
        field: "goal",
        options: [
            { id: 'career', label: 'Сменить профессию', icon: '💼', desc: 'Стать разработчиком' },
            { id: 'hobby', label: 'Хобби и интерес', icon: '🎮', desc: 'Просто для себя' },
            { id: 'skills', label: 'Повысить навыки', icon: '📈', desc: 'Нужно для текущей работы' }
        ]
    },
    {
        title: "Сколько времени в день ты готов учиться?",
        field: "dailyGoalMinutes",
        options: [
            { id: 15, label: '15 минут', icon: '⏱️', desc: 'Идеально для легкого старта' },
            { id: 30, label: '30 минут', icon: '⏳', desc: 'Регулярная тренировка' },
            { id: 60, label: '1 час+', icon: '🚀', desc: 'Интенсивное погружение' }
        ]
    }
];

export const Onboarding: React.FC = () => {
    const [step, setStep] = useState(0);
    const [preferences, setPreferences] = useState({ skillLevel: '', goal: '', dailyGoalMinutes: 0 });
    const navigate = useNavigate();
    const { completeOnboarding } = useUserStore();

    const currentStep = STEPS[step];

    const handleSelect = (value: any) => {
        setPreferences(prev => ({ ...prev, [currentStep.field]: value }));
    };

    const handleNext = () => {
        if (step < STEPS.length - 1) {
            setStep(prev => prev + 1);
        } else {
            completeOnboarding(preferences.skillLevel, preferences.goal, preferences.dailyGoalMinutes);
            navigate('/dashboard');
        }
    };

    const handleBack = () => {
        if (step > 0) setStep(prev => prev - 1);
    };

    const isNextDisabled = !preferences[currentStep.field as keyof typeof preferences];

    return (
        <div className="min-h-screen bg-white dark:bg-[#0b1220] flex flex-col justify-center items-center p-4">
            <div className="absolute top-8 left-8">
                <Logo />
            </div>

            <div className="w-full max-w-xl">
                {/* Progress Indicator */}
                <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full mb-12 overflow-hidden">
                    <motion.div
                        className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
                        initial={{ width: 0 }}
                        animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                    />
                </div>

                <div className="text-center mb-8">
                    <span className="text-sm font-bold text-blue-500 tracking-wider uppercase mb-2 block">Шаг {step + 1} из {STEPS.length}</span>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">{currentStep.title}</h1>
                </div>

                <div className="relative overflow-hidden min-h-[300px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="absolute inset-0 flex flex-col gap-4"
                        >
                            {currentStep.options.map((opt) => {
                                const isSelected = preferences[currentStep.field as keyof typeof preferences] === opt.id;
                                return (
                                    <button
                                        key={opt.id}
                                        onClick={() => handleSelect(opt.id)}
                                        className={`w-full p-4 rounded-xl border-2 text-left flex items-center gap-4 transition-all ${isSelected
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10 shadow-lg shadow-blue-500/20'
                                                : 'border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500/50 bg-white dark:bg-[#1e293b]'
                                            }`}
                                    >
                                        <div className="text-3xl bg-gray-50 dark:bg-[#0f1724] p-3 rounded-xl">{opt.icon}</div>
                                        <div>
                                            <h3 className={`font-bold text-lg ${isSelected ? 'text-blue-700 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                                                {opt.label}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-tight mt-0.5">{opt.desc}</p>
                                        </div>
                                    </button>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="mt-12 flex items-center justify-between">
                    <button
                        onClick={handleBack}
                        disabled={step === 0}
                        className={`font-semibold flex items-center gap-2 p-3 transition-colors ${step === 0 ? 'text-transparent pointer-events-none' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
                    >
                        <ArrowLeft size={20} /> Назад
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={isNextDisabled}
                        className={`font-bold flex items-center gap-2 py-3 px-8 rounded-xl transition-all ${isNextDisabled
                                ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30'
                            }`}
                    >
                        {step === STEPS.length - 1 ? 'Начать обучение' : 'Далее'} <ArrowRight size={20} />
                    </button>
                </div>
            </div>

            {/* Background elements */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2"></div>
        </div>
    );
};
