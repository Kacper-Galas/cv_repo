import styles from './index.module.scss'
import React from 'react';
import DEFAULT_STATE_DATA from '../../constants';

export const Button = ({
    label = 'Button',
    children,
    disabled = false,
    type = 'primary',
    variant,
    size = 'md',
    icon,
    iconPosition = 'left',
    fullWidth = false,
    htmlType = 'button',
    onClick = () => {console.log(`${DEFAULT_STATE_DATA.ACTIONS_STRINGS.ON_CLICK_DEFAULT_ALERT}`)}
}) => {
    const resolvedVariant = variant || type;
    const content = children || label;
    const isIconOnly = resolvedVariant === 'icon';
    const animatedVariants = new Set(['primary', 'secondary']);

    return (
        <button
            className={[
                styles.button,
                styles[`variant_${resolvedVariant}`],
                styles[`size_${size}`],
                fullWidth ? styles.fullWidth : '',
                isIconOnly ? styles.iconOnly : '',
            ].filter(Boolean).join(' ')}
            disabled={disabled}
            onClick={onClick}
            type={htmlType}
        >
            <span className={styles.inner}>
                {animatedVariants.has(resolvedVariant) && <span className={styles.slide} />}

                {icon && iconPosition === 'left' && <span className={styles.icon}>{icon}</span>}
                {isIconOnly ? icon : <span className={styles.buttonText}>{content}</span>}
                {icon && iconPosition === 'right' && !isIconOnly && <span className={styles.icon}>{icon}</span>}
            </span>
        </button>
    );
}