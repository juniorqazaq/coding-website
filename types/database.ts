export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: Profile;
                Insert: Omit<Profile, 'created_at'>;
                Update: Partial<Omit<Profile, 'id' | 'created_at'>>;
            };
            course_progress: {
                Row: CourseProgress;
                Insert: Omit<CourseProgress, 'id'>;
                Update: Partial<Omit<CourseProgress, 'id' | 'user_id'>>;
            };
            quiz_results: {
                Row: QuizResult;
                Insert: Omit<QuizResult, 'id' | 'completed_at'>;
                Update: never;
            };
            problem_submissions: {
                Row: ProblemSubmission;
                Insert: Omit<ProblemSubmission, 'id' | 'submitted_at'>;
                Update: never;
            };
            user_achievements: {
                Row: UserAchievement;
                Insert: Omit<UserAchievement, 'id' | 'unlocked_at'>;
                Update: never;
            };
            daily_activity: {
                Row: DailyActivity;
                Insert: Omit<DailyActivity, 'id'>;
                Update: Partial<Omit<DailyActivity, 'id' | 'user_id' | 'activity_date'>>;
            };
        };
        Views: {
            leaderboard: {
                Row: LeaderboardEntry;
            };
        };
        Functions: Record<string, never>;
        Enums: Record<string, never>;
    };
}

export interface Profile {
    id: string;
    username: string;
    avatar_color: string;
    xp: number;
    level: number;
    streak: number;
    last_active_date: string | null;
    total_solved: number;
    total_minutes_studied: number;
    skill_level: string;
    goal: string;
    daily_goal_minutes: number;
    onboarding_completed: boolean;
    created_at: string;
}

export interface CourseProgress {
    id: string;
    user_id: string;
    course_id: string;
    lesson_id: string;
    completed: boolean;
    completed_at: string | null;
}

export interface QuizResult {
    id: string;
    user_id: string;
    course_id: string;
    lesson_id: string;
    score: number;
    max_score: number;
    completed_at: string;
}

export interface ProblemSubmission {
    id: string;
    user_id: string;
    problem_id: string;
    code: string;
    status: 'correct' | 'wrong' | 'error';
    xp_earned: number;
    submitted_at: string;
}

export interface UserAchievement {
    id: string;
    user_id: string;
    achievement_id: string;
    unlocked_at: string;
}

export interface DailyActivity {
    id: string;
    user_id: string;
    activity_date: string;
    xp_earned: number;
}

export interface LeaderboardEntry {
    id: string;
    username: string;
    xp: number;
    level: number;
    total_solved: number;
}
