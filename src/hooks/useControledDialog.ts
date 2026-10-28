import { useEffect, useRef } from 'react'

type UseControledDialogOptions = {
    modal: boolean
}

export const useControledDialog = (
    open: boolean,
    options?: UseControledDialogOptions
) => {
    const dialogRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        if (!dialogRef.current) return
        dialogRef.current[
            open ? (options?.modal ? 'showModal' : 'show') : 'close'
        ]()
    }, [open])

    return dialogRef
}
