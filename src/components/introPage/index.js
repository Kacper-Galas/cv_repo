import React from "react"
import portrait from '../../assets/img/DSC_8810 kopia.jpg'
import styles from './index.module.scss';
import { useTranslation } from "react-i18next";

export const IntroPage = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.introPageContainer}>
            <div className={styles.introPageLeft}>
                <p>Kacper Galas</p>
            </div>
            <div className={styles.introPageRight}>
                <img src={portrait} alt="img"/>
            </div>
        </div>
    )
}