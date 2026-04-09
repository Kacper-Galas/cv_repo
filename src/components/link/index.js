import React from "react";
import styles from './index.module.scss';
import { FiLink } from "react-icons/fi";

export const Link = ({
    label,
    href,
    icon = <FiLink />
}) => {
    return (
        <div className={styles.linkContainer}>
            {icon}<a href={href} target="blank">{label}</a>
        </div>
    )
}