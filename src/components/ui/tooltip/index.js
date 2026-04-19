import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './index.module.scss';

export const Tooltip = ({
    content,
    children,
    placement = 'top',
    delay = 0,
}) => {
    const [visible, setVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const timerRef = useRef(null);
    const wrapperRef = useRef(null);
    const tooltipRef = useRef(null);

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

    useEffect(() => () => clearTimeout(timerRef.current), []);

    useLayoutEffect(() => {
        if (!visible || !wrapperRef.current || !tooltipRef.current) {
            return;
        }

        const gap = 10;

        const updatePosition = () => {
            if (!wrapperRef.current || !tooltipRef.current) {
                return;
            }

            const triggerRect = wrapperRef.current.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            const scrollX = window.scrollX;
            const scrollY = window.scrollY;

            let top = 0;
            let left = 0;

            switch (placement) {
                case 'bottom':
                    top = triggerRect.bottom + gap + scrollY;
                    left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2 + scrollX;
                    break;
                case 'left':
                    top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2 + scrollY;
                    left = triggerRect.left - tooltipRect.width - gap + scrollX;
                    break;
                case 'right':
                    top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2 + scrollY;
                    left = triggerRect.right + gap + scrollX;
                    break;
                case 'top':
                default:
                    top = triggerRect.top - tooltipRect.height - gap + scrollY;
                    left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2 + scrollX;
                    break;
            }

            const minLeft = 8 + scrollX;
            const maxLeft = scrollX + window.innerWidth - tooltipRect.width - 8;
            const minTop = 8 + scrollY;
            const maxTop = scrollY + window.innerHeight - tooltipRect.height - 8;

            setCoords({
                top: Math.min(Math.max(top, minTop), maxTop),
                left: Math.min(Math.max(left, minLeft), maxLeft),
            });
        };

        updatePosition();
        window.addEventListener('scroll', updatePosition, true);
        window.addEventListener('resize', updatePosition);

        return () => {
            window.removeEventListener('scroll', updatePosition, true);
            window.removeEventListener('resize', updatePosition);
        };
    }, [placement, visible]);

    const tooltipNode = visible ? createPortal(
        <AnimatePresence>
            <motion.div
                ref={tooltipRef}
                className={`${styles.tooltipLayer} ${styles[`placement_${placement}`]}`}
                style={{ top: coords.top, left: coords.left }}
                initial={anim.initial}
                animate={anim.animate}
                exit={anim.exit}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                role="tooltip"
            >
                <span className={styles.tooltip}>
                    {content}
                    <span className={`${styles.arrow} ${styles[`arrow_${placement}`]}`} />
                </span>
            </motion.div>
        </AnimatePresence>,
        document.body
    ) : null;

    return (
        <span
            ref={wrapperRef}
            className={styles.tooltipWrapper}
            onMouseEnter={show}
            onMouseLeave={hide}
            onFocus={show}
            onBlur={hide}
        >
            {children}
            {tooltipNode}
        </span>
    );
};
