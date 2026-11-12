'use client'

import Image from 'next/image'
import React, { useId } from 'react'
import { Text } from '@/components/atoms/Text/Text'
import styles from './Modal.module.css'
import { useControledDialog } from '@/hooks/useControledDialog'

type Props = React.PropsWithChildren & {
    show: boolean
    onCloseRequest: () => void
    title: string
    closeButtonAriaLabel?: string
}

export const Modal: React.FC<Props> = ({
    show,
    onCloseRequest,
    title,
    children,
    closeButtonAriaLabel = "Close Modal"
}) => {
    const titleId = useId()
    const dialogRef = useControledDialog(show, { modal: true })

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
                    aria-label={closeButtonAriaLabel}
                    className={styles.close}
                >
                    <Image src="/close.svg" alt="" width={42} height={42} />
                </button>
            </div>
            <div className={styles.content}>{children}</div>
        </dialog>
    )
}
