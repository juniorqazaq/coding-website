import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressState {
    completedLessons: string[];
    completedQuizzes: string[];
    markLessonComplete: (id: string) => void;
    markQuizComplete: (id: string) => void;
}

export const useProgressStore = create<ProgressState>()(
    persist(
        (set) => ({
            completedLessons: [],
            completedQuizzes: [],

            markLessonComplete: (id) => set((state) => ({
                completedLessons: state.completedLessons.includes(id)
                    ? state.completedLessons
                    : [...state.completedLessons, id]
            })),

            markQuizComplete: (id) => set((state) => ({
                completedQuizzes: state.completedQuizzes.includes(id)
                    ? state.completedQuizzes
                    : [...state.completedQuizzes, id]
            })),
        }),
        {
            name: 'tamasha-progress-storage',
        }
    )
);
