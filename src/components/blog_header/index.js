import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Squeeze from 'hamburger-react';
import styles from './index.module.scss';
import { FiUser, FiLogOut } from 'react-icons/fi';

const navItems = [
    { label: 'Strona główna', href: '/' },
    { label: 'O mnie', href: '/about' },
    { label: 'Moje CV', href: '/cv' },
    { label: 'Nowy artykuł', href: '/creator' },
];

const panelVariants = {
    closed: { x: '100%' },
    open: { x: 0 },
};

const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
};

const linkVariants = {
    closed: { opacity: 0, x: 30 },
    open: (i) => ({
        opacity: 1,
        x: 0,
        transition: { delay: 0.08 * i, duration: 0.25, ease: 'easeOut' },
    }),
};

export const BlogHeader = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const panelRef = useRef(null);
    const [auth, setAuth] = useState(() => {
        try { return JSON.parse(localStorage.getItem('blog_auth')); } catch { return null; }
    });

    const handleLogout = () => {
        localStorage.removeItem('blog_auth');
        setAuth(null);
        setIsOpen(false);
        navigate('/');
    };

    // lock scroll when panel open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    return (
        <>
            {/* Burger floats above everything */}
            <div className={styles.burgerWrap}>
                <Squeeze
                    toggled={isOpen}
                    toggle={setIsOpen}
                    size={22}
                    color={isOpen ? '#0f1923' : '#0f1923'}
                    duration={0.35}
                    label="Menu"
                />
            </div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* overlay */}
                        <motion.div
                            className={styles.overlay}
                            variants={overlayVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            transition={{ duration: 0.3 }}
                            onClick={() => setIsOpen(false)}
                        />

                        {/* side panel */}
                        <motion.nav
                            className={styles.sidePanel}
                            ref={panelRef}
                            variants={panelVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                            <div className={styles.panelLinks}>
                                {navItems.map((item, i) => (
                                    <motion.div
                                        key={item.label}
                                        custom={i}
                                        variants={linkVariants}
                                        initial="closed"
                                        animate="open"
                                    >
                                        <RouterLink
                                            to={item.href}
                                            className={styles.panelLink}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.label}
                                        </RouterLink>
                                    </motion.div>
                                ))}
                            </div>

                            {auth?.user ? (
                                <div className={styles.panelProfile}>
                                    <div className={styles.panelProfileAvatar}>
                                        <FiUser size={18} />
                                    </div>
                                    <div className={styles.panelProfileInfo}>
                                        <span className={styles.panelProfileName}>{auth.user.name}</span>
                                        <span className={styles.panelProfileEmail}>{auth.user.email}</span>
                                    </div>
                                    <button className={styles.panelLogoutBtn} onClick={handleLogout} aria-label="Wyloguj">
                                        <FiLogOut size={16} />
                                    </button>
                                </div>
                            ) : (
                                <div className={styles.panelLoginSection}>
                                    <motion.div
                                        whileHover={{ x: 6 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                                        style={{ display: 'inline-flex' }}
                                    >
                                        <RouterLink
                                            to="/login"
                                            className={styles.panelLoginBtn}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <FiUser size={15} />
                                            <span>Zaloguj się</span>
                                        </RouterLink>
                                    </motion.div>
                                </div>
                            )}
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};
