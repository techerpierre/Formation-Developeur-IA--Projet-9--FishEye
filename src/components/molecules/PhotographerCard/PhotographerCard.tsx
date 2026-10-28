import React from 'react'
import { Photographer } from '@/lib/prisma/generated/client'
import Image from 'next/image'
import Link from 'next/link'
import { Text } from '@/components/atoms/Text/Text'
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
                <Text.H2 size="xxl" color="primary">
                    {photographer.name}
                </Text.H2>
                <Text.P size="sm" color="secondary">
                    {photographer.city}, {photographer.country}
                </Text.P>
                <Text.P size="sm">{photographer.tagline}</Text.P>
                <Text.P size="xs" color="light">
                    {photographer.price}€/jour
                </Text.P>
            </article>
        </Link>
    )
}
