import { Text } from '@/components/atoms/Text/Text'
import styles from './loading.module.css'

export default function Loading() {
    return (
        <div className={styles.loading}>
            <Text.Span size="xxl" color="primary">Chargement...</Text.Span>
        </div>
    )
}
