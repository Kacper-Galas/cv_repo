import React from "react"
import portrait from '../../assets/img/DSC_8810 kopia.jpg'
import styles from './index.module.scss';
import DEFAULT_STATE_DATA from "../../constants";

export const IntroPage = () => {
    return (
        <div className={styles.introPageContainer}>
            <div className={styles.introPageLeft}>
                <p>Kacper Galas</p>
                <p>Portfolio - <span>{DEFAULT_STATE_DATA.STRINGS.INTRO.DATE}</span></p>
            </div>
            <div className={styles.introPageRight}>
                <img src={portrait} alt="img"/>
            </div>
        </div>
    )
}