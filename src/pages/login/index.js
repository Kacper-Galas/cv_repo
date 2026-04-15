import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BlogHeader } from '../../components/blog_header';
import styles from './index.module.scss';
import { FiGrid, FiMail, FiLock, FiEye, FiEyeOff, FiUser } from 'react-icons/fi';
import { api } from '../../api';

export const LoginPage = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState('login'); // 'login' | 'register'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email.trim() || !password.trim() || (mode === 'register' && !name.trim())) {
            setError('Wypełnij wszystkie pola.');
            return;
        }

        setLoading(true);
        try {
            let result;
            if (mode === 'login') {
                result = await api.auth.login(email.trim(), password);
            } else {
                result = await api.auth.register(email.trim(), password, name.trim());
            }
            localStorage.setItem('blog_auth', JSON.stringify(result));
            navigate(result.user.role === 'admin' ? '/creator' : '/');
        } catch (err) {
            setError(err.message || 'Wystąpił błąd. Spróbuj ponownie.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginPage}>
            <BlogHeader />
            <motion.div
                className={styles.loginCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
            >
                <Link to="/" className={styles.brand}>
                    <FiGrid size={22} />
                    <span>KG</span>
                </Link>

                <h1 className={styles.title}>
                    {mode === 'login' ? 'Zaloguj się' : 'Zarejestruj się'}
                </h1>
                <p className={styles.subtitle}>Panel autora bloga</p>

                <form className={styles.form} onSubmit={handleSubmit}>
                    {mode === 'register' && (
                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="login-name">Imię i nazwisko</label>
                            <div className={styles.inputWrap}>
                                <FiUser className={styles.inputIcon} size={16} />
                                <input
                                    id="login-name"
                                    className={styles.input}
                                    type="text"
                                    placeholder="Jan Kowalski"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoComplete="name"
                                />
                            </div>
                        </div>
                    )}

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="login-email">Email</label>
                        <div className={styles.inputWrap}>
                            <FiMail className={styles.inputIcon} size={16} />
                            <input
                                id="login-email"
                                className={styles.input}
                                type="email"
                                placeholder="email@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                            />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="login-password">Hasło</label>
                        <div className={styles.inputWrap}>
                            <FiLock className={styles.inputIcon} size={16} />
                            <input
                                id="login-password"
                                className={styles.input}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                            />
                            <button
                                type="button"
                                className={styles.togglePassword}
                                onClick={() => setShowPassword((v) => !v)}
                                tabIndex={-1}
                            >
                                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                            </button>
                        </div>
                    </div>

                    {error && <p className={styles.error}>{error}</p>}

                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={loading}
                    >
                        <span className={styles.submitBg} />
                        <span className={styles.submitText}>
                            {loading
                                ? mode === 'login' ? 'Logowanie...' : 'Rejestracja...'
                                : mode === 'login' ? 'Zaloguj' : 'Zarejestruj się'}
                        </span>
                    </button>
                </form>

                <p className={styles.hint}>
                    {mode === 'login' ? (
                        <>Nie masz konta?{' '}
                            <button className={styles.switchMode} onClick={() => { setMode('register'); setError(''); }}>
                                Zarejestruj się
                            </button>
                        </>
                    ) : (
                        <>Masz już konto?{' '}
                            <button className={styles.switchMode} onClick={() => { setMode('login'); setError(''); }}>
                                Zaloguj się
                            </button>
                        </>
                    )}
                </p>
            </motion.div>
        </div>
    );
};
