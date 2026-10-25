import { prisma } from '@/lib/prisma'

export const getAllPhotographers = async () => prisma.photographer.findMany()

export const getPhotographer = async (id: number) =>
    prisma.photographer.findUnique({
        where: { id },
    })
