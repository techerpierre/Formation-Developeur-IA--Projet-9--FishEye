//import styles from "./page.module.css";

import { PhotographerStatsBar } from '@/components/molecules/PhotographerStatsBar/PhotographerStatsBar'
import { PhotographerBanner } from '@/components/organisms/PhotographerBanner/PhotographerBanner'
import { PhotographerGallery } from '@/components/organisms/PhotographerGallery/PhotographerGallery'
import { PageLayout } from '@/components/templates/PageLayout/PageLayout'
import { PhotographerStatsProvider } from '@/contexts/PhotographerStatsContext'
import { getAllMediasForPhotographer, MediaOrderBy } from '@/use-cases/media'
import { getPhotographer } from '@/use-cases/photographer'
import { notFound } from 'next/navigation'

export const instant = false

export default async function Photographer({
    params,
    searchParams,
}: PageProps<'/photographers/[id]'>) {
    const { id } = await params
    const { orderBy = 'popularity' } = await searchParams
    const photographer = await getPhotographer(parseInt(id))
    if (!photographer) notFound()
    const medias = await getAllMediasForPhotographer(photographer.id, {
        orderBy: orderBy as MediaOrderBy,
    })

    return (
        <PageLayout>
            <PhotographerBanner photographer={photographer} />
            <PhotographerStatsProvider
                initialTotalLikes={photographer.totalLikes}
                price={photographer.price}
            >
                <PhotographerGallery medias={medias} />
                <PhotographerStatsBar />
            </PhotographerStatsProvider>
        </PageLayout>
    )
}
