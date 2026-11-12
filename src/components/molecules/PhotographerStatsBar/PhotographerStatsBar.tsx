'use client'

import React from 'react'
import { usePhotographerStats } from '@/contexts/PhotographerStatsContext'

import styles from './PhotographerStatsBar.module.css'

export const PhotographerStatsBar: React.FC = () => {
    const { totalLikes, price } = usePhotographerStats()

    return (
        <aside className={styles.bar} aria-label="Informations du photographe">
            <span>{totalLikes}</span>
            <span>{price}€ / jour</span>
        </aside>
    )
}
