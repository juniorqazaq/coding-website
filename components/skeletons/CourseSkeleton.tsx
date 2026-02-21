import React from 'react';

export const CourseSkeleton: React.FC = () => {
    return (
        <div className="bg-white dark:bg-[#1e293b] rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all h-full flex flex-col animate-pulse">
            <div className="h-48 bg-gray-200 dark:bg-gray-700 w-full"></div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                    <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                </div>
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-md mb-2"></div>
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-md mb-6"></div>

                <div className="mt-auto">
                    <div className="flex justify-between items-center mb-2">
                        <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                        <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                    </div>
                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};
