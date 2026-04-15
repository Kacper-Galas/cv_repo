import React, { useRef } from "react";
import styles from './index.module.scss';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { FiLinkedin, FiTwitter } from "react-icons/fi";

/* ── Logo icon ──────────────────────────────────────────── */
const NexusIcon = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <line x1="2" y1="2" x2="20" y2="20" stroke="#0f1923" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="20" y1="2" x2="2" y2="20" stroke="#0f1923" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
);

const NAV_PRIMARY = [
    { label: 'Artykuły', href: '/' },
    { label: 'Kategorie', href: '/' },
    { label: 'Autorzy', href: '/autorzy' },
    { label: 'O platformie', href: '/about' },
];

const NAV_SECONDARY = [
    { label: 'Regulamin', href: '/regulamin' },
    { label: 'Polityka prywatności', href: '/polityka' },
    { label: 'Status API', href: '/status' },
    { label: 'Kontakt', href: '#kontakt' },
];

/* ── Tilt card wrapper ───────────────────────────────────────── */
const TiltCard = ({ className, children, delay = 0 }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 200, damping: 28 });
    const sy = useSpring(y, { stiffness: 200, damping: 28 });
    const rotateX = useTransform(sy, [-0.5, 0.5], [4, -4]);
    const rotateY = useTransform(sx, [-0.5, 0.5], [-4, 4]);

    const handleMove = (e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const handleLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
        >
            {children}
        </motion.div>
    );
};

export const Footer = ({ ...props }) => {
    const year = new Date().getFullYear();

    return (
        <footer className={styles.footer} {...props}>

            <div className={styles.footerSeparator} />

            {/* ── Bento grid ──────────────────────────────────────── */}
            <div className={styles.bentoGrid}>

                {/* Left — logo & info */}
                <TiltCard className={styles.cardLogo} delay={0}>
                    <div className={styles.cardLogoInner}>
                        <motion.div
                            className={styles.logoRow}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <span className={styles.logoIcon}><NexusIcon /></span>
                            <span className={styles.logoText}>NEXUS</span>
                        </motion.div>

                        <motion.p
                            className={styles.logoTagline}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.26 }}
                        >
                            Ekskluzywna wiedza od praktyków branży.<br />
                            Bez szumu, tylko konkret.
                        </motion.p>

                        <motion.div
                            className={styles.logoDivider}
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.55, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        />

                        <div className={styles.logoStats}>
                            {[
                                { n: '48', l: 'Artykułów' },
                                { n: '12', l: 'Autorów' },
                                { n: '5',  l: 'Kategorii' },
                            ].map(({ n, l }, i) => (
                                <motion.div
                                    key={l}
                                    className={styles.logoStat}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                                >
                                    <span className={styles.logoStatNum}>{n}</span>
                                    <span className={styles.logoStatLabel}>{l}</span>
                                </motion.div>
                            ))}
                        </div>

                        <motion.p
                            className={styles.logoNote}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.76 }}
                        >
                            Platforma zamknięta&thinsp;—&thinsp;dostęp<br />wyłącznie dla zaproszonych autorów.
                        </motion.p>
                    </div>
                </TiltCard>

                {/* Center — CTA */}
                <TiltCard className={styles.cardCta} delay={0.1}>
                    <div className={styles.ctaInner}>
                        <motion.p
                            className={styles.ctaEyebrow}
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.15 }}
                        >
                            Zostań autorem
                        </motion.p>

                        <h3 className={styles.ctaHeadline}>
                            {['TWOJA WIEDZA', 'ZASŁUGUJE', 'NA PREMIUM.'].map((line, i) => (
                                <motion.span
                                    key={i}
                                    className={styles.ctaHeadlineLine}
                                    initial={{ opacity: 0, x: -18 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.55, delay: 0.28 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    {line}
                                </motion.span>
                            ))}
                        </h3>

                        <div className={styles.ctaBtnArea}>
                            <span className={styles.ctaBtnBloom} />
                            <motion.a
                                href="mailto:kontakt@nexus.pl"
                                className={styles.ctaBtn}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.62 }}
                            >
                                <span className={styles.ctaBtnText}>ZŁÓŻ APLIKACJĘ</span>
                                <span className={styles.ctaBtnArrow}>→</span>
                            </motion.a>
                        </div>
                    </div>
                </TiltCard>

                {/* Right — nav */}
                <TiltCard className={styles.cardNav} delay={0.2}>
                    <div className={styles.navInner}>
                        <nav className={styles.navPrimary}>
                            <span className={styles.navLabel}>Nawigacja</span>
                            {NAV_PRIMARY.map(({ label, href }, i) => (
                                <motion.div
                                    key={label}
                                    initial={{ opacity: 0, x: -12 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                                >
                                    <Link to={href} className={styles.navLink}>
                                        <span className={styles.navLinkArrow}>→</span>
                                        {label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <div className={styles.navDivider} />

                        <nav className={styles.navSecondary}>
                            <span className={styles.navSecondaryLabel}>Informacje</span>
                            {NAV_SECONDARY.map(({ label, href }) => (
                                <Link key={label} to={href} className={styles.navSecondaryLink}>
                                    {label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </TiltCard>

            </div>

            {/* ── Bottom bar ──────────────────────────────────────── */}
            <motion.div
                className={styles.bottomBar}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 1 }}
                transition={{ duration: 0.5, delay: 0.45 }}
            >
                <div className={styles.bottomContent}>
                    <span className={styles.copyright}>
                        &copy; {year} Kacper Gałas. Wszelkie prawa zastrzeżone.
                    </span>
                    <span className={styles.estText}>EST. {year}</span>
                    <div className={styles.socialRow}>
                        <motion.a
                            href="https://www.linkedin.com/in/kacper-galas-00b67827a/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialBtn}
                            aria-label="LinkedIn"
                            whileHover={{ y: -3, scale: 1.1 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        >
                            <FiLinkedin size={15} />
                        </motion.a>
                        <motion.a
                            href="#"
                            className={styles.socialBtn}
                            aria-label="X / Twitter"
                            whileHover={{ y: -3, scale: 1.1 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        >
                            <FiTwitter size={15} />
                        </motion.a>
                    </div>
                </div>
            </motion.div>

        </footer>
    );
};
