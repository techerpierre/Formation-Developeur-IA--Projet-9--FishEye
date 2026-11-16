'use client'

import { ToastRoot } from '@/components/organisms/ToastRoot/ToastRoot'
import { createContext, useContext, useState } from 'react'

const MESSAGE_APEARING_TIME = 4000
const MAX_MESSAGES_COUNT = 5

type Message = {
    id: string
    text: string
}

type ToastContextType = {
    messages: Message[]
    show: (message: string) => Promise<void>
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    const [messages, setMessages] = useState<Message[]>([])
    const lastMessages =
        messages.length > MAX_MESSAGES_COUNT
            ? messages.slice(
                  messages.length - MAX_MESSAGES_COUNT,
                  messages.length
              )
            : messages

    const show = async (message: string) => {
        const id = crypto.randomUUID()
        setMessages((prev) => [...prev, { id, text: message }])
        setTimeout(() => {
            setMessages((prev) => prev.filter((v) => v.id !== id))
        }, MESSAGE_APEARING_TIME)
    }

    return (
        <ToastContext value={{ messages: lastMessages, show }}>
            <ToastRoot>{children}</ToastRoot>
        </ToastContext>
    )
}

export const useToast = () => {
    const ctx = useContext(ToastContext)
    if (!ctx) {
        throw new Error('useToast must be used into a ToastContext')
    }
    return ctx
}
