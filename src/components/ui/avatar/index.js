import React from 'react';
import styles from './index.module.scss';

export const Avatar = ({
    src,
    alt = '',
    name,
    size = 'md',
    shape = 'circle',
    color,
    icon,
    border = false,
    style,
    className = '',
}) => {
    const initials = name
        ? name.split(' ').slice(0, 2).map((n) => n[0].toUpperCase()).join('')
        : null;

    return (
        <span
            className={`${styles.avatar} ${styles[`size_${size}`]} ${styles[`shape_${shape}`]} ${border ? styles.bordered : ''} ${className}`}
            style={{ ...(color ? { '--avatar-color': color } : {}), ...style }}
            title={name || alt}
            aria-label={name || alt}
        >
            {src ? (
                <img src={src} alt={alt || name} className={styles.avatarImg} draggable={false} />
            ) : icon ? (
                <span className={styles.avatarIcon}>{icon}</span>
            ) : initials ? (
                <span className={styles.avatarInitials}>{initials}</span>
            ) : (
                <span className={styles.avatarFallback}>?</span>
            )}
        </span>
    );
};

export const AvatarGroup = ({ children, max = 4, size = 'md' }) => {
    const items = React.Children.toArray(children);
    const visible = items.slice(0, max);
    const overflow = items.length - max;

    return (
        <span className={styles.avatarGroup}>
            {visible.map((child, i) =>
                React.cloneElement(child, {
                    key: i,
                    size,
                    className: `${child.props.className || ''} ${styles.groupItem}`,
                    style: { zIndex: visible.length - i, ...(child.props.style || {}) },
                })
            )}
            {overflow > 0 && (
                <span className={`${styles.avatar} ${styles[`size_${size}`]} ${styles.shape_circle} ${styles.groupItem} ${styles.overflow}`}>
                    <span className={styles.avatarInitials}>+{overflow}</span>
                </span>
            )}
        </span>
    );
};
