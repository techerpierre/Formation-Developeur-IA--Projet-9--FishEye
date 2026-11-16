import React from 'react'
import clsx from '@/lib/clsx'

import styles from './Text.module.css'

type TextType = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'label'
type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'
type TextColor =
    | 'default'
    | 'primary'
    | 'secondary'
    | 'light'
    | 'on-primary'
    | 'on-secondary'

type Props<T extends TextType> = React.ComponentProps<T> & {
    size?: TextSize
    color?: TextColor
    bold?: boolean
}

const TextBase: React.FC<{ as: TextType } & Props<any>> = ({
    as: Tag,
    size = 'md',
    color = 'default',
    bold,
    className,
    ...rest
}) => {
    return (
        <Tag
            className={clsx(
                styles.text,
                styles[size],
                styles[color],
                bold && styles.bold,
                className
            )}
            {...rest}
        />
    )
}

const P: React.FC<Props<'p'>> = (props) => {
    return <TextBase as="p" {...props} />
}

const Span: React.FC<Props<'span'>> = (props) => {
    return <TextBase as="span" {...props} />
}

const H1: React.FC<Props<'h1'>> = (props) => {
    return <TextBase as="h1" {...props} />
}

const H2: React.FC<Props<'h2'>> = (props) => {
    return <TextBase as="h2" {...props} />
}

const H3: React.FC<Props<'h3'>> = (props) => {
    return <TextBase as="h3" {...props} />
}

const Label: React.FC<Props<'label'>> = (props) => {
    return <TextBase as="label" {...props} />
}

export const Text = Object.freeze({
    P,
    Span,
    H1,
    H2,
    H3,
    Label,
})
