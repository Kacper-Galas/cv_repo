import React from 'react';
import styles from './index.module.scss';

const renderCell = (column, record, rowIndex) => {
    const value = column.dataIndex ? record?.[column.dataIndex] : undefined;

    if (typeof column.render === 'function') {
        return column.render(value, record, rowIndex);
    }

    return value ?? '—';
};

export const Table = ({
    columns = [],
    dataSource = [],
    rowKey = 'key',
    size = 'md',
    striped = false,
    stickyHeader = false,
    emptyText = 'Brak danych',
}) => {
    const hasData = Array.isArray(dataSource) && dataSource.length > 0;

    return (
        <div className={styles.tableWrap}>
            <table className={`${styles.table} ${styles[`size_${size}`]} ${striped ? styles.striped : ''}`}>
                <thead className={stickyHeader ? styles.stickyHeader : ''}>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key || column.dataIndex || column.title}
                                className={styles[`align_${column.align || 'left'}`]}
                                style={column.width ? { width: column.width } : undefined}
                            >
                                {column.title}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {hasData ? (
                        dataSource.map((record, rowIndex) => (
                            <tr key={typeof rowKey === 'function' ? rowKey(record) : record?.[rowKey] ?? rowIndex}>
                                {columns.map((column) => (
                                    <td
                                        key={column.key || column.dataIndex || column.title}
                                        className={styles[`align_${column.align || 'left'}`]}
                                    >
                                        {renderCell(column, record, rowIndex)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className={styles.empty} colSpan={Math.max(columns.length, 1)}>
                                {emptyText}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};