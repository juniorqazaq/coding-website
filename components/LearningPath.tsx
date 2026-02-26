import React, { useEffect, useRef } from 'react';
import { PlayCircle, Zap, Layout, Server, Crown } from 'lucide-react';

const nodes = [
    { Icon: PlayCircle, label: 'Основы', sub: 'HTML, CSS, Python', active: true },
    { Icon: Zap, label: 'Прокачка', sub: 'JS, Алгоритмы', active: false },
    { Icon: Layout, label: 'Frontend', sub: 'React, TypeScript', active: false },
    { Icon: Server, label: 'Backend', sub: 'Node.js, БД', active: false },
    { Icon: Crown, label: 'Full Stack', sub: 'Deploy + Job Ready', active: false },
];

const LearningPath: React.FC = () => {
    const lineRef = useRef<HTMLDivElement>(null);
    const secRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting && lineRef.current) {
                    lineRef.current.style.width = '100%';
                }
            },
            { threshold: 0.3 }
        );
        if (secRef.current) obs.observe(secRef.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section className="t-section t-path-section" ref={secRef}>
            <div className="t-container">
                <div className="t-section-label">Учебный план</div>
                <h2 className="t-section-heading">От нуля до Full Stack разработчика</h2>

                <div className="t-path-wrapper">
                    <div className="t-path-line">
                        <div className="t-path-line-fill" ref={lineRef} />
                    </div>

                    <div className="t-path-nodes">
                        {nodes.map(({ Icon, label, sub, active }) => (
                            <div key={label} className="t-path-node-wrap">
                                <div className={`t-path-node ${active ? 't-node-active' : ''}`}>
                                    <Icon size={22} />
                                    <div className="t-node-tt">
                                        <strong>{label}</strong>
                                        <span>{sub}</span>
                                    </div>
                                </div>
                                <div className="t-path-node-lbl">{label}</div>
                                <div className="t-path-node-sub">{sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LearningPath;
