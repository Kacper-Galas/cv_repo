import React, { useState } from "react";
import styles from './index.module.scss';
import { Button } from "../button";
import { DiscordOutlined, GithubOutlined, LinkedinOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "../link";
import { useTranslation } from "react-i18next";

export const Footer = () => {
    const { t } = useTranslation();
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
                        <Button label={isSliderOpen ? `${t('footer.button_hide_label')}` : `${t('footer.button_show_label')}`} onClick={handleSlider}/>
                    </div>
                    <div className={styles.footerSliderRight}>
                        <div>
                            <Link icon={<LinkedinOutlined />} label={'Linkedin'} href={'#'}/>
                            <p> - {`${t('footer.hyperlinks.linkedin_label')}`}</p>
                        </div>
                        <div>
                            <Link icon={<GithubOutlined />} label={'Github'} href={'https://github.com/Kacper-Galas'}/>
                            <p> - {`${t('footer.hyperlinks.github_label')}`}</p>
                        </div>
                        <div>
                            <Link icon={<DiscordOutlined />} label={'Discord'} href={'#'}/>
                            <p> - {`${t('footer.hyperlinks.discord_label')}`}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.footerBottom}>
                    <p>&copy; {now.getFullYear()} {`${t('footer.informations')}`}</p>
                </div>
            </div>
        </div>
    )
}