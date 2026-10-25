import React from 'react'
import { Photographer } from '@/lib/prisma/generated/client'
import Image from 'next/image'
import Link from 'next/link'
import styles from './PhotographerCard.module.css'

type Props = {
    photographer: Photographer
}

export const PhotographerCard: React.FC<Props> = ({ photographer }) => {
    return (
        <Link
            href={`/photographers/${photographer.id}`}
            aria-label={`Voir le profil de ${photographer.name}`}
        >
            <article className={styles.card}>
                <Image
                    src={`/${photographer.portrait}`}
                    alt={`Portrait de ${photographer.name}`}
                    width={200}
                    height={200}
                    className={styles.portrait}
                />
                <h2 className={styles.name}>{photographer.name}</h2>
                <p className={styles.location}>
                    {photographer.city}, {photographer.country}
                </p>
                <p className={styles.tagline}>{photographer.tagline}</p>
                <p className={styles.price}>{photographer.price}€/jour</p>
            </article>
        </Link>
    )
}
