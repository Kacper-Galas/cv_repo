import React, { useState } from "react";
import styles from './index.module.scss';
import { Button } from "../button";
import { LinkedinOutlined, MailOutlined } from "@ant-design/icons";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { Link } from "../link";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

export const Footer = ({
    ...props
}) => {
    const { t } = useTranslation();
    const [isSliderOpen, setIsSliderOpen] = useState(false);
    const now = new Date();

    const handleSlider = () => {
        setIsSliderOpen(!isSliderOpen);
    }

    return (
        <div className={styles.footerMainContainer} {...props}>
            <div className={styles.footerContainer}>
                <div className={`${styles.footerSliderSection} ${isSliderOpen ? styles.footerSliderSectionOpen : null}`}>
                    <div className={styles.footerSliderLeft}>
                        <Button label={isSliderOpen ? `${t('footer.button_hide_label')}` : `${t('footer.button_show_label')}`} onClick={handleSlider}/>
                    </div>
                    <AnimatePresence mode="wait">
                        {isSliderOpen && (
                            <motion.div 
                                className={styles.footerSliderRight}
                                initial={{ height: 0, }}
                                animate={{ height: "auto", }}
                                exit={{ height: 0, }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                            <div>
                                <Link icon={<LinkedinOutlined />} label={'Linkedin'} href={'https://www.linkedin.com/in/kacper-galas-00b67827a/'}/>
                                <p> - {`${t('footer.hyperlinks.linkedin_label')}`}</p>
                            </div>
                            <div>
                                <Link icon={<IoPhonePortraitOutline />} label={'Kontakt'} href={'#'}/>
                                <p> - {`${t('footer.hyperlinks.github_label')}`}</p>
                            </div>
                            <div>
                                <Link icon={<MailOutlined />} label={'E-Mail'} href={'#'}/>
                                <p> - {`${t('footer.hyperlinks.discord_label')}`}</p>
                            </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <div className={styles.footerBottom}>
                    <p>&copy; {now.getFullYear()} {`${t('footer.informations')}`}</p>
                </div>
            </div>
        </div>
    )
}