import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { BlogHeader } from '../../components/blog_header';
import { Footer } from '../../components/footer';
import { Card } from '../../components/ui/card';
import { Alert } from '../../components/ui/alert';
import { Divider } from '../../components/ui/divider';
import { api, getAuthData, isAdmin } from '../../api';
import {
    FiCalendar, FiClock, FiEye, FiTag, FiStar,
    FiMessageSquare, FiSend, FiTrash2, FiChevronLeft,
} from 'react-icons/fi';
import styles from './index.module.scss';

/* ── helpers ─────────────────────────────────────────────── */
const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });
};

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

/* ── Comments ─────────────────────────────────────────────── */
const CommentsSection = ({ articleId }) => {
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [sending, setSending] = useState(false);
    const [sendError, setSendError] = useState('');
    const auth = getAuthData();
    const admin = isAdmin();

    useEffect(() => {
        setLoadingComments(true);
        api.comments
            .list(articleId)
            .then((res) => setComments(res.comments))
            .catch(() => {})
            .finally(() => setLoadingComments(false));
    }, [articleId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        setSendError('');
        setSending(true);
        try {
            const comment = await api.comments.create(articleId, newComment.trim());
            setComments((prev) => [...prev, comment]);
            setNewComment('');
        } catch (err) {
            setSendError(err.message || 'Nie udało się dodać komentarza.');
        } finally {
            setSending(false);
        }
    };

    const handleDelete = async (commentId) => {
        try {
            await api.comments.delete(articleId, commentId);
            setComments((prev) => prev.filter((c) => c.id !== commentId));
        } catch {
            // silently fail
        }
    };

    const formatTs = (ts) => {
        const d = new Date(ts * 1000);
        return d.toLocaleDateString('pl-PL', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <div className={styles.commentsSection}>
            <h3 className={styles.commentsTitle}>
                <FiMessageSquare size={16} /> Komentarze ({comments.length})
            </h3>

            {loadingComments ? (
                <p className={styles.commentsLoading}>Ładowanie...</p>
            ) : comments.length === 0 ? (
                <p className={styles.commentsEmpty}>Bądź pierwszą osobą, która skomentuje!</p>
            ) : (
                <ul className={styles.commentsList}>
                    {comments.map((c) => (
                        <li key={c.id} className={styles.comment}>
                            <div className={styles.commentHeader}>
                                <span className={styles.commentAuthor}>{c.user_name}</span>
                                <span className={styles.commentDate}>{formatTs(c.created_at)}</span>
                                {(admin || auth?.id === c.user_id) && (
                                    <button
                                        className={styles.commentDelete}
                                        onClick={() => handleDelete(c.id)}
                                        title="Usuń komentarz"
                                    >
                                        <FiTrash2 size={12} />
                                    </button>
                                )}
                            </div>
                            <p className={styles.commentContent}>{c.content}</p>
                        </li>
                    ))}
                </ul>
            )}

            {auth ? (
                <form className={styles.commentForm} onSubmit={handleSubmit}>
                    <textarea
                        className={styles.commentInput}
                        placeholder="Napisz komentarz..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={3}
                        maxLength={1000}
                    />
                    {sendError && <p className={styles.commentError}>{sendError}</p>}
                    <button type="submit" className={styles.commentSubmit} disabled={sending || !newComment.trim()}>
                        <FiSend size={14} /> {sending ? 'Wysyłanie...' : 'Wyślij'}
                    </button>
                </form>
            ) : (
                <p className={styles.commentLoginPrompt}>
                    <a href="/login">Zaloguj się</a>, aby dodać komentarz.
                </p>
            )}
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
    const [activeChapter, setActiveChapter] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError('');
        api.articles
            .get(id)
            .then((data) => setArticle(data))
            .catch((err) => setError(err.message || 'Nie udało się załadować artykułu.'))
            .finally(() => setLoading(false));
    }, [id]);

    const handleChapterClick = useCallback((index) => {
        setActiveChapter(index);
        if (article) {
            const el = document.getElementById(`chapter-${article.id}-${index}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [article]);

    return (
        <div className={styles.articlePage}>
            <BlogHeader />

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
                    <div className={styles.articleLayout}>

                        {/* ── Sticky chapter sidebar ── */}
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

                        {/* ── Article content ── */}
                        <motion.article
                            className={styles.content}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, ease: 'easeOut' }}
                        >
                            <header className={styles.articleHeader}>
                                <span className={styles.articleCategory}>{article.category}</span>
                                <h1 className={styles.articleTitle}>{article.title}</h1>
                                <div className={styles.articleMeta}>
                                    <span><FiCalendar size={13} /> {formatDate(article.date)}</span>
                                    <span><FiClock size={13} /> {article.readTime ?? article.read_time} min czytania</span>
                                    <span><FiEye size={13} /> {article.views} wyświetleń</span>
                                </div>
                            </header>

                            <p className={styles.articleLead}>{article.excerpt}</p>

                            {(article.chapters || []).map((chapter, i) => (
                                <section
                                    key={i}
                                    id={`chapter-${article.id}-${i}`}
                                    className={`${styles.chapterSection} ${activeChapter === i ? styles.chapterSectionActive : ''}`}
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

                            <div className={styles.articleTags}>
                                {(article.tags || []).map((tag) => (
                                    <span key={tag} className={styles.articleTag}>
                                        <FiTag size={11} /> {tag}
                                    </span>
                                ))}
                            </div>

                            <StarRating
                                articleId={article.id}
                                initial={article.rating}
                                userRating={article.userRating}
                                ratingCount={article.ratingCount}
                            />

                            <CommentsSection articleId={article.id} />
                        </motion.article>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};
