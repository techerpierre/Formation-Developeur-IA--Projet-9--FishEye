import { getAllPhotographers } from '@/use-cases/photographer'
import { PhotographerCard } from '@/components/organisms/PhotographerCard/PhotographerCard'
import { PageLayout } from '@/components/templates/PageLayout/PageLayout'
import styles from './page.module.css'

export default async function Home() {
    const photographers = await getAllPhotographers()

    return (
        <PageLayout title="Nos photographes">
            <section>
                <ul className={styles.photographers}>
                    {photographers.map((p) => (
                        <li key={p.id}>
                            <PhotographerCard photographer={p} />
                        </li>
                    ))}
                </ul>
            </section>
        </PageLayout>
    )
}
