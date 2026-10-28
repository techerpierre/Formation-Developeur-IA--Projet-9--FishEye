import { prisma } from '@/lib/prisma'
import { MediaOrderByWithRelationInput } from '@/lib/prisma/generated/models'

export type MediaOrderBy = 'popularity' | 'date' | 'title'

const MediaOrderByQueryMap: Record<
    MediaOrderBy,
    MediaOrderByWithRelationInput
> = {
    popularity: { likes: 'desc' },
    date: { date: 'desc' },
    title: { title: 'asc' },
}

export const getAllMediasForPhotographer = async (
    photographerId: number,
    options?: { orderBy?: MediaOrderBy }
) => {
    return prisma.media.findMany({
        where: { photographerId },
        orderBy: options?.orderBy
            ? MediaOrderByQueryMap[options.orderBy]
            : undefined,
    })
}

export const updateNumberOfLikes = (
    mediaId: number,
    newNumberOfLikes: number
) =>
    prisma.media.update({
        where: { id: mediaId },
        data: { likes: newNumberOfLikes },
    })
