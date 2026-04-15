import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogHeader } from '../../components/blog_header';
import { Footer } from '../../components/footer';
import styles from './index.module.scss';
import {
    FiPlus, FiTrash2, FiSave, FiEye, FiArrowLeft, FiTag,
    FiAlignLeft, FiCode, FiImage, FiCreditCard, FiInfo, FiMinus,
    FiUpload, FiChevronUp, FiChevronDown, FiGrid, FiMessageSquare,
    FiCamera, FiX,
} from 'react-icons/fi';
import { api, isAdmin } from '../../api';
import { Card } from '../../components/ui/card';
import { Alert } from '../../components/ui/alert';
import { Divider } from '../../components/ui/divider';

const CATEGORIES = ['React', 'Node.js', 'CSS', 'TypeScript', 'Inne'];
const NOTE_VARIANTS = ['info', 'success', 'warning', 'error'];
const CODE_LANGUAGES = ['js', 'ts', 'jsx', 'tsx', 'html', 'css', 'scss', 'json', 'bash', 'sql', 'python', 'rust', 'go'];

const emptyBlock = (type = 'text') => {
    switch (type) {
        case 'text':    return { type: 'text',    content: '' };
        case 'html':    return { type: 'html',    content: '' };
        case 'code':    return { type: 'code',    content: '', language: 'js' };
        case 'image':   return { type: 'image',   url: '', alt: '', caption: '' };
        case 'card':    return { type: 'card',    title: '', subtitle: '', content: '' };
        case 'note':    return { type: 'note',    variant: 'info', title: '', message: '' };
        case 'divider': return { type: 'divider' };
        case 'quote':   return { type: 'quote',   content: '', author: '' };
        case 'table':   return { type: 'table',   headers: ['Kolumna 1', 'Kolumna 2'], rows: [['', '']] };
        default:        return { type: 'text',    content: '' };
    }
};

const emptyChapter = () => ({ title: '', blocks: [emptyBlock('text')] });

const BLOCK_MENU = [
    { type: 'text',    label: 'Tekst',   Icon: FiAlignLeft },
    { type: 'html',    label: 'HTML',    Icon: FiCode },
    { type: 'code',    label: 'Kod',     Icon: FiCode },
    { type: 'image',   label: 'Obraz',   Icon: FiImage },
    { type: 'card',    label: 'Karta',   Icon: FiCreditCard },
    { type: 'note',    label: 'Notatka', Icon: FiInfo },
    { type: 'quote',   label: 'Cytat',   Icon: FiMessageSquare },
    { type: 'table',   label: 'Tabela',  Icon: FiGrid },
    { type: 'divider', label: 'Linia',   Icon: FiMinus },
];

/* â”€â”€ Table editor â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function TableEditor({ block, onChange }) {
    const set = (fields) => onChange({ ...block, ...fields });

    const updateHeader = (ci, val) => {
        const headers = [...block.headers];
        headers[ci] = val;
        set({ headers });
    };
    const updateCell = (ri, ci, val) => {
        const rows = block.rows.map((r, idx) =>
            idx === ri ? r.map((c, j) => (j === ci ? val : c)) : r
        );
        set({ rows });
    };
    const addRow = () => set({ rows: [...block.rows, block.headers.map(() => '')] });
    const removeRow = (ri) => {
        if (block.rows.length <= 1) return;
        set({ rows: block.rows.filter((_, i) => i !== ri) });
    };
    const addCol = () => {
        set({
            headers: [...block.headers, 'Kolumna ' + (block.headers.length + 1)],
            rows: block.rows.map((r) => [...r, '']),
        });
    };
    const removeCol = (ci) => {
        if (block.headers.length <= 1) return;
        set({
            headers: block.headers.filter((_, i) => i !== ci),
            rows: block.rows.map((r) => r.filter((_, i) => i !== ci)),
        });
    };

    return (
        <div className={styles.tableBlock}>
            <div className={styles.tableScrollWrapper}>
                <table className={styles.tableEditor}>
                    <thead>
                        <tr>
                            {block.headers.map((h, ci) => (
                                <th key={ci} className={styles.tableEditorTh}>
                                    <div className={styles.tableHeaderCell}>
                                        <input
                                            className={styles.tableInput}
                                            value={h}
                                            onChange={(e) => updateHeader(ci, e.target.value)}
                                            placeholder={'Kol. ' + (ci + 1)}
                                        />
                                        <button
                                            type="button"
                                            className={styles.tableRemoveColBtn}
                                            onClick={() => removeCol(ci)}
                                            title="Usuń kolumnę"
                                        >×</button>
                                    </div>
                                </th>
                            ))}
                            <th className={styles.tableEditorTh}>
                                <button type="button" className={styles.tableAddBtn} onClick={addCol}>+</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {block.rows.map((row, ri) => (
                            <tr key={ri}>
                                {row.map((cell, ci) => (
                                    <td key={ci} className={styles.tableEditorTd}>
                                        <input
                                            className={styles.tableInput}
                                            value={cell}
                                            onChange={(e) => updateCell(ri, ci, e.target.value)}
                                            placeholder="..."
                                        />
                                    </td>
                                ))}
                                <td className={styles.tableEditorTd}>
                                    <button
                                        type="button"
                                        className={styles.tableRemoveRowBtn}
                                        onClick={() => removeRow(ri)}
                                        title="Usuń wiersz"
                                    >×</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button type="button" className={styles.tableAddRowBtn} onClick={addRow}>
                <FiPlus size={12} /> Dodaj wiersz
            </button>
        </div>
    );
}

/* â”€â”€ Block editor â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function BlockEditor({ block, onChange, onRemove, onMoveUp, onMoveDown, isFirst, isLast }) {
    const fileRef = useRef(null);
    const [uploading, setUploading] = useState(false);

    const set = (fields) => onChange({ ...block, ...fields });

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const { url } = await api.media.upload(file);
            set({ url });
        } catch (err) {
            alert('Nie udało się przesłać obrazu: ' + err.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className={styles.block}>
            <div className={styles.blockToolbar}>
                <span className={styles.blockType}>{block.type.toUpperCase()}</span>
                <div className={styles.blockActions}>
                    <button type="button" className={styles.blockActionBtn} onClick={onMoveUp} disabled={isFirst}>
                        <FiChevronUp size={13} />
                    </button>
                    <button type="button" className={styles.blockActionBtn} onClick={onMoveDown} disabled={isLast}>
                        <FiChevronDown size={13} />
                    </button>
                    <button
                        type="button"
                        className={`${styles.blockActionBtn} ${styles.blockRemove}`}
                        onClick={onRemove}
                    >
                        <FiTrash2 size={13} />
                    </button>
                </div>
            </div>

            {block.type === 'text' && (
                <textarea
                    className={styles.textarea}
                    rows={5}
                    placeholder="Treść akapitu..."
                    value={block.content}
                    onChange={(e) => set({ content: e.target.value })}
                />
            )}

            {block.type === 'html' && (
                <textarea
                    className={`${styles.textarea} ${styles.codeTextarea}`}
                    rows={6}
                    placeholder="<p>Twój HTML...</p>"
                    value={block.content}
                    onChange={(e) => set({ content: e.target.value })}
                    spellCheck={false}
                />
            )}

            {block.type === 'code' && (
                <div className={styles.codeBlock}>
                    <div className={styles.codeTopBar}>
                        <select
                            className={styles.codeLanguageSelect}
                            value={block.language}
                            onChange={(e) => set({ language: e.target.value })}
                        >
                            {CODE_LANGUAGES.map((lang) => (
                                <option key={lang} value={lang}>{lang}</option>
                            ))}
                        </select>
                    </div>
                    <textarea
                        className={`${styles.textarea} ${styles.codeTextarea}`}
                        rows={8}
                        placeholder="// Twój kod..."
                        value={block.content}
                        onChange={(e) => set({ content: e.target.value })}
                        spellCheck={false}
                    />
                </div>
            )}

            {block.type === 'image' && (
                <div className={styles.imageBlock}>
                    <div className={styles.imageUploadRow}>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="URL obrazu..."
                            value={block.url}
                            onChange={(e) => set({ url: e.target.value })}
                        />
                        <button
                            type="button"
                            className={styles.uploadBtn}
                            onClick={() => fileRef.current?.click()}
                            disabled={uploading}
                        >
                            <FiUpload size={13} /> {uploading ? 'Wgrywanie...' : 'Wgraj'}
                        </button>
                        <input
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageUpload}
                        />
                    </div>
                    {block.url && (
                        <img src={block.url} alt={block.alt} className={styles.imagePreviewThumb} />
                    )}
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Tekst alternatywny (alt)..."
                        value={block.alt}
                        onChange={(e) => set({ alt: e.target.value })}
                    />
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Podpis (opcjonalny)..."
                        value={block.caption}
                        onChange={(e) => set({ caption: e.target.value })}
                    />
                </div>
            )}

            {block.type === 'card' && (
                <div className={styles.cardBlock}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Tytuł karty..."
                        value={block.title}
                        onChange={(e) => set({ title: e.target.value })}
                    />
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Podtytuł (opcjonalny)..."
                        value={block.subtitle}
                        onChange={(e) => set({ subtitle: e.target.value })}
                    />
                    <textarea
                        className={styles.textarea}
                        rows={4}
                        placeholder="Treść karty..."
                        value={block.content}
                        onChange={(e) => set({ content: e.target.value })}
                    />
                </div>
            )}

            {block.type === 'note' && (
                <div className={styles.noteBlock}>
                    <div className={styles.noteVariantRow}>
                        {NOTE_VARIANTS.map((v) => (
                            <button
                                key={v}
                                type="button"
                                className={`${styles.variantBtn} ${block.variant === v ? styles.variantBtnActive : ''} ${styles['variant_' + v]}`}
                                onClick={() => set({ variant: v })}
                            >
                                {v}
                            </button>
                        ))}
                    </div>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Tytuł notatki (opcjonalny)..."
                        value={block.title}
                        onChange={(e) => set({ title: e.target.value })}
                    />
                    <textarea
                        className={styles.textarea}
                        rows={3}
                        placeholder="Treść notatki..."
                        value={block.message}
                        onChange={(e) => set({ message: e.target.value })}
                    />
                </div>
            )}

            {block.type === 'quote' && (
                <div className={styles.quoteBlock}>
                    <textarea
                        className={styles.textarea}
                        rows={3}
                        placeholder="Treść cytatu..."
                        value={block.content}
                        onChange={(e) => set({ content: e.target.value })}
                    />
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Autor (opcjonalnie)..."
                        value={block.author}
                        onChange={(e) => set({ author: e.target.value })}
                    />
                </div>
            )}

            {block.type === 'table' && (
                <TableEditor block={block} onChange={onChange} />
            )}

            {block.type === 'divider' && (
                <div className={styles.dividerPlaceholder}>
                    <Divider />
                </div>
            )}
        </div>
    );
}

/* â”€â”€ Block preview â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function BlockPreview({ block }) {
    switch (block.type) {
        case 'text':
            return <p className={styles.previewText}>{block.content}</p>;
        case 'html':
            return <div className={styles.previewHtml} dangerouslySetInnerHTML={{ __html: block.content }} />;
        case 'code':
            return (
                <div className={styles.previewCodeWrap}>
                    <div className={styles.previewCodeLang}>{block.language}</div>
                    <pre className={styles.previewCode}><code>{block.content}</code></pre>
                </div>
            );
        case 'image':
            return block.url ? (
                <figure className={styles.previewFigure}>
                    <img src={block.url} alt={block.alt} className={styles.previewImage} />
                    {block.caption && <figcaption className={styles.previewCaption}>{block.caption}</figcaption>}
                </figure>
            ) : null;
        case 'card':
            return <Card title={block.title} subtitle={block.subtitle}>{block.content}</Card>;
        case 'note':
            return <Alert type={block.variant} title={block.title || undefined} message={block.message} />;
        case 'quote':
            return (
                <blockquote className={styles.previewQuote}>
                    <p>{block.content}</p>
                    {block.author && <cite className={styles.previewQuoteAuthor}>— {block.author}</cite>}
                </blockquote>
            );
        case 'table':
            return (
                <div className={styles.previewTableWrap}>
                    <table className={styles.previewTable}>
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

/* â”€â”€ Main component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export const CreatorPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin()) {
            navigate('/login');
        }
    }, [navigate]);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [excerpt, setExcerpt] = useState('');
    const [tagsInput, setTagsInput] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [thumbUploading, setThumbUploading] = useState(false);
    const [thumbDragOver, setThumbDragOver] = useState(false);
    const thumbnailRef = useRef(null);
    const [chapters, setChapters] = useState([emptyChapter()]);
    const [preview, setPreview] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [saveError, setSaveError] = useState('');

    const handleThumbnailUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setThumbUploading(true);
        try {
            const { url } = await api.media.upload(file);
            setThumbnail(url);
        } catch (err) {
            alert('Nie udało się wgrać miniaturki: ' + err.message);
        } finally {
            setThumbUploading(false);
        }
    };

    const handleThumbDrop = async (e) => {
        e.preventDefault();
        setThumbDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (!file || !file.type.startsWith('image/')) return;
        setThumbUploading(true);
        try {
            const { url } = await api.media.upload(file);
            setThumbnail(url);
        } catch (err) {
            alert('Nie udało się wgrać miniaturki: ' + err.message);
        } finally {
            setThumbUploading(false);
        }
    };

    const addChapter = () => setChapters((prev) => [...prev, emptyChapter()]);
    const removeChapter = (index) => {
        if (chapters.length <= 1) return;
        setChapters((prev) => prev.filter((_, i) => i !== index));
    };
    const updateChapterTitle = (index, value) => {
        setChapters((prev) => prev.map((ch, i) => (i === index ? { ...ch, title: value } : ch)));
    };
    const addBlock = (ci, type) => {
        setChapters((prev) =>
            prev.map((ch, i) =>
                i === ci ? { ...ch, blocks: [...ch.blocks, emptyBlock(type)] } : ch
            )
        );
    };
    const updateBlock = (ci, bi, newBlock) => {
        setChapters((prev) =>
            prev.map((ch, i) => {
                if (i !== ci) return ch;
                return { ...ch, blocks: ch.blocks.map((b, j) => (j === bi ? newBlock : b)) };
            })
        );
    };
    const removeBlock = (ci, bi) => {
        setChapters((prev) =>
            prev.map((ch, i) => {
                if (i !== ci) return ch;
                if (ch.blocks.length <= 1) return ch;
                return { ...ch, blocks: ch.blocks.filter((_, j) => j !== bi) };
            })
        );
    };
    const moveBlock = (ci, bi, dir) => {
        setChapters((prev) =>
            prev.map((ch, i) => {
                if (i !== ci) return ch;
                const blocks = [...ch.blocks];
                const target = bi + dir;
                if (target < 0 || target >= blocks.length) return ch;
                [blocks[bi], blocks[target]] = [blocks[target], blocks[bi]];
                return { ...ch, blocks };
            })
        );
    };

    const parsedTags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);

    const handleSave = async () => {
        setSaveError('');
        setSaving(true);
        try {
            await api.articles.create({ title, category, excerpt, tags: parsedTags, chapters, thumbnail: thumbnail || null });
            setSaved(true);
            setTitle('');
            setCategory(CATEGORIES[0]);
            setExcerpt('');
            setTagsInput('');
            setThumbnail('');
            setChapters([emptyChapter()]);
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            setSaveError(err.message || 'Nie udało się zapisać artykułu.');
        } finally {
            setSaving(false);
        }
    };

    const isValid = title.trim() && excerpt.trim() && chapters.every((ch) => ch.title.trim());

    return (
        <div className={styles.creatorPage}>
            <BlogHeader />
            <main className={styles.creatorMain}>
                <div className={styles.topBar}>
                    <button className={styles.backBtn} onClick={() => navigate('/')}>
                        <FiArrowLeft size={13} /> Wróć
                    </button>
                    <h1 className={styles.pageTitle}>Kreator artykułu</h1>
                    <span className={styles.pageTitleAccent} />
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
                                {thumbnail && (
                                    <img src={thumbnail} alt="miniaturka" className={styles.previewThumb} />
                                )}
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
                                    <h3 className={styles.previewChapterTitle}>{ch.title || 'Rozdział ' + (i + 1)}</h3>
                                    <div className={styles.previewBlocks}>
                                        {ch.blocks.map((block, j) => (
                                            <BlockPreview key={j} block={block} />
                                        ))}
                                    </div>
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
                                    <label className={styles.label}>Miniaturka (16:9)</label>
                                    <div
                                        className={`${styles.thumbZone} ${thumbDragOver ? styles.thumbDragOver : ''}`}
                                        onClick={() => thumbnailRef.current?.click()}
                                        onDragOver={(e) => { e.preventDefault(); setThumbDragOver(true); }}
                                        onDragLeave={() => setThumbDragOver(false)}
                                        onDrop={handleThumbDrop}
                                    >
                                        {thumbnail && <img src={thumbnail} alt="miniaturka" className={styles.thumbImg} />}
                                        {thumbnail && (
                                            <div className={styles.thumbOverlay}>
                                                <FiCamera size={28} />
                                                <span className={styles.thumbLabel}>Zmień miniaturkę</span>
                                            </div>
                                        )}
                                        {!thumbnail && (
                                            <>
                                                <FiCamera size={36} className={styles.thumbIcon} />
                                                <span className={styles.thumbLabel}>
                                                    {thumbUploading ? 'Wgrywanie...' : 'Kliknij lub przeciągnij obraz'}
                                                </span>
                                            </>
                                        )}
                                        {thumbUploading && (
                                            <div className={styles.thumbUploading}><span>Wgrywanie...</span></div>
                                        )}
                                        {thumbnail && (
                                            <button
                                                type="button"
                                                className={styles.thumbClearBtn}
                                                onClick={(e) => { e.stopPropagation(); setThumbnail(''); }}
                                                title="Usuń miniaturkę"
                                            >
                                                <FiX size={14} />
                                            </button>
                                        )}
                                        <input
                                            ref={thumbnailRef}
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={handleThumbnailUpload}
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

                            <section className={styles.section}>
                                <div className={styles.sectionHeader}>
                                    <h2 className={styles.sectionTitle}>Rozdziały</h2>
                                    <button className={styles.previewBtn} onClick={addChapter}>
                                        <FiPlus size={14} /> Dodaj rozdział
                                    </button>
                                </div>
                                {chapters.map((chapter, ci) => (
                                    <div key={ci} className={styles.chapterCard}>
                                        <div className={styles.chapterHeader}>
                                            <span className={styles.chapterIndex}>{String(ci + 1).padStart(2, '0')}</span>
                                            {chapters.length > 1 && (
                                                <button
                                                    className={styles.removeChapterBtn}
                                                    onClick={() => removeChapter(ci)}
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
                                                placeholder={'Rozdział ' + (ci + 1) + '...'}
                                                value={chapter.title}
                                                onChange={(e) => updateChapterTitle(ci, e.target.value)}
                                            />
                                        </div>
                                        <div className={styles.blocksList}>
                                            {chapter.blocks.map((block, bi) => (
                                                <BlockEditor
                                                    key={bi}
                                                    block={block}
                                                    onChange={(nb) => updateBlock(ci, bi, nb)}
                                                    onRemove={() => removeBlock(ci, bi)}
                                                    onMoveUp={() => moveBlock(ci, bi, -1)}
                                                    onMoveDown={() => moveBlock(ci, bi, 1)}
                                                    isFirst={bi === 0}
                                                    isLast={bi === chapter.blocks.length - 1}
                                                />
                                            ))}
                                        </div>
                                        <div className={styles.addBlockToolbar}>
                                            <span className={styles.addBlockLabel}>Dodaj blok:</span>
                                            {BLOCK_MENU.map(({ type, label, Icon }) => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    className={styles.addBlockBtn}
                                                    onClick={() => addBlock(ci, type)}
                                                >
                                                    <Icon size={12} /> {label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </section>

                            <div className={styles.bottomActions}>
                                <button className={styles.previewBtn} onClick={() => setPreview(true)}>
                                    <FiEye size={14} /> Podgląd
                                </button>
                                {saveError && <p className={styles.saveError}>{saveError}</p>}
                                <button
                                    className={`${styles.saveBtn} ${!isValid || saving ? styles.saveBtnDisabled : ''}`}
                                    onClick={handleSave}
                                    disabled={!isValid || saving}
                                >
                                    <span className={styles.saveBg} />
                                    <span className={styles.saveText}>
                                        <FiSave size={14} /> {saving ? 'Zapisywanie...' : saved ? 'Zapisano!' : 'Zapisz artykuł'}
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
