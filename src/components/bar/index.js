import styles from './index.module.scss'

export const Bar = ({
    label = 'label',
    progress = '30',
}) => {

    const measureLevels = [
        { id: '0', level: 'Basics' },
        { id: '1', level: 'Average' },
        { id: '2', level: 'Good' },
        { id: '3', level: 'Advanced' },
        { id: '4', level: 'Perfect' }
    ];

    return (
        <>
            <div className={styles.barContainer}>
                <div className={styles.barHeader}>
                    <p className={styles.barLabel}>{label}</p>
                </div>    
                <div className={styles.barBodyContainer}>
                    <div className={styles.barBody}>
                        <div 
                            className={styles.barFill} 
                            style={{width: `${progress + '%'}`}}
                        >

                        </div>
                    </div>
                    <div className={styles.barMeasureContainer}>
                        {measureLevels.map((level, index) => (
                            <div key={level.id} className={styles.barMeasurePart}>
                                <p className={styles.barMeasureLabel}>{level.level}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>  
        </>
    )
}