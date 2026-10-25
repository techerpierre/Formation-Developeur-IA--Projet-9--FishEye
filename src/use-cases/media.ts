import { prisma } from '@/lib/prisma'

export const getAllMediasForPhotographer = async (photographerId: number) =>
    prisma.media.findMany({
        where: { photographerId },
    })

export const updateNumberOfLikes = (
    mediaId: number,
    newNumberOfLikes: number
) =>
    prisma.media.update({
        where: { id: mediaId },
        data: { likes: newNumberOfLikes },
    })
