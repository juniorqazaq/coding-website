import React, { useEffect, useRef } from 'react';
import { Bot, Code2, Trophy, FileBadge, Users, Map } from 'lucide-react';

const features = [
    {
        icon: Bot,
        title: 'AI-Ментор',
        desc: 'Персональный AI анализирует твой код и стиль обучения, выстраивает индивидуальную программу в реальном времени.',
        wide: true,
    },
    {
        icon: Code2,
        title: 'Облачная IDE',
        desc: 'Пиши код прямо в браузере. Полноценный редактор с терминалом и поддержкой всех фреймворков.',
        tall: true,
    },
    {
        icon: Trophy,
        title: 'XP и геймификация',
        desc: 'Выполняй задачи — зарабатывай XP, удерживай streak, поднимайся в лидерборде.',
    },
    {
        icon: FileBadge,
        title: 'Сертификат',
        desc: 'Blockchain-верифицированный сертификат, который признают работодатели.',
    },
    {
        icon: Users,
        title: 'Комьюнити',
        desc: '12 000+ разработчиков. Code review, хакатоны, нетворкинг.',
    },
    {
        icon: Map,
        title: 'Роадмап',
        desc: 'AI автоматически строит твой личный путь обучения.',
    },
];

const Features: React.FC = () => {
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        cardRefs.current.forEach((el, i) => {
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        el.style.transitionDelay = `${i * 80}ms`;
                        el.classList.add('t-visible');
                    }
                },
                { threshold: 0.1 }
            );
            obs.observe(el);
            return () => obs.disconnect();
        });
    }, []);

    const topRow = features.slice(0, 2);
    const bottomRow = features.slice(2);

    return (
        <section className="t-section" id="features">
            <div className="t-container">
                <div className="t-section-label">Почему Tamasha</div>
                <h2 className="t-section-heading">Всё для твоего роста — в одном месте</h2>

                {/* Top row: wide (AI) + tall (IDE) */}
                <div className="t-bento-grid" style={{ position: 'relative' }}>
                    <div
                        ref={el => { cardRefs.current[0] = el; }}
                        className="t-bc t-reveal t-bento-wide"
                    >
                        <div className="t-bc-icon"><Bot size={20} /></div>
                        <div className="t-bc-title">{topRow[0].title}</div>
                        <div className="t-bc-desc">{topRow[0].desc}</div>
                    </div>
                    <div
                        ref={el => { cardRefs.current[1] = el; }}
                        className="t-bc t-reveal t-bento-tall"
                        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
                    >
                        <div className="t-bc-icon"><Code2 size={20} /></div>
                        <div className="t-bc-title">{topRow[1].title}</div>
                        <div className="t-bc-desc">{topRow[1].desc}</div>
                    </div>

                    {/* Bottom 4 cards */}
                    <div className="t-bento-bottom">
                        {bottomRow.map((f, i) => {
                            const Icon = f.icon;
                            return (
                                <div
                                    key={f.title}
                                    ref={el => { cardRefs.current[i + 2] = el; }}
                                    className="t-bc t-reveal"
                                >
                                    <div className="t-bc-icon"><Icon size={20} /></div>
                                    <div className="t-bc-title">{f.title}</div>
                                    <div className="t-bc-desc">{f.desc}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
