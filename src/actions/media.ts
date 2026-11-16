'use server'

import { action } from '@/lib/action'
import { updateNumberOfLikes } from '@/use-cases/media'

export const updateNumberOfLikesAction = action(
    async (ctx, mediaId: number, newNumberOfLikes: number) => {
        try {
            return ctx.ok(await updateNumberOfLikes(mediaId, newNumberOfLikes))
        } catch {
            return ctx.error('Impossible de mettre à jour le nombre de likes')
        }
    }
)
