'use client'

import React, { useId, useRef, useState } from 'react'
import styles from './Select.module.css'
import clsx from '@/lib/clsx'
import { Button } from '../Button/Button'
import Image from 'next/image'
import { useControledDialog } from '@/hooks/useControledDialog'

export type SelectOption<T = any> = {
    value: T
    label: string
}

type Props = Omit<React.ComponentProps<'select'>, 'childen'> & {
    options: SelectOption[]
    onValueChange?: (value: any) => void
    contentClassName?: string
    optionClassName?: string
    contentStyle?: React.CSSProperties
    optionStyle?: React.CSSProperties
}

export const Select: React.FC<Props> = ({
    options,
    value: initialValue,
    defaultValue,
    onValueChange,
    onChange,
    className,
    contentClassName,
    optionClassName,
    contentStyle,
    optionStyle,
    ...rest
}) => {
    const [value, setValue] = useState(initialValue ?? defaultValue)
    const [open, setOpen] = useState(false)
    const selectRef = useRef<HTMLSelectElement>(null)
    const dialogRef = useControledDialog(open)
    const listId = useId()

    const selected = options.find((option) => option.value === value)
    const displayedOptions = options.filter((option) => option.value !== value)

    const handleOptionClicked = (option: SelectOption) => () => {
        if (!selectRef.current) return
        const setter = Object.getOwnPropertyDescriptor(
            HTMLSelectElement.prototype,
            'value'
        )?.set
        setter?.call(selectRef.current, option.value)
        selectRef.current.dispatchEvent(new Event('change', { bubbles: true }))
        setOpen(false)
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value)
        onValueChange?.(e.target.value)
        onChange?.(e)
    }

    return (
        <div className={styles.wrapper}>
            <select
                ref={selectRef}
                className={styles.native}
                value={value}
                onChange={handleSelectChange}
                aria-hidden="true"
                tabIndex={-1}
                {...rest}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            <Button
                type="button"
                className={clsx(
                    styles.trigger,
                    open && styles.opened,
                    className
                )}
                aria-haspopup="listbox"
                aria-controls={listId}
                aria-expanded={open}
                tabIndex={-1}
                onClick={() => setOpen((o) => !o)}
            >
                {selected?.label ?? 'Sélectionner'}
                <Image
                    src="/chevron-up.svg"
                    alt="Ouvrir les options"
                    width={32}
                    height={32}
                    className={styles.openInicator}
                />
            </Button>

            <dialog
                ref={dialogRef}
                className={clsx(styles.dialog, contentClassName)}
                style={contentStyle}
                onClose={() => setOpen(false)}
            >
                <ul id={listId}>
                    {displayedOptions.map((option) => (
                        <li key={option.value}>
                            <div className={styles.optionSeparator} />
                            <button
                                type="button"
                                onClick={handleOptionClicked(option)}
                                className={clsx(styles.option, optionClassName)}
                                style={optionStyle}
                            >
                                {option.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </dialog>
        </div>
    )
}
