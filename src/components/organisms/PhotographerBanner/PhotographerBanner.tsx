import React from 'react'
import Image from 'next/image'
import { Photographer } from '@/lib/prisma/generated/client'
import { ContactModal } from '@/components/organisms/ContactModal/ContactModal'
import styles from './PhotographerBanner.module.css'

type Props = {
    photographer: Photographer
}

export const PhotographerBanner: React.FC<Props> = ({ photographer }) => {
    return (
        <section className={styles.banner}>
            <div>
                <h1 className={styles.name}>{photographer.name}</h1>
                <p className={styles.location}>
                    {photographer.city}, {photographer.country}
                </p>
                <p className={styles.tagline}>{photographer.tagline}</p>
            </div>
            <ContactModal photographer={photographer} />
            <Image
                src={`/${photographer.portrait}`}
                alt={`Portrait de ${photographer.name}`}
                width={200}
                height={200}
                className={styles.portrait}
            />
        </section>
    )
}
