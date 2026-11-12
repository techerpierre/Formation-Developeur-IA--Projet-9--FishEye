'use client'

import React from 'react'
import { usePhotographerStats } from '@/contexts/PhotographerStatsContext'

import styles from './PhotographerStatsBar.module.css'
import { Text } from '@/components/atoms/Text/Text'
import Image from 'next/image'

export const PhotographerStatsBar: React.FC = () => {
    const { totalLikes, price } = usePhotographerStats()

    return (
        <aside className={styles.bar} aria-label="Informations du photographe">
            <div className={styles.leftSide}>
                <Text.Span size="lg" bold>{totalLikes}</Text.Span>
                <Image
                    src="/like-filled-black.svg"
                    alt="Like Icon"
                    width={22}
                    height={22}
                />
            </div>
            <Text.Span size="lg" bold>{price}€ / jour</Text.Span>
        </aside>
    )
}
