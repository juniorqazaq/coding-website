import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Award } from 'lucide-react';

interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
}

const QUIZ_DATA: Question[] = [
    {
        id: 1,
        question: "What is JSX?",
        options: [
            "A JavaScript library",
            "A syntax extension for JavaScript",
            "A CSS framework",
            "A database query language"
        ],
        correctAnswer: 1
    },
    {
        id: 2,
        question: "Which hook is used for side effects in React?",
        options: [
            "useState",
            "useContext",
            "useEffect",
            "useReducer"
        ],
        correctAnswer: 2
    },
    {
        id: 3,
        question: "What does the 'key' prop do in React lists?",
        options: [
            "Styles the element",
            "Helps React identify which items have changed",
            "Makes the element clickable",
            "Adds animation"
        ],
        correctAnswer: 1
    },
    {
        id: 4,
        question: "What is the virtual DOM?",
        options: [
            "A copy of the real DOM kept in memory",
            "A CSS selector",
            "A JavaScript function",
            "A React component"
        ],
        correctAnswer: 0
    },
    {
        id: 5,
        question: "How do you pass data from parent to child in React?",
        options: [
            "Using state",
            "Using props",
            "Using context",
            "Using refs"
        ],
        correctAnswer: 1
    }
];

export const Quiz: React.FC = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(QUIZ_DATA.length).fill(null));
    const [showResults, setShowResults] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

    const handleSelectAnswer = (answerIndex: number) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestion] = answerIndex;
        setSelectedAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestion < QUIZ_DATA.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSubmit = () => {
        setShowResults(true);
    };

    const calculateScore = () => {
        let correct = 0;
        selectedAnswers.forEach((answer, index) => {
            if (answer === QUIZ_DATA[index].correctAnswer) {
                correct++;
            }
        });
        return correct;
    };

    const score = calculateScore();
    const percentage = Math.round((score / QUIZ_DATA.length) * 100);

    if (showResults) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-[#1e293b] rounded-3xl p-8 border border-gray-200 dark:border-gray-700 text-center"
                >
                    <div className="mb-8">
                        <div className={`inline-flex p-6 rounded-full mb-4 ${percentage >= 70 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-orange-100 dark:bg-orange-900/30'}`}>
                            <Award size={48} className={percentage >= 70 ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'} />
                        </div>
                        <h1 className="text-4xl font-bold mb-4">Quiz Complete!</h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">You scored</p>
                        <div className="text-6xl font-bold text-indigo-600 dark:text-indigo-400 my-4">
                            {score}/{QUIZ_DATA.length}
                        </div>
                        <p className="text-2xl font-semibold">{percentage}%</p>
                    </div>

                    {percentage >= 70 ? (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50 rounded-2xl p-6 mb-8">
                            <p className="text-green-800 dark:text-green-200 font-semibold text-lg">🎉 Congratulations!</p>
                            <p className="text-green-700 dark:text-green-300 mt-2">You passed the quiz! +100 XP earned</p>
                        </div>
                    ) : (
                        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-900/50 rounded-2xl p-6 mb-8">
                            <p className="text-orange-800 dark:text-orange-200 font-semibold text-lg">Keep Learning!</p>
                            <p className="text-orange-700 dark:text-orange-300 mt-2">Review the material and try again to pass</p>
                        </div>
                    )}

                    <div className="space-y-4">
                        {QUIZ_DATA.map((q, index) => {
                            const userAnswer = selectedAnswers[index];
                            const isCorrect = userAnswer === q.correctAnswer;

                            return (
                                <div key={q.id} className="text-left p-4 rounded-xl bg-gray-50 dark:bg-[#0f1724] border border-gray-200 dark:border-gray-700">
                                    <div className="flex items-start gap-3">
                                        {isCorrect ? (
                                            <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                                        ) : (
                                            <XCircle className="text-red-500 flex-shrink-0 mt-1" size={20} />
                                        )}
                                        <div className="flex-grow">
                                            <p className="font-medium mb-2">{q.question}</p>
                                            <p className={`text-sm ${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                                Your answer: {userAnswer !== null ? q.options[userAnswer] : 'Not answered'}
                                            </p>
                                            {!isCorrect && (
                                                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                                                    Correct answer: {q.options[q.correctAnswer]}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-8 flex gap-4 justify-center">
                        <button
                            onClick={() => {
                                setShowResults(false);
                                setCurrentQuestion(0);
                                setSelectedAnswers(new Array(QUIZ_DATA.length).fill(null));
                            }}
                            className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
                        >
                            Retake Quiz
                        </button>
                        <button className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors font-medium shadow-lg shadow-indigo-500/30">
                            Continue Learning
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    const question = QUIZ_DATA[currentQuestion];

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            {/* Header */}
            <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">React Fundamentals Quiz</h1>
                    <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                        <Clock size={20} />
                        <span className="font-mono font-bold">
                            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                        </span>
                    </div>
                </div>

                {/* Progress */}
                <div className="flex items-center gap-3">
                    <div className="flex-grow">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                                style={{ width: `${((currentQuestion + 1) / QUIZ_DATA.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {currentQuestion + 1}/{QUIZ_DATA.length}
                    </span>
                </div>
            </div>

            {/* Question Card */}
            <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white dark:bg-[#1e293b] rounded-2xl p-8 mb-6 border border-gray-200 dark:border-gray-700"
            >
                <div className="mb-6">
                    <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-medium mb-4">
                        Question {currentQuestion + 1}
                    </span>
                    <h2 className="text-2xl font-bold">{question.question}</h2>
                </div>

                <div className="space-y-3">
                    {question.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleSelectAnswer(index)}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${selectedAnswers[currentQuestion] === index
                                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-gray-50 dark:bg-[#0f1724]'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedAnswers[currentQuestion] === index
                                        ? 'border-indigo-500 bg-indigo-500'
                                        : 'border-gray-300 dark:border-gray-600'
                                    }`}>
                                    {selectedAnswers[currentQuestion] === index && (
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    )}
                                </div>
                                <span className="font-medium">{option}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
                <button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    ← Previous
                </button>

                {currentQuestion === QUIZ_DATA.length - 1 ? (
                    <button
                        onClick={handleSubmit}
                        disabled={selectedAnswers.some(a => a === null)}
                        className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white transition-colors font-medium shadow-lg shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Submit Quiz
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors font-medium shadow-lg shadow-indigo-500/30"
                    >
                        Next →
                    </button>
                )}
            </div>
        </div>
    );
};
