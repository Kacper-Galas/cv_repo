import styles from './index.module.scss'
import React from 'react';
import DEFAULT_STATE_DATA from '../../constants';

export const Button = ({
    label = 'Button',
    disabled = false,
    type = 'primary',
    icon,
    onClick = () => {console.log(`${DEFAULT_STATE_DATA.ACTIONS_STRINGS.ON_CLICK_DEFAULT_ALERT}`)}
}) => {

    const handleType = () => {
        switch (type) {
            case 'primary':
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
            
            case 'icon':
                return (
                    <button 
                        className={styles.iconButton}
                        disabled={disabled}
                        onClick={onClick}
                    >
                        {icon}
                    </button>
                )

            default:
                return null;
        }
    }

    return handleType()
}