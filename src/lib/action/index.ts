/**
 * Résultat succès d'une server action.
 * @template T Type des données renvoyées
 */
type ActionOk<T> = {
    ok: true
    data: T
}

/**
 * Résultat échec d'une server action.
 */
type ActionError = {
    ok: false
    error: string
}

/**
 * Union discriminée renvoyée par toutes les actions wrappées.
 * Tester avec `result.ok` pour affiner le type.
 * @template T Type des données en cas de succès
 */
export type ActionResult<T> = ActionOk<T> | ActionError

/**
 * Contexte passé en premier argument du handler d'une action.
 * Permet de construire une réponse standardisée via `ok` / `error`.
 */
type ActionContext = {
    /**
     * Réponse de succès.
     * @example
     * return ctx.ok()
     * return ctx.ok({ likes: 12 })
     */
    ok: {
        (): ActionOk<void>
        <T = void>(data: T): ActionOk<T>
    }

    /**
     * Réponse d'échec métier (sans throw).
     * @param message Message exposé au client
     * @example
     * return ctx.error('Nombre de likes invalide.')
     */
    error(message: string): ActionError
}

const ctx: ActionContext = {
    ok<T = void>(data?: T): ActionOk<T> {
        return { ok: true, data: data as T }
    },

    error(message: string) {
        return { ok: false, error: message }
    },
}

/**
 * Enveloppe une server action pour standardiser les réponses
 * et attraper les exceptions non gérées.
 *
 * Le handler reçoit un `ctx` puis les paramètres métier.
 * Les erreurs levées (`throw`) sont transformées en `ctx.error(...)`.
 *
 * @template TArgs Tuple des arguments métier (après `ctx`)
 * @template TData Type des données renvoyées par `ctx.ok`
 * @param fn Handler de l'action `(ctx, ...args) => ActionResult`
 * @returns Fonction async prête à être exportée depuis un fichier `'use server'`
 *
 * @example
 * export const updateProfile = action(
 *   async (ctx, userId: string, email: string, pseudo: string) => {
 *     const updatedProfile = ...
 *     return ctx.ok(updatedProfile)
 *   }
 * )
 */
export const action = <TArgs extends unknown[], TData = void>(
    fn: (ctx: ActionContext, ...args: TArgs) => Promise<ActionResult<TData>>
) => {
    return async (...args: TArgs): Promise<ActionResult<TData>> => {
        try {
            return await fn(ctx, ...args)
        } catch (err) {
            return ctx.error(
                err instanceof Error ? err.message : 'An error occured.'
            )
        }
    }
}
