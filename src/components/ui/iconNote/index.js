import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import styles from './index.module.scss';

export const IconNote = ({
    icon,
    note,
    placement = 'top',
    variant = 'default',
}) => {
    const [visible, setVisible] = useState(false);

    const opts = {
        top: {
            tooltip: styles.top,
            initial: { opacity: 0, y: 8, scale: 0.9 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: 6, scale: 0.92 },
        },
        bottom: {
            tooltip: styles.bottom,
            initial: { opacity: 0, y: -8, scale: 0.9 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: -6, scale: 0.92 },
        },
        left: {
            tooltip: styles.left,
            initial: { opacity: 0, x: 8, scale: 0.9 },
            animate: { opacity: 1, x: 0, scale: 1 },
            exit: { opacity: 0, x: 6, scale: 0.92 },
        },
        right: {
            tooltip: styles.right,
            initial: { opacity: 0, x: -8, scale: 0.9 },
            animate: { opacity: 1, x: 0, scale: 1 },
            exit: { opacity: 0, x: -6, scale: 0.92 },
        },
    };

    const cfg = opts[placement] || opts.top;

    return (
        <span
            className={`${styles.wrapper} ${styles[`variant_${variant}`]}`}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            onFocus={() => setVisible(true)}
            onBlur={() => setVisible(false)}
            tabIndex={0}
            aria-label={typeof note === 'string' ? note : undefined}
            role="button"
        >
            <motion.span
                className={styles.iconWrap}
                whileHover={{ scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
                {icon}
            </motion.span>

            <AnimatePresence>
                {visible && (
                    <motion.div
                        className={`${styles.note} ${cfg.tooltip}`}
                        initial={cfg.initial}
                        animate={cfg.animate}
                        exit={cfg.exit}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        role="tooltip"
                    >
                        <span className={`${styles.arrow} ${styles[`arrow_${placement}`]}`} />
                        {note}
                    </motion.div>
                )}
            </AnimatePresence>
        </span>
    );
};
