import { LocalizationText, ServerTextOption } from '@sonolus/core'
import { Localize } from '../../../utils/localization'

export type ServerTextOptionModel = {
    name: LocalizationText
    description?: LocalizationText
    required: boolean
    type: 'text'
    placeholder: LocalizationText
    def: string
    limit: number
    shortcuts: string[]
}

export type ServerTextOptionValue = string

export const parseRawServerTextOptionValue = (
    value: unknown,
): ServerTextOptionValue | undefined => {
    if (typeof value !== 'string') return

    return value
}

export const normalizeServerTextOptionValue = (
    value: ServerTextOptionValue | undefined,
    option: ServerTextOptionModel,
): ServerTextOptionValue =>
    value !== undefined && (option.limit === 0 || value.length <= option.limit) ? value : option.def

export const serializeServerTextOptionValue = (value: ServerTextOptionValue): string => value

export const toServerTextOption = (
    localize: Localize,
    query: string,
    option: ServerTextOptionModel,
): ServerTextOption => ({
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
