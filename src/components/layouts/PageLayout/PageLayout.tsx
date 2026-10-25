import { Navbar } from '@/components/navigation/Navbar/Navbar'
import React from 'react'

type Props = React.PropsWithChildren & {
    title?: string
}

export const PageLayout: React.FC<Props> = ({ title, children }) => {
    return (
        <>
            <Navbar title={title} />
            <main>{children}</main>
        </>
    )
}
