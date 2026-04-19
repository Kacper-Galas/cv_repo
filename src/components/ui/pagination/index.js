import React from 'react';
import { motion } from 'framer-motion';
import styles from './index.module.scss';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export const Pagination = ({
    totalPages = 1,
    currentPage = 1,
    onPageChange,
    visibleSlots = 5,
}) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const slotCount = Math.min(totalPages, Math.max(3, visibleSlots));
    const itemWidth = 44;
    const maxOffset = Math.max(0, (totalPages - slotCount) * itemWidth);
    const desiredOffset = (currentPage - 1 - Math.floor(slotCount / 2)) * itemWidth;
    const railOffset = -Math.min(maxOffset, Math.max(0, desiredOffset));

    return (
        <div className={styles.paginationContainer}>
            <button
                className={styles.paginationArrow}
                disabled={currentPage === 1}
                onClick={() => onPageChange?.(currentPage - 1)}
                aria-label="Previous page"
            >
                <FiChevronLeft />
            </button>

            <div className={styles.paginationViewport} style={{ width: slotCount * itemWidth }}>
                <span className={styles.paginationActiveIndicator} />

                <motion.div
                    className={styles.paginationRail}
                    animate={{ x: railOffset }}
                    transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                >
                    {pages.map((page) => (
                        <button
                            key={page}
                            className={`${styles.paginationPage} ${currentPage === page ? styles.activePage : ''}`}
                            onClick={() => onPageChange?.(page)}
                            aria-current={currentPage === page ? 'page' : undefined}
                        >
                            {page}
                        </button>
                    ))}
                </motion.div>
            </div>

            <button
                className={styles.paginationArrow}
                disabled={currentPage === totalPages}
                onClick={() => onPageChange?.(currentPage + 1)}
                aria-label="Next page"
            >
                <FiChevronRight />
            </button>
        </div>
    );
};
