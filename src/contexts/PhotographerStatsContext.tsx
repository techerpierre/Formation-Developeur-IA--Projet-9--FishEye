'use client'

import { createContext, useContext, useState } from 'react'

type PhotographerStatsContextType = {
    totalLikes: number
    price: number
    incrementTotalLikes: () => void
}

const PhotographerStatsContext = createContext<
    PhotographerStatsContextType | undefined
>(undefined)

type Props = React.PropsWithChildren & {
    initialTotalLikes: number
    price: number
}

export const PhotographerStatsProvider: React.FC<Props> = ({
    initialTotalLikes,
    price,
    children,
}) => {
    const [totalLikes, setTotalLikes] = useState(initialTotalLikes)

    const incrementTotalLikes = () => {
        setTotalLikes((prev) => prev + 1)
    }

    return (
        <PhotographerStatsContext
            value={{ totalLikes, price, incrementTotalLikes }}
        >
            {children}
        </PhotographerStatsContext>
    )
}

export const usePhotographerStats = () => {
    const ctx = useContext(PhotographerStatsContext)
    if (!ctx) {
        throw new Error(
            'usePhotographerStats must be used into a PhotographerStatsProvider'
        )
    }
    return ctx
}
