import React from 'react';
import styles from './index.module.scss';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export const Pagination = ({
    totalPages = 1,
    currentPage = 1,
    onPageChange,
}) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

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
