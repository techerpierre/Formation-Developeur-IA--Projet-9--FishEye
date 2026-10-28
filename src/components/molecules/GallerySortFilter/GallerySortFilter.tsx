import React from 'react'
import { Select } from '@/components/atoms/Select/Select'
import { Text } from '@/components/atoms/Text/Text'
import { useQueryState } from '@/hooks/useQueryState'
import styles from './GallerySortFilter.module.css'

export const GallerySortFilter: React.FC = () => {
    const [orderBy, setOrderBy] = useQueryState<string>('orderBy', 'popularity')

    return (
        <div className={styles.orderBy}>
            <Text.Label htmlFor="orderGalleryByFilter" bold>
                Trier par
            </Text.Label>
            <Select
                id="orderGalleryByFilter"
                value={orderBy}
                onValueChange={setOrderBy}
                options={[
                    { label: 'Popularité', value: 'popularity' },
                    { label: 'Date', value: 'date' },
                    { label: 'Titre', value: 'title' },
                ]}
            />
        </div>
    )
}
