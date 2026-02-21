/**
 * Maps Supabase/Auth error messages to Russian user-facing messages.
 */
const ERROR_MAP: Record<string, string> = {
    'Invalid login credentials': 'Неверный email или пароль',
    'User already registered': 'Этот email уже используется',
    'Email not confirmed': 'Подтвердите email перед входом',
    'Password should be at least 6 characters': 'Пароль должен быть минимум 6 символов',
    'Unable to validate email address: invalid format': 'Введите корректный email адрес',
    'Signup requires a valid password': 'Введите корректный пароль',
    'Email rate limit exceeded': 'Слишком много попыток. Попробуйте позже',
    'User not found': 'Пользователь не найден',
    'Token has expired or is invalid': 'Ссылка устарела. Запросите новую',
    'Network request failed': 'Ошибка сети. Проверьте соединение',
};

export const getSupabaseErrorMessage = (error: unknown): string => {
    if (!error) return 'Произошла неизвестная ошибка';

    const message = error instanceof Error
        ? error.message
        : typeof error === 'object' && error !== null && 'message' in error
            ? String((error as { message: unknown }).message)
            : String(error);

    for (const [key, translation] of Object.entries(ERROR_MAP)) {
        if (message.includes(key)) return translation;
    }

    return message || 'Произошла неизвестная ошибка';
};
