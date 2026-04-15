import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import styles from './index.module.scss';

export const CollapseItem = ({
    title,
    children,
    defaultOpen = false,
    icon,
    extra,
    disabled = false,
}) => {
    const [open, setOpen] = useState(defaultOpen);
    const contentRef = useRef(null);

    return (
        <div className={`${styles.collapseItem} ${open ? styles.open : ''} ${disabled ? styles.disabled : ''}`}>
            <button
                className={styles.collapseHeader}
                onClick={() => !disabled && setOpen((v) => !v)}
                aria-expanded={open}
                type="button"
            >
                {icon && <span className={styles.headerIcon}>{icon}</span>}
                <span className={styles.headerTitle}>{title}</span>
                {extra && <span className={styles.headerExtra} onClick={(e) => e.stopPropagation()}>{extra}</span>}
                <motion.span
                    className={styles.chevron}
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                >
                    <FiChevronDown />
                </motion.span>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div className={styles.collapseContent} ref={contentRef}>
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const Collapse = ({ children, bordered = true, className = '' }) => (
    <div className={`${styles.collapse} ${bordered ? styles.bordered : ''} ${className}`}>
        {children}
    </div>
);
