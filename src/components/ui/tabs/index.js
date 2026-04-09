import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './index.module.scss';

export const Tabs = ({
    tabs = [],
    defaultTab = 0,
    onChange,
}) => {
    const [activeTab, setActiveTab] = useState(defaultTab);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const tabRefs = useRef([]);

    useEffect(() => {
        const el = tabRefs.current[activeTab];
        if (el) {
            setIndicatorStyle({ left: el.offsetLeft, width: el.offsetWidth });
        }
    }, [activeTab]);

    const handleTabClick = (index) => {
        setActiveTab(index);
        onChange?.(tabs[index], index);
    };

    return (
        <div className={styles.tabsContainer}>
            <div className={styles.tabsList}>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        ref={el => (tabRefs.current[index] = el)}
                        className={`${styles.tabItem} ${activeTab === index ? styles.activeTab : ''}`}
                        onClick={() => handleTabClick(index)}
                    >
                        {tab.icon && <span className={styles.tabIcon}>{tab.icon}</span>}
                        {tab.label}
                    </button>
                ))}
                <motion.div
                    className={styles.tabIndicator}
                    animate={{ left: indicatorStyle.left, width: indicatorStyle.width }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
            </div>
            {tabs[activeTab]?.content && (
                <div className={styles.tabContent}>
                    {tabs[activeTab].content}
                </div>
            )}
        </div>
    );
};
