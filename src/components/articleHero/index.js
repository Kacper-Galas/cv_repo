import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiCalendar, FiClock, FiTag, FiStar, FiEye, FiMessageSquare, FiUsers } from 'react-icons/fi';
import styles from './index.module.scss';

const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });
};

/* ── Staggered char-by-char title ───────────────────────────── */
const AnimatedTitle = ({ title }) => {
    const words = (title || '').split(' ');
    return (
        <h1 className={styles.heroTitle} aria-label={title}>
            {words.map((word, wi) => (
                <span key={wi} className={styles.heroTitleWord}>
                    {word.split('').map((char, ci) => (
                        <motion.span
                            key={ci}
                            className={styles.heroTitleChar}
                            initial={{ opacity: 0, y: 30, rotateX: -50 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{
                                duration: 0.55,
                                delay: 0.3 + wi * 0.08 + ci * 0.02,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}
                    {wi < words.length - 1 && (
                        <span className={styles.heroTitleSpace}>&nbsp;</span>
                    )}
                </span>
            ))}
        </h1>
    );
};

/* ── Star row ───────────────────────────────────────────────── */
const StarRow = ({ rating }) => (
    <div className={styles.heroRatingStars}>
        {[1, 2, 3, 4, 5].map((i) => (
            <FiStar
                key={i}
                size={11}
                fill={i <= Math.round(rating) ? '#ff5246' : 'none'}
                stroke={i <= Math.round(rating) ? '#ff5246' : 'rgba(255,255,255,0.2)'}
            />
        ))}
    </div>
);

/* ── Main component ─────────────────────────────────────────── */
export const ArticleHero = ({ article }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    // Parallax na obrazie
    const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
    const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
    // Overlay ciemnieje przy scrollu
    const overlayO = useTransform(scrollYProgress, [0, 0.5], [0.2, 0.7]);

    const rating = article.rating != null ? article.rating : null;
    const views = article.views ?? 0;
    const chapters = (article.chapters || []).length;
    const readTime = article.readTime ?? article.read_time ?? '?';

    const STATS = [
        { icon: <FiEye size={13} />, val: views.toLocaleString('pl-PL'), label: 'odsłon' },
        { icon: <FiMessageSquare size={13} />, val: chapters, label: 'rozdziałów' },
        { icon: <FiClock size={13} />, val: readTime, label: 'min czyt.' },
        ...(rating != null ? [{
            icon: <FiStar size={13} fill="currentColor" />,
            val: rating.toFixed(1),
            label: 'ocena',
            coral: true,
        }] : []),
    ];

    return (
        <div className={styles.heroIntro} ref={containerRef}>

            {/* ── LEFT — obraz z parallaxem ──────────────────── */}
            <div className={styles.heroImagePanel}>
                {article.thumbnail ? (
                    <>
                        {/* Czarna kurtyna zjeżdżająca w górę — reveal */}
                        <motion.div
                            className={styles.heroImageCurtain}
                            initial={{ scaleY: 1 }}
                            animate={{ scaleY: 0 }}
                            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
                        />

                        <motion.div
                            className={styles.heroImageWrap}
                            style={{ y: imgY, scale: imgScale }}
                        >
                            <img
                                src={article.thumbnail}
                                alt={article.title}
                                className={styles.heroImage}
                            />
                        </motion.div>

                        <motion.div
                            className={styles.heroImageOverlay}
                            style={{ opacity: overlayO }}
                        />
                    </>
                ) : (
                    <div className={styles.heroImageFallback} />
                )}

                {/* Kategoria — floating pill w lewym dolnym rogu obrazu */}
                <motion.span
                    className={styles.heroCategoryPill}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                    {article.category}
                </motion.span>
            </div>

            {/* ── RIGHT — treść ──────────────────────────────── */}
            <div className={styles.heroContent}>

                {/* Social proof — ocena + liczba czytelników */}
                {rating != null && (
                    <motion.div
                        className={styles.heroProof}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.18, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Wielka cyfra oceny */}
                        <span className={styles.heroRatingNum}>{rating.toFixed(1)}</span>

                        <div className={styles.heroRatingRight}>
                            <StarRow rating={rating} />
                            <span className={styles.heroRatingLabel}>
                                {views > 0
                                    ? `${views.toLocaleString('pl-PL')} czytelników`
                                    : 'Ocena społeczności'}
                            </span>
                        </div>

                        {/* Separator */}
                        <div className={styles.heroProofDivider} />

                        {/* Czas czytania + rozdziały obok oceny */}
                        <div className={styles.heroProofQuick}>
                            <span><FiClock size={10} />{readTime} min</span>
                            <span><FiMessageSquare size={10} />{chapters} rozdz.</span>
                        </div>
                    </motion.div>
                )}

                {/* Tytuł — animacja per-litera */}
                <AnimatedTitle title={article.title} />

                {/* Coral underline */}
                <motion.div
                    className={styles.heroTitleBar}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.65, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Excerpt */}
                <motion.p
                    className={styles.heroExcerpt}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.62, duration: 0.4 }}
                >
                    {article.excerpt}
                </motion.p>

                {/* Data + autor */}
                <motion.div
                    className={styles.heroMeta}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.74, duration: 0.35 }}
                >
                    <span><FiCalendar size={12} />{formatDate(article.date)}</span>
                    <span><FiUsers size={12} />{article.author_name || 'Autor'}</span>
                </motion.div>

                {/* Stats — liczby w Bebas Neue */}
                <motion.div
                    className={styles.heroStats}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.84, duration: 0.35 }}
                >
                    {STATS.map(({ icon, val, label, coral }, i) => (
                        <motion.div
                            key={label}
                            className={styles.heroStat}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 + i * 0.08, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className={`${styles.heroStatIcon}${coral ? ` ${styles.heroStatIconCoral}` : ''}`}>
                                {icon}
                            </span>
                            <span className={`${styles.heroStatValue}${coral ? ` ${styles.heroStatValueCoral}` : ''}`}>
                                {val}
                            </span>
                            <span className={styles.heroStatLabel}>{label}</span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Tagi */}
                <motion.div
                    className={styles.heroTags}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.08, duration: 0.35 }}
                >
                    {(article.tags || []).map((tag, i) => (
                        <motion.span
                            key={tag}
                            className={styles.heroTag}
                            initial={{ opacity: 0, scale: 0.82 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.12 + i * 0.055, duration: 0.28 }}
                        >
                            <FiTag size={9} />{tag}
                        </motion.span>
                    ))}
                </motion.div>

            </div>
        </div>
    );
};