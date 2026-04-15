import React from 'react';
import { motion } from 'framer-motion';
import styles from './index.module.scss';

export const Badge = ({
    count,
    dot = false,
    color,
    children,
    max = 99,
    showZero = false,
}) => {
    const display = count > max ? `${max}+` : count;
    const shouldShow = dot || showZero || (count !== undefined && count !== 0);

    if (!children) {
        return shouldShow ? (
            <motion.span
                className={`${styles.standalone} ${dot ? styles.dot : ''}`}
                style={color ? { backgroundColor: color } : undefined}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            >
                {!dot && display}
            </motion.span>
        ) : null;
    }

    return (
        <span className={styles.badgeWrapper}>
            {children}
            {shouldShow && (
                <motion.sup
                    className={`${styles.badge} ${dot ? styles.dot : ''}`}
                    style={color ? { backgroundColor: color } : undefined}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                    key={count}
                >
                    {!dot && display}
                </motion.sup>
            )}
        </span>
    );
};
