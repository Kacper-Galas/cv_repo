import React from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import styles from './index.module.scss';

export const Tag = ({
    children,
    color,
    variant = 'default',
    closable = false,
    onClose,
    icon,
    size = 'md',
}) => {
    return (
        <motion.span
            className={`${styles.tag} ${styles[`variant_${variant}`]} ${styles[`size_${size}`]}`}
            style={color ? { '--tag-color': color } : undefined}
            layout
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            transition={{ duration: 0.15 }}
        >
            {icon && <span className={styles.tagIcon}>{icon}</span>}
            <span>{children}</span>
            {closable && (
                <button
                    className={styles.closeBtn}
                    onClick={(e) => { e.stopPropagation(); onClose?.(); }}
                    aria-label="Remove tag"
                    type="button"
                >
                    <FiX size={11} />
                </button>
            )}
        </motion.span>
    );
};
