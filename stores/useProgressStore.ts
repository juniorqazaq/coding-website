import { create } from 'zustand';

interface ProgressState {
    completedLessons: string[];
    completedQuizzes: string[];
    isLoading: boolean;
    markLessonComplete: (id: string) => void;
    markQuizComplete: (id: string) => void;
    setCompletedLessons: (ids: string[]) => void;
    setCompletedQuizzes: (ids: string[]) => void;
    reset: () => void;
}

export const useProgressStore = create<ProgressState>((set) => ({
    completedLessons: [],
    completedQuizzes: [],
    isLoading: false,

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

    setCompletedLessons: (ids) => set({ completedLessons: ids }),
    setCompletedQuizzes: (ids) => set({ completedQuizzes: ids }),
    reset: () => set({ completedLessons: [], completedQuizzes: [], isLoading: false }),
}));
