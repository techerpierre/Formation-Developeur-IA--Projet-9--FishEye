import React from 'react'
import clsx from '@/lib/clsx'
import { Text } from '@/components/atoms/Text/Text'
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
                <Text.Label htmlFor={htmlFor} size="xl" color="light">
                    {label}
                </Text.Label>
            )}
            {children}
        </div>
    )
}
