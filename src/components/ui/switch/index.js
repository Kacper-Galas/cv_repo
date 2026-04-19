import React from 'react';
import styles from './index.module.scss';

export const Switch = ({
    checked = false,
    onChange,
    disabled = false,
    label,
    labelPlacement = 'right',
    size = 'md',
    id,
}) => {
    const handleClick = () => {
        if (!disabled) onChange?.(!checked);
    };

    const switchEl = (
        <button
            id={id}
            role="switch"
            aria-checked={checked}
            className={`${styles.switchTrack} ${checked ? styles.checked : ''} ${styles[`size_${size}`]} ${disabled ? styles.disabled : ''}`}
            onClick={handleClick}
            type="button"
            disabled={disabled}
        >
            <span className={styles.switchThumb} />
        </button>
    );

    if (!label) return switchEl;

    return (
        <label className={`${styles.switchLabel} ${styles[`label_${labelPlacement}`]} ${disabled ? styles.disabled : ''}`} htmlFor={id}>
            {labelPlacement === 'left' && <span className={styles.labelText}>{label}</span>}
            {switchEl}
            {labelPlacement === 'right' && <span className={styles.labelText}>{label}</span>}
        </label>
    );
};
