import { LucideIcon, Brain, Calculator, Database, Globe, Server, Terminal, Code2, Cpu } from 'lucide-react';

// --- Interfaces ---

export interface Topic {
    id: string;
    title: string;
    description: string;
    icon: any; // LucideIcon type strictly is annoying with imports sometimes, 'any' is safe for MVP
    color: 'blue' | 'purple' | 'emerald' | 'orange' | 'pink' | 'cyan';
    totalProblems: number;
    solvedProblems: number;
}

export interface Problem {
    id: string;
    topicId: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    title: string;
    description: string;
    xp: number;
    starterCode: string;
    hints: string[];
    status: 'locked' | 'unlocked' | 'solved';
}

// --- MOCK DATA ---

export const CODING_TOPICS: Topic[] = [
    {
        id: 'algorithms',
        title: 'Алгоритмы',
        description: 'Освойте сортировку, поиск и логику.',
        icon: Calculator,
        color: 'purple',
        totalProblems: 40,
        solvedProblems: 12
    },
    {
        id: 'data-structures',
        title: 'Структуры Данных',
        description: 'Массивы, Списки, Деревья и Графы.',
        icon: Database,
        color: 'blue',
        totalProblems: 35,
        solvedProblems: 5
    },
    {
        id: 'logic',
        title: 'Логика',
        description: 'Условия, циклы и булева алгебра.',
        icon: Brain,
        color: 'emerald',
        totalProblems: 25,
        solvedProblems: 20
    },
    {
        id: 'python-basics',
        title: 'Основы Python',
        description: 'Синтаксис, переменные и типы данных.',
        icon: Terminal,
        color: 'orange',
        totalProblems: 50,
        solvedProblems: 0
    },
    {
        id: 'frontend',
        title: 'Фронтенд',
        description: 'Манипуляция DOM и логика UI.',
        icon: Globe,
        color: 'pink',
        totalProblems: 15,
        solvedProblems: 0
    },
    {
        id: 'backend',
        title: 'Бэкенд',
        description: 'API, маршрутизация и базы данных.',
        icon: Server,
        color: 'cyan',
        totalProblems: 20,
        solvedProblems: 0
    }
];

export const MOCK_PROBLEMS: Problem[] = [
    // --- Algortihms: Easy ---
    {
        id: 'algo-e-1',
        topicId: 'algorithms',
        difficulty: 'Easy',
        title: 'Сумма Двух (Two Sum)',
        description: 'Дан массив целых чисел `nums` и целое число `target`. Верните индексы двух чисел так, чтобы они в сумме давали `target`.',
        xp: 30,
        starterCode: 'def two_sum(nums, target):\n    # Ваш код здесь\n    pass',
        hints: ['Используйте словарь (dictionary) для хранения уже просмотренных чисел.', 'Вам нужно найти число, равное: target - current_num.'],
        status: 'solved'
    },
    {
        id: 'algo-e-2',
        topicId: 'algorithms',
        difficulty: 'Easy',
        title: 'Содержит Дубликаты',
        description: 'Дан массив целых чисел `nums`. Верните `true`, если какое-либо значение встречается в массиве как минимум дважды.',
        xp: 30,
        starterCode: 'def contains_duplicate(nums):\n    # Ваш код здесь\n    pass',
        hints: ['Множества (sets) отлично подходят для поиска уникальных элементов.'],
        status: 'unlocked'
    },
    {
        id: 'algo-e-3',
        topicId: 'algorithms',
        difficulty: 'Easy',
        title: 'Правильная Анаграмма',
        description: 'Даны две строки s и t, верните true, если t является анаграммой s.',
        xp: 30,
        starterCode: 'def is_anagram(s, t):\n    pass',
        hints: ['Сравните отсортированные строки или частотность появления символов.'],
        status: 'unlocked'
    },

    // --- Algorithms: Medium ---
    {
        id: 'algo-m-1',
        topicId: 'algorithms',
        difficulty: 'Medium',
        title: 'Группировка Анаграмм',
        description: 'Дан массив строк, сгруппируйте анаграммы вместе.',
        xp: 70,
        starterCode: 'def group_anagrams(strs):\n    pass',
        hints: ['Используйте отсортированную строку как ключ в словаре.'],
        status: 'locked'
    },

    // --- Logic: Easy ---
    {
        id: 'logic-e-1',
        topicId: 'logic',
        difficulty: 'Easy',
        title: 'FizzBuzz',
        description: 'Выведите числа от 1 до n. Проверьте условия для Fizz (делится на 3), Buzz (на 5) и FizzBuzz (на 15).',
        xp: 30,
        starterCode: 'def fizz_buzz(n):\n    pass',
        hints: ['Сначала проверяйте условие % 15!'],
        status: 'solved'
    }
];
