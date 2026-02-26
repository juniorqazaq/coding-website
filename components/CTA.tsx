import React from 'react';
import { Link } from 'react-router-dom';

const CTA: React.FC = () => (
    <section className="t-cta-section">
        <div className="t-cta-float1">const future = "yours";</div>
        <div className="t-cta-float2">print("Hello, World!")</div>
        <div className="t-cta-float3">npm run success</div>
        <h2 className="t-cta-heading">Твой первый шаг — прямо сейчас</h2>
        <p className="t-cta-sub">Присоединяйся к 12 000+ разработчиков. Первый урок бесплатно.</p>
        <div className="t-cta-btns">
            <Link to="/register" className="t-btn-primary">Начать бесплатно</Link>
            <Link to="/courses" className="t-btn-ghost">Все курсы</Link>
        </div>
    </section>
);

export default CTA;
