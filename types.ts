import { LucideIcon } from 'lucide-react';

export interface User {
  name: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz' | 'code';
  completed: boolean;
  locked: boolean;
  content?: string; // Markdown content
  initialCode?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  lessonsCount: number;
  progress?: number; // 0-100
  lessons: Lesson[];
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  date: string;
}

// Mock Data
export const MOCK_USER: User = {
  name: "Alikhan",
  avatar: "https://picsum.photos/100/100",
  xp: 12450,
  level: 12,
  streak: 5
};

export const COURSES: Course[] = [
  {
    id: "react-101",
    title: "React Fundamentals",
    description: "Master the basics of React, including components, state, and props.",
    thumbnail: "https://picsum.photos/400/250?random=1",
    tags: ["Frontend", "React", "JS"],
    difficulty: "Beginner",
    lessonsCount: 12,
    progress: 45,
    lessons: [
      { id: "l1", title: "Introduction to JSX", duration: "5 min", type: "reading", completed: true, locked: false, content: "# Welcome to JSX\nJSX is a syntax extension for JavaScript..." },
      { id: "l2", title: "Your First Component", duration: "10 min", type: "code", completed: false, locked: false, initialCode: "function Welcome() {\n  return <h1>Hello, World</h1>;\n}" },
      { id: "l3", title: "State and Props", duration: "15 min", type: "code", completed: false, locked: true },
      { id: "l4", title: "Rendering Lists", duration: "12 min", type: "code", completed: false, locked: true },
    ]
  },
  {
    id: "ts-mastery",
    title: "TypeScript Mastery",
    description: "Build robust applications with static typing.",
    thumbnail: "https://picsum.photos/400/250?random=2",
    tags: ["Typescript", "Web"],
    difficulty: "Intermediate",
    lessonsCount: 24,
    progress: 10,
    lessons: []
  },
  {
    id: "node-backend",
    title: "Node.js Microservices",
    description: "Scalable backend architecture with Node and Docker.",
    thumbnail: "https://picsum.photos/400/250?random=3",
    tags: ["Backend", "Node"],
    difficulty: "Advanced",
    lessonsCount: 18,
    progress: 0,
    lessons: []
  },
  {
    id: "python",
    title: "Python Programming",
    description: "Complete Python course from basics to advanced. Covers lists, loops, functions, and more.",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Backend", "Python"],
    difficulty: "Beginner",
    lessonsCount: 28,
    progress: 0,
    lessons: []
  }
];