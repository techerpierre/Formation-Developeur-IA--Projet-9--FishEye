'use server'

import { updateNumberOfLikes } from '@/use-cases/media'

export const updateNumberOfLikesAction = async (
    mediaId: number,
    newNumberOfLikes: number
) => updateNumberOfLikes(mediaId, newNumberOfLikes)
