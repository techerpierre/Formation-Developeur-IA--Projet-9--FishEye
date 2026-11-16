import { Button } from '@/components/atoms/Button/Button'
import { Text } from '@/components/atoms/Text/Text'
import Link from 'next/link'

import styles from './not-found.module.css'

export default function NotFound() {
    return (
        <div className={styles.notFound}>
            <Text.H1 size="xxl" bold color="primary">
                Oups, Cette page n'existe pas.
            </Text.H1>
            <Link href="/">
                <Button>Revenir à l'acceuil</Button>
            </Link>
        </div>
    )
}
