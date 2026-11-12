'use client'

import React, { useEffect, useState } from 'react'
import { updateNumberOfLikesAction } from '@/actions/media'
import { Text } from '@/components/atoms/Text/Text'
import Image from 'next/image'
import styles from './MediaLikeButton.module.css'
import { usePhotographerStats } from '@/contexts/PhotographerStatsContext'

type Props = {
    mediaId: number
    likes: number
}

export const MediaLikeButton: React.FC<Props> = ({
    mediaId,
    likes: initialLikes,
}) => {
    const [isLiked, setIsLiked] = useState(true)
    const [likes, setLikes] = useState(initialLikes)
    const { incrementTotalLikes } = usePhotographerStats()

    useEffect(() => {
        setIsLiked(isLikePersisted(mediaId))
    }, [])

    const handleLikeClick = () => {
        if (isLiked) return
        setIsLiked(true)
        setLikes(likes + 1)
        persistLike(mediaId)
        incrementTotalLikes()
        updateNumberOfLikesAction(mediaId, likes + 1)
    }

    return (
        <div className={styles.like}>
            <Text.Span color="light">{likes}</Text.Span>
            <button
                onClick={handleLikeClick}
                className={styles.button}
                aria-label="Liker ce poste"
            >
                <Image
                    src={isLiked ? '/like-filled.svg' : '/like-outlined.svg'}
                    alt=""
                    width={24}
                    height={24}
                />
            </button>
        </div>
    )
}

const isLikePersisted = (mediaId: number) => getPersistedLikedMedias()[mediaId]

const persistLike = (mediaId: number) => {
    localStorage.setItem(
        'fisheye-liked-medias',
        JSON.stringify({ ...getPersistedLikedMedias(), [mediaId]: true })
    )
}

const getPersistedLikedMedias = (): Record<number, boolean> => {
    const strLikedMedias = localStorage.getItem('fisheye-liked-medias')
    return strLikedMedias ? JSON.parse(strLikedMedias) : {}
}
