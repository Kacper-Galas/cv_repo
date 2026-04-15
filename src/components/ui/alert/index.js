import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiInfo, FiCheckCircle, FiAlertTriangle, FiXCircle, FiX } from 'react-icons/fi';
import styles from './index.module.scss';

const ICONS = {
    info: <FiInfo />,
    success: <FiCheckCircle />,
    warning: <FiAlertTriangle />,
    error: <FiXCircle />,
};

export const Alert = ({
    type = 'info',
    title,
    message,
    closable = false,
    icon,
    action,
    onClose,
}) => {
    const [visible, setVisible] = useState(true);

    const handleClose = () => {
        setVisible(false);
        onClose?.();
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className={`${styles.alert} ${styles[`type_${type}`]}`}
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    role="alert"
                >
                    <span className={styles.alertIcon}>
                        {icon || ICONS[type]}
                    </span>

                    <div className={styles.alertContent}>
                        {title && <div className={styles.alertTitle}>{title}</div>}
                        {message && <div className={styles.alertMessage}>{message}</div>}
                    </div>

                    {action && <div className={styles.alertAction}>{action}</div>}

                    {closable && (
                        <button className={styles.closeBtn} onClick={handleClose} aria-label="Close alert" type="button">
                            <FiX size={15} />
                        </button>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
