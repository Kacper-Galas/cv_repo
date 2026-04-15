import React, { useRef, useEffect } from 'react';
import styles from './index.module.scss';

export const Textarea = ({
    label,
    placeholder = '',
    value,
    onChange,
    rows = 4,
    disabled = false,
    error,
    autoResize = false,
    maxLength,
    ...props
}) => {
    const ref = useRef(null);

    useEffect(() => {
        if (autoResize && ref.current) {
            ref.current.style.height = 'auto';
            ref.current.style.height = `${ref.current.scrollHeight}px`;
        }
    }, [value, autoResize]);

    return (
        <div className={styles.textareaWrapper}>
            {label && <label className={styles.label}>{label}</label>}
            <div className={`${styles.textareaContainer} ${error ? styles.error : ''} ${disabled ? styles.disabled : ''}`}>
                <textarea
                    ref={ref}
                    className={styles.textarea}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    rows={autoResize ? 1 : rows}
                    disabled={disabled}
                    maxLength={maxLength}
                    style={autoResize ? { overflow: 'hidden', resize: 'none' } : undefined}
                    {...props}
                />
            </div>
            <div className={styles.textareaFooter}>
                {error ? (
                    <span className={styles.errorMsg}>{error}</span>
                ) : (
                    <span />
                )}
                {maxLength !== undefined && (
                    <span className={styles.counter}>
                        {(value || '').length} / {maxLength}
                    </span>
                )}
            </div>
        </div>
    );
};
