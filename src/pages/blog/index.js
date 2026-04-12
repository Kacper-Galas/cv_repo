import React, { useState, useMemo, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BlogHeader } from '../../components/blog_header';
import { Tabs } from '../../components/ui/tabs';
import { Input } from '../../components/ui/input';
import { Pagination } from '../../components/ui/pagination';
import { Footer } from '../../components/footer';
import styles from './index.module.scss';
import { FiSearch, FiClock, FiCalendar, FiTag } from 'react-icons/fi';

const MOCK_ARTICLES = [
    {
        id: 1,
        title: 'React 19 – najważniejsze zmiany',
        category: 'React',
        date: '2026-03-20',
        readTime: 6,
        thumbnail: 'https://picsum.photos/seed/react19/600/340',
        excerpt:
            'React 19 wprowadza kompilator, Actions, nowe hooki i znacznie lepszą wydajność renderowania. Sprawdzamy, co się zmienia i jak migrować projekty.',
        tags: ['React', 'Frontend'],
        chapters: [
            {
                title: 'Kompilator i Actions',
                content: 'React 19 to jedna z największych aktualizacji frameworka od lat. Nowy kompilator React automatycznie optymalizuje re-rendery, eliminując potrzebę ręcznego stosowania useMemo i useCallback w wielu przypadkach. Actions to nowy wzorzec obsługi formularzy i mutacji danych — pozwala deklaratywnie definiować operacje asynchroniczne z wbudowanym śledzeniem stanu pending, error i optimistic updates.',
            },
            {
                title: 'Nowe hooki',
                content: 'Nowe hooki useFormStatus i useOptimistic upraszczają budowanie interaktywnych formularzy. useFormStatus daje dostęp do stanu wysyłania formularza bez konieczności przekazywania propsów w dół drzewa. useOptimistic pozwala natychmiast pokazać użytkownikowi zaktualizowane dane, zanim serwer potwierdzi zmianę — jeśli coś pójdzie nie tak, stan automatycznie się cofnie.',
            },
            {
                title: 'Wydajność i migracja',
                content: 'Wydajność renderowania wzrosła znacząco dzięki automatycznemu batchingowi i współbieżnemu renderowaniu. Suspense działa teraz płynniej z Server Components, a streaming SSR pozwala na szybsze ładowanie stron. Migracja z React 18 jest relatywnie prosta — większość zmian jest kompatybilna wstecz, choć warto przetestować komponenty korzystające z useEffect i zewnętrznych bibliotek stanu.',
            },
        ],
    },
    {
        id: 2,
        title: 'Node.js + Express – REST API od podstaw',
        category: 'Node.js',
        date: '2026-03-15',
        readTime: 10,
        thumbnail: 'https://picsum.photos/seed/nodejs/600/340',
        excerpt:
            'Krok po kroku buduję REST API z autoryzacją JWT, walidacją schematów Zod i bazą danych MongoDB Atlas.',
        tags: ['Node.js', 'Backend'],
        chapters: [
            {
                title: 'Struktura projektu',
                content: 'Budowanie REST API w Node.js z Express to fundament backendu webowego. Zaczynamy od struktury projektu: routes, controllers, middleware i models — czysty podział odpowiedzialności ułatwia skalowanie i testowanie. Express jako minimalistyczny framework daje pełną kontrolę nad przepływem żądań.',
            },
            {
                title: 'Autoryzacja JWT',
                content: 'Autoryzacja JWT (JSON Web Tokens) pozwala na bezstanowe uwierzytelnianie użytkowników. Tworzymy endpointy /register i /login, które generują tokeny z określonym czasem życia. Middleware weryfikuje token przy każdym chronionym żądaniu — dzięki temu serwer nie musi przechowywać sesji w pamięci.',
            },
            {
                title: 'Walidacja i baza danych',
                content: 'Walidacja danych wejściowych z Zod zapewnia bezpieczeństwo typów na poziomie runtime. Definiujemy schematy dla każdego endpointu i automatycznie odrzucamy nieprawidłowe dane, zanim trafią do logiki biznesowej. MongoDB Atlas jako baza danych w chmurze eliminuje potrzebę zarządzania infrastrukturą — Mongoose jako ODM dodaje warstwę schematów i wbudowaną walidację. Całość zamykamy w Docker Compose dla spójnego środowiska dev i produkcji.',
            },
        ],
    },
    {
        id: 3,
        title: 'CSS Grid vs Flexbox – kiedy co wybrać?',
        category: 'CSS',
        date: '2026-03-10',
        readTime: 5,
        thumbnail: 'https://picsum.photos/seed/cssgrid/600/340',
        excerpt:
            'Praktyczny poradnik, który rozwiewa wątpliwości dotyczące wyboru pomiędzy CSS Grid a Flexbox w codziennych layoutach.',
        tags: ['CSS', 'Frontend'],
        chapters: [
            {
                title: 'Flexbox vs Grid – podstawy',
                content: 'Flexbox i CSS Grid to dwa filary nowoczesnego layoutu. Flexbox działa w jednym wymiarze — idealny do nawigacji, toolbarów, list elementów i centrowania treści. Grid operuje w dwóch wymiarach jednocześnie — kolumny i wiersze — co czyni go najlepszym wyborem dla złożonych layoutów stron, dashboardów i galerii.',
            },
            {
                title: 'Praktyczne zastosowania',
                content: 'W praktyce najczęściej używam Grid dla makro-layoutu strony (header, sidebar, main, footer) i Flexbox dla mikro-layoutu wewnątrz komponentów. Grid z auto-fill i minmax() tworzy responsywne siatki bez media queries. Flexbox z flex-wrap pozwala na elastyczne zawijanie elementów.',
            },
            {
                title: 'Subgrid i współpraca',
                content: 'Subgrid (CSS Grid Level 2) to game-changer — pozwala zagnieżdżonym elementom wyrównać się do siatki rodzica. Eliminuje to mnóstwo hacków z paddingiem i marginesem. Najważniejsza zasada: nie wybieraj jednego na siłę. Oba systemy świetnie współpracują — Grid dla struktury strony, Flexbox dla wycentrowania i rozkładu wewnątrz komponentów.',
            },
        ],
    },
    {
        id: 4,
        title: 'Framer Motion – animacje w React',
        category: 'React',
        date: '2026-03-05',
        readTime: 7,
        thumbnail: 'https://picsum.photos/seed/framer/600/340',
        excerpt:
            'Jak używać Framer Motion do tworzenia płynnych animacji wejścia, wyjścia i przejść między stronami w aplikacjach React.',
        tags: ['React', 'Animacje'],
        chapters: [
            {
                title: 'Deklaratywne animacje',
                content: 'Framer Motion to najbardziej intuicyjna biblioteka animacji dla React. Zamiast pisać skomplikowane keyframes czy zarządzać stanem animacji ręcznie, deklaratywnie opisujesz stan początkowy (initial), docelowy (animate) i wyjściowy (exit). Biblioteka zajmuje się interpolacją i wydajnością.',
            },
            {
                title: 'AnimatePresence',
                content: 'AnimatePresence to komponent, który umożliwia animacje wyjścia — coś, czego czysty CSS nie potrafi zrobić elegancko. Gdy element jest usuwany z DOM, AnimatePresence przechwytuje to zdarzenie i pozwala odegrać animację exit zanim element faktycznie zniknie. Idealny do modali, powiadomień i przejść między stronami.',
            },
            {
                title: 'Layout animations i Variants',
                content: 'Layout animations to magia Framer Motion — wystarczy dodać prop layoutId do elementów, a biblioteka automatycznie animuje zmiany pozycji i rozmiaru. Shared layout transitions pozwalają na płynne przejścia elementów między różnymi komponentami. Variants upraszczają orkiestrację złożonych animacji — definiujesz stany raz i stosujesz je w całym drzewie komponentów z automatycznym staggeringiem.',
            },
        ],
    },
    {
        id: 5,
        title: 'TypeScript w praktyce – typy zaawansowane',
        category: 'TypeScript',
        date: '2026-02-28',
        readTime: 9,
        thumbnail: 'https://picsum.photos/seed/typescript/600/340',
        excerpt:
            'Mapped types, conditional types, infer i template literal types – poznaj narzędzia, które realnie przydają się w pracy.',
        tags: ['TypeScript', 'Frontend'],
        chapters: [
            {
                title: 'Mapped types',
                content: 'Zaawansowane typy TypeScript to potężne narzędzie, które pozwala wyrazić skomplikowane relacje między danymi. Mapped types pozwalają transformować istniejące typy — na przykład Partial<T> zamienia wszystkie pola na opcjonalne, a Record<K, V> tworzy obiekt z kluczami K i wartościami V. Możesz tworzyć własne mapped types z modyfikatorami readonly i optional.',
            },
            {
                title: 'Conditional types i infer',
                content: 'Conditional types (T extends U ? X : Y) pozwalają na tworzenie typów, które zachowują się jak instrukcje warunkowe. W połączeniu z infer wyciągasz typy z zagnieżdżonych struktur — na przykład ReturnType<T> wyciąga typ zwracany z funkcji. To fundament wielu utility types w standardowej bibliotece TypeScript.',
            },
            {
                title: 'Template literal types',
                content: 'Template literal types to nowość, która pozwala manipulować stringami na poziomie typów. Możesz budować skomplikowane wzorce URL, klucze CSS-in-JS czy nazwy eventów automatycznie. W połączeniu z mapped types i conditional types tworzą potężny system typów, który łapie błędy, zanim kod zostanie uruchomiony. Discriminated unions z exhaustive checking (never) gwarantują, że obsłużysz każdy możliwy przypadek.',
            },
        ],
    },
    {
        id: 6,
        title: 'MongoDB – agregacje krok po kroku',
        category: 'Node.js',
        date: '2026-02-20',
        readTime: 8,
        thumbnail: 'https://picsum.photos/seed/mongodb/600/340',
        excerpt:
            '$match, $group, $lookup i $unwind – buduję pipeline agregacyjny, który zastępuje złożone joiny z relacyjnych baz.',
        tags: ['MongoDB', 'Backend'],
        chapters: [
            {
                title: 'Pipeline agregacyjny',
                content: 'Pipeline agregacyjny w MongoDB to odpowiednik złożonych zapytań SQL z GROUP BY, JOIN i podzapytaniami — ale w formie sekwencji etapów przetwarzania dokumentów. Każdy etap transformuje dane i przekazuje wynik do następnego. $match filtruje dokumenty (odpowiednik WHERE), $group agreguje je (GROUP BY), a $project wybiera i przekształca pola (SELECT).',
            },
            {
                title: '$lookup i $unwind',
                content: '$lookup to odpowiednik LEFT JOIN — łączy dokumenty z różnych kolekcji na podstawie wspólnego pola. W połączeniu z $unwind rozkłada tablicę wyników joina na osobne dokumenty, co ułatwia dalsze przetwarzanie. $facet pozwala na równoległe wykonanie kilku pipeline\'ów na tym samym zestawie danych — idealny do tworzenia dashboardów z wieloma widgetami.',
            },
            {
                title: 'Indeksy i wydajność',
                content: 'Indeksy są kluczowe dla wydajności agregacji. $match na początku pipeline\'u może wykorzystać indeks, drastycznie zmniejszając ilość danych do przetworzenia. $sort po $group wymaga przetworzenia w pamięci, więc warto limitować dane wcześniej. Atlas pozwala monitorować wydajność pipeline\'ów i sugeruje brakujące indeksy — narzędzie, które oszczędza godziny debugowania wolnych zapytań.',
            },
        ],
    },
    {
        id: 7,
        title: 'Storybook 8 – organizacja komponentów UI',
        category: 'Inne',
        date: '2026-02-15',
        readTime: 5,
        thumbnail: 'https://picsum.photos/seed/storybook/600/340',
        excerpt:
            'Jak utrzymać porządek w design systemie przy użyciu Storybooka 8 – dokumentacja, addons i współpraca z zespołem.',
        tags: ['Storybook', 'Design System'],
        chapters: [
            {
                title: 'Storybook 8 – co nowego',
                content: 'Storybook 8 to przełom w organizacji design systemów. Nowy silnik renderowania jest znacząco szybszy, a konfiguracja oparta na Vite eliminuje problemy z Webpackiem. Każdy komponent ma swoją "story" — izolowane środowisko, w którym możesz testować wszystkie warianty bez uruchamiania całej aplikacji.',
            },
            {
                title: 'Dokumentacja i addons',
                content: 'Dokumentacja w MDX pozwala łączyć markdown z interaktywnymi przykładami komponentów. Designerzy i PM-owie mogą przeglądać komponenty w przeglądarce bez środowiska developerskiego. Addons jak Controls pozwalają na dynamiczną zmianę propsów, a Accessibility automatycznie sprawdza zgodność z WCAG.',
            },
            {
                title: 'Atomic design i testy wizualne',
                content: 'Najlepsza praktyka to organizacja stories według atomowego design systemu: atomy (Button, Input), molekuły (SearchBar, Card), organizmy (Header, Footer). Chromatic integration pozwala na wizualne testy regresji — każdy PR automatycznie porównuje screenshoty komponentów z poprzednią wersją i flaguje niespodziewane zmiany wizualne.',
            },
        ],
    },
    {
        id: 8,
        title: 'Raspberry Pi jako serwer domowy',
        category: 'Inne',
        date: '2026-02-10',
        readTime: 12,
        thumbnail: 'https://picsum.photos/seed/raspberrypi/600/340',
        excerpt:
            'Konfiguruję Raspberry Pi 5 jako domowy serwer z Nginx, SSL, Docker i automatycznym backupem na chmurę.',
        tags: ['Hardware', 'Linux'],
        chapters: [
            {
                title: 'Instalacja i konfiguracja',
                content: 'Raspberry Pi 5 to zaskakująco wydajna platforma serwerowa. Z 8GB RAM i szybkim procesorem ARM spokojnie obsługuje kilka kontenerów Docker jednocześnie. Zaczynamy od instalacji Raspberry Pi OS Lite (bez GUI) i podstawowej konfiguracji SSH, firewalla (ufw) i automatycznych aktualizacji bezpieczeństwa.',
            },
            {
                title: 'Nginx, SSL i Docker',
                content: 'Nginx jako reverse proxy kieruje ruch do odpowiednich kontenerów na podstawie subdomeny. Certyfikaty SSL z Let\'s Encrypt (certbot) dodają szyfrowanie HTTPS za darmo — automatyczne odnawianie co 90 dni. Docker Compose orchestruje usługi: Nextcloud jako prywatna chmura, Pi-hole jako blokada reklam na poziomie DNS, Uptime Kuma do monitoringu, Portainer do zarządzania kontenerami przez przeglądarkę.',
            },
            {
                title: 'Backup i monitoring',
                content: 'Automatyczny backup to kluczowy element. Skrypt crontab codziennie tworzy snapshot wolumenów Docker, kompresuje je i wysyła na Backblaze B2 (tani storage w chmurze). Rotacja backupów zachowuje 7 dziennych, 4 tygodniowe i 3 miesięczne kopie. Monitoring z Prometheus i Grafana daje wgląd w temperaturę CPU, użycie RAM i ruch sieciowy — wszystko na ładnym dashboardzie dostępnym z telefonu.',
            },
        ],
    },
];

