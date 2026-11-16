'use client'

import React, { useEffect, useState } from 'react'
import { updateNumberOfLikesAction } from '@/actions/media'
import { Text } from '@/components/atoms/Text/Text'
import Image from 'next/image'
import { usePhotographerStats } from '@/contexts/PhotographerStatsContext'

import styles from './MediaLikeButton.module.css'
import { useToast } from '@/contexts/ToastContext'

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
    const toast = useToast()

    useEffect(() => {
        setIsLiked(isLikePersisted(mediaId))
    }, [])

    const handleLikeClick = async () => {
        if (isLiked) return
        const initialLikes = likes
        setIsLiked(true)
        setLikes(initialLikes + 1)
        incrementTotalLikes()
        const res = await updateNumberOfLikesAction(mediaId, likes + 1)
        if (!res.ok) {
            setIsLiked(false)
            setLikes(initialLikes)
            incrementTotalLikes(-1)
            toast.show(res.error)
            return
        }
        persistLike(mediaId)
    }

    return (
        <div className={styles.like}>
            <Text.Span color="light">{likes}</Text.Span>
            <button
                onClick={handleLikeClick}
                className={styles.button}
                aria-label="likes"
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
