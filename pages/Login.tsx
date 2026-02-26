import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { authService } from '../services/auth';
import { Eye, EyeOff, Check, ArrowRight, Lock, Mail, Code2 } from 'lucide-react';

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            await authService.login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ошибка входа');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="t-auth-root">
            {/* grid bg */}
            <div className="t-auth-grid" />

            <div className="t-auth-wrap page-enter">
                {/* Logo */}
                <Link to="/" className="t-auth-logo">
                    <div className="t-logo-icon"><Code2 size={16} strokeWidth={2.5} /></div>
                    <span className="t-logo-text">Tamasha</span>
                </Link>

                <div className="t-auth-card">
                    <div className="t-auth-head">
                        <h1 className="t-auth-title">С возвращением!</h1>
                        <p className="t-auth-sub">Войдите в свой аккаунт</p>
                    </div>

                    {error && <div className="t-auth-error">{error}</div>}

                    <form onSubmit={handleLogin} className="t-auth-form">
                        <div className="t-field">
                            <label className="t-field-label">Email</label>
                            <div className="t-field-wrap">
                                <Mail size={16} className="t-field-icon" />
                                <input
                                    type="email" value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="t-field-input" placeholder="name@company.com" required
                                />
                            </div>
                        </div>

                        <div className="t-field">
                            <div className="t-field-row">
                                <label className="t-field-label">Пароль</label>
                                <a href="#" className="t-auth-link-sm">Забыли пароль?</a>
                            </div>
                            <div className="t-field-wrap">
                                <Lock size={16} className="t-field-icon" />
                                <input
                                    type={showPassword ? 'text' : 'password'} value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="t-field-input" placeholder="••••••••" required
                                />
                                <button type="button" className="t-field-eye" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Remember me */}
                        <label className="t-check-label">
                            <div className="t-check-box" onClick={() => setRememberMe(!rememberMe)}>
                                {rememberMe && <Check size={11} strokeWidth={3} />}
                            </div>
                            <span>Запомнить меня</span>
                        </label>

                        <button type="submit" disabled={isLoading} className="t-btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
                            {isLoading
                                ? <span className="t-spinner" />
                                : <><span>Войти</span><ArrowRight size={18} /></>
                            }
                        </button>
                    </form>

                    <div className="t-auth-divider"><span>или войти через</span></div>

                    <div className="t-social-btns">
                        <button className="t-social-btn">
                            <svg viewBox="0 0 24 24" width="18" height="18">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </button>
                        <button className="t-social-btn">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.21 11.39.6.11.82-.26.82-.57v-2.23c-3.34.73-4.04-1.43-4.04-1.43-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.28-1.23 3.28-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.69.83.57C20.57 21.8 24 17.31 24 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            GitHub
                        </button>
                    </div>

                    <p className="t-auth-switch">
                        Нет аккаунта? <Link to="/register" className="t-auth-link">Зарегистрироваться</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};