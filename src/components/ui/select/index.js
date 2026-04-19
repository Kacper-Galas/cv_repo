import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronDown, FiCheck } from 'react-icons/fi';
import styles from './index.module.scss';

export const Select = ({
    label,
    placeholder = 'Wybierz',
    options = [],
    value,
    onChange,
    helperText,
    error,
    disabled = false,
    fullWidth = false,
    variant = 'minimal',
    size = 'md',
}) => {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef(null);

    const selected = useMemo(
        () => options.find((option) => option.value === value),
        [options, value]
    );

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const handleSelect = (option) => {
        if (disabled) return;
        onChange?.(option.value, option);
        setOpen(false);
    };

    return (
        <div
            ref={wrapperRef}
            className={`${styles.select} ${fullWidth ? styles.fullWidth : ''}`}
        >
            {label && <label className={styles.label}>{label}</label>}

            <button
                type="button"
                disabled={disabled}
                aria-expanded={open}
                className={[
                    styles.trigger,
                    styles[`variant_${variant}`],
                    styles[`size_${size}`],
                    open ? styles.open : '',
                    error ? styles.error : '',
                    disabled ? styles.disabled : '',
                ].filter(Boolean).join(' ')}
                onClick={() => setOpen((state) => !state)}
            >
                <span className={styles.triggerMain}>
                    <span className={styles.value}>{selected?.label || placeholder}</span>
                    {selected?.description && <span className={styles.description}>{selected.description}</span>}
                </span>

                <motion.span
                    className={styles.chevron}
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.18 }}
                >
                    <FiChevronDown size={16} />
                </motion.span>
            </button>

            <AnimatePresence>
                {open && !disabled && (
                    <motion.ul
                        className={styles.menu}
                        initial={{ opacity: 0, y: -6, scaleY: 0.94 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -6, scaleY: 0.96 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        style={{ originY: 0 }}
                        role="listbox"
                    >
                        {options.map((option) => {
                            const isSelected = option.value === value;

                            return (
                                <li key={option.value}>
                                    <button
                                        type="button"
                                        className={`${styles.option} ${isSelected ? styles.optionSelected : ''}`}
                                        onClick={() => handleSelect(option)}
                                    >
                                        <span className={styles.optionBody}>
                                            <span className={styles.optionLabel}>{option.label}</span>
                                            {option.description && <span className={styles.optionDescription}>{option.description}</span>}
                                        </span>
                                        <span className={styles.optionState}>
                                            {isSelected && <FiCheck size={14} />}
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </motion.ul>
                )}
            </AnimatePresence>

            {(helperText || error) && (
                <p className={`${styles.helper} ${error ? styles.helperError : ''}`}>
                    {error || helperText}
                </p>
            )}
        </div>
    );
};