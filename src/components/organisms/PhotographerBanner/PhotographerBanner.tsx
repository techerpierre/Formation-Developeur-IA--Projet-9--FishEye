import React from 'react'
import Image from 'next/image'
import { Photographer } from '@/lib/prisma/generated/client'
import { ContactModal } from '@/components/organisms/ContactModal/ContactModal'
import { Text } from '@/components/atoms/Text/Text'
import styles from './PhotographerBanner.module.css'

type Props = {
    photographer: Photographer
}

export const PhotographerBanner: React.FC<Props> = ({ photographer }) => {
    return (
        <section className={styles.banner}>
            <div className={styles.info}>
                <Text.H1 size="xxxl" color="primary">
                    {photographer.name}
                </Text.H1>
                <Text.P size="lg" color="secondary">
                    {photographer.city}, {photographer.country}
                </Text.P>
                <Text.P size="lg" color="light">
                    {photographer.tagline}
                </Text.P>
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
