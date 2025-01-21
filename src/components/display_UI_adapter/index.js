import React, { useState } from "react"
import styles from './index.module.scss'
import { HeaderBar } from "../header";
import { IntroPage } from "../introPage";
import { HeaderPopup } from "../header_popup";
import { Footer } from "../footer";
import { PageTemplate } from "../PageTemplate";
import { Modal } from "../modal";
import { Carousel } from 'antd';
import { SkillsLayout } from "../skills_layout";
import logoWit from '../../assets/img/Logo-WIT-2019.png'
import logoTech from '../../assets/img/logo-zs40.png'
import logoING from '../../assets/img/ING.png'
import logoReact from '../../assets/img/react-original.svg'
import logoPHP from '../../assets/img/php-original.svg'
import logoUE from '../../assets/img/unrealengine-original.svg'
import logoJS from '../../assets/img/javascript-original.svg'
import logoCPP from '../../assets/img/cplusplus-original.svg'
import { Link } from "../link";
import { Bar } from "../bar";
import { InfoPanel } from "../infoPanel";


export const UIDisplayAdapter = () => {
    const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

    const infoContent = [
        {
            id: 0,
            label: 'O mnie',
            description: lorem + 'o mnie'
        },
        {
            id: 1,
            label: 'Zainteresowania',
            description: lorem + 'zainteresowania'
        },
        {
            id: 2,
            label: 'Certyfikaty i kursy',
            description: lorem + 'kursy'
        },
        {
            id: 3,
            label: 'Języki obce',
            description: lorem + 'jezyki'
        },
    ]

    return (
        <div>
            <HeaderPopup />
            <div className={styles.displayUIWrapper}>
                <HeaderBar />
                <IntroPage />
                <PageTemplate label="Informacje">
                    <InfoPanel content={infoContent}/>
                </PageTemplate>
                <PageTemplate label="Wykształcenie">
                    <Carousel autoplay>
                        <SkillsLayout
                            logo={logoWit}
                            label={'Akademia WIT w Warszawie'}
                        >
                            <p>uczeń drugiego roku na kierunku Informatyki</p>
                            <p>"WIT powstał z inicjatywy władz Polskiej Akademii Nauk. Marka WIT jest rozpoznawalna i ceniona na rynku edukacyjnym. WIT należy do prestiżowych stowarzyszeń zrzeszających najlepsze szkoły oraz cieszy się uznaniem zyskując certyfikaty i dyplomy będące gwarancją wysokiego poziomu nauczania."</p>
                            <Link label={'Strona uczelni'} />
                        </SkillsLayout>
                        <SkillsLayout
                            logo={logoTech}
                            label={'Technikum'}
                        >
                            <p>Zawód technik-informatyk uzyskany w Technikum Mechaniczne nr 5 im. Stefana Starzyńskiego</p>
                            <p>"Technikum Mechaniczne nr 5 im. Stefana Starzyńskiego to szkoła z ponad siedemdziesięcioletnią tradycją. W budynku szkoły znajduje się 20 sal lekcyjnych, w tym cztery pracownie internetowe, pracownia elektryczna i dwie pracownie doposażone przez firmę partnerską PGNiG TERMIKA SA. Firma ta funduje stypendia dla najlepszych uczniów, prowadzi dodatkowe zajęcia oraz organizuje praktyki zawodowe w elektrociepłowniach warszawskich."</p>
                            <Link label={'Strona szkoły'} />
                        </SkillsLayout>
                    </Carousel>
                </PageTemplate>
                <PageTemplate label="Umiejętności">
                    <Carousel autoplay>
                        <SkillsLayout
                            logo={logoReact}
                            label={'React'}
                        >
                            <p>{lorem}</p>
                            <Bar label="Znajomość języka:" progress="100"/>
                        </SkillsLayout>
                        <SkillsLayout
                            logo={logoJS}
                            label={'JavaScript'}
                        >
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <Bar label="Znajomość języka:" progress="80"/>
                        </SkillsLayout>
                        <SkillsLayout
                            logo={logoCPP}
                            label={'C++'}
                        >
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <Bar label="Znajomość języka:" progress="60"/>
                        </SkillsLayout>
                        <SkillsLayout
                            logo={logoPHP}
                            label={'PHP'}
                        >
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <Bar label="Znajomość języka:" progress="60"/>
                        </SkillsLayout>
                        <SkillsLayout
                            logo={logoUE}
                            label={'Unreal engine'}
                        >
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <Bar label="Znajomość języka:" progress="40"/>
                        </SkillsLayout>
                    </Carousel>
                </PageTemplate>
                <PageTemplate label="Doświadczenie">
                    <SkillsLayout
                        logo={logoING}
                        label={'ING Bank Śląski'}
                    >
                        <p>Staż w banku ing na stanowisku frontend</p>
                        <p>Podczas mojego stażu w Banku ING specjalizowałem się w programowaniu na front-endzie z wykorzystaniem nowoczesnych technologii oraz podejścia programistycznego opartego na bibliotece React. Skupiałem się na tworzeniu dynamicznych i responsywnych interfejsów użytkownika zgodnie z najlepszymi praktykami w zakresie front-endu. Dodatkowo zajmowałem się testowaniem aplikacji przy użyciu narzędzia Nightwatch, co pozwoliło mi zapewnić wysoką jakość i stabilność tworzonego kodu poprzez automatyzację testów.</p>
                    </SkillsLayout>
                </PageTemplate>
                <PageTemplate label="Projekty" />
                <Modal />
            </div>
            <Footer />
        </div>
    )
}