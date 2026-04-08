import React from "react";
import styles from "./index.module.scss";

export const Steps = ({ icons = [], current = 0 }) => {
  return (
    <div className={styles.wrapper}>
        {icons.map((icon, index) => (
            <div key={index} className={styles.stepItem}>
                {index !== icons.length - 1 && (
                    <div
                        className={`
                        ${styles.verticalLine}
                        ${index < current ? styles.completedLine : ''}
                        `}
                    />
                )}
                <div
                    className={`
                        ${styles.circle}
                        ${index === current ? styles.active : ''}
                        ${index < current ? styles.completed : ''}
                    `}
                >
                    {React.cloneElement(icon, { color: "#fff" })}
                </div>
            </div>
        ))}
    </div>
  );
};