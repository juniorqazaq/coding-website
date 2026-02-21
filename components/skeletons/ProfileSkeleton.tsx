import React from 'react';

export const ProfileSkeleton: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl animate-pulse">
            <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-8 mb-8 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
                    <div className="flex-grow space-y-4 w-full">
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-1/3"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-2/3"></div>
                        <div className="flex gap-4 pt-2">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-24"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-32"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-28"></div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
