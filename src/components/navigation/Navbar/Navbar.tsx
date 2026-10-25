import Image from 'next/image'
import React from 'react'
import styles from './Navbar.module.css'
import Link from 'next/link'

type Props = {
    title?: string
}

export const Navbar: React.FC<Props> = ({ title }) => {
    return (
        <header className={styles.navbar}>
            <Link href="/" aria-label="Retour à l'accueil FishEye">
                <Image
                    src="logo.svg"
                    alt=""
                    width={200}
                    className={styles.logo}
                    height={50}
                />
            </Link>
            {title && <h1 className={styles.title}>{title}</h1>}
        </header>
    )
}
