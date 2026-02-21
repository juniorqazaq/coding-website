import React from 'react';

export const DashboardSkeleton: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8 animate-pulse">
            <div className="mb-8">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/3"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white dark:bg-[#1e293b] rounded-3xl p-6 border border-gray-200 dark:border-gray-700 h-32">
                        <div className="flex justify-between items-start mb-4">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2"></div>
                            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                        </div>
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-1/3"></div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-6 border border-gray-200 dark:border-gray-700 h-64">
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-1/4 mb-6"></div>
                        <div className="space-y-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded-xl w-full"></div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="space-y-8">
                    <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-6 border border-gray-200 dark:border-gray-700 h-96">
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2 mb-6"></div>
                        <div className="grid grid-cols-7 gap-2">
                            {Array.from({ length: 35 }).map((_, i) => (
                                <div key={i} className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
