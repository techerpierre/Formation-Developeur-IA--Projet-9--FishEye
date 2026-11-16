'use client'

import React, { createContext, useContext, useMemo, useState } from 'react'
import { Media } from '@/lib/prisma/generated/client'
import { useQueryState } from '@/hooks/useQueryState'
import { useSearchParams } from 'next/navigation'

type GalleryLightboxContextType = {
    isOpen: boolean
    currentMedia: Media | null
    previousMedia: Media | null
    nextMedia: Media | null
    isLoading: boolean
    next: () => void
    previous: () => void
    goTo: (mediaId: number) => void
    close: () => void
    setIsLoading: (isLoading: boolean) => void;
}

const GalleryLightboxContext = createContext<
    GalleryLightboxContextType | undefined
>(undefined)

type Props = React.PropsWithChildren & {
    medias: Media[]
}

export const GalleryLightboxProvider: React.FC<Props> = ({
    medias,
    children,
}) => {
    const searchParams = useSearchParams()
    const [currentIndex, setCurrentIndex] = useQueryState<number | null>('lightbox', null)
    const [isOpen, setIsOpen] = useState(searchParams.has('lightbox'))
    const [isLoading, setIsLoading] = useState(false)

    const currentMedia = useMemo(() => currentIndex != null ? medias[currentIndex] : null, [currentIndex])
    const previousMedia = useMemo(
        () => currentIndex != null ? medias[(currentIndex - 1 + medias.length) % medias.length] : null,
        [currentIndex]
    )
    const nextMedia = useMemo(
        () => currentIndex != null ? medias[(currentIndex + 1) % medias.length] : null,
        [currentIndex]
    )

    const next = () => {
        setCurrentIndex(currentIndex != null ? (currentIndex + 1) % medias.length : null)
        setIsLoading(true)
    }

    const previous = () => {
        setCurrentIndex(currentIndex != null ? (currentIndex - 1 + medias.length) % medias.length : null)
        setIsLoading(true)
    }

    const goTo = (mediaId: number) => {
        const mediaIndex = medias.findIndex((media) => media.id === mediaId)
        if (mediaIndex === -1) {
            throw new Error(`Media with id ${mediaId} not found.`)
        }
        setCurrentIndex(mediaIndex)
        setIsOpen(true)
        setIsLoading(true)
    }

    const close = () => {
        setCurrentIndex(null)
        setIsOpen(false)
    }

    return (
        <GalleryLightboxContext
            value={{
                isOpen,
                currentMedia,
                previousMedia,
                nextMedia,
                next,
                previous,
                goTo,
                close,
                isLoading,
                setIsLoading,
            }}
        >
            {children}
        </GalleryLightboxContext>
    )
}

export const useGalleryLightbox = () => {
    const ctx = useContext(GalleryLightboxContext)
    if (!ctx) {
        throw new Error(
            'useGalleryLightbox must be used into a GalleryLightboxProvider'
        )
    }
    return ctx
}
