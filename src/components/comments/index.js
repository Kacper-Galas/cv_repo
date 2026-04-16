import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api, getAuthData, isAdmin } from '../../api';
import { FiSend, FiTrash2, FiUser } from 'react-icons/fi';
import styles from './index.module.scss';

const formatTs = (ts) => {
    const d = new Date(ts * 1000);
    return d.toLocaleDateString('pl-PL', { day: 'numeric', month: 'short', year: 'numeric' });
};

const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
};

const AVATAR_COLOR = '#0f1923';

export const CommentsSection = ({ articleId }) => {
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [sending, setSending] = useState(false);
    const [sendError, setSendError] = useState('');
    const auth = getAuthData();
    const admin = isAdmin();

    useEffect(() => {
        setLoading(true);
        api.comments
            .list(articleId)
            .then((res) => setComments(res.comments))
            .catch(() => { })
            .finally(() => setLoading(false));
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
        } catch { /* silently fail */ }
    };

    return (
        <section className={styles.commentsRoot}>

            {/* ── Header ──────────────────────────────────────────── */}
            <motion.div
                className={styles.commentsHeader}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <div className={styles.commentsTitleRow}>
                    <span className={styles.commentsCount}>{comments.length}</span>
                    <div className={styles.commentsTitleGroup}>
                        <h3 className={styles.commentsTitle}>KOMENTARZE</h3>
                        <p className={styles.commentsSubtitle}>Dyskusja pod artykułem</p>
                    </div>
                </div>
                <motion.div
                    className={styles.commentsDivider}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                />
            </motion.div>

            {/* ── Body ────────────────────────────────────────────── */}
            <div className={styles.commentsBody}>

                {loadingComments ? (
                    <p className={styles.commentsState}>Ładowanie&hellip;</p>
                ) : comments.length === 0 ? (
                    <motion.div
                        className={styles.commentsEmpty}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <span className={styles.commentsEmptyNum}>0</span>
                        <p>Bądź pierwszą osobą, która skomentuje ten artykuł.</p>
                    </motion.div>
                ) : (
                    <ul className={styles.commentsList}>
                        <AnimatePresence>
                            {comments.map((c, idx) => (
                                <motion.li
                                    key={c.id}
                                    className={styles.comment}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <div className={styles.commentInner}>
                                        <div className={styles.commentTop}>
                                            <div
                                                className={styles.commentAvatar}
                                                style={{ backgroundColor: AVATAR_COLOR }}
                                            >
                                                {getInitials(c.user_name)}
                                            </div>
                                            <div className={styles.commentMeta}>
                                                <span className={styles.commentAuthor}>{c.user_name}</span>
                                                <span className={styles.commentDate}>{formatTs(c.created_at)}</span>
                                            </div>
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
                                    </div>
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </ul>
                )}

                {/* ── Form ────────────────────────────────────────── */}
                {auth ? (
                    <motion.form
                        className={styles.commentForm}
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className={styles.commentFormHeader}>
                            <div
                                className={styles.commentFormAvatar}
                                style={{ backgroundColor: AVATAR_COLOR }}
                            >
                                {auth.name ? getInitials(auth.name) : <FiUser size={13} />}
                            </div>
                            <div className={styles.commentFormMeta}>
                                <span className={styles.commentFormLabel}>DODAJ KOMENTARZ</span>
                                <span className={styles.commentFormUser}>{auth.name || auth.email}</span>
                            </div>
                        </div>

                        <textarea
                            className={styles.commentInput}
                            placeholder="Podziel się swoją opinią..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            rows={4}
                            maxLength={1000}
                        />

                        <div className={styles.commentFormFooter}>
                            {sendError
                                ? <p className={styles.commentError}>{sendError}</p>
                                : <span className={styles.commentFormHint}>{newComment.length} / 1000</span>
                            }
                            <button
                                type="submit"
                                className={styles.commentSubmit}
                                disabled={sending || !newComment.trim()}
                            >
                                <FiSend size={12} />
                                <span>{sending ? 'WYSYŁANIE...' : 'WYŚLIJ'}</span>
                            </button>
                        </div>
                    </motion.form>
                ) : (
                    <motion.div
                        className={styles.commentLoginPrompt}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                    >
                        <span className={styles.commentLoginIcon}><FiUser size={16} /></span>
                        <p><a href="/login">Zaloguj się</a>, aby dodać komentarz.</p>
                    </motion.div>
                )}
            </div>
        </section>
    );
};