import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogHeader } from '../../components/blog_header';
import { Footer } from '../../components/footer';
import styles from './index.module.scss';
import { FiPlus, FiTrash2, FiSave, FiEye, FiArrowLeft, FiTag } from 'react-icons/fi';

const CATEGORIES = ['React', 'Node.js', 'CSS', 'TypeScript', 'Inne'];

const emptyChapter = () => ({ title: '', content: '' });

export const CreatorPage = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [excerpt, setExcerpt] = useState('');
    const [tagsInput, setTagsInput] = useState('');
    const [chapters, setChapters] = useState([emptyChapter()]);
    const [preview, setPreview] = useState(false);
    const [saved, setSaved] = useState(false);

    const addChapter = () => setChapters((prev) => [...prev, emptyChapter()]);

    const removeChapter = (index) => {
        if (chapters.length <= 1) return;
        setChapters((prev) => prev.filter((_, i) => i !== index));
    };

    const updateChapter = (index, field, value) => {
        setChapters((prev) =>
            prev.map((ch, i) => (i === index ? { ...ch, [field]: value } : ch))
        );
    };

    const parsedTags = tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

    const handleSave = () => {
        // Mock save
        const article = {
            id: Date.now(),
            title,
            category,
            excerpt,
            tags: parsedTags,
            chapters,
            date: new Date().toISOString().split('T')[0],
            readTime: Math.max(1, Math.ceil(chapters.reduce((acc, ch) => acc + ch.content.length, 0) / 1000)),
        };

        console.log('Mock save:', article);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const isValid = title.trim() && excerpt.trim() && chapters.every((ch) => ch.title.trim() && ch.content.trim());

    return (
        <div className={styles.creatorPage}>
            <BlogHeader />

            <main className={styles.creatorMain}>
                <div className={styles.topBar}>
                    <button className={styles.backBtn} onClick={() => navigate('/')}>
                        <FiArrowLeft size={16} /> Wróć do bloga
                    </button>
                    <h1 className={styles.pageTitle}>Nowy artykuł</h1>
                </div>

                <AnimatePresence mode="wait">
                    {preview ? (
                        <motion.div
                            key="preview"
                            className={styles.previewPanel}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className={styles.previewActions}>
                                <button className={styles.actionBtn} onClick={() => setPreview(false)}>
                                    <FiArrowLeft size={14} /> Edytuj
                                </button>
                            </div>

                            <div className={styles.previewHeader}>
                                <span className={styles.previewCategory}>{category}</span>
                                <h2 className={styles.previewTitle}>{title || 'Bez tytułu'}</h2>
                                <p className={styles.previewExcerpt}>{excerpt}</p>
                                {parsedTags.length > 0 && (
                                    <div className={styles.previewTags}>
                                        {parsedTags.map((tag) => (
                                            <span key={tag} className={styles.previewTag}>
                                                <FiTag size={10} /> {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {chapters.map((ch, i) => (
                                <div key={i} className={styles.previewChapter}>
                                    <h3 className={styles.previewChapterTitle}>{ch.title || `Rozdział ${i + 1}`}</h3>
                                    <p className={styles.previewChapterContent}>{ch.content}</p>
                                </div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="editor"
                            className={styles.editorPanel}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Meta section */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Informacje</h2>

                                <div className={styles.field}>
                                    <label className={styles.label}>Tytuł</label>
                                    <input
                                        className={styles.input}
                                        type="text"
                                        placeholder="Tytuł artykułu..."
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>

                                <div className={styles.fieldRow}>
                                    <div className={styles.field}>
                                        <label className={styles.label}>Kategoria</label>
                                        <select
                                            className={styles.select}
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                            {CATEGORIES.map((cat) => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className={styles.field}>
                                        <label className={styles.label}>Tagi (oddzielone przecinkami)</label>
                                        <input
                                            className={styles.input}
                                            type="text"
                                            placeholder="React, Frontend, Hooks..."
                                            value={tagsInput}
                                            onChange={(e) => setTagsInput(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className={styles.field}>
                                    <label className={styles.label}>Opis / Lead</label>
                                    <textarea
                                        className={styles.textarea}
                                        placeholder="Krótki opis artykułu..."
                                        rows={3}
                                        value={excerpt}
                                        onChange={(e) => setExcerpt(e.target.value)}
                                    />
                                </div>
                            </section>

                            {/* Chapters section */}
                            <section className={styles.section}>
                                <div className={styles.sectionHeader}>
                                    <h2 className={styles.sectionTitle}>Rozdziały</h2>
                                    <button className={styles.addChapterBtn} onClick={addChapter}>
                                        <FiPlus size={14} /> Dodaj rozdział
                                    </button>
                                </div>

                                {chapters.map((chapter, i) => (
                                    <div key={i} className={styles.chapterCard}>
                                        <div className={styles.chapterHeader}>
                                            <span className={styles.chapterIndex}>{String(i + 1).padStart(2, '0')}</span>
                                            {chapters.length > 1 && (
                                                <button
                                                    className={styles.removeChapterBtn}
                                                    onClick={() => removeChapter(i)}
                                                >
                                                    <FiTrash2 size={14} />
                                                </button>
                                            )}
                                        </div>

                                        <div className={styles.field}>
                                            <label className={styles.label}>Tytuł rozdziału</label>
                                            <input
                                                className={styles.input}
                                                type="text"
                                                placeholder={`Rozdział ${i + 1}...`}
                                                value={chapter.title}
                                                onChange={(e) => updateChapter(i, 'title', e.target.value)}
                                            />
                                        </div>

                                        <div className={styles.field}>
                                            <label className={styles.label}>Treść</label>
                                            <textarea
                                                className={styles.textarea}
                                                placeholder="Treść rozdziału..."
                                                rows={6}
                                                value={chapter.content}
                                                onChange={(e) => updateChapter(i, 'content', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </section>

                            {/* Bottom actions */}
                            <div className={styles.bottomActions}>
                                <button
                                    className={styles.previewBtn}
                                    onClick={() => setPreview(true)}
                                >
                                    <FiEye size={14} /> Podgląd
                                </button>
                                <button
                                    className={`${styles.saveBtn} ${!isValid ? styles.saveBtnDisabled : ''}`}
                                    onClick={handleSave}
                                    disabled={!isValid}
                                >
                                    <span className={styles.saveBg} />
                                    <span className={styles.saveText}>
                                        <FiSave size={14} /> {saved ? 'Zapisano!' : 'Zapisz artykuł'}
                                    </span>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <Footer />
        </div>
    );
};
