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
        if (Array.isArray(initialState)) {
            const all = searchParams.getAll(`${key}[]`)
            if (all.length === 0) return initialState
            return all.map((item) =>
                parseScalar(item, initialState[0] ?? '')
            ) as T
        }
        const raw = searchParams.get(key)
        if (raw == null) return initialState
        return parseScalar(raw, initialState) as T
    }, [key, pathname, searchParams, initialState])

    const setValue = useCallback<SetQueryStateFunction<T>>(
        (next) => {
            const resolved = typeof next === 'function' ? next(value) : next
            const params = new URLSearchParams(searchParams.toString())
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
    if (typeof fallback === 'number' || fallback == null) {
        const n = Number(raw)
        if (!Number.isNaN(n)) return n as T
      }
    if (typeof fallback === 'boolean') return (raw === 'true') as T
    return raw as T
}

const isEmpty = (v: QueryState) =>
    v == null || v === '' || (Array.isArray(v) && v.length === 0)
