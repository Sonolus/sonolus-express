import { LocalizationText, ServerTextAreaOption } from '@sonolus/core'
import { Localize } from '../../../utils/localization'

export type ServerTextAreaOptionModel = {
    name: LocalizationText
    description?: LocalizationText
    required: boolean
    type: 'textArea'
    placeholder: LocalizationText
    def: string
    limit: number
    shortcuts: string[]
}

export type ServerTextAreaOptionValue = string

export const parseRawServerTextAreaOptionValue = (
    value: unknown,
): ServerTextAreaOptionValue | undefined => {
    if (typeof value !== 'string') return

    return value
}

export const normalizeServerTextAreaOptionValue = (
    value: ServerTextAreaOptionValue | undefined,
    option: ServerTextAreaOptionModel,
): ServerTextAreaOptionValue =>
    value !== undefined && (option.limit === 0 || value.length <= option.limit) ? value : option.def

export const serializeServerTextAreaOptionValue = (value: ServerTextAreaOptionValue): string =>
    value

export const toServerTextAreaOption = (
    localize: Localize,
    query: string,
    option: ServerTextAreaOptionModel,
): ServerTextAreaOption => ({
    query,
    name: localize(option.name),
    description: option.description && localize(option.description),
    required: option.required,
    type: option.type,
    placeholder: localize(option.placeholder),
    def: option.def,
    limit: option.limit,
    shortcuts: option.shortcuts,
})
