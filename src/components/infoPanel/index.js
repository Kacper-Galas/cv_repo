import { Tabs } from 'antd'
import styles from './index.module.scss'
import { useState } from 'react'

const InfoPart = ({
    label,
    desc,
    onClick,
}) => {
    return (
        <>
            <div 
                className={styles.infoPanelPart}
                onClick={() => onClick(desc)}
                tabIndex={0}
            >
                <p>{label}</p>
            </div>
        </>
    )
}

export const InfoPanel = ({
    content,
}) => {
    const [description, setDescription] = useState(content?.[0]?.description || '')
    const [screen, setScreen] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    })

    const handleDescription = (desc) => {
        setDescription(desc)
    }

    return (
        <>
            <div className={styles.infoPanelContainer}> 
                {screen.width > screen.height ? (
                    <>
                        <div className={styles.infoPanelParts}>
                            {content.map((item) => (
                                <InfoPart 
                                    label={item.label} 
                                    key={item.id} 
                                    desc={item.description}
                                    onClick={handleDescription}
                                />
                            ))}
                        </div>
                        <div className={styles.infoPanelDesc}>
                            {description}
                        </div>
                    </>
                ) : (
                    <Tabs 
                        defaultActiveKey='1'
                        items={content.map(item => ({
                            key: String(item.id),
                            label: item.label,
                            children: item.description
                        }))}
                    />
                )}
            </div>
        </>
    )
}