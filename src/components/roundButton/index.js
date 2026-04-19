import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from './index.module.scss'
import { faLinkSlash } from "@fortawesome/free-solid-svg-icons/faLinkSlash";

export const RoundButton = ({
    icon = <FontAwesomeIcon icon={faLinkSlash}/>,
    darkMode = true,
    variant,
    size = 'md',
    bordered = true,
    elevated = false,
    link = '#',
    onClick,
}) => {
    const resolvedVariant = variant || (darkMode ? 'dark' : 'light');
    const Tag = link && link !== '#' ? 'a' : 'button';

    return (
        <Tag
            className={[
                styles.roundButton,
                styles[`variant_${resolvedVariant}`],
                styles[`size_${size}`],
                bordered ? styles.bordered : styles.solid,
                elevated ? styles.elevated : '',
            ].filter(Boolean).join(' ')}
            href={Tag === 'a' ? link : undefined}
            onClick={onClick}
            type={Tag === 'button' ? 'button' : undefined}
        >
            <span className={styles.roundButtonInner}>
                {icon}
            </span>
        </Tag>
    )
}