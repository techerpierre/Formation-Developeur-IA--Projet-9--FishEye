import { prisma } from '@/lib/prisma'

export const getAllPhotographers = async () => prisma.photographer.findMany()

export const getPhotographer = async (id: number) => {
    const [photographer, likesAggregate] = await Promise.all([
        prisma.photographer.findUnique({
            where: { id },
        }),
        prisma.media.aggregate({
            where: { photographerId: id },
            _sum: { likes: true },
        }),
    ])
    if (!photographer) return null
    return {
        ...photographer,
        totalLikes: likesAggregate._sum.likes ?? 0,
    }
}
