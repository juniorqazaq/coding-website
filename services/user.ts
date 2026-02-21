import { supabase } from '../lib/supabase';
import { useUserStore } from '../stores/useUserStore';
import { useUIStore } from '../stores/useUIStore';
import type { Profile } from '../types/database';

const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500, 5500, 6600, 8000, 10000];

const calculateLevel = (xp: number): number => {
    let level = 1;
    for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
        if (xp >= LEVEL_THRESHOLDS[i]) level = i + 1;
        else break;
    }
    return level;
};

export const userService = {
    getProfile: async (userId: string): Promise<Profile | null> => {
        const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
        return data ?? null;
    },

    updateProfile: async (userId: string, updates: Partial<Omit<Profile, 'id' | 'created_at'>>): Promise<void> => {
        const { error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', userId);
        if (error) throw new Error(error.message);
    },

    updateXP: async (userId: string, amount: number): Promise<void> => {
        const store = useUserStore.getState();
        const newXp = store.xp + amount;
        const newLevel = calculateLevel(newXp);

        // Optimistic local update
        useUIStore.getState().addXPPopup(amount);
        if (newLevel > store.level) {
            useUIStore.getState().showLevelUp(newLevel);
        }
        useUserStore.getState().setProfile({ xp: newXp, level: newLevel } as Partial<Profile>);

        // Persist to Supabase
        await supabase
            .from('profiles')
            .update({ xp: newXp, level: newLevel })
            .eq('id', userId);
    },

    updateStreak: async (userId: string): Promise<void> => {
        const { data: profile } = await supabase
            .from('profiles')
            .select('streak, last_active_date')
            .eq('id', userId)
            .single();

        if (!profile) return;

        const today = new Date().toISOString().split('T')[0];
        const last = profile.last_active_date;

        if (last === today) return; // Already active today

        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        const newStreak = last === yesterday ? profile.streak + 1 : 1;

        await supabase
            .from('profiles')
            .update({ streak: newStreak, last_active_date: today })
            .eq('id', userId);

        useUserStore.getState().setProfile({ streak: newStreak } as Partial<Profile>);
    },

    addStudyMinutes: async (userId: string, minutes: number): Promise<void> => {
        const current = useUserStore.getState().totalMinutesStudied;
        const newTotal = current + minutes;
        useUserStore.getState().setProfile({ total_minutes_studied: newTotal } as Partial<Profile>);
        await supabase
            .from('profiles')
            .update({ total_minutes_studied: newTotal })
            .eq('id', userId);
    },
};
