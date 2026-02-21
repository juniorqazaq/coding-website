import { create } from 'zustand';
import type { User } from '@supabase/supabase-js';
import type { Profile } from '../types/database';

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    profile: Profile | null;
    userId: string | null;
    isLoading: boolean;
    login: (user: User, profile: Profile) => void;
    logout: () => void;
    setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    profile: null,
    userId: null,
    isLoading: true, // true on initial load until session is checked

    login: (user, profile) => set({
        isAuthenticated: true,
        user,
        profile,
        userId: user.id,
        isLoading: false,
    }),

    logout: () => set({
        isAuthenticated: false,
        user: null,
        profile: null,
        userId: null,
        isLoading: false,
    }),

    setLoading: (loading) => set({ isLoading: loading }),
}));
