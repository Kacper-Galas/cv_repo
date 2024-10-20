import React, { useState } from "react"
import portrait from '../../assets/img/DSC_8810 kopia.jpg'
import styles from './index.module.scss';
import { Calendar } from "../Calendar";

export const IntroPage = () => {
    return (
        <div className={styles.introPageContainer}>
            <div className={styles.introPageLeft}>
                <p>Kacper Galas</p>
                <p>Portfolio {process.env.REACT_APP_LAST_COMMIT_DATE}</p>
            </div>
            <div className={styles.introPageRight}>
                <img src={portrait} />
            </div>
        </div>
    )
}