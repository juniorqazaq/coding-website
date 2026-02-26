import React, { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
    {
        text: 'До Tamasha работала в Call-центре. За 8 месяцев изучила Python и Data Science. Сейчас Data Analyst в Kaspi.kz с зарплатой втрое выше.',
        name: 'Алия Нурбек', role: 'Data Analyst @ Kaspi.kz',
        initials: 'АН', badge: 'Новая работа', mid: false,
    },
    {
        text: 'Реакт курс дал мне всё для старта. Первый фриланс взял через 2 недели после окончания. Теперь имею стабильный доход как Frontend Developer. Очень рекомендую всем, кто хочет войти в IT.',
        name: 'Санжар Алиев', role: 'Frontend Dev, Freelance',
        initials: 'СА', badge: 'Повышение', mid: true,
    },
    {
        text: 'System Design курс — лучшее вложение. Прошла интервью в 3 компании и получила оффер от международного стартапа с релокацией.',
        name: 'Дана Сейткали', role: 'Software Engineer @ Berlin',
        initials: 'ДС', badge: 'Новая работа', mid: false,
    },
];

const Testimonials: React.FC = () => {
    const refs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        refs.current.forEach((el, i) => {
            if (!el) return;
            const obs = new IntersectionObserver(
                ([e]) => {
                    if (e.isIntersecting) {
                        el.style.transitionDelay = `${i * 110}ms`;
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
        <section className="t-section" id="about">
            <div className="t-container">
                <div className="t-section-label">Истории успеха</div>
                <h2 className="t-section-heading">Они изменили жизнь. Ты тоже сможешь.</h2>
                <div className="t-t-grid">
                    {testimonials.map((t, i) => (
                        <div
                            key={t.name}
                            ref={el => { refs.current[i] = el; }}
                            className={`t-tc t-reveal ${t.mid ? 't-tc-mid' : ''}`}
                        >
                            <span className="t-quote">"</span>
                            <p className="t-tc-text">{t.text}</p>
                            <div className="t-tc-stars">
                                {Array.from({ length: 5 }).map((_, idx) => (
                                    <Star key={idx} size={13} style={{ fill: '#fbbf24', stroke: 'none' }} />
                                ))}
                            </div>
                            <div className="t-tc-footer">
                                <div className="t-avatar">{t.initials}</div>
                                <div>
                                    <div className="t-tc-name">{t.name}</div>
                                    <div className="t-tc-role">{t.role}</div>
                                </div>
                                <div className="t-tc-badge">{t.badge}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
