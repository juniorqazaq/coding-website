import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
    {
        name: 'Старт', tagline: 'Для знакомства с платформой',
        monthly: 0, yearly: 0,
        features: [
            { label: '10 бесплатных уроков', ok: true },
            { label: 'Базовая IDE', ok: true },
            { label: 'Доступ к комьюнити', ok: true },
            { label: 'Все курсы', ok: false },
            { label: 'AI-ментор', ok: false },
            { label: 'Сертификаты', ok: false },
        ],
        cta: 'Начать бесплатно', btnClass: 't-pb-outline', popular: false,
    },
    {
        name: 'Про', tagline: 'Для серьёзного роста',
        monthly: 4990, yearly: 2994,
        features: [
            { label: 'Всё из Старта', ok: true },
            { label: 'Все курсы', ok: true },
            { label: 'AI-ментор', ok: true },
            { label: 'Облачная IDE', ok: true },
            { label: 'Сертификаты', ok: true },
            { label: 'Приоритетная поддержка', ok: true },
        ],
        cta: 'Начать Про', btnClass: 't-pb-fill', popular: true,
    },
    {
        name: 'Команда', tagline: 'Для корпоративного обучения',
        monthly: 12990, yearly: 7794,
        features: [
            { label: 'Всё из Про', ok: true },
            { label: 'До 10 участников', ok: true },
            { label: 'Корпоративный дашборд', ok: true },
            { label: 'Выделенный ментор', ok: true },
            { label: 'API доступ', ok: true },
            { label: 'SLA поддержка', ok: true },
        ],
        cta: 'Написать нам', btnClass: 't-pb-dark', popular: false,
    },
];

const PricingSection: React.FC = () => {
    const [yearly, setYearly] = useState(false);

    return (
        <section className="t-section t-pricing-section" id="pricing">
            <div className="t-container">
                <div className="t-section-label">Тарифы</div>
                <h2 className="t-section-heading">Инвестиция в себя</h2>

                <div className="t-toggle-wrap">
                    <span className={!yearly ? 't-toggle-active' : ''}>Месяц</span>
                    <button
                        className={`t-toggle-pill ${yearly ? 'on' : ''}`}
                        onClick={() => setYearly(!yearly)}
                    >
                        <span className="t-toggle-thumb" />
                    </button>
                    <span className={yearly ? 't-toggle-active' : ''}>
                        Год <span className="t-toggle-badge">−40%</span>
                    </span>
                </div>

                <div className="t-pricing-grid">
                    {plans.map(p => (
                        <div key={p.name} className={`t-pc ${p.popular ? 't-pc-pop' : ''}`}>
                            {p.popular && <div className="t-pop-lbl">Самый популярный</div>}
                            <div className="t-plan-name">{p.name}</div>
                            <div className="t-plan-tagline">{p.tagline}</div>
                            <div className="t-plan-price">
                                <span className="t-plan-amount">
                                    {(yearly ? p.yearly : p.monthly).toLocaleString('ru')}
                                </span>
                                <span className="t-plan-per"> ₸/мес</span>
                            </div>
                            <ul className="t-plan-features">
                                {p.features.map(f => (
                                    <li key={f.label} className={`t-plan-feat ${f.ok ? 't-feat-ok' : 't-feat-no'}`}>
                                        {f.ok ? <Check size={16} /> : <X size={16} />}
                                        {f.label}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/register" className={`t-plan-btn ${p.btnClass}`}>{p.cta}</Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
