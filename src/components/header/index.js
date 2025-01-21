import React from "react";
import { Button } from "../button";
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';

export const HeaderBar = () => {
    const { t } = useTranslation();

    const buttonKeys = [
        'header.button_info_label',
        'header.button_formation_label',
        'header.button_skills_label',
        'header.button_experience_label',
        'header.button_projects_label'
    ];

    return (
        <div className={styles.headerContainer}>
            {buttonKeys.map((key) => (
                <Button 
                    key={key} 
                    label={t(key)}
                />
            ))}
        </div>
    );
};
