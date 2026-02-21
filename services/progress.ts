import { useProgressStore } from '../stores/useProgressStore';

import { delay } from '../utils';

export interface ProgressData {
    completedLessons: string[];
    totalProgress: number;
}

export const progressService = {
    getProgress: async (userId: string): Promise<ProgressData> => {
        await delay(200);
        const { completedLessons } = useProgressStore.getState();
        // Simulate calculated progress
        const totalProgress = Math.round((completedLessons.length / 68) * 100);
        return {
            completedLessons,
            totalProgress
        };
    },

    saveLessonProgress: async (lessonId: string, completed: boolean): Promise<void> => {
        await delay(200);
        const store = useProgressStore.getState();
        if (completed) {
            store.markLessonComplete(lessonId);
        }
    },

    getCompletedLessons: async (userId: string): Promise<string[]> => {
        await delay(200);
        const { completedLessons } = useProgressStore.getState();
        return Array.from(completedLessons);
    }
};
