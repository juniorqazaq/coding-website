import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const faqs = [
    { q: 'Подходит ли платформа для полных новичков?', a: 'Да! Tamasha разработана с учётом потребностей начинающих. Мы начинаем с самых основ и постепенно углубляемся. AI-ментор адаптирует темп обучения под тебя.' },
    { q: 'Выдаётся ли сертификат?', a: 'Да, после завершения каждого курса вы получаете blockchain-верифицированный сертификат, который можно добавить в LinkedIn и показать работодателям.' },
    { q: 'Как работает AI-ментор?', a: 'AI-ментор анализирует твой код, стиль решения задач и скорость обучения. На основе этих данных он строит персональный план, подсказывает ошибки и рекомендует следующие шаги.' },
    { q: 'Можно ли учиться в своём темпе?', a: 'Абсолютно. Все уроки записаны и доступны 24/7. Нет дедлайнов — ты учишься тогда, когда удобно тебе.' },
    { q: 'Есть ли возврат денег?', a: 'Да, мы предлагаем 14-дневную гарантию возврата средств без вопросов. Если платформа не подойдёт — вернём деньги.' },
    { q: 'Какие языки программирования есть?', a: 'Python, JavaScript, TypeScript, Java, C++, Go, SQL и другие. Наша облачная IDE поддерживает все популярные языки и фреймворки.' },
];

const FAQ: React.FC = () => {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section className="t-section t-faq-section">
            <div className="t-container">
                <div className="t-section-label" style={{ justifyContent: 'center' }}>Вопросы</div>
                <h2 className="t-section-heading" style={{ textAlign: 'center' }}>Частые вопросы</h2>
                <div className="t-faq-wrap">
                    {faqs.map((f, i) => (
                        <div
                            key={i}
                            className={`t-faq-item ${open === i ? 'open' : ''}`}
                            onClick={() => setOpen(open === i ? null : i)}
                        >
                            <div className="t-faq-q">
                                <div className="t-faq-num">{String(i + 1).padStart(2, '0')}</div>
                                <span>{f.q}</span>
                                <div className="t-faq-plus"><Plus size={16} /></div>
                            </div>
                            <div className="t-faq-a"><p>{f.a}</p></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
