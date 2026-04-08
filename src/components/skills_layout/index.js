import styles from './index.module.scss'

export const SkillsLayout = ({
    logo,
    label,
    children,
}) => {
    return (
        <>
            <div className={styles.skillsContainer}>
                <div className={styles.skillsHeader}>
                    <img src={logo} className={styles.skillsImg} alt='img'/>
                    <p className={styles.skillsLabel}>{label}</p>
                </div>
                <div className={styles.skillsBody}>
                {children ? (
                    children
                ) : (
                    <p>Add content!</p>
                )}
                </div>
            </div>
        </>
    )
}