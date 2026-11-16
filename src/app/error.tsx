'use client'

import { Button } from '@/components/atoms/Button/Button'
import { Text } from '@/components/atoms/Text/Text'

import styles from './error.module.css'

type Props = {
    reset: () => void
}

export default function ErrorPage({ reset }: Props) {
    return (
        <div className={styles.error}>
            <Text.H1 size="xxl" bold color="primary" role="alert">
                Oups, Une erreur est survenue lors du chargement de la page.
            </Text.H1>
            <Button onClick={reset}>Reésayer</Button>
        </div>
    )
}
