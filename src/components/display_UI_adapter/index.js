import React, { useState } from "react"
import styles from './index.module.scss'
import { HeaderBar } from "../header";
import { IntroPage } from "../introPage";
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
import logoNode from '../../assets/img/Node.js_logo.png'
import logoCPP from '../../assets/img/cplusplus-original.svg'
import reactCer from '../../assets/img/React-certificate.jpg'
import nodeCer from '../../assets/img/node-certificate.jpg'
import kacper from '../../assets/img/DSC_8810 kopia.jpg'
import { Link } from "../link";
import { Bar } from "../bar";
import { InfoPanel } from "../infoPanel";
import { FaInfoCircle } from "react-icons/fa"
import { FaGraduationCap } from "react-icons/fa"
import { FaLaptopCode } from "react-icons/fa"
import { FaBriefcase } from "react-icons/fa"


export const UIDisplayAdapter = () => {

    const reactInfo = `
        React to technologia, do której regularnie wracam, dobrze czuję się zarówno w komponentach funkcyjnych z hookami, jak i tych pisanych klasowo. 
        Używam Redux do zarządzania stanem, Routera do zarządzania nawigacją i React Query do pobierania danych z API. 
        W projektach często wspieram się bibliotekami UI jak MUI czy Tailwind, żeby szybko postawić coś, co dobrze wygląda i działa na różnych ekranach.
        Lubię też doszlifować interfejs animacjami - korzystam z Framer Motion, żeby dodać płynności i efektu „wow” do aplikacji. 
        Styluję w zależności od projektu: czasem klasycznie w Sass, czasem z użyciem CSS-in-JS (styled-components, emotion), w zależności od tego, co najlepiej do projektu pasuje.
    `
    
    const nodeInfo = `
        Na backendzie często pracuje z Node.js i Express, tworzę REST API, routing, middleware, uploady (np. przez Multer) i integrację z bazami danych. 
        Pracuję zarówno z SQL-em, jak i NoSQL-em (np. MongoDB). 
        Do testów używam Postmana, a przy okazji dbam o bezpieczeństwo: walidacja danych, CORS, autoryzacja, obsługa błędów - wszystko, co trzeba, żeby działało porządnie.
    `

    const hobbyInfo = `
        Interesuję się programowaniem użytkowym i webowym, a także tworzeniem gier i grafiką związaną z game devem. 
        Zgłębiam tematykę AI i uczenia maszynowego, chętnie czytam o działaniu algorytmów i testuję różne rozwiązania w praktyce. 
        Lubię eksperymentować ze sprzętem - składam komputery, diagnozuję usterki, działam z elektroniką. 
        Pracowałem z Raspberry Pi (m.in. przy projektach typu Magic Mirror, serwery lokalne), Arduino, a także z aplikacjami pisanymi w C++, Electronie i React. 
        Tworzę strony internetowe i proste aplikacje, łącząc software z hardwarem tam, gdzie tylko się da.
    `

    const infoContent = [
        {
            id: 0,
            label: 'O mnie',
            description: 'Jestem studentem, który lubi działać kreatywnie i stale się rozwijać. Interesuję się nowymi technologiami, programowaniem i tworzeniem różnych projektów, od stron internetowych po gry i elektronikę. Poza komputerem lubię rysować i aktywnie spędzać czas, zawsze staram się znaleźć równowagę między pracą a pasją. Jestem osobą pracowitą, otwartą na nowe wyzwania i chętnie uczę się czegoś nowego, szczególnie wtedy, gdy mogę połączyć wiedzę z praktyką.'
        },
        {
            id: 1,
            label: 'Zainteresowania',
            description: hobbyInfo
        },
        {
            id: 2,
            label: 'Certyfikaty',
            description: <div className={styles.certificatsContainer}><img src={nodeCer}/><img src={reactCer}/></div>
        },
        {
            id: 3,
            label: 'Języki',
            description: 'Polski jest moim językiem ojczystym. Angielskim posługuję się swobodnie, w mowie, piśmie i przy pracy z dokumentacją czy projektami.'
        },
    ]

    return (
        <div>
            <div className={styles.displayUIWrapper}>
                <HeaderBar />
                <IntroPage />
                <PageTemplate label="Informacje" id="informacje" icon={<FaInfoCircle />}>
                    <InfoPanel content={infoContent}/>
                </PageTemplate>
                <PageTemplate label="Wykształcenie" id="wyksztalcenie" icon={<FaGraduationCap />}>
                    <Carousel>
                        <SkillsLayout
                            logo={logoWit}
                            label={'Akademia WIT w Warszawie'}
                        >
                            <p>uczeń drugiego roku na kierunku Informatyki</p>
                            <p>Podczas studiów zdobyłem zaawansowaną wiedzę z zakresu algorytmów, systemów operacyjnych oraz działania komputerów i elektroniki. Rozwinąłem umiejętności programowania w języku C++ na poziomie zaawansowanym. Poznałem zasady działania i projektowania baz danych, w tym praca z systemami takimi jak Oracle oraz Microsoft Access. Zgłębiłem również zagadnienia związane z chmurą obliczeniową, w szczególności Microsoft Azure. Dodatkowo posługuję się programami pakietu Microsoft Office (Word, Excel, PowerPoint, Access).</p>
                            <Link label={'Strona uczelni'} href={'https://www.wit.edu.pl/'}/>
                        </SkillsLayout>
                        <SkillsLayout
                            logo={logoTech}
                            label={'Technikum'}
                        >
                            <p>Zawód technik-informatyk uzyskany w Technikum Mechaniczne nr 5 im. Stefana Starzyńskiego</p>
                            <p>W trakcie nauki w technikum zdobyłem solidne podstawy z zakresu działania komputerów oraz sieci internetowych – od tworzenia kabli RJ-45, przez konfigurację połączeń, aż po spawanie światłowodów. Poznałem podstawy programowania w języku C++ oraz tworzenia stron internetowych. Pracowałem zarówno z systemami Windows Server, jak i Linux, co pozwoliło mi lepiej zrozumieć zarządzanie infrastrukturą IT.</p>
                            <Link label={'Strona szkoły'} href={'https://zs40.pl/'}/>
                        </SkillsLayout>
                    </Carousel>
                </PageTemplate>
                <PageTemplate label="Umiejętności" id="umiejetnosci" icon={<FaLaptopCode />}>
                    <Carousel>
                        <SkillsLayout
                            logo={logoReact}
                            label={'React'}
                        >
                            <p>{reactInfo}</p>
                            <Bar label="Znajomość języka:" progress="100"/>
                        </SkillsLayout>
                        <SkillsLayout
                            logo={logoNode}
                            label={'Node.js'}
                        >
                            <p>{nodeInfo}</p>
                            <Bar label="Znajomość języka:" progress="80"/>
                        </SkillsLayout>
                        <SkillsLayout
                            logo={logoCPP}
                            label={'C++'}
                        >
                            <p>Posiadam solidne podstawy C++, w tym znajomość programowania obiektowego, zarządzania pamięcią oraz struktur danych i algorytmów. Dbam o optymalizację kodu i dobre praktyki programistyczne.</p>
                            <Bar label="Znajomość języka:" progress="60"/>
                        </SkillsLayout>
                        <SkillsLayout
                            logo={logoPHP}
                            label={'PHP'}
                        >
                            <p>Posiadam dobrą znajomość PHP, w tym tworzenia dynamicznych aplikacji webowych oraz poprawnej obsługi żądań i odpowiedzi. Pracuję z bazami danych MySQL, stosując bezpieczne zapytania oraz optymalizację wydajności.</p>
                            <Bar label="Znajomość języka:" progress="60"/>
                        </SkillsLayout>
                        <SkillsLayout
                            logo={logoUE}
                            label={'Unreal engine'}
                        >
                            <p>Posiadam doświadczenie w pracy z Unreal Engine 5, w tym tworzeniu logiki gry za pomocą Blueprintów, implementacji animacji oraz pracy z systemem fizyki i AI. Tworzę interaktywne środowiska i dbam o optymalizację wydajności w projektach opartych na UE5.</p>
                            <Bar label="Znajomość języka:" progress="40"/>
                        </SkillsLayout>
                    </Carousel>
                </PageTemplate>
                <PageTemplate label="Doświadczenie" id="doswiadczenie" icon={<FaBriefcase />}>
                    <Carousel>
                        <SkillsLayout
                            logo={logoING}
                            label={'ING Bank Śląski'}
                        >
                            <p>Staż w banku ing na stanowisku frontend</p>
                            <p>Podczas mojego stażu w Banku ING specjalizowałem się w programowaniu na front-endzie z wykorzystaniem nowoczesnych technologii takich jak React. Skupiałem się na tworzeniu dynamicznych i responsywnych interfejsów użytkownika zgodnie z najlepszymi praktykami w zakresie front-endu. Dodatkowo zajmowałem się testowaniem aplikacji, co pozwoliło mi zapewnić wysoką jakość i stabilność tworzonego kodu poprzez automatyzację testów.</p>
                        </SkillsLayout>
                        <SkillsLayout
                            logo={kacper}
                            label={'Korepetytor'}
                        >
                            <p>Korepetytor Programowania i Projektowania aplikacji</p>
                            <p>Jako korepetytor specjalizuje się w projektowaniu stron internetowych jak i gier komputerowych. Pomagam w zrozumieniu podstawowych i zaawansowanych koncepcji programistycznych jak i ogólnym rozwijaniu umiejętności w językach takich jak HTML, CSS, JavaScript, PHP, C++, React czy Node. Pomagłem moim uczniom zacząć projektowanie gier komputerowych, stron internetowych jak i grafiki 3D.</p>
                        </SkillsLayout>
                    </Carousel>
                </PageTemplate>
                {/* <PageTemplate label="Projekty" /> */}
                <Modal />
            </div>
            <Footer id="kontakt"/>
        </div>
    )
}