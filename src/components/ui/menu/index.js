import React from 'react';
import styles from './index.module.scss';

export const Menu = ({
    items = [],
    orientation = 'horizontal',
    activeItem,
}) => {
    return (
        <nav className={`${styles.menuContainer} ${orientation === 'vertical' ? styles.vertical : ''}`}>
            {items.map((item, index) => (
                <a
                    key={index}
                    href={item.href || '#'}
                    className={`${styles.menuItem} ${(activeItem === item.key || item.active) ? styles.activeItem : ''}`}
                    onClick={item.onClick}
                >
                    {item.icon && <span className={styles.menuItemIcon}>{item.icon}</span>}
                    <span className={styles.menuItemLabel}>{item.label}</span>
                </a>
            ))}
        </nav>
    );
};
