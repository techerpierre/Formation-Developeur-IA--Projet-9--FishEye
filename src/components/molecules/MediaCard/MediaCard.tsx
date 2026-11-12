'use client'

import React from 'react'
import { Text } from '@/components/atoms/Text/Text'
import { Media } from '@/lib/prisma/generated/client'
import Image from 'next/image'
import { MediaLikeButton } from '../MediaLikeButton/MediaLikeButton'
import { useGalleryLightbox } from '@/contexts/GalleryLightboxContext'
import styles from './MediaCard.module.css'

type Props = {
    media: Media
}

export const MediaCard: React.FC<Props> = ({ media }) => {
    const { goTo } = useGalleryLightbox()

    return (
        <article className={styles.card}>
            <button
                type="button"
                className={styles.trigger}
                onClick={() => goTo(media.id)}
                aria-label={`${media.title}, closeup view`}
            >
                {media.video ? (
                    <video
                        src={`/${media.video}`}
                        className={styles.image}
                        width={350}
                        height={300}
                        muted
                        playsInline
                        preload="metadata"
                        aria-label={media.title}
                    />
                ) : (
                    <Image
                        src={`/${media.image ?? 'media-placeholder.png'}`}
                        alt={media.title}
                        width={350}
                        height={300}
                        className={styles.image}
                    />
                )}
            </button>
            <div className={styles.infos}>
                <Text.Span size="xl" color="primary">
                    {media.title}
                </Text.Span>
                <MediaLikeButton mediaId={media.id} likes={media.likes} />
            </div>
        </article>
    )
}
