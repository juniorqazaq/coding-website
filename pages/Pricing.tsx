import React from 'react';
import { Check, Star, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Pricing: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#09090f] text-[#f0f0f8] py-20 px-4 page-enter">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
                        Инвестируй в <span className="text-blue-600">Будущее</span>
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Выберите тариф, который подходит именно вам. Получите неограниченный доступ ко всем курсам, проектам и сертификатам.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 items-center">

                    {/* Basic Plan */}
                    <div className="bg-[#13131f] rounded-3xl p-8 border border-[rgba(255,255,255,0.07)] hover:border-[rgba(110,86,255,0.35)] transition-colors relative h-full card-anim hover:-translate-y-1">
                        <h3 className="font-bold text-xl mb-2">Базовый</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-black">Бесплатно</span>
                        </div>
                        <p className="text-gray-500 text-sm mb-6">Идеально для начала обучения и знакомства с платформой.</p>

                        <Link to="/register" className="block w-full py-3 px-6 rounded-xl bg-gray-200 text-gray-900 font-bold text-center hover:bg-gray-300 transition-colors">
                            Начать
                        </Link>

                        <ul className="mt-8 space-y-4">
                            {[
                                "Доступ к бесплатным курсам",
                                "Базовый редактор кода",
                                "Поддержка сообщества",
                                "Ограниченный XP в день"
                            ].map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm">
                                    <Check size={18} className="text-gray-400" />
                                    <span className="text-gray-600">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Pro Plan (Highlighted) */}
                    <div className="bg-[#13131f] text-[#f0f0f8] rounded-[2rem] p-8 border-2 border-[#6e56ff] shadow-2xl shadow-[#6e56ff]/10 relative transform md:-translate-y-4 h-full card-anim">
                        <div className="absolute top-0 right-0 p-3">
                            <div className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                Популярный
                            </div>
                        </div>

                        <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                            Pro <Zap size={20} className="text-yellow-400 fill-current" />
                        </h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-5xl font-black">$19</span>
                            <span className="text-gray-400">/мес</span>
                        </div>
                        <p className="text-gray-500 text-sm mb-6">Для тех, кто хочет быстро освоить программирование.</p>

                        <button className="block w-full py-4 px-6 rounded-xl bg-blue-600 text-white font-bold text-center hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30">
                            Купить Pro
                        </button>

                        <ul className="mt-8 space-y-4">
                            {[
                                "Неограниченный доступ ко ВСЕМУ",
                                "Pro сертификаты",
                                "Приоритетная поддержка",
                                "Сложные проекты",
                                "AI Ментор (Безлимит)"
                            ].map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm font-medium">
                                    <div className="p-1 bg-blue-50 rounded-full">
                                        <Check size={14} className="text-blue-600" />
                                    </div>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Lifetime Plan */}
                    <div className="bg-[#13131f] rounded-3xl p-8 border border-[rgba(255,255,255,0.07)] hover:border-[rgba(110,86,255,0.35)] transition-colors relative h-full card-anim hover:-translate-y-1">
                        <h3 className="font-bold text-xl mb-2">Навсегда</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-4xl font-black">$299</span>
                            <span className="text-gray-500 text-sm font-medium">разово</span>
                        </div>
                        <p className="text-gray-500 text-sm mb-6">Плати один раз — владей вечно. Лучший выбор для профи.</p>

                        <button className="block w-full py-3 px-6 rounded-xl bg-white border-2 border-gray-200 text-gray-900 font-bold text-center hover:border-purple-500 hover:text-purple-500 transition-all">
                            Купить Навсегда
                        </button>

                        <ul className="mt-8 space-y-4">
                            {[
                                "Всё, что есть в Pro",
                                "Пожизненные обновления",
                                "Эксклюзивная роль в Discord",
                                "Ранний доступ к новым фичам"
                            ].map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm">
                                    <Check size={18} className="text-purple-500" />
                                    <span className="text-gray-600">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Feature Grid */}
                <div className="mt-24 grid md:grid-cols-3 gap-8">
                    {[
                        { icon: Shield, title: "Гарантия возврата", desc: "30 дней на возврат средств без лишних вопросов." },
                        { icon: Star, title: "Проверено экспертами", desc: "Программа разработана ветеранами индустрии." },
                        { icon: Zap, title: "Отмена в любое время", desc: "Никаких скрытых платежей или контрактов." }
                    ].map((item, i) => (
                        <div key={i} className="text-center p-6">
                            <div className="inline-flex p-4 rounded-2xl bg-gray-100 mb-4 text-gray-900">
                                <item.icon size={24} />
                            </div>
                            <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                            <p className="text-gray-500 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};
