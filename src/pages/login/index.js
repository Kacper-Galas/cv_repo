import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './index.module.scss';
import { FiGrid, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

export const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!email.trim() || !password.trim()) {
            setError('Wypełnij wszystkie pola.');
            return;
        }

        setLoading(true);

        // Mock login — simulate delay
        setTimeout(() => {
            if (email === 'admin@blog.pl' && password === 'admin123') {
                localStorage.setItem('blog_auth', JSON.stringify({ email, name: 'Kacper Galas' }));
                navigate('/creator');
            } else {
                setError('Nieprawidłowy email lub hasło.');
            }
            setLoading(false);
        }, 800);
    };

    return (
        <div className={styles.loginPage}>
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

                <h1 className={styles.title}>Zaloguj się</h1>
                <p className={styles.subtitle}>Panel autora bloga</p>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="login-email">Email</label>
                        <div className={styles.inputWrap}>
                            <FiMail className={styles.inputIcon} size={16} />
                            <input
                                id="login-email"
                                className={styles.input}
                                type="email"
                                placeholder="admin@blog.pl"
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
                                autoComplete="current-password"
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
                            {loading ? 'Logowanie...' : 'Zaloguj'}
                        </span>
                    </button>
                </form>

                <p className={styles.hint}>
                    Mock: <strong>admin@blog.pl</strong> / <strong>admin123</strong>
                </p>
            </motion.div>
        </div>
    );
};
