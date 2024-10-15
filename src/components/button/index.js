import styles from './index.module.scss'
import React from 'react';
import DEFAULT_STATE_DATA from '../../constants';

export const Button = ({
    label = 'Button',
    disabled = false,
    onClick = () => {console.log(`${DEFAULT_STATE_DATA.ACTIONS.ON_CLICK_DEFAULT_ALERT.info}`)}
}) => {
    return (
        <button 
            className={styles.button} 
            disabled={disabled}
            onClick={onClick}
        >
            <span className={styles.buttonLg}>
                <span className={styles.buttonSl}></span>
                <span className={styles.buttonText}>{label}</span>
            </span>
        </button>
    )
}