import { delay } from '../utils';

export interface Problem {
    id: string;
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    topicId: string;
}

export interface SubmitResult {
    success: boolean;
    score: number;
    message: string;
}

const MOCK_PROBLEMS: Record<string, Problem[]> = {
    'python-basics': [
        { id: '1', title: 'Hello World', description: 'Print Hello World', difficulty: 'easy', topicId: 'python-basics' }
    ]
};

export const problemsService = {
    getProblems: async (topicId: string, difficulty: string): Promise<Problem[]> => {
        await delay(500);
        // Mock filtering logic based on our MOCK_PROBLEMS structure
        const problemsForTopic = MOCK_PROBLEMS[topicId] || [];
        if (difficulty === 'all') return problemsForTopic;
        return problemsForTopic.filter(p => p.difficulty === difficulty);
    },

    submitSolution: async (problemId: string, code: string): Promise<SubmitResult> => {
        await delay(1000); // Simulate code execution judge

        // Simulate simple validation logic for presentation
        if (code.includes('return') && code.length > 20) {
            return {
                success: true,
                score: 100,
                message: 'Все тесты пройдены успешно!'
            };
        } else if (code.length < 5) {
            return {
                success: false,
                score: 0,
                message: 'Ошибка синтаксиса или пустое решение'
            };
        } else {
            return {
                success: false,
                score: 40,
                message: 'Пройдено 2 из 5 тестов. Проверьте граничные случаи.'
            };
        }
    }
};
