'use client'

import React, { createContext, useContext, useMemo, useState } from 'react'
import { Media } from '@/lib/prisma/generated/client'
import { useQueryState } from '@/hooks/useQueryState'
import { useSearchParams } from 'next/navigation'

type GalleryLightboxContextType = {
    isOpen: boolean
    currentMedia: Media
    previousMedia: Media
    nextMedia: Media
    next: () => void
    previous: () => void
    goTo: (mediaId: number) => void
    close: () => void
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
    const [currentIndex, setCurrentIndex] = useQueryState<number>('lightbox', 0)
    const [isOpen, setIsOpen] = useState(searchParams.has('lightbox'))

    const currentMedia = useMemo(() => medias[currentIndex], [currentIndex])
    const previousMedia = useMemo(
        () => medias[(currentIndex - 1 + medias.length) % medias.length],
        [currentIndex]
    )
    const nextMedia = useMemo(
        () => medias[(currentIndex + 1) % medias.length],
        [currentIndex]
    )

    const next = () => {
        setCurrentIndex((currentIndex + 1) % medias.length)
    }

    const previous = () => {
        setCurrentIndex((currentIndex - 1 + medias.length) % medias.length)
    }

    const goTo = (mediaId: number) => {
        const mediaIndex = medias.findIndex((media) => media.id === mediaId)
        if (mediaIndex === -1) {
            throw new Error(`Media with id ${mediaId} not found.`)
        }
        setCurrentIndex(mediaIndex)
        setIsOpen(true)
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
            'GalleryLightbox must be used into a GalleryLightboxProvider'
        )
    }
    return ctx
}
