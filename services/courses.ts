import { Course, COURSES } from '../types';

import { delay } from '../utils';

export const coursesService = {
    getCourses: async (): Promise<Course[]> => {
        await delay(300);
        return COURSES;
    },

    getCourseById: async (id: string): Promise<Course | null> => {
        await delay(300);
        const course = COURSES.find(c => c.id === id);
        return course || null;
    },

    enrollCourse: async (courseId: string): Promise<void> => {
        await delay(400);
        // In a real app we would call backend to associate user with course
        console.log(`Enrolled in course ${courseId}`);
    }
};
