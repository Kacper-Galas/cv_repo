import React from 'react';
import styles from './index.module.scss';

export const Divider = ({
    label,
    orientation = 'horizontal',
    align = 'center',
    dashed = false,
    className = '',
    style,
}) => {
    if (orientation === 'vertical') {
        return <span className={`${styles.vertical} ${dashed ? styles.dashed : ''} ${className}`} style={style} />;
    }

    if (label) {
        return (
            <div
                className={`${styles.horizontal} ${styles.withLabel} ${styles[`align_${align}`]} ${dashed ? styles.dashed : ''} ${className}`}
                style={style}
                role="separator"
            >
                <span className={styles.line} />
                <span className={styles.labelText}>{label}</span>
                <span className={styles.line} />
            </div>
        );
    }

    return (
        <hr
            className={`${styles.horizontal} ${dashed ? styles.dashed : ''} ${className}`}
            style={style}
        />
    );
};
