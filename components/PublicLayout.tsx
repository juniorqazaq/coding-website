import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

interface PublicLayoutProps {
    children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
    const location = useLocation();

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 selection:bg-primary-500 selection:text-white">
            <Navbar />
            <main className="pt-20 flex-grow">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    );
};
