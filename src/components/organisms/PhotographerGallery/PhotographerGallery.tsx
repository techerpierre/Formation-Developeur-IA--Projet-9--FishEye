'use client'

import React from 'react'
import { Media } from '@/lib/prisma/generated/client'
import { MediaCard } from '@/components/molecules/MediaCard/MediaCard'
import styles from './PhotographerGallery.module.css'
import { GallerySortFilter } from '@/components/molecules/GallerySortFilter/GallerySortFilter'
import { GalleryLightboxProvider } from '@/contexts/GalleryLightboxContext'
import { GalleryLightbox } from '../GalleryLightbox/GalleryLightbox'

type Props = {
    medias: Media[]
}

export const PhotographerGallery: React.FC<Props> = ({ medias }) => {
    return (
        <GalleryLightboxProvider medias={medias}>
            <section className={styles.gallery} aria-label='Photographer Gallery'>
                <div className={styles.header}>
                    <GallerySortFilter />
                </div>
                <div>
                    <ul className={styles.medias}>
                        {medias.map((media) => (
                            <li key={media.id}>
                                <MediaCard media={media} />
                            </li>
                        ))}
                    </ul>
                </div>
                <GalleryLightbox />
            </section>
        </GalleryLightboxProvider>
    )
}
