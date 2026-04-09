import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../button';
import { Burger } from '../burger';
import styles from './index.module.scss';
import { FiGrid } from 'react-icons/fi';

export const BlogHeader = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const navItems = [
        { label: 'Blog', href: '/' },
        { label: 'Moje CV', href: '/cv' },
    ];

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isMenuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    return (
        <header className={styles.headerContainer} ref={menuRef}>
            {isMobile ? (
                <>
                    <div className={styles.mobileToggle} onClick={() => setIsMenuOpen((p) => !p)}>
                        <div className={styles.labelWrapper}>
                            <FiGrid size={22} />
                            <p className={styles.label}>KG</p>
                        </div>
                        <div className={styles.iconContainer}>
                            <Burger isOpen={isMenuOpen} />
                        </div>
                    </div>
                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.nav
                                className={styles.mobileMenu}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                            >
                                {navItems.map((item) => (
                                    <RouterLink
                                        key={item.label}
                                        to={item.href}
                                        className={styles.mobileNavLink}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.label}
                                    </RouterLink>
                                ))}
                            </motion.nav>
                        )}
                    </AnimatePresence>
                </>
            ) : (
                <div className={styles.desktopHeader}>
                    <RouterLink to="/" className={styles.brand}>
                        <FiGrid size={22} />
                        <span>KG</span>
                    </RouterLink>
                    <nav className={styles.desktopNav}>
                        {navItems.map((item) => (
                            <RouterLink key={item.label} to={item.href} className={styles.navLink}>
                                {item.label}
                            </RouterLink>
                        ))}
                    </nav>
                    <RouterLink to="/cv">
                        <Button label="Moje CV" />
                    </RouterLink>
                </div>
            )}
        </header>
    );
};
