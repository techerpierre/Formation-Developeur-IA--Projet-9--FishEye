import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { Text } from '@/components/atoms/Text/Text'
import styles from './Navbar.module.css'

type Props = {
    title?: string
}

export const Navbar: React.FC<Props> = ({ title }) => {
    return (
        <header className={styles.navbar}>
            <Link href="/">
                <Image
                    src="/logo.svg"
                    alt="Fisheye Home page"
                    width={200}
                    className={styles.logo}
                    height={50}
                />
            </Link>
            {title && (
                <Text.H1 size="xxl" color="secondary">
                    {title}
                </Text.H1>
            )}
        </header>
    )
}
