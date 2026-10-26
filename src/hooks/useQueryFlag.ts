'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export const useQueryFlag = (key: string) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const value = searchParams.get(key) === 'true'

    const setValue = useCallback(
        (open: boolean) => {
            const params = new URLSearchParams(searchParams.toString())
            if (open) params.set(key, 'true')
            else params.delete(key)
            const query = params.toString()
            router.replace(query ? `${pathname}?${query}` : pathname, {
                scroll: false,
            })
        },
        [key, pathname, router, searchParams]
    )

    return [value, setValue] as const
}
