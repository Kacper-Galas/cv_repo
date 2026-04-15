import React from 'react';
import { motion } from 'framer-motion';
import { BlogHeader } from '../../components/blog_header';
import { Footer } from '../../components/footer';
import { Tag } from '../../components/ui/tag';
import { Progress } from '../../components/ui/progress';
import { Divider } from '../../components/ui/divider';
import styles from './index.module.scss';
import portrait from '../../assets/img/DSC_8810 kopia.jpg';
import {
    FiCode, FiServer, FiLayout, FiDatabase,
    FiGitBranch, FiTerminal,
} from 'react-icons/fi';

const SKILLS = [
    { label: 'React / Next.js', value: 90, icon: <FiLayout size={13} /> },
    { label: 'JavaScript / TypeScript', value: 85, icon: <FiCode size={13} /> },
    { label: 'Node.js / Express', value: 80, icon: <FiServer size={13} /> },
    { label: 'SCSS / CSS', value: 88, icon: <FiLayout size={13} /> },
    { label: 'MongoDB / SQL', value: 72, icon: <FiDatabase size={13} /> },
    { label: 'Git / Linux', value: 82, icon: <FiGitBranch size={13} /> },
];

const TAGS = [
    'React', 'TypeScript', 'Node.js', 'Next.js',
    'MongoDB', 'REST API', 'GraphQL', 'Docker',
    'Framer Motion', 'SCSS', 'Storybook',
];

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export const AboutPage = () => (
    <div className={styles.page}>
        <BlogHeader />

        <main className={styles.main}>
            {/* ── Hero ── */}
            <motion.section
                className={styles.hero}
                variants={stagger}
                initial="hidden"
                animate="visible"
            >
                <motion.div className={styles.heroText} variants={stagger}>
                    <motion.span className={styles.eyebrow} variants={fadeUp}>
                        O mnie
                    </motion.span>
                    <motion.h1 className={styles.heroName} variants={fadeUp}>
                        Kacper<br />Galas
                    </motion.h1>
                    <motion.p className={styles.heroRole} variants={fadeUp}>
                        Frontend Developer
                    </motion.p>
                    <motion.p className={styles.heroBio} variants={fadeUp}>
                        Pasjonat web developmentu z Warszawy. Buduję nowoczesne aplikacje
                        webowe z naciskiem na szczegóły UX, wydajność i czysty kod.
                        Na tym blogu dzielę się wiedzą o React, Node.js i wszystkim,
                        co sprawia że internet jest lepszy.
                    </motion.p>
                    <motion.div className={styles.heroTags} variants={fadeUp}>
                        {TAGS.map((t) => (
                            <Tag key={t} variant="ghost" size="sm">{t}</Tag>
                        ))}
                    </motion.div>
                </motion.div>

                <motion.div
                    className={styles.heroPortrait}
                    variants={fadeUp}
                >
                    <div className={styles.portraitFrame}>
                        <img src={portrait} alt="Kacper Galas" />
                    </div>
                    <span className={styles.portraitAccent} />
                </motion.div>
            </motion.section>

            <Divider />

            {/* ── Skills ── */}
            <motion.section
                className={styles.section}
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <motion.h2 className={styles.sectionTitle} variants={fadeUp}>
                    Umiejętności
                </motion.h2>
                <motion.div className={styles.skillsGrid} variants={stagger}>
                    {SKILLS.map(({ label, value, icon }) => (
                        <motion.div key={label} className={styles.skillItem} variants={fadeUp}>
                            <div className={styles.skillLabel}>
                                <span className={styles.skillIcon}>{icon}</span>
                                {label}
                            </div>
                            <Progress value={value} size="sm" showPercent />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.section>

            <Divider />

            {/* ── Blog CTA ── */}
            <motion.section
                className={styles.ctaSection}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
            >
                <h2 className={styles.ctaTitle}>Czytaj mój blog</h2>
                <p className={styles.ctaText}>
                    Artykuły o React, Node.js, CSS i nowoczesnym web developmencie.
                </p>
                <motion.a
                    href="/"
                    className={styles.ctaBtn}
                    whileHover={{ x: 6 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                >
                    Przejdź do bloga &rarr;
                </motion.a>
            </motion.section>
        </main>

        <Footer />
    </div>
);