const CATEGORIES = ['Wszystkie', 'React', 'Node.js', 'CSS', 'TypeScript', 'Inne'];

const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });
};

/* ── Left panel: menu item with button-style hover ────────── */
const MenuItemButton = ({ label, isActive, onClick }) => (
    <button
        className={`${styles.menuItem} ${isActive ? styles.menuItemActive : ''}`}
        onClick={onClick}
    >
        <span className={styles.menuItemBg} />
        <span className={styles.menuItemText}>{label}</span>
    </button>
);

/* ── Center: article tile card ────────────────────────────── */
const ArticleTile = ({ article, onClick }) => (
    <motion.button
        className={styles.tile}
        onClick={() => onClick(article)}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
    >
        <div className={styles.tileThumbnail}>
            <img src={article.thumbnail} alt={article.title} />
            <span className={styles.tileThumbnailCategory}>{article.category}</span>
        </div>
        <div className={styles.tileBody}>
            <h3 className={styles.tileTitle}>{article.title}</h3>
            <p className={styles.tileExcerpt}>{article.excerpt}</p>
            <div className={styles.tileMeta}>
                <span className={styles.tileMetaItem}>
                    <FiCalendar size={12} /> {formatDate(article.date)}
                </span>
                <span className={styles.tileMetaItem}>
                    <FiClock size={12} /> {article.readTime} min
                </span>
            </div>
            <div className={styles.tileTags}>
                {article.tags.map((tag) => (
                    <span key={tag} className={styles.tileTag}>
                        <FiTag size={10} /> {tag}
                    </span>
                ))}
            </div>
        </div>
    </motion.button>
);

