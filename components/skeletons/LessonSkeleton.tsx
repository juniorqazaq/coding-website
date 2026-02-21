import React from 'react';

export const LessonSkeleton: React.FC = () => {
    return (
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#0f1724] rounded-2xl border border-gray-100 dark:border-gray-800 animate-pulse">
            <div className="flex items-center gap-4 w-full">
                <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
                <div className="flex-grow space-y-2">
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-md w-1/4"></div>
                </div>
            </div>
            <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        </div>
    );
};
