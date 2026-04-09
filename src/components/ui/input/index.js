import React from 'react';
import styles from './index.module.scss';
import DEFAULT_STATE_DATA from '../../../constants';

export const Input = ({
    label,
    placeholder = '',
    value,
    onChange = () => { console.log(DEFAULT_STATE_DATA.ACTIONS_STRINGS.ON_CHANGE_DEFAULT_ALERT); },
    type = 'text',
    icon,
    disabled = false,
    error,
    ...props
}) => {
    return (
        <div className={styles.inputWrapper}>
            {label && <label className={styles.inputLabel}>{label}</label>}
            <div className={`${styles.inputContainer} ${error ? styles.inputError : ''} ${disabled ? styles.inputDisabled : ''}`}>
                {icon && <span className={styles.inputIcon}>{icon}</span>}
                <input
                    className={styles.inputField}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    {...props}
                />
            </div>
            {error && <span className={styles.inputErrorMsg}>{error}</span>}
        </div>
    );
};
