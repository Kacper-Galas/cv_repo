import React, { useState, useEffect, useRef } from "react";
import { Button } from "../button";
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Burger } from "../burger";
import { FiGrid } from "react-icons/fi";
import { Steps } from "../steps";
import { FiUser, FiBook, FiCode, FiBriefcase, FiMail } from "react-icons/fi";

const menuRoot = document.getElementById("portal-root");

export const HeaderBar = () => {
    const { t } = useTranslation();
    const menuRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const buttonData = [
        {
            label: "Informacje",
            id: "informacje",
            note: "Kim jestem, co mnie napędza i czym się zajmuję",
        },
        {
            label: "Wykształcenie",
            id: "wyksztalcenie",
            note: "Moja edukacja i zdobyte umiejętności akademickie",
        },
        {
            label: "Umiejętności",
            id: "umiejetnosci",
            note: "Technologie, z których korzystam i które rozwijam",
        },
        {
            label: "Doświadczenie",
            id: "doswiadczenie",
            note: "Gdzie pracowałem i nad czym miałem okazję działać",
        },
        {
            label: "Kontakt",
            id: "kontakt",
            note: "Skontaktuj się ze mną lub odwiedź moje social media",
        },
    ];

    const handleClick = (e, id, index) => {
        e.preventDefault();
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setCurrentStep(index);
      
          // poczekaj aż scroll się zakończy zanim zamkniesz menu
          const timeout = setTimeout(() => {
            setIsMenuOpen(false);
          }, 800); // zwiększ do 800ms lub nawet 1000ms
      
          return () => clearTimeout(timeout);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isMenuOpen &&
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false);
            }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    useEffect(() => {
        const sectionIds = buttonData.map(({ id }) => id);
        const observerOptions = {
          root: null,
          rootMargin: "0px",
          threshold: 0.6, // ile % sekcji musi być widoczne, żeby zareagować
        };
      
        const observerCallback = (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = sectionIds.indexOf(entry.target.id);
              if (index !== -1) {
                setCurrentStep(index);
              }
            }
          });
        };
      
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        sectionIds.forEach((id) => {
          const element = document.getElementById(id);
          if (element) observer.observe(element);
        });
      
        return () => observer.disconnect(); // czyszczenie przy odmontowaniu
    }, []);

    return createPortal(
        <div className={styles.headerContainer}>
            {isMobile ? (
                <>
                    <div className={styles.mobileToggle}>
                        <div className={styles.labelWrapper}>
                            <FiGrid size={25}/>
                            <p className={styles.label}>Portfolio</p>
                        </div>
                        <div className={styles.iconContainer}>
                            <Burger isOpen={isMenuOpen} toggle={() => setIsMenuOpen(!isMenuOpen)} />
                        </div>
                    </div>

                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                ref={menuRef}
                                className={styles.mobileMenuOverlay}
                                initial={{ height: 0 }}
                                animate={{ height: "auto" }}
                                exit={{ height: 0 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                            >
                                <div className={styles.mobileMenu}>
                                <div style={{ paddingTop: 2, paddingBottom: 2 }}>
                                    <Steps 
                                        icons={[<FiUser />, <FiBook />, <FiCode />, <FiBriefcase />, <FiMail />]}
                                        current={currentStep}
                                    />
                                </div>

                                    <div className={styles.mobileMenuInfo}>
                                        {buttonData.map(({ label, id, note }) => (
                                            <div key={id} className={styles.mobileElement}>
                                                <div className={styles.mobileNote}>
                                                    <p><strong onClick={(e) => handleClick(e, id)} className={styles.mobileheaderbutton}>{label}</strong> {note}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            ) : (
                <div className={styles.buttonsContainer}>
                    {buttonData.map(({ label, id }) => (
                        <Button key={id} label={label} onClick={(e) => handleClick(e, id)} />
                    ))}
                </div>
            )}
        </div>,
        menuRoot
    );
};
