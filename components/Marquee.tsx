import React from 'react';

const items = 'Python для ML · Веб-разработка · System Design · Алгоритмы · React & Next.js · Кибербезопасность · Cloud & DevOps · AI Engineering ·';

const Marquee: React.FC = () => (
    <div className="t-marquee-strip">
        <div className="t-marquee-track">
            <span className="t-marquee-item">{items}</span>
            <span className="t-marquee-item">{items}</span>
        </div>
    </div>
);

export default Marquee;
