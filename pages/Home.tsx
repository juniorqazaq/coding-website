import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import PopularCourses from '../components/PopularCourses';
import CodingPromo from '../components/CodingPromo';
import Testimonials from '../components/Testimonials';

export const Home: React.FC = () => {
    return (
        <div className="animate-fade-in">
            <Hero />
            <PopularCourses />
            <CodingPromo />
            <Features />
            <Testimonials />
            <FAQ />
            <CTA />
        </div>
    );
};
