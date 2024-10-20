import React, { useState } from "react";
import styles from './index.module.scss';
import { Button } from "../button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import { FloatButton } from "antd";
import plFlag from '../../assets/img/pl_flag.png';
import ukFlag from '../../assets/img/uk_flag.png';

export const HeaderPopup = () => {
    const [isOpenPopup, setIsOpenPopup] = useState(true);

    const handleButtonIcon = () => {
        setIsOpenPopup(!isOpenPopup);
    };

    const floatBtn = (
        <FloatButton.Group
            type="primary"
            trigger="click"
            icon={<FontAwesomeIcon icon={faEarthAmericas} />}
        >
            <FloatButton icon={<img src={plFlag} alt="pl" />} className={styles.floatBtnOption}/>
            <FloatButton icon={<img src={ukFlag} alt="uk" />} className={styles.floatBtnOption}/>
        </FloatButton.Group>
    );

    return (
        <div className={isOpenPopup ? styles.popupOpen : styles.popupClosed}>
            <div className={styles.popupContent}>
                <p>Click the button below to translate the page.</p>
                <Button label="Translate" onClick={handleButtonIcon} />
            </div>
            <div className={styles.popupFooter}>
                <Button
                    label="Przetłumacz"
                    type="icon"
                    icon={<FontAwesomeIcon icon={faAngleUp} />}
                    onClick={handleButtonIcon}
                />
            </div>
            {!isOpenPopup && floatBtn}
        </div>
    );
};
