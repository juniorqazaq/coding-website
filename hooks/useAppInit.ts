import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/useAuthStore';
import { useUserStore } from '../stores/useUserStore';
import { useProgressStore } from '../stores/useProgressStore';
import { progressService } from '../services/progress';
import { achievementService } from '../services/achievements';
import { userService } from '../services/user';
import type { Profile } from '../types/database';

const hydrateStores = async (userId: string, profile: Profile) => {
    useUserStore.getState().setProfile(profile);

    // Load completed lessons
    const completedLessons = await progressService.getAllCompletedLessons(userId);
    useProgressStore.getState().setCompletedLessons(completedLessons);

    // Load achievements
    await achievementService.syncFromDatabase(userId);

    // Update streak (only if first activity today)
    await userService.updateStreak(userId);
};

export const useAppInit = () => {
    useEffect(() => {
        const { setLoading } = useAuthStore.getState();

        // 1. Check existing session on mount
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            if (session?.user) {
                const profile = await userService.getProfile(session.user.id);
                if (profile) {
                    useAuthStore.getState().login(session.user, profile);
                    await hydrateStores(session.user.id, profile);
                } else {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        });

        // 2. Listen for auth changes (login, logout, token refresh)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
                const profile = await userService.getProfile(session.user.id);
                if (profile) {
                    useAuthStore.getState().login(session.user, profile);
                    await hydrateStores(session.user.id, profile);
                }
            }

            if (event === 'SIGNED_OUT') {
                useAuthStore.getState().logout();
                useUserStore.getState().reset();
                useProgressStore.getState().reset();
            }
        });

        return () => subscription.unsubscribe();
    }, []);
};
