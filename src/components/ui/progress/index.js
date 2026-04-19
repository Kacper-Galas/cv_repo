import React from 'react';
import { motion } from 'framer-motion';
import styles from './index.module.scss';

export const Progress = ({
    value = 0,
    max = 100,
    label,
    showPercent = true,
    size = 'md',
    color,
    variant = 'default',
    animated = true,
    striped = false,
}) => {
    const percent = Math.min(100, Math.max(0, (value / max) * 100));

    if (variant === 'circle') {
        const r = 36;
        const circ = 2 * Math.PI * r;
        const offset = circ - (percent / 100) * circ;

        return (
            <div className={styles.circleWrapper}>
                <svg width="88" height="88" viewBox="0 0 88 88" className={styles.circleSvg}>
                    <circle
                        cx="44" cy="44" r={r}
                        fill="none"
                        stroke="#eee"
                        strokeWidth="6"
                    />
                    <motion.circle
                        cx="44" cy="44" r={r}
                        fill="none"
                        stroke={color || 'var(--progress-color)'}
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={circ}
                        initial={{ strokeDashoffset: circ }}
                        animate={{ strokeDashoffset: animated ? offset : offset }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        transform="rotate(-90 44 44)"
                        style={{ stroke: color || undefined }}
                        className={!color ? styles.progressStroke : undefined}
                    />
                </svg>
                {showPercent && (
                    <span className={styles.circleLabel}>{Math.round(percent)}%</span>
                )}
            </div>
        );
    }

    return (
        <div className={styles.progressWrapper}>
            {(label || showPercent) && (
                <div className={styles.progressHeader}>
                    {label && <span className={styles.progressLabel}>{label}</span>}
                    {showPercent && <span className={styles.progressPercent}>{Math.round(percent)}%</span>}
                </div>
            )}
            <div className={`${styles.track} ${styles[`size_${size}`]}`}>
                <motion.div
                    className={`${styles.fill} ${striped ? styles.striped : ''}`}
                    style={color ? { backgroundColor: color } : undefined}
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: animated ? 0.7 : 0, ease: 'easeOut' }}
                />
            </div>
        </div>
    );
};
