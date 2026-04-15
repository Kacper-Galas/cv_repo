import React from 'react';
import { motion } from 'framer-motion';
import styles from './index.module.scss';

export const Card = ({
    children,
    title,
    subtitle,
    extra,
    footer,
    variant = 'default',
    hoverable = false,
    onClick,
    cover,
    className = '',
    style,
}) => {
    const Tag = onClick ? motion.button : motion.div;

    return (
        <Tag
            className={`${styles.card} ${styles[`variant_${variant}`]} ${hoverable || onClick ? styles.hoverable : ''} ${className}`}
            style={style}
            onClick={onClick}
            whileHover={hoverable || onClick ? { y: -3, boxShadow: '0 12px 40px rgba(15,25,35,0.16)' } : undefined}
            transition={{ duration: 0.22, ease: 'easeOut' }}
        >
            {cover && <div className={styles.cardCover}>{cover}</div>}

            {(title || subtitle || extra) && (
                <div className={styles.cardHeader}>
                    <div className={styles.cardHeaderMain}>
                        {title && <div className={styles.cardTitle}>{title}</div>}
                        {subtitle && <div className={styles.cardSubtitle}>{subtitle}</div>}
                    </div>
                    {extra && <div className={styles.cardExtra}>{extra}</div>}
                </div>
            )}

            <div className={styles.cardBody}>
                {children}
            </div>

            {footer && (
                <div className={styles.cardFooter}>
                    {footer}
                </div>
            )}
        </Tag>
    );
};
