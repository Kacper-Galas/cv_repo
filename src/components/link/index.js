import React from "react";
import styles from './index.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons/faLink";

export const Link = ({
    label,
    href,
    icon = <FontAwesomeIcon icon={faLink}/>
}) => {
    return (
        <div className={styles.linkContainer}>
            {icon}<a href={href} target="blank">{label}</a>
        </div>
    )
}