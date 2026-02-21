import React, { useState } from 'react';
import { Search, Filter, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Local type definition to match the new design requirements
interface Course {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  progress: number;
  image: string;
  tags: string[];
}

const categories = ['Все', 'Frontend', 'Backend', 'DevOps', 'Mobile', 'AI & ML'];

const courses: Course[] = [
  // Frontend
  {
    id: '1',
    title: 'React.js: С Нуля до Профи',
    description: 'Полный курс по React. Хуки, Redux, оптимизация производительности и паттерны проектирования.',
    level: 'Beginner',
    category: 'Frontend',
    progress: 45,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'JavaScript', 'Frontend']
  },
  {
    id: '2',
    title: 'Продвинутый TypeScript',
    description: 'Глубокое погружение в типизацию. Дженерики, утилиты, декораторы и настройка компилятора.',
    level: 'Intermediate',
    category: 'Frontend',
    progress: 10,
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=80',
    tags: ['TypeScript', 'Web']
  },
  {
    id: '3',
    title: 'CSS и Современная Верстка',
    description: 'Flexbox, Grid, адаптивность и анимации. Создавайте красивые интерфейсы с Tailwind CSS.',
    level: 'Beginner',
    category: 'Frontend',
    progress: 0,
    image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&w=800&q=80',
    tags: ['CSS', 'HTML', 'Design']
  },
  {
    id: '4',
    title: 'Vue.js 3 Мастер-класс',
    description: 'Разработка на Vue 3 Composition API. Pinia, Vue Router и создание PWA приложений.',
    level: 'Intermediate',
    category: 'Frontend',
    progress: 0,
    image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&q=80', // coding Setup
    tags: ['Vue', 'JavaScript']
  },

  // Backend
  {
    id: '5',
    title: 'Node.js Микросервисы',
    description: 'Архитектура масштабируемых систем. Express, NestJS, Message Queues и Docker.',
    level: 'Advanced',
    category: 'Backend',
    progress: 0,
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80',
    tags: ['Node', 'Microservices']
  },
  {
    id: '6',
    title: 'Python для Бэкенда',
    description: 'Разработка API на Django и FastAPI. Работа с базами данных PostgreSQL и Redis.',
    level: 'Intermediate',
    category: 'Backend',
    progress: 0,
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=80',
    tags: ['Python', 'Django', 'FastAPI']
  },
  {
    id: '7',
    title: 'Java Spring Boot',
    description: 'Корпоративная разработка на Java. Hibernate, Security, Cloud и микросервисы.',
    level: 'Advanced',
    category: 'Backend',
    progress: 0,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80', // Laptop code
    tags: ['Java', 'Spring']
  },
  {
    id: '8',
    title: 'Go (Golang) Разработка',
    description: 'Высокопроизводительные серверы. Конкурентность, каналы и системное программирование.',
    level: 'Intermediate',
    category: 'Backend',
    progress: 0,
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=800&q=80',
    tags: ['Go', 'Backend']
  },

  // DevOps
  {
    id: '9',
    title: 'Docker и Kubernetes',
    description: 'Контейнеризация и оркестрация. CI/CD пайплайны, Helm чарты и мониторинг.',
    level: 'Advanced',
    category: 'DevOps',
    progress: 0,
    image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=800&q=80', // Server rack
    tags: ['DevOps', 'Docker', 'K8s']
  },
  {
    id: '10',
    title: 'AWS Cloud Architect',
    description: 'Облачная инфраструктура. EC2, S3, Lambda, RDS и построение serverless решений.',
    level: 'Advanced',
    category: 'DevOps',
    progress: 0,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    tags: ['AWS', 'Cloud']
  },
  {
    id: '11',
    title: 'Linux Администрирование',
    description: 'Основы Linux, Bash скриптинг, сетевая безопасность и управление серверами.',
    level: 'Beginner',
    category: 'DevOps',
    progress: 0,
    image: 'https://images.unsplash.com/photo-1629654291663-b888eb1a6039?auto=format&fit=crop&w=800&q=80',
    tags: ['Linux', 'Bash']
  },

  // Mobile
  {
    id: '12',
    title: 'Flutter Разработка',
    description: 'Кроссплатформенные приложения на Dart. Красивый UI и нативная производительность.',
    level: 'Beginner',
    category: 'Mobile',
    progress: 0,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80', // Mobile
    tags: ['Flutter', 'Dart', 'Mobile']
  },
  {
    id: '13',
    title: 'iOS Разработка (Swift)',
    description: 'Создание приложений для iPhone и iPad. SwiftUI, UIKit и публикация в App Store.',
    level: 'Intermediate',
    category: 'Mobile',
    progress: 0,
    image: 'https://images.unsplash.com/photo-1599658880436-c61792e70672?auto=format&fit=crop&w=800&q=80', // iPhone
    tags: ['iOS', 'Swift']
  },
  {
    id: '14',
    title: 'Android (Kotlin)',
    description: 'Современная Android разработка. Jetpack Compose, Coroutines и Material Design.',
    level: 'Intermediate',
    category: 'Mobile',
    progress: 0,
    image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=800&q=80', // Android phone
    tags: ['Android', 'Kotlin']
  },

  // AI & ML
  {
    id: '15',
    title: 'Data Science с Python',
    description: 'Анализ данных с Pandas, визуализация Matplotlib и машинное обучение Scikit-learn.',
    level: 'Beginner',
    category: 'AI & ML',
    progress: 0,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', // Charts
    tags: ['Data Science', 'Python', 'ML']
  },
  {
    id: '16',
    title: 'Нейронные Сети',
    description: 'Глубокое обучение с TensorFlow и PyTorch. Компьютерное зрение и NLP.',
    level: 'Advanced',
    category: 'AI & ML',
    progress: 0,
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80', // Brain/AI art
    tags: ['AI', 'Deep Learning']
  },
  {
    id: '17',
    title: 'LLM и Generative AI',
    description: 'Работа с большими языковыми моделями. Prompt Engineering и создание AI-агентов.',
    level: 'Advanced',
    category: 'AI & ML',
    progress: 0,
    image: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?auto=format&fit=crop&w=800&q=80', // Futuristic AI
    tags: ['LLM', 'AI', 'GPT']
  }
];

export const Courses: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'Все' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="courses" className="py-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Controls */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6"
        >
          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Найти технологию..."
              className="block w-full pl-11 pr-4 py-4 border border-gray-200 rounded-2xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white sm:text-sm transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button className="flex items-center px-6 py-3.5 bg-white border border-gray-200 rounded-2xl text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
            <Filter className="w-5 h-5 mr-2 text-gray-500" />
            Фильтры
          </button>
        </motion.div>

        {/* Categories */}
        <motion.div
          className="flex flex-wrap gap-2 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category, idx) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${selectedCategory === category
                ? 'bg-gray-900 text-white shadow-lg scale-105'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Course Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence>
            {filteredCourses.map((course) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={course.id}
                className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-primary-900/10 transition-all duration-500 flex flex-col h-full hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-xs font-bold text-gray-900 shadow-sm">
                      {course.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow relative">
                  {/* Level Tag */}
                  <div className="mb-3">
                    <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-white shadow-sm ${course.level === 'Beginner' ? 'bg-emerald-500' :
                      course.level === 'Intermediate' ? 'bg-amber-500' : 'bg-rose-500'
                      }`}>
                      {course.level === 'Beginner' ? 'Новичок' : course.level === 'Intermediate' ? 'Средний' : 'Продвинутый'}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-primary-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-sm font-semibold text-blue-600 group-hover:underline">
                      Подробнее
                    </span>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-900 hover:bg-primary-600 hover:text-white transition-all group-hover:scale-110">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
