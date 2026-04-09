import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import styles from './index.module.scss';

export const Dropdown = ({
    label = 'Wybierz',
    options = [],
    value,
    onChange,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    const selected = options.find((o) => o.value === value);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    return (
        <div className={styles.dropdownWrapper} ref={wrapperRef}>
            <button
                className={`${styles.dropdownTrigger} ${isOpen ? styles.open : ''}`}
                onClick={() => setIsOpen((prev) => !prev)}
                type="button"
            >
                <span className={styles.dropdownLabel}>{selected?.label || label}</span>
                <motion.span
                    className={styles.dropdownChevron}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <FiChevronDown />
                </motion.span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        className={styles.dropdownMenu}
                        initial={{ opacity: 0, y: -8, scaleY: 0.9 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -8, scaleY: 0.9 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        style={{ originY: 0 }}
                    >
                        {options.map((option, index) => (
                            <li
                                key={index}
                                className={`${styles.dropdownOption} ${value === option.value ? styles.selectedOption : ''}`}
                                onClick={() => {
                                    onChange?.(option.value);
                                    setIsOpen(false);
                                }}
                            >
                                {option.icon && <span className={styles.optionIcon}>{option.icon}</span>}
                                {option.label}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};
