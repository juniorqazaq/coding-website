import React, { useEffect, useRef, useState } from 'react';
import { Users, Video, Briefcase, Code2 } from 'lucide-react';

const stats = [
    { icon: Users, value: 12000, suffix: '+', label: 'студентов' },
    { icon: Video, value: 150, suffix: '+', label: 'видеоуроков' },
    { icon: Briefcase, value: 98, suffix: '%', label: 'трудоустройство' },
    { icon: Code2, value: 500, suffix: '+', label: 'практических задач' },
];

function useCounter(target: number, started: boolean, ms = 1500) {
    const [n, setN] = useState(0);
    useEffect(() => {
        if (!started) return;
        let raf: number;
        const t0 = performance.now();
        const tick = (now: number) => {
            const p = Math.min((now - t0) / ms, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setN(Math.round(ease * target));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [started, target, ms]);
    return n;
}

const StatItem: React.FC<{ stat: typeof stats[0]; started: boolean }> = ({ stat, started }) => {
    const n = useCounter(stat.value, started);
    const Icon = stat.icon;
    const display = stat.value >= 1000
        ? `${Math.floor(n / 1000)} ${String(n % 1000).padStart(3, '0')}`
        : String(n);

    return (
        <div className="t-stat-item">
            <div className="t-stat-icon-wrap"><Icon size={20} /></div>
            <div className="t-stat-big">{display}{stat.suffix}</div>
            <div className="t-stat-lbl">{stat.label}</div>
        </div>
    );
};

const StatsSection: React.FC = () => {
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setStarted(true); },
            { threshold: 0.3 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section className="t-stats-section" ref={ref}>
            <div className="t-stats-row" style={{ maxWidth: 1160, margin: '0 auto', padding: '0 32px' }}>
                {stats.map((s, i) => (
                    <React.Fragment key={s.label}>
                        <StatItem stat={s} started={started} />
                        {i < stats.length - 1 && <div className="t-stat-sep" />}
                    </React.Fragment>
                ))}
            </div>
        </section>
    );
};

export default StatsSection;
