import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import clsx from '@/lib/clsx'
import './globals.css'

const dmSans = DM_Sans({
    variable: '--font-dm-sans',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'FishEye',
    description:
        'Découvrez nos photographes professionnels et leurs portfolios.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html lang="fr" className={clsx(dmSans.className)}>
            <body>{children}</body>
        </html>
    )
}
