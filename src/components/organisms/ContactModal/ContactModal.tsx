'use client'

import React from 'react'
import { Button } from '@/components/atoms/Button/Button'
import { FormField } from '@/components/molecules/FormField/FormField'
import { Modal } from '@/components/atoms/Modal/Modal'
import { TextInput } from '@/components/atoms/TextInput/TextInput'
import { Photographer } from '@/lib/prisma/generated/client'
import styles from './ContactModal.module.css'
import { TextArea } from '@/components/atoms/TextArea/TextArea'
import { useQueryFlag } from '@/hooks/useQueryFlag'

type Props = {
    photographer: Photographer
}

export const ContactModal: React.FC<Props> = ({ photographer }) => {
    const [show, setShow] = useQueryFlag('contact')

    const handleFormSubmit = (event: React.SubmitEvent) => {
        event.preventDefault()
        console.log(`Prénom: ${event.target['firstname'].value}`)
        console.log(`Nom:    ${event.target['lastname'].value}`)
        console.log(`Email:  ${event.target['email'].value}`)
    }

    return (
        <>
            <Button onClick={() => setShow(true)} aria-label='Contact Me'>Contactez-moi</Button>
            <Modal
                show={show}
                onCloseRequest={() => setShow(false)}
                title={`Contactez-moi ${photographer.name}`}
                closeButtonAriaLabel='Close Contact form'
            >
                <form onSubmit={handleFormSubmit} className={styles.form}>
                    <FormField label="Prénom" htmlFor="firstname">
                        <TextInput type="text" id="firstname" />
                    </FormField>
                    <FormField label="Nom" htmlFor="lastname">
                        <TextInput type="text" id="lastname" />
                    </FormField>
                    <FormField label="Email" htmlFor="email">
                        <TextInput type="text" id="email" />
                    </FormField>
                    <FormField label="Votre message" htmlFor="message">
                        <TextArea
                            id="message"
                            rows={4}
                            className={styles.message}
                        />
                    </FormField>
                    <Button type="submit" className={styles.submit}>
                        Envoyer
                    </Button>
                </form>
            </Modal>
        </>
    )
}
