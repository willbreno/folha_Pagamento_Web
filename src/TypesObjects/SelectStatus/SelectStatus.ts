import { SelectHTMLAttributes } from "react"

export const StatusOptions: OptionProps[] = [
    {
        value: '',
        label: "Selecione"
    },
    {
        value: 1,
        label: "Ativo"
    },
    {
        value: 2,
        label: "Inativo"
    }
]

export interface OptionProps {
    value: number | string
    label: string
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    text: string
    options: OptionProps[]
    required?: boolean
    defaultValue?: number
}