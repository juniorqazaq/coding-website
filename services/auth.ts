import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/useAuthStore';
import { useUserStore } from '../stores/useUserStore';
import { useProgressStore } from '../stores/useProgressStore';
import { getSupabaseErrorMessage } from '../utils/supabaseErrors';
import type { Profile } from '../types/database';

export const authService = {
    login: async (email: string, password: string): Promise<Profile> => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw new Error(getSupabaseErrorMessage(error));

        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

        if (profileError || !profile) throw new Error('Профиль не найден');

        // Hydrate stores
        useAuthStore.getState().login(data.user, profile);
        useUserStore.getState().setProfile(profile);

        return profile;
    },

    register: async (email: string, password: string, username: string): Promise<Profile> => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { username } }
        });

        if (error) throw new Error(getSupabaseErrorMessage(error));
        if (!data.user) throw new Error('Не удалось создать аккаунт');

        // Profile is auto-created by DB trigger.
        // Wait a moment for the trigger to complete
        await new Promise(r => setTimeout(r, 500));

        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

        if (profileError || !profile) throw new Error('Профиль не создан. Попробуйте снова');

        useAuthStore.getState().login(data.user, profile);
        useUserStore.getState().setProfile(profile);

        return profile;
    },

    logout: async (): Promise<void> => {
        await supabase.auth.signOut();
        useAuthStore.getState().logout();
        useUserStore.getState().reset();
        useProgressStore.getState().reset();
    },

    getCurrentUser: async (): Promise<Profile | null> => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        return profile ?? null;
    },
};
