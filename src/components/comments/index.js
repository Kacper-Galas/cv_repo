import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api, getAuthData, isAdmin } from '../../api';
import {
    FiMessageSquare, FiSend, FiTrash2, FiUser, FiCornerDownRight,
} from 'react-icons/fi';
import styles from './index.module.scss';

const formatTs = (ts) => {
    const d = new Date(ts * 1000);
    return d.toLocaleDateString('pl-PL', { day: 'numeric', month: 'short', year: 'numeric' });
};

const getInitials = (name) => {
    if (!name) return '?';
    return name
        .split(' ')
        .map((w) => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
};

const AVATAR_COLORS = ['#ff5246', '#3178c6', '#68a063', '#264de4', '#f5a623', '#888'];

const avatarColor = (name) => {
    let hash = 0;
    for (let i = 0; i < (name || '').length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

export const CommentsSection = ({ articleId }) => {
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

    return (
        <section className={styles.commentsRoot}>
            {/* Clean text header */}
            <div className={styles.commentsHeader}>
                <h3 className={styles.commentsTitle}>
                    Komentarze
                    <span className={styles.commentsBadge}>{comments.length}</span>
                </h3>
                <div className={styles.commentsDivider} />
            </div>

            {/* Body */}
            <div className={styles.commentsBody}>
                {loadingComments ? (
                    <p className={styles.commentsState}>Ładowanie komentarzy...</p>
                ) : comments.length === 0 ? (
                    <div className={styles.commentsEmpty}>
                        <FiCornerDownRight size={20} />
                        <p>Brak komentarzy — bądź pierwszy!</p>
                    </div>
                ) : (
                    <ul className={styles.commentsList}>
                        <AnimatePresence>
                            {comments.map((c, idx) => (
                                <motion.li
                                    key={c.id}
                                    className={styles.comment}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.2, delay: idx * 0.04 }}
                                >
                                    <div
                                        className={styles.commentStrip}
                                        style={{ backgroundColor: avatarColor(c.user_name) }}
                                    />
                                    <div className={styles.commentInner}>
                                        <div className={styles.commentTop}>
                                            <div
                                                className={styles.commentAvatar}
                                                style={{ backgroundColor: avatarColor(c.user_name) }}
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

                {/* Form */}
                {auth ? (
                    <form className={styles.commentForm} onSubmit={handleSubmit}>
                        <label className={styles.commentFormLabel}>Dodaj komentarz</label>
                        <div className={styles.commentFormRow}>
                            <div
                                className={styles.commentFormAvatar}
                                style={{ backgroundColor: avatarColor(auth.name || auth.email) }}
                            >
                                {auth.name ? getInitials(auth.name) : <FiUser size={14} />}
                            </div>
                            <textarea
                                className={styles.commentInput}
                                placeholder="Podziel się swoją opinią..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                rows={3}
                                maxLength={1000}
                            />
                        </div>
                        {sendError && <p className={styles.commentError}>{sendError}</p>}
                        <button
                            type="submit"
                            className={styles.commentSubmit}
                            disabled={sending || !newComment.trim()}
                        >
                            <FiSend size={13} />
                            <span>{sending ? 'Wysyłanie...' : 'Wyślij'}</span>
                        </button>
                    </form>
                ) : (
                    <div className={styles.commentLoginPrompt}>
                        <FiUser size={14} />
                        <p><a href="/login">Zaloguj się</a>, aby dodać komentarz.</p>
                    </div>
                )}
            </div>
        </section>
    );
};