/* ── Center: full article with chapters ───────────────────── */
const ArticleDetail = ({ article, activeChapter, onBack }) => (
    <motion.div
        className={styles.detail}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.22 }}
    >
        <button className={styles.detailBack} onClick={onBack}>
            ← Wróć
        </button>
        <div className={styles.detailHeader}>
            <span className={styles.detailCategory}>{article.category}</span>
            <h1 className={styles.detailTitle}>{article.title}</h1>
            <div className={styles.detailMeta}>
                <span><FiCalendar size={13} /> {formatDate(article.date)}</span>
                <span><FiClock size={13} /> {article.readTime} min czytania</span>
            </div>
        </div>

        <div className={styles.detailBody}>
            <p className={styles.detailLead}>{article.excerpt}</p>

            {article.chapters.map((chapter, i) => (
                <div
                    key={i}
                    id={`chapter-${article.id}-${i}`}
                    className={`${styles.chapterSection} ${activeChapter === i ? styles.chapterSectionActive : ''}`}
                >
                    <h2 className={styles.chapterTitle}>{chapter.title}</h2>
                    <p>{chapter.content}</p>
                </div>
            ))}
        </div>

        <div className={styles.detailTags}>
            {article.tags.map((tag) => (
                <span key={tag} className={styles.detailTag}>
                    <FiTag size={11} /> {tag}
                </span>
            ))}
        </div>
    </motion.div>
);

