'use client'

import React, { useId, useRef, useState } from 'react'
import clsx from '@/lib/clsx'
import { Button } from '../Button/Button'
import Image from 'next/image'
import { useControledDialog } from '@/hooks/useControledDialog'

import styles from './Select.module.css'

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

    const handleSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (
        e
    ) => {
        setValue(e.target.value)
        onValueChange?.(e.target.value)
        onChange?.(e)
    }

    const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
        if (e.key === 'Escape') setOpen(false)
    }

    return (
        <div className={styles.wrapper} onKeyDown={handleKeyDown}>
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
                <ul id={listId} role="listbox">
                    {displayedOptions.map((option) => (
                        <li
                            key={option.value}
                            role="option"
                            aria-selected={false}
                        >
                            <div className={styles.optionSeparator} />
                            <span
                                onClick={handleOptionClicked(option)}
                                className={clsx(styles.option, optionClassName)}
                                style={optionStyle}
                            >
                                {option.label}
                            </span>
                        </li>
                    ))}
                </ul>
            </dialog>
        </div>
    )
}
