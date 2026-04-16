import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BlogHeader } from '../../components/blog_header';
import { Footer } from '../../components/footer';
import { CommentsSection } from '../../components/comments';
import { ArticleHero } from '../../components/articleHero';
import { Card } from '../../components/ui/card';
import { Alert } from '../../components/ui/alert';
import { Divider } from '../../components/ui/divider';
import { api, getAuthData } from '../../api';
import { FiChevronLeft, FiStar } from 'react-icons/fi';
import styles from './index.module.scss';

/* ── Block renderer ──────────────────────────────────────── */
function BlockRenderer({ block }) {
    switch (block.type) {
        case 'text':
            return <p className={styles.blockText}>{block.content}</p>;
        case 'html':
            return <div className={styles.blockHtml} dangerouslySetInnerHTML={{ __html: block.content }} />;
        case 'code':
            return (
                <div className={styles.blockCodeWrap}>
                    <div className={styles.blockCodeLang}>{block.language}</div>
                    <pre className={styles.blockCode}><code>{block.content}</code></pre>
                </div>
            );
        case 'image':
            return block.url ? (
                <figure className={styles.blockFigure}>
                    <img src={block.url} alt={block.alt || ''} className={styles.blockImg} />
                    {block.caption && <figcaption className={styles.blockCaption}>{block.caption}</figcaption>}
                </figure>
            ) : null;
        case 'card':
            return <Card title={block.title} subtitle={block.subtitle}>{block.content}</Card>;
        case 'note':
            return <Alert type={block.variant} title={block.title || undefined} message={block.message} />;
        case 'quote':
            return (
                <blockquote className={styles.blockQuote}>
                    <p>{block.content}</p>
                    {block.author && <cite className={styles.blockQuoteAuthor}>— {block.author}</cite>}
                </blockquote>
            );
        case 'table':
            return (
                <div className={styles.blockTableWrap}>
                    <table className={styles.blockTable}>
                        <thead>
                            <tr>{block.headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
                        </thead>
                        <tbody>
                            {block.rows.map((row, ri) => (
                                <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{cell}</td>)}</tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        case 'divider':
            return <Divider />;
        default:
            return null;
    }
}

/* ── Star rating ─────────────────────────────────────────── */
const StarRating = ({ articleId, initial, userRating: initialUserRating, ratingCount: initialCount }) => {
    const [rating, setRating] = useState(initial);
    const [userRating, setUserRating] = useState(initialUserRating);
    const [count, setCount] = useState(initialCount);
    const [hover, setHover] = useState(0);
    const [loading, setLoading] = useState(false);
    const auth = getAuthData();

    const handleRate = async (score) => {
        if (!auth) return;
        setLoading(true);
        try {
            const res = await api.articles.rate(articleId, score);
            setUserRating(res.userRating);
            setRating(res.rating);
            setCount(res.ratingCount);
        } catch {
            // silently fail
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.starRating}>
            <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        className={`${styles.star} ${(hover || userRating) >= star ? styles.starActive : ''}`}
                        onMouseEnter={() => auth && setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => !loading && handleRate(star)}
                        disabled={!auth || loading}
                        title={auth ? `Oceń ${star}/5` : 'Zaloguj się aby ocenić'}
                    >
                        <FiStar size={16} fill={(hover || userRating) >= star ? 'currentColor' : 'none'} />
                    </button>
                ))}
            </div>
            <span className={styles.ratingInfo}>
                {rating != null ? `${rating.toFixed(1)} / 5` : 'Brak ocen'}
                {count > 0 && <span className={styles.ratingCount}> ({count})</span>}
                {!auth && <span className={styles.ratingLogin}> – zaloguj się, by ocenić</span>}
            </span>
        </div>
    );
};

/* ── Chapter sidebar item ────────────────────────────────── */
const ChapterItem = ({ chapter, index, isActive, onClick }) => (
    <button
        className={`${styles.chapterItem} ${isActive ? styles.chapterItemActive : ''}`}
        onClick={() => onClick(index)}
    >
        <span className={styles.chapterItemIndex}>{String(index + 1).padStart(2, '0')}</span>
        <span className={styles.chapterItemTitle}>{chapter.title}</span>
    </button>
);

/* ── ArticlePage ─────────────────────────────────────────── */
export const ArticlePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeChapter, setActiveChapter] = useState(0);
    const chapterRefs = useRef([]);

    useEffect(() => {
        setLoading(true);
        setError('');
        api.articles
            .get(id)
            .then((data) => setArticle(data))
            .catch((err) => setError(err.message || 'Nie udało się załadować artykułu.'))
            .finally(() => setLoading(false));
    }, [id]);

    /* ── IntersectionObserver for active chapter tracking ── */
    useEffect(() => {
        if (!article || !article.chapters?.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible.length > 0) {
                    const idx = chapterRefs.current.indexOf(visible[0].target);
                    if (idx !== -1) setActiveChapter(idx);
                }
            },
            { rootMargin: '-80px 0px -50% 0px', threshold: 0 }
        );

        chapterRefs.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [article]);

    const handleChapterClick = useCallback((index) => {
        setActiveChapter(index);
        const el = chapterRefs.current[index];
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);

    return (
        <div className={styles.articlePage}>
            <BlogHeader />

            {article && <ArticleHero article={article} />}

            <main className={styles.articleMain}>
                {loading && (
                    <motion.p
                        className={styles.stateMsg}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        Ładowanie artykułu...
                    </motion.p>
                )}

                {error && (
                    <motion.p
                        className={styles.errorMsg}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {error}
                    </motion.p>
                )}

                {article && (
                    <>
                        {/* ── Two-column body ── */}
                        <div className={styles.articleLayout}>
                            {/* Sticky chapter sidebar */}
                            <aside className={styles.sidebar}>
                                <div className={styles.sidebarInner}>
                                    <button
                                        className={styles.backBtn}
                                        onClick={() => navigate('/')}
                                    >
                                        <FiChevronLeft size={14} />
                                        Artykuły
                                    </button>

                                    <p className={styles.sidebarLabel}>Rozdziały</p>

                                    {(article.chapters || []).map((chapter, i) => (
                                        <ChapterItem
                                            key={i}
                                            chapter={chapter}
                                            index={i}
                                            isActive={activeChapter === i}
                                            onClick={handleChapterClick}
                                        />
                                    ))}
                                </div>
                            </aside>

                            {/* Article content */}
                            <motion.article
                                className={styles.content}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, ease: 'easeOut' }}
                            >
                                {(article.chapters || []).map((chapter, i) => (
                                    <section
                                        key={i}
                                        id={`chapter-${article.id}-${i}`}
                                        ref={(el) => (chapterRefs.current[i] = el)}
                                        className={styles.chapterSection}
                                    >
                                        <h2 className={styles.chapterTitle}>{chapter.title}</h2>
                                        <div className={styles.chapterBlocks}>
                                            {Array.isArray(chapter.blocks)
                                                ? chapter.blocks.map((block, j) => <BlockRenderer key={j} block={block} />)
                                                : chapter.content
                                                    ? <p>{chapter.content}</p>
                                                    : null
                                            }
                                        </div>
                                    </section>
                                ))}

                                <StarRating
                                    articleId={article.id}
                                    initial={article.rating}
                                    userRating={article.userRating}
                                    ratingCount={article.ratingCount}
                                />
                            </motion.article>
                        </div>

                        {/* ── Comments — separated from article body ── */}
                        <div className={styles.commentsWrap}>
                            <CommentsSection articleId={article.id} />
                        </div>
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
};
