import React from "react"
import { Button } from "../button"
import styles from './index.module.scss'
import DEFAULT_STATE_DATA from "../../constants"

export const HeaderBar = () => {
    const buttonsLabels = DEFAULT_STATE_DATA.STRINGS.BUTTONS.HEADER_BUTTONS;

    return (
        <div className={styles.headerContainer}>
            {Object.entries(buttonsLabels).map(([key, label]) => (
                <Button 
                    key={key} 
                    label={label}
                />
            ))}
        </div>
    )
}