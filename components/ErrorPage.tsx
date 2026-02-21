import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Frown, RefreshCw, Home } from 'lucide-react';

interface ErrorPageProps {
    error: Error | null;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ error }) => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0b1220] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#1e293b] p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full text-center border border-gray-200 dark:border-gray-800"
            >
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-full text-red-500">
                        <Frown size={48} />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Что-то пошло не так 😔
                </h1>

                <p className="text-gray-500 dark:text-gray-400 mb-8">
                    Произошла непредвиденная ошибка. Мы уже работаем над ее исправлением.
                </p>

                {error && (
                    <div className="mb-8 text-left">
                        <details className="cursor-pointer group">
                            <summary className="text-sm font-semibold text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 select-none">
                                Техническая информация
                            </summary>
                            <pre className="mt-2 text-xs bg-gray-100 dark:bg-black/50 p-4 rounded-xl overflow-x-auto text-red-500 dark:text-red-400 border border-gray-200 dark:border-gray-700">
                                {error.message}
                            </pre>
                        </details>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                    >
                        <RefreshCw size={18} />
                        Перезагрузить страницу
                    </button>

                    <Link
                        to="/"
                        onClick={() => window.location.href = '/'}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-medium transition-colors"
                    >
                        <Home size={18} />
                        На главную
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};
