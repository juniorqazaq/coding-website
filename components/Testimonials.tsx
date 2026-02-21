import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
    const reviews = [
        {
            id: 1,
            name: "Алия Нурбек",
            role: "Студент курса Python",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
            content: "Tamasha помогла мне перейти из финансов в Data Science всего за 4 месяца. AI-ментор — это просто находка!",
            rating: 5
        },
        {
            id: 2,
            name: "Санжар Алиев",
            role: "Frontend Разработчик",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
            content: "Интерактивная среда обучения просто потрясающая. Я создал свой первый сайт-портфолио сразу после курса React.",
            rating: 5
        },
        {
            id: 3,
            name: "Дана Ким",
            role: "UX Дизайнер",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
            content: "Мне нравится подход к обучению через дизайн. Это сделало понимание CSS и анимаций намного проще.",
            rating: 5
        },
        {
            id: 4,
            name: "Ержан Сатпаев",
            role: "Full Stack Разработчик",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
            content: "Керемет курс! Мен Java мен Spring Boot-ты нөлден бастап үйрендім. Қазір мен үлкен IT компанияда жұмыс істеймін.",
            rating: 5
        },
        {
            id: 5,
            name: "Айгерим Болат",
            role: "Data Analyst",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
            content: "Data Science курсы маған деректермен дұрыс жұмыс істеуді үйретті. Жобалар өте қызықты болды.",
            rating: 5
        },
        {
            id: 6,
            name: "Мақсат Оспанов",
            role: "Mobile Developer",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
            content: "Flutter курсынан кейін мен өзімнің алғашқы қосымшамды App Store-ға жүктедім. Рахмет Tamasha!",
            rating: 5
        }
    ];

    const carouselRef = React.useRef<HTMLDivElement>(null);
    const [width, setWidth] = React.useState(0);

    React.useEffect(() => {
        if (carouselRef.current) {
            setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
        }
    }, []);

    return (
        <section className="bg-white dark:bg-[#0b1220] py-24 px-4 overflow-hidden relative transition-colors duration-300">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 dark:bg-blue-900/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50/50 dark:bg-indigo-900/10 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase text-sm"
                    >
                        Истории Успеха
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4"
                    >
                        Любим Студентами
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500 dark:text-gray-400 text-lg"
                    >
                        Присоединяйтесь к тысячам учеников, которые изменили свою карьеру с Tamasha.
                    </motion.p>
                </div>
            </div>

            <div
                ref={carouselRef}
                className="cursor-grab active:cursor-grabbing overflow-hidden w-full"
            >
                <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                    <motion.div
                        drag="x"
                        dragConstraints={{ right: 0, left: -width }}
                        className="flex gap-6 md:gap-8"
                    >
                        {reviews.map((review, index) => (
                            <motion.div
                                key={review.id}
                                className="min-w-[300px] md:min-w-[400px] bg-gray-50 dark:bg-[#1e293b] rounded-3xl p-8 relative group hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 border border-transparent hover:border-blue-100 dark:border-gray-800 dark:hover:border-blue-900/30"
                            >
                                <Quote className="absolute top-8 right-8 text-blue-100 dark:text-blue-900/30 w-10 h-10 group-hover:text-blue-200 dark:group-hover:text-blue-800 transition-colors" />

                                <div className="flex items-center gap-1 mb-6">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>

                                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8 relative z-10 min-h-[84px]">
                                    "{review.content}"
                                </p>

                                <div className="flex items-center gap-4">
                                    <img
                                        src={review.image}
                                        alt={review.name}
                                        className="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-gray-700"
                                    />
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white">{review.name}</h4>
                                        <p className="text-sm text-blue-600 dark:text-blue-400">{review.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
