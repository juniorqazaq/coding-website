import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

// Inline SVG logos
const PythonLogo = () => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="t-course-logo">
        <path d="M24 4C18.5 4 15 6.5 15 10v4h9v2H12C7.5 16 4 19 4 24s3.5 8 8 8h3v-5c0-4.5 3.5-7 8-7h10c4 0 6-2 6-6V10c0-4-3-6-8-6H24z" fill="#3776ab" />
        <circle cx="19" cy="11" r="2" fill="white" />
        <path d="M24 44C29.5 44 33 41.5 33 38v-4h-9v-2h12c4.5 0 8-3 8-8s-3.5-8-8-8h-3v5c0 4.5-3.5 7-8 7H15c-4 0-6 2-6 6v6c0 4 3 6 8 6h7z" fill="#ffd343" />
        <circle cx="29" cy="37" r="2" fill="white" />
    </svg>
);

const ReactLogo = () => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="t-course-logo">
        <ellipse cx="24" cy="24" rx="4" ry="4" fill="#61dafb" />
        <ellipse cx="24" cy="24" rx="20" ry="7" stroke="#61dafb" strokeWidth="2" fill="none" />
        <ellipse cx="24" cy="24" rx="20" ry="7" stroke="#61dafb" strokeWidth="2" fill="none" transform="rotate(60 24 24)" />
        <ellipse cx="24" cy="24" rx="20" ry="7" stroke="#61dafb" strokeWidth="2" fill="none" transform="rotate(120 24 24)" />
    </svg>
);

const TypeScriptLogo = () => (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="t-course-logo">
        <rect width="48" height="48" rx="4" fill="#3178c6" />
        <path d="M20 22H12V19h21v3h-8v17h-5V22z" fill="white" />
        <path d="M31 35.5c0 1 .8 1.7 2 1.7 1 0 1.7-.5 1.7-1.4 0-.9-.6-1.4-2-1.9-2-.7-3.2-1.6-3.2-3.4 0-2 1.6-3.3 4-3.3 2.6 0 4.1 1.4 4.1 3.3h-2.6c0-1-.7-1.6-1.6-1.6-.9 0-1.4.5-1.4 1.2 0 .8.6 1.2 2 1.7 2.1.7 3.2 1.7 3.2 3.6 0 2.1-1.6 3.4-4.2 3.4-2.7 0-4.4-1.4-4.4-3.7H31z" fill="white" />
    </svg>
);

const courses = [
    {
        Logo: PythonLogo, diff: 'Начальный', diffClass: 't-diff-easy',
        name: 'Python Masterclass',
        desc: 'Основы алгоритмов, структуры данных и автоматизация с нуля.',
        lessons: 48, rating: '4.9', href: '/courses',
    },
    {
        Logo: ReactLogo, diff: 'Средний', diffClass: 't-diff-mid',
        name: 'React & Next.js',
        desc: 'Современная веб-разработка: хуки, SSR, оптимизация производительности.',
        lessons: 62, rating: '4.8', href: '/courses',
    },
    {
        Logo: TypeScriptLogo, diff: 'Продвинутый', diffClass: 't-diff-hard',
        name: 'System Design',
        desc: 'Проектирование высоконагруженных систем, архитектурные паттерны.',
        lessons: 35, rating: '5.0', href: '/courses',
    },
];

const Stars = ({ n }: { n: number }) => (
    <div className="t-stars">
        {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={13} style={{ fill: i < Math.round(parseFloat(n.toString())) ? '#fbbf24' : 'transparent', stroke: '#fbbf24' }} />
        ))}
    </div>
);

const PopularCourses: React.FC = () => {
    const refs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        refs.current.forEach((el, i) => {
            if (!el) return;
            const obs = new IntersectionObserver(
                ([e]) => {
                    if (e.isIntersecting) {
                        el.style.transitionDelay = `${i * 100}ms`;
                        el.classList.add('t-visible');
                    }
                },
                { threshold: 0.1 }
            );
            obs.observe(el);
            return () => obs.disconnect();
        });
    }, []);

    return (
        <section className="t-section" id="courses">
            <div className="t-container">
                <div className="t-section-top">
                    <div>
                        <div className="t-section-label">Выбери свой путь</div>
                        <h2 className="t-section-heading">Популярные курсы</h2>
                    </div>
                    <Link to="/courses" className="t-see-all">Все курсы →</Link>
                </div>
                <div className="t-courses-grid">
                    {courses.map(({ Logo, diff, diffClass, name, desc, lessons, rating, href }, i) => (
                        <div key={name} ref={el => { refs.current[i] = el; }} className="t-course-card t-reveal">
                            <Logo />
                            <div className={`t-diff-badge ${diffClass}`}>{diff}</div>
                            <div className="t-course-name">{name}</div>
                            <div className="t-course-desc">{desc}</div>
                            <div className="t-course-meta">
                                <span>{lessons} уроков</span>
                                <Stars n={parseFloat(rating)} />
                                <span>{rating}</span>
                            </div>
                            <Link to={href} className="t-course-btn">Записаться →</Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularCourses;
