'use client'

import React from 'react'
import clsx from '@/lib/clsx'

import styles from './Button.module.css'

export const Button: React.FC<React.ComponentProps<'button'>> = ({
    className,
    ...rest
}) => {
    return <button className={clsx(styles.button, className)} {...rest} />
}
