import clsx from '@/lib/clsx'
import React from 'react'
import styles from './Button.module.css'

export const Button: React.FC<React.ComponentProps<'button'>> = ({
    className,
    ...rest
}) => {
    return <button className={clsx(styles.button, className)} {...rest} />
}
