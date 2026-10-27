'use client'

import Image from 'next/image'
import React, { useEffect, useId, useRef } from 'react'
import { Text } from '@/components/atoms/Text/Text'
import styles from './Modal.module.css'

type Props = React.PropsWithChildren & {
    show: boolean
    onCloseRequest: () => void
    title: string
}

export const Modal: React.FC<Props> = ({
    show,
    onCloseRequest,
    title,
    children,
}) => {
    const titleId = useId()
    const dialogRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        if (!dialogRef.current) return
        dialogRef.current[show ? 'showModal' : 'close']()
    }, [show])

    const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
        if (event.target === dialogRef.current) onCloseRequest()
    }

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby={titleId}
            className={styles.modal}
            onClose={onCloseRequest}
            onClick={handleDialogClick}
        >
            <div className={styles.header}>
                <Text.H2
                    id={titleId}
                    size="xxxl"
                    color="on-secondary"
                    className={styles.title}
                >
                    {title}
                </Text.H2>
                <button
                    onClick={onCloseRequest}
                    aria-label="Fermer la modal"
                    className={styles.close}
                >
                    <Image src="/close.svg" alt="" width={72} height={72} />
                </button>
            </div>
            <div className={styles.content}>{children}</div>
        </dialog>
    )
}
