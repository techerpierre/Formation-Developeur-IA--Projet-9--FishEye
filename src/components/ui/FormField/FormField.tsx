import React from 'react'
import clsx from '@/lib/clsx'
import styles from './FormField.module.css'

type Props = React.ComponentProps<'div'> & {
    label?: string
    htmlFor?: string
}

export const FormField: React.FC<Props> = ({
    label,
    htmlFor,
    className,
    children,
    ...rest
}) => {
    return (
        <div className={clsx(styles.field, className)} {...rest}>
            {label && (
                <label htmlFor={htmlFor} className={styles.label}>
                    {label}
                </label>
            )}
            {children}
        </div>
    )
}
