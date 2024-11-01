import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from './index.module.scss'
import { faLinkSlash } from "@fortawesome/free-solid-svg-icons/faLinkSlash";

export const RoundButton = ({
    icon = <FontAwesomeIcon icon={faLinkSlash}/>,
    darkMode = true,
    link = '#',
}) => {
    return (
        <div className={styles.roundButtonBackground}>
            <div className={`${styles.roundButtonContainer} ${darkMode ? '' : styles.roundButtonContainerLight}`}>
                {icon}
            </div>
        </div>
    )
}