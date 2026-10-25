//import styles from "./page.module.css";

import { PhotographerBanner } from '@/components/cards/PhotographerBanner/PhotographerBanner'
import { PageLayout } from '@/components/layouts/PageLayout/PageLayout'
import { getPhotographer } from '@/use-cases/photographer'
import { notFound } from 'next/navigation'

export const instant = false

export default async function Photographer({
    params,
}: PageProps<'/photographers/[id]'>) {
    const { id } = await params
    const photographer = await getPhotographer(parseInt(id))

    if (!photographer) notFound()

    return (
        <PageLayout>
            <PhotographerBanner photographer={photographer} />
        </PageLayout>
    )
}
