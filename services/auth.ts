import { User, MOCK_USER } from '../types';

import { delay } from '../utils';

export const authService = {
    login: async (email: string, password: string): Promise<User> => {
        await delay(400);
        // Dummy check for presentation
        if (email && password) {
            return MOCK_USER;
        }
        throw new Error('Invalid credentials');
    },

    register: async (email: string, password: string, name: string): Promise<User> => {
        await delay(400);
        if (email && password && name) {
            return { ...MOCK_USER, name };
        }
        throw new Error('Invalid information');
    },

    logout: async (): Promise<void> => {
        await delay(200);
    }
};
