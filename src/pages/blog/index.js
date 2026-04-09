import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BlogHeader } from '../../components/blog_header';
import { Tabs } from '../../components/ui/tabs';
import { Input } from '../../components/ui/input';
import { Pagination } from '../../components/ui/pagination';
import { Dropdown } from '../../components/ui/dropdown';
import { Footer } from '../../components/footer';
import styles from './index.module.scss';
import { FiSearch, FiClock, FiCalendar, FiTag, FiChevronRight } from 'react-icons/fi';

const MOCK_ARTICLES = [
    {
        id: 1,
        title: 'React 19 – najważniejsze zmiany',
        category: 'React',
        date: '2026-03-20',
        readTime: 6,
        excerpt:
            'React 19 wprowadza kompilator, Actions, nowe hooki i znacznie lepszą wydajność renderowania. Sprawdzamy, co się zmienia i jak migrować projekty.',
        tags: ['React', 'Frontend'],
    },
    {
        id: 2,
        title: 'Node.js + Express – REST API od podstaw',
        category: 'Node.js',
        date: '2026-03-15',
        readTime: 10,
        excerpt:
            'Krok po kroku buduję REST API z autoryzacją JWT, walidacją schematów Zod i bazą danych MongoDB Atlas.',
        tags: ['Node.js', 'Backend'],
    },
    {
        id: 3,
        title: 'CSS Grid vs Flexbox – kiedy co wybrać?',
        category: 'CSS',
        date: '2026-03-10',
        readTime: 5,
        excerpt:
            'Praktyczny poradnik, który rozwiewa wątpliwości dotyczące wyboru pomiędzy CSS Grid a Flexbox w codziennych layoutach.',
        tags: ['CSS', 'Frontend'],
    },
    {
        id: 4,
        title: 'Framer Motion – animacje w React',
        category: 'React',
        date: '2026-03-05',
        readTime: 7,
        excerpt:
            'Jak używać Framer Motion do tworzenia płynnych animacji wejścia, wyjścia i przejść między stronami w aplikacjach React.',
        tags: ['React', 'Animacje'],
    },
    {
        id: 5,
        title: 'TypeScript w praktyce – typy zaawansowane',
        category: 'TypeScript',
        date: '2026-02-28',
        readTime: 9,
        excerpt:
            'Mapped types, conditional types, infer i template literal types – poznaj narzędzia, które realnie przydają się w pracy.',
        tags: ['TypeScript', 'Frontend'],
    },
    {
        id: 6,
        title: 'MongoDB – agregacje krok po kroku',
        category: 'Node.js',
        date: '2026-02-20',
        readTime: 8,
        excerpt:
            '$match, $group, $lookup i $unwind – buduję pipeline agregacyjny, który zastępuje złożone joiny z relacyjnych baz.',
        tags: ['MongoDB', 'Backend'],
    },
    {
        id: 7,
        title: 'Storybook 8 – organizacja komponentów UI',
        category: 'Inne',
        date: '2026-02-15',
        readTime: 5,
        excerpt:
            'Jak utrzymać porządek w design systemie przy użyciu Storybooka 8 – dokumentacja, addons i współpraca z zespołem.',
        tags: ['Storybook', 'Design System'],
    },
    {
        id: 8,
        title: 'Raspberry Pi jako serwer domowy',
        category: 'Inne',
        date: '2026-02-10',
        readTime: 12,
        excerpt:
            'Konfiguruję Raspberry Pi 5 jako domowy serwer z Nginx, SSL, Docker i automatycznym backupem na chmurę.',
        tags: ['Hardware', 'Linux'],
    },
];

const CATEGORIES = ['Wszystkie', 'React', 'Node.js', 'CSS', 'TypeScript', 'Inne'];

const SORT_OPTIONS = [
    { label: 'Najnowsze', value: 'newest' },
    { label: 'Najstarsze', value: 'oldest' },
    { label: 'Najkrótsze', value: 'shortest' },
];

const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });
};

/* ── Left panel: compact list row ─────────────────────────── */
const ArticleListItem = ({ article, isActive, onClick }) => (
    <button
        className={`${styles.listItem} ${isActive ? styles.listItemActive : ''}`}
        onClick={() => onClick(article)}
    >
        <div className={styles.listItemInner}>
            <span className={styles.listItemCategory}>{article.category}</span>
            <span className={styles.listItemTitle}>{article.title}</span>
            <span className={styles.listItemMeta}>
                <FiCalendar size={11} /> {formatDate(article.date)}
                <span className={styles.listItemDot} />
                <FiClock size={11} /> {article.readTime} min
            </span>
        </div>
        <FiChevronRight className={styles.listItemArrow} size={16} />
    </button>
);

/* ── Center: tile card (grid overview) ────────────────────── */
const ArticleTile = ({ article, onClick }) => (
    <button className={styles.tile} onClick={() => onClick(article)}>
        <span className={styles.tileCategory}>{article.category}</span>
        <h3 className={styles.tileTitle}>{article.title}</h3>
        <p className={styles.tileExcerpt}>{article.excerpt}</p>
        <div className={styles.tileMeta}>
            <FiCalendar size={12} /> {formatDate(article.date)}
            <span className={styles.listItemDot} />
            <FiClock size={12} /> {article.readTime} min
        </div>
        <div className={styles.tileTags}>
            {article.tags.map((tag) => (
                <span key={tag} className={styles.tileTag}>
                    <FiTag size={10} /> {tag}
                </span>
            ))}
        </div>
    </button>
);

/* ── Center: article detail view ──────────────────────────── */
const ArticleDetail = ({ article, onBack }) => (
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
            <p>{article.excerpt}</p>
            <p className={styles.detailPlaceholder}>
                Treść artykułu zostanie podłączona z backendu.
            </p>
        </div>
        <div className={styles.detailTags}>
            {article.tags.map((tag) => (
                <span key={tag} className={styles.tileTag}>
                    <FiTag size={11} /> {tag}
                </span>
            ))}
        </div>
    </motion.div>
);

export const BlogPage = () => {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState(0);
    const [sort, setSort] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedArticle, setSelectedArticle] = useState(null);

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
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
        setSelectedArticle(null);
    };

    const handleSelectArticle = (article) => {
        setSelectedArticle(article);
    };

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
                        <Dropdown
                            label="Sortuj"
                            options={SORT_OPTIONS}
                            value={sort}
                            onChange={(val) => { setSort(val); setCurrentPage(1); }}
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

                {/* ── 2-column body ── */}
                <div className={styles.bodyLayout}>
                    {/* Left: article list */}
                    <aside className={styles.leftPanel}>
                        {filtered.length === 0 ? (
                            <p className={styles.emptyMsg}>Brak wyników.</p>
                        ) : (
                            <>
                                {paginated.map((article) => (
                                    <ArticleListItem
                                        key={article.id}
                                        article={article}
                                        isActive={selectedArticle?.id === article.id}
                                        onClick={handleSelectArticle}
                                    />
                                ))}
                                <div className={styles.listPagination}>
                                    <Pagination
                                        totalPages={totalPages}
                                        currentPage={currentPage}
                                        onPageChange={(p) => { setCurrentPage(p); setSelectedArticle(null); }}
                                    />
                                </div>
                            </>
                        )}
                    </aside>

                    {/* Center: detail or tiles */}
                    <section className={styles.centerPanel}>
                        <AnimatePresence mode="wait">
                            {selectedArticle ? (
                                <ArticleDetail
                                    key={selectedArticle.id}
                                    article={selectedArticle}
                                    onBack={() => setSelectedArticle(null)}
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
