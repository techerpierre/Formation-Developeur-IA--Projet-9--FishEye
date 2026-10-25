import React from 'react'
import clsx from '@/lib/clsx'
import styles from './TextArea.module.css'

export const TextArea: React.FC<React.ComponentProps<'textarea'>> = ({
    className,
    ...rest
}) => {
    return <textarea className={clsx(styles.textarea, className)} {...rest} />
}
