import React, { useState } from "react";
import styles from './index.module.scss';
import { Button } from "../button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import { FloatButton } from "antd";
import plFlag from '../../assets/img/pl_flag.png';
import ukFlag from '../../assets/img/uk_flag.png';
import { Modal } from "../modal";
import { useTranslation } from "react-i18next";

export const HeaderPopup = () => {
    const [isOpenPopup, setIsOpenPopup] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { i18n } = useTranslation();

    const handleButtonIcon = () => {
        setIsOpenPopup(prev => !prev);
        handleModalOpen()
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng)
    }

    const floatBtn = (
        <FloatButton.Group
            type="primary"
            trigger="click"
            icon={<FontAwesomeIcon icon={faEarthAmericas} />}
        >
            <FloatButton 
                icon={<img src={plFlag} alt="pl" />} 
                className={styles.floatBtnOption}
                onClick={() => changeLanguage('pl')}
            />
            <FloatButton 
                icon={<img src={ukFlag} alt="uk" />} 
                className={styles.floatBtnOption}
                onClick={() => changeLanguage('en')}
            />
        </FloatButton.Group>
    );

    return (
        <div className={isOpenPopup ? styles.popupOpen : styles.popupClosed}>
            <div className={styles.popupContent}>
                <p>Click the button below to translate the page.</p>
                <Button label="Translate" onClick={handleButtonIcon} />
            </div>
            <div className={styles.popupFooter}>
            </div>
            <Modal isOpen={isModalOpen} handleClose={handleModalClose} headerLabel={'take a look at other sources'}/>
            {!isOpenPopup && floatBtn}
        </div>
    );
};
