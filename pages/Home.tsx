import React from 'react';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import StatsSection from '../components/StatsSection';
import Features from '../components/Features';
import LearningPath from '../components/LearningPath';
import PopularCourses from '../components/PopularCourses';
import CodingPromo from '../components/CodingPromo';
import Testimonials from '../components/Testimonials';
import PricingSection from '../components/PricingSection';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';

export const Home: React.FC = () => {
    return (
        <div>
            <Hero />
            <Marquee />
            <StatsSection />
            <Features />
            <LearningPath />
            <PopularCourses />
            <CodingPromo />
            <Testimonials />
            <PricingSection />
            <FAQ />
            <CTA />
        </div>
    );
};
