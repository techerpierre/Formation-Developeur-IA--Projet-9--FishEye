'use client'

import React, { PropsWithChildren } from 'react'
import { useToast } from '@/contexts/ToastContext'
import { Toast } from '@/components/atoms/Toast/Toast'

import styles from './ToastRoot.module.css'

export const ToastRoot: React.FC<PropsWithChildren> = ({ children }) => {
    const toast = useToast()

    return (
        <>
            {children}
            <div className={styles.toastRoot}>
                {toast.messages.map((message) => (
                    <Toast key={message.id} message={message.text} />
                ))}
            </div>
        </>
    )
}
