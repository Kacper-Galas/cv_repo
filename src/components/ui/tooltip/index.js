import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './index.module.scss';

export const Tooltip = ({
    content,
    children,
    placement = 'top',
    delay = 0,
}) => {
    const [visible, setVisible] = useState(false);
    const timerRef = useRef(null);

    const show = () => {
        timerRef.current = setTimeout(() => setVisible(true), delay);
    };

    const hide = () => {
        clearTimeout(timerRef.current);
        setVisible(false);
    };

    const placementVariants = {
        top: { initial: { opacity: 0, y: 6, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 4, scale: 0.95 } },
        bottom: { initial: { opacity: 0, y: -6, scale: 0.95 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -4, scale: 0.95 } },
        left: { initial: { opacity: 0, x: 6, scale: 0.95 }, animate: { opacity: 1, x: 0, scale: 1 }, exit: { opacity: 0, x: 4, scale: 0.95 } },
        right: { initial: { opacity: 0, x: -6, scale: 0.95 }, animate: { opacity: 1, x: 0, scale: 1 }, exit: { opacity: 0, x: -4, scale: 0.95 } },
    };

    const anim = placementVariants[placement] || placementVariants.top;

    return (
        <span
            className={styles.tooltipWrapper}
            onMouseEnter={show}
            onMouseLeave={hide}
            onFocus={show}
            onBlur={hide}
        >
            {children}
            <AnimatePresence>
                {visible && (
                    <motion.div
                        className={`${styles.tooltip} ${styles[placement]}`}
                        initial={anim.initial}
                        animate={anim.animate}
                        exit={anim.exit}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        role="tooltip"
                    >
                        {content}
                        <span className={`${styles.arrow} ${styles[`arrow_${placement}`]}`} />
                    </motion.div>
                )}
            </AnimatePresence>
        </span>
    );
};
