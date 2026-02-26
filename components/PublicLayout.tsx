import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface PublicLayoutProps {
    children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => (
    <div className="t-page-root">
        <Navbar />
        <main>
            {children}
        </main>
        <Footer />
    </div>
);
