import React from "react"
import { Button } from "../button"
import styles from './index.module.scss'

export const HeaderBar = () => {
    return (
        <div className={styles.headerContainer}>
            <Button label="Informacje"/>
            <Button label="Wykształcenie"/>
            <Button label="Umiejętności"/>
            <Button label="Doświadczenie"/>
            <Button label="Projekty"/>
        </div>
    )
}