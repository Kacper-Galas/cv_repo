import React, { useState, useEffect } from "react";
import styles from './index.module.scss';
import { Button } from "../button";
import { RoundButton } from "../roundButton";
import { DiscordOutlined, GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export const Modal = ({ 
    isOpen, 
    handleClose, 
    headerLabel = 'Modal',
}) => {
    const { t } = useTranslation();
    const [isFullyHidden, setIsFullyHidden] = useState(true);

    useEffect(() => {
        if (isOpen) {
            setIsFullyHidden(false);
        } else {
            const timer = setTimeout(() => setIsFullyHidden(true), 600); 
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    return (
        <div className={styles.modalContainer} style={{ display: isFullyHidden ? 'none' : 'flex' }}>
            <div className={`${styles.modal} ${isOpen ? '' : styles.modalClosed}`}>
                <div className={styles.modalHeader} >
                    <p>{headerLabel}</p>
                </div>
                <div className={styles.modalBody} >
                    <p>{t('modal.body_note')}</p>
                    <div>
                        <RoundButton darkMode={false} icon={<LinkedinOutlined />}/>
                        <RoundButton darkMode={false} icon={<GithubOutlined />}/>
                        <RoundButton darkMode={false} icon={<DiscordOutlined />}/>
                    </div>
                </div>
                <div className={styles.modalFooter} >
                    <Button onClick={handleClose} label={`${t('modal.button_close_label')}`} />
                </div>
            </div>
        </div>
    );
};
