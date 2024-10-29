import React from "react";
import styles from './index.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

export const PageTemplate = ({
    icon = <FontAwesomeIcon icon={faImage}/>,
    label = 'Page Title',
    desc = 'Description',
    child,
}) => {
    const handleChildEmpty = (element) => {
        if (element) {
            return element;
        } else {
            return (
                <div className={styles.pageTempEmptyBodyContainer}>
                    <div className={styles.pageTempEmptyBody}>
                        <p>At this moment, this page element is unavailable</p>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className={styles.pageTempContainer}>
            <div className={styles.pageTempHeader}>
                <div className={styles.pageTempHeaderTitle}>
                    {icon}{label}
                </div>
                <div className={styles.pageTempHeaderDesc}>
                    {`@${desc}`}
                </div>
            </div>
            <div className={styles.pageTempHeaderBody}>
                {handleChildEmpty(child)}
            </div>
        </div>
    )
}