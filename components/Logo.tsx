import React from 'react';

interface LogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12'
    };

    const fontSizeClasses = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-lg'
    };

    return (
        <div className={`relative ${className}`}>
            <div className="absolute inset-0 bg-blue-500 blur-lg opacity-20 rounded-full"></div>
            <div className={`relative rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 text-blue-600 flex items-center justify-center shadow-sm ${sizeClasses[size]}`}>
                <span className={`font-mono font-bold tracking-tighter ${fontSizeClasses[size]}`}>{'</>'}</span>
            </div>
        </div>
    );
};
