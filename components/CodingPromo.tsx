import React, { useEffect, useRef, useState } from 'react';

const CODE = `function findMax(arr: number[]): number {
  if (!arr.length) return 0;
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}

const nums = [3, 1, 4, 1, 5, 9, 2, 6];
console.log("Максимум:", findMax(nums));
// Output: 9`;

const CodingPromo: React.FC = () => {
    const [displayed, setDisplayed] = useState('');
    const [typed, setTyped] = useState(false);
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting && !typed) {
                    setTyped(true);
                    let i = 0;
                    const iv = setInterval(() => {
                        i++;
                        setDisplayed(CODE.slice(0, i));
                        if (i >= CODE.length) clearInterval(iv);
                    }, 25);
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [typed]);

    return (
        <section className="t-section t-promo-section" ref={ref} id="demo">
            <div className="t-container">
                <div className="t-section-label">Задача дня</div>
                <h2 className="t-section-heading">Попробуй прямо сейчас</h2>
                <div className="t-promo-split">
                    <div className="t-promo-left">
                        <div style={{
                            display: 'inline-block', padding: '4px 12px',
                            background: 'rgba(34,197,94,0.08)',
                            border: '1px solid rgba(34,197,94,0.2)',
                            borderRadius: 100, color: '#22c55e',
                            fontSize: 11, fontWeight: 700,
                            fontFamily: 'var(--font-mono)',
                        }}>Лёгкий</div>
                        <div className="t-promo-title">Найти максимум в массиве</div>
                        <div className="t-promo-desc">
                            Напишите функцию, которая принимает массив чисел и возвращает наибольшее значение без использования встроенных методов.
                        </div>
                        <div className="t-promo-xp">⚡ +20 XP за решение</div>
                        <a href="/register" className="t-btn-primary" style={{ width: 'fit-content' }}>Попробуй сам →</a>
                    </div>
                    <div className="t-promo-right">
                        <div className="t-editor t-promo-editor">
                            <div className="t-editor-chrome">
                                <div className="t-traffic">
                                    <span className="t-tl t-tl-r" />
                                    <span className="t-tl t-tl-y" />
                                    <span className="t-tl t-tl-g" />
                                </div>
                                <div className="t-editor-tab">
                                    <div className="t-ts-badge">TS</div>
                                    solution.ts
                                </div>
                            </div>
                            <div className="t-promo-code-body">
                                <pre className="t-promo-code">{displayed}<span className="t-cur" /></pre>
                            </div>
                            <div className="t-promo-bar">
                                <div className="t-out-line"><span className="t-out-check">✓</span>&nbsp;Максимум: 9</div>
                                <button className="t-run-btn">▶ Запустить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CodingPromo;