export const BlogPage = () => {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState(0);
    const [sort] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [activeChapter, setActiveChapter] = useState(null);

    const ARTICLES_PER_PAGE = 8;
    const categoryTabs = CATEGORIES.map((cat) => ({ label: cat }));

    const filtered = useMemo(() => {
        let result = MOCK_ARTICLES;

        if (CATEGORIES[activeCategory] !== 'Wszystkie') {
            result = result.filter((a) => a.category === CATEGORIES[activeCategory]);
        }

        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(
                (a) =>
                    a.title.toLowerCase().includes(q) ||
                    a.excerpt.toLowerCase().includes(q) ||
                    a.tags.some((t) => t.toLowerCase().includes(q))
            );
        }

        if (sort === 'newest') result = [...result].sort((a, b) => new Date(b.date) - new Date(a.date));
        if (sort === 'oldest') result = [...result].sort((a, b) => new Date(a.date) - new Date(b.date));
        if (sort === 'shortest') result = [...result].sort((a, b) => a.readTime - b.readTime);

        return result;
    }, [search, activeCategory, sort]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / ARTICLES_PER_PAGE));
    const paginated = filtered.slice((currentPage - 1) * ARTICLES_PER_PAGE, currentPage * ARTICLES_PER_PAGE);

    const handleCategoryChange = (_, index) => {
        setActiveCategory(index);
        setCurrentPage(1);
        setSelectedArticle(null);
        setActiveChapter(null);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
        setSelectedArticle(null);
        setActiveChapter(null);
    };

    const handleSelectArticle = useCallback((article) => {
        setSelectedArticle(article);
        setActiveChapter(null);
    }, []);

    const handleChapterClick = useCallback((index) => {
        setActiveChapter(index);
        const el = document.getElementById(`chapter-${selectedArticle.id}-${index}`);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [selectedArticle]);

    return (
        <div className={styles.blogPage}>
            <BlogHeader />

            <main className={styles.blogMain}>
                {/* ── Top bar ── */}
                <div className={styles.topBar}>
                    <div className={styles.topBarLeft}>
                        <h1 className={styles.heroTitle}>Blog</h1>
                    </div>
                    <div className={styles.topBarRight}>
                        <Input
                            placeholder="Szukaj..."
                            icon={<FiSearch />}
                            value={search}
                            onChange={handleSearch}
                        />
                    </div>
                </div>

                {/* ── Tabs ── */}
                <div className={styles.tabsBar}>
                    <Tabs
                        tabs={categoryTabs}
                        defaultTab={activeCategory}
                        onChange={handleCategoryChange}
                    />
                </div>

                {/* ── Body: single-column tiles or 2-column article+chapters ── */}
                <div className={`${styles.bodyLayout} ${selectedArticle ? styles.bodyLayoutWithSidebar : ''}`}>
                    {/* Left panel: chapters (only when viewing article) */}
                    {selectedArticle && (
                        <aside className={styles.leftPanel}>
                            <div className={styles.panelHeader}>
                                <button
                                    className={styles.panelBackBtn}
                                    onClick={() => { setSelectedArticle(null); setActiveChapter(null); }}
                                >
                                    ← Artykuły
                                </button>
                            </div>
                            {selectedArticle.chapters.map((chapter, i) => (
                                <MenuItemButton
                                    key={i}
                                    label={chapter.title}
                                    isActive={activeChapter === i}
                                    onClick={() => handleChapterClick(i)}
                                />
                            ))}
                        </aside>
                    )}

                    {/* Center: tiles or article detail */}
                    <section className={styles.centerPanel}>
                        <AnimatePresence mode="wait">
                            {selectedArticle ? (
                                <ArticleDetail
                                    key={selectedArticle.id}
                                    article={selectedArticle}
                                    activeChapter={activeChapter}
                                    onBack={() => { setSelectedArticle(null); setActiveChapter(null); }}
                                />
                            ) : (
                                <motion.div
                                    key="tiles"
                                    className={styles.tilesGrid}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.18 }}
                                >
                                    {paginated.map((article) => (
                                        <ArticleTile
                                            key={article.id}
                                            article={article}
                                            onClick={handleSelectArticle}
                                        />
                                    ))}
                                    {totalPages > 1 && (
                                        <div className={styles.gridPagination}>
                                            <Pagination
                                                totalPages={totalPages}
                                                currentPage={currentPage}
                                                onPageChange={(p) => { setCurrentPage(p); setSelectedArticle(null); }}
                                            />
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};
