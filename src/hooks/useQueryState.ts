'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'

type QueryScalar = number | string | boolean | null | undefined
type QueryState = QueryScalar | QueryScalar[]
type SetQueryStateFunction<T extends any> = (
    next: (T | null) | ((prev: T) => T | null)
) => void
type UseQueryStateReturnType<T extends any> = [
    value: T,
    setter: SetQueryStateFunction<T>,
]

export const useQueryState = <T extends QueryState>(
    key: string,
    initialState: T
): UseQueryStateReturnType<T> => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const value = useMemo(() => {
        if (Array.isArray(initialState)) { // Si c'est une liste
            const all = searchParams.getAll(`${key}[]`) // Récupérer tout les éléments de la liste
            if (all.length === 0) return initialState // Si rien dans la liste on utilise l'état initial
            return all.map((item) =>
                parseScalar(item, initialState[0] ?? '') // convertir les éléments vers le bon type (celon initialState)
            ) as T
        }

        const raw = searchParams.get(key) // Si c'est pas un array
        if (raw == null) return initialState
        return parseScalar(raw, initialState) as T
    }, [key, pathname, searchParams, initialState])

    const setValue = useCallback<SetQueryStateFunction<T>>(
        (next) => {
            const resolved = typeof next === 'function' ? next(value) : next // La fonction accèpte `value` ou `(prev) => value`
            const params = new URLSearchParams(searchParams.toString())

            // On nettoie les enciennes valeurs avant de changer les nouvelles
            params.delete(key)
            params.delete(`${key}[]`)

            if (!isEmpty(resolved)) {
                if (Array.isArray(resolved)) {
                    if (resolved.length > 0) {
                        resolved.forEach((item) =>
                            params.append(`${key}[]`, String(item))
                        )
                    }
                } else if (resolved !== '' && resolved != null) {
                    params.set(key, String(resolved))
                }
            }

            const query = params.toString()
            router.replace(query ? `${pathname}?${query}` : pathname, {
                scroll: false,
            })
        },
        [key, pathname, searchParams, initialState]
    )

    return [value, setValue]
}

const parseScalar = <T extends QueryScalar>(raw: string, fallback: T): T => {
    if (typeof fallback === 'number' || fallback == null) { // Si c'est un nombre ou null on renvoi un nombre
        const n = Number(raw)
        if (!Number.isNaN(n)) return n as T
    }
    if (typeof fallback === 'boolean') return (raw === 'true') as T // Si c'est un boolean on renvoi un boolean
    return raw as T // Sinon string
}

const isEmpty = (v: QueryState) =>
    v == null || v === '' || (Array.isArray(v) && v.length === 0) // On vérifie si c'est null, un texte vide ou un tableau vide. 
