import React from 'react'
import { Text } from '../Text/Text'

import styles from './Toast.module.css'

type Props = {
    message: string
}

export const Toast: React.FC<Props> = ({ message }) => {
    return (
        <div className={styles.toast}>
            <Text.Span size="sm" color="on-primary" role="alert">
                {message}
            </Text.Span>
        </div>
    )
}
