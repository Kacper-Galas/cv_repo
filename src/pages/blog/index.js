import React, { useState, useMemo, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BlogHeader } from '../../components/blog_header';
import { Tabs } from '../../components/ui/tabs';
import { Pagination } from '../../components/ui/pagination';
import { Footer } from '../../components/footer';
import styles from './index.module.scss';
import { FiSearch, FiClock, FiCalendar, FiTag, FiX } from 'react-icons/fi';
import { api } from '../../api';

const CATEGORIES = ['Wszystkie', 'React', 'Node.js', 'CSS', 'TypeScript', 'Inne'];

const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });
};

/* ── Search bar with popup results ────────────────────────── */
const SearchBar = ({ articles, onSelectArticle }) => {
    const [query, setQuery] = useState('');
    const [focused, setFocused] = useState(false);
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);

    const results = useMemo(() => {
        if (!query.trim()) return [];
        const q = query.toLowerCase();
        return articles.filter(
            (a) =>
                a.title.toLowerCase().includes(q) ||
                a.excerpt.toLowerCase().includes(q) ||
                a.tags.some((t) => t.toLowerCase().includes(q))
        ).slice(0, 6);
    }, [query, articles]);

    const showPopup = focused && query.trim().length > 0;

    useEffect(() => {
        const handleOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setFocused(false);
            }
        };
        document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, []);

    const handleSelect = (article) => {
        setQuery('');
        setFocused(false);
        onSelectArticle(article);
    };

    const handleClear = () => {
        setQuery('');
        inputRef.current?.focus();
    };

    return (
        <div ref={wrapperRef} className={styles.searchWrapper}>
            <motion.div
                className={`${styles.searchBox} ${focused ? styles.searchBoxFocused : ''}`}
                animate={{ width: focused ? 480 : 320 }}
                transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                style={{ position: 'relative' }}
            >
                <FiSearch className={styles.searchIcon} size={16} />
                <input
                    ref={inputRef}
                    className={styles.searchInput}
                    placeholder="Szukaj artykułów..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setFocused(true)}
                    autoComplete="off"
                    spellCheck={false}
                />
                <AnimatePresence>
                    {query && (
                        <motion.button
                            className={styles.searchClear}
                            onClick={handleClear}
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.7 }}
                            transition={{ duration: 0.14 }}
                            type="button"
                            aria-label="Clear search"
                        >
                            <FiX size={14} />
                        </motion.button>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {showPopup && (
                        <motion.div
                            className={styles.searchPopup}
                            initial={{ opacity: 0, y: -8, scaleY: 0.92 }}
                            animate={{ opacity: 1, y: 0, scaleY: 1 }}
                            exit={{ opacity: 0, y: -6, scaleY: 0.94 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            style={{ originY: 0 }}
                        >
                            {results.length > 0 ? (
                                <ul className={styles.searchResults}>
                                    {results.map((article) => (
                                        <li key={article.id}>
                                            <button
                                                className={styles.searchResult}
                                                onClick={() => handleSelect(article)}
                                                type="button"
                                            >
                                                <div className={styles.searchResultThumb}>
                                                    <img src={article.thumbnail} alt="" />
                                                </div>
                                                <div className={styles.searchResultBody}>
                                                    <span className={styles.searchResultCategory}>{article.category}</span>
                                                    <span className={styles.searchResultTitle}>{article.title}</span>
                                                    <span className={styles.searchResultExcerpt}>{article.excerpt}</span>
                                                </div>
                                                <span className={styles.searchResultMeta}>
                                                    <FiClock size={11} /> {article.readTime} min
                                                </span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className={styles.searchEmpty}>
                                    Brak wyników dla „{query}"
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

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

export const BlogPage = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [articles, setArticles] = useState([]);
    const [totalArticles, setTotalArticles] = useState(0);
    const [loadingList, setLoadingList] = useState(true);
    const [listError, setListError] = useState('');

    const ARTICLES_PER_PAGE = 8;
    const categoryTabs = CATEGORIES.map((cat) => ({ label: cat }));
    const totalPages = Math.max(1, Math.ceil(totalArticles / ARTICLES_PER_PAGE));

    // Fetch article list whenever category or page changes
    useEffect(() => {
        setLoadingList(true);
        setListError('');
        const params = {
            page: currentPage,
            limit: ARTICLES_PER_PAGE,
        };
        if (CATEGORIES[activeCategory] !== 'Wszystkie') {
            params.category = CATEGORIES[activeCategory];
        }
        api.articles
            .list(params)
            .then((res) => {
                setArticles(res.articles);
                setTotalArticles(res.total);
            })
            .catch((err) => setListError(err.message || 'Błąd ładowania artykułów.'))
            .finally(() => setLoadingList(false));
    }, [activeCategory, currentPage]);

    const handleCategoryChange = (_, index) => {
        setActiveCategory(index);
        setCurrentPage(1);
    };

    return (
        <div className={styles.blogPage}>
            <BlogHeader />

            <main className={styles.blogMain}>
                {/* ── Hero ── */}
                <motion.div
                    className={styles.hero}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                    <h1 className={styles.heroTitle}>Nexus</h1>
                    <p className={styles.heroSubtitle}>Artykuły o technologii, cyberbezpieczeństwie, designie i psychologii</p>
                    <div className={styles.heroBar} />
                </motion.div>

                {/* ── Top bar ── */}
                <div className={styles.topBar}>
                    <div className={styles.topBarCenter}>
                        <SearchBar
                            articles={articles}
                            onSelectArticle={(article) => navigate('/article/' + article.id)}
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

                {/* ── Tiles grid ── */}
                <div className={styles.bodyLayout}>
                    <section className={styles.centerPanel}>
                        <motion.div
                            className={styles.tilesGrid}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.18 }}
                        >
                            {loadingList ? (
                                <p className={styles.loadingState}>Ładowanie artykułów...</p>
                            ) : listError ? (
                                <p className={styles.errorState}>{listError}</p>
                            ) : articles.length === 0 ? (
                                <p className={styles.emptyState}>Brak artykułów w tej kategorii.</p>
                            ) : (
                                articles.map((article) => (
                                    <ArticleTile
                                        key={article.id}
                                        article={article}
                                        onClick={(a) => navigate('/article/' + a.id)}
                                    />
                                ))
                            )}
                            {!loadingList && !listError && totalPages > 1 && (
                                <div className={styles.gridPagination}>
                                    <Pagination
                                        totalPages={totalPages}
                                        currentPage={currentPage}
                                        onPageChange={(p) => setCurrentPage(p)}
                                    />
                                </div>
                            )}
                        </motion.div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};