import React, { useState } from "react"
import portrait from '../../assets/img/DSC_8810 kopia.jpg'
import styles from './index.module.scss';
import { Calendar } from "../Calendar";

export const IntroPage = () => {
    return (
        <div className={styles.introPageContainer}>
            <Calendar />
        </div>
    )
}