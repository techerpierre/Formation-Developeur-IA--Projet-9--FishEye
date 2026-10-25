import React from 'react'
import clsx from '@/lib/clsx'
import styles from './TextInput.module.css'

type Props = Omit<React.ComponentProps<'input'>, 'type'> & {
    type: 'text' | 'email' | 'password' | 'search' | 'url'
}

export const TextInput: React.FC<Props> = ({ type, className, ...rest }) => {
    return (
        <input
            type={type}
            className={clsx(styles.input, className)}
            {...rest}
        />
    )
}
