import React, { useState } from "react";
import styles from './index.module.scss';
import { Button } from "../button";
import { GithubOutlined, LinkedinOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "../link";

export const Footer = ({ label }) => {
    const [isSliderOpen, setIsSliderOpen] = useState(false);
    const now = new Date();

    const handleSlider = () => {
        setIsSliderOpen(!isSliderOpen);
    }

    return (
        <div className={styles.footerMainContainer}>
            <div className={styles.footerContainer}>
                <div className={`${styles.footerSliderSection} ${isSliderOpen ? styles.footerSliderSectionOpen : null}`}>
                    <div className={styles.footerSliderLeft}>
                        <Button label={isSliderOpen ? 'Schowaj' : 'Rozwiń'} onClick={handleSlider}/>
                    </div>
                    <div className={styles.footerSliderRight}>
                        <div>
                            <Link icon={<LinkedinOutlined />} label={'Linkedin'} href={'#'}/>
                            <p> - Zobacz profil na Linkedin! Doświadczenie i umiejętności w pigułce.</p>
                        </div>
                        <div>
                            <Link icon={<GithubOutlined />} label={'Github'} href={'#'}/>
                            <p> - Sprawdź kod źródłowy tej strony na Github.</p>
                        </div>
                        <div>
                            <Link icon={<MailOutlined />} label={'Mail'} href={'mailto: kacek7558@gmail.com'}/>
                            <p> - Skontaktuje się ze mną mailowo, jeśli masz pytania.</p>
                        </div>
                    </div>
                </div>
                <div className={styles.footerBottom}>
                    <p>&copy; {now.getFullYear()} Kacper Galas. Wszelkie prawa zastrzeżone.</p>
                </div>
            </div>
        </div>
    )
}