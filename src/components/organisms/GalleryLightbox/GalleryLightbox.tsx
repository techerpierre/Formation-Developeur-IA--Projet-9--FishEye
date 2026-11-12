'use client'

import React from 'react'
import { useGalleryLightbox } from '@/contexts/GalleryLightboxContext'
import Image from 'next/image'
import styles from './GalleryLightbox.module.css'
import { useControledDialog } from '@/hooks/useControledDialog'
import { Text } from '@/components/atoms/Text/Text'

export const GalleryLightbox: React.FC = () => {
    const {
        isOpen,
        currentMedia,
        previousMedia,
        nextMedia,
        previous,
        next,
        close,
    } = useGalleryLightbox()
    const dialogRef = useControledDialog(isOpen, { modal: true })

    const handleDialogCancel: React.ReactEventHandler<HTMLDialogElement> = (
        e
    ) => {
        e.preventDefault()
        close()
    }

    const handleDialogKeydown: React.KeyboardEventHandler = (e) => {
        if (e.key == 'ArrowLeft') {
            e.preventDefault()
            previous()
        } else if (e.key == 'ArrowRight') {
            e.preventDefault()
            next()
        }
    }

    return (
        <dialog
            onKeyDown={handleDialogKeydown}
            ref={dialogRef}
            className={styles.lightbox}
            onCancel={handleDialogCancel}
        >
            <button
                onClick={previous}
                className={styles.navigation}
                aria-label="Previous image"
            >
                <Image
                    src="/previous-lightbox.svg"
                    alt=""
                    width={96}
                    height={96}
                    className={styles.navImage}
                />
            </button>
            <div className={styles.main}>
                {currentMedia.video ? (
                    <video
                        key={currentMedia.id}
                        src={`/${currentMedia.video}`}
                        controls
                        autoPlay
                        className={styles.image}
                        aria-label={currentMedia.title}
                    />
                ) : (
                    <Image
                        src={`/${currentMedia.image ?? 'media-placeholder.png'}`}
                        alt={currentMedia.title}
                        width={1050}
                        height={900}
                        priority
                        className={styles.image}
                    />
                )}
                <div aria-hidden className={styles.prefetch}>
                    <Image
                        src={`/${previousMedia.image ?? 'media-placeholder.png'}`}
                        alt=""
                        width={1050}
                        height={900}
                    />
                    <Image
                        src={`/${nextMedia.image ?? 'media-placeholder.png'}`}
                        alt=""
                        width={1050}
                        height={900}
                    />
                </div>
                <Text.P size="lg" color="secondary">
                    {currentMedia.title}
                </Text.P>
            </div>
            <div className={styles.rightSide}>
                <button
                    onClick={next}
                    className={styles.navigation}
                    aria-label="Next image"
                >
                    <Image
                        src="/next-lightbox.svg"
                        alt=""
                        width={96}
                        height={96}
                        className={styles.navImage}
                    />
                </button>
                <button
                    onClick={close}
                    className={styles.close}
                    aria-label="Close lightbox"
                >
                    <Image
                        src="/close-lightbox.svg"
                        alt=""
                        width={72}
                        height={72}
                        className={styles.closeImage}
                    />
                </button>
            </div>
        </dialog>
    )
}
