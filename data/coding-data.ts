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
        title: 'Algorithms',
        description: 'Master sorting, searching, and logic.',
        icon: Calculator,
        color: 'purple',
        totalProblems: 40,
        solvedProblems: 12
    },
    {
        id: 'data-structures',
        title: 'Data Structures',
        description: 'Arrays, Lists, Trees, and Graphs.',
        icon: Database,
        color: 'blue',
        totalProblems: 35,
        solvedProblems: 5
    },
    {
        id: 'logic',
        title: 'Logic',
        description: 'Conditions, loops, and boolean algebra.',
        icon: Brain,
        color: 'emerald',
        totalProblems: 25,
        solvedProblems: 20
    },
    {
        id: 'python-basics',
        title: 'Python Basics',
        description: 'Syntax, variables, and data types.',
        icon: Terminal,
        color: 'orange',
        totalProblems: 50,
        solvedProblems: 0
    },
    {
        id: 'frontend',
        title: 'Frontend',
        description: 'DOM manipulation and UI logic.',
        icon: Globe,
        color: 'pink',
        totalProblems: 15,
        solvedProblems: 0
    },
    {
        id: 'backend',
        title: 'Backend',
        description: 'APIs, routing, and databases.',
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
        title: 'Two Sum',
        description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.',
        xp: 30,
        starterCode: 'def two_sum(nums, target):\n    # Your code here\n    pass',
        hints: ['Use a dictionary to store seen numbers.', 'target - current_num is what you need.'],
        status: 'solved'
    },
    {
        id: 'algo-e-2',
        topicId: 'algorithms',
        difficulty: 'Easy',
        title: 'Contains Duplicate',
        description: 'Given an integer array `nums`, return `true` if any value appears at least twice in the array.',
        xp: 30,
        starterCode: 'def contains_duplicate(nums):\n    # Your code here\n    pass',
        hints: ['Sets are great for unique elements.'],
        status: 'unlocked'
    },
    {
        id: 'algo-e-3',
        topicId: 'algorithms',
        difficulty: 'Easy',
        title: 'Valid Anagram',
        description: 'Given two strings s and t, return true if t is an anagram of s.',
        xp: 30,
        starterCode: 'def is_anagram(s, t):\n    pass',
        hints: ['Compare sorted strings or character counts.'],
        status: 'unlocked'
    },

    // --- Algorithms: Medium ---
    {
        id: 'algo-m-1',
        topicId: 'algorithms',
        difficulty: 'Medium',
        title: 'Group Anagrams',
        description: 'Given an array of strings, group the anagrams together.',
        xp: 70,
        starterCode: 'def group_anagrams(strs):\n    pass',
        hints: ['Use sorted string as key for dictionary.'],
        status: 'locked'
    },

    // --- Logic: Easy ---
    {
        id: 'logic-e-1',
        topicId: 'logic',
        difficulty: 'Easy',
        title: 'FizzBuzz',
        description: 'Print numbers 1 to n. Check criteria for Fizz, Buzz, and FizzBuzz.',
        xp: 30,
        starterCode: 'def fizz_buzz(n):\n    pass',
        hints: ['Check % 15 first!'],
        status: 'solved'
    }
];
