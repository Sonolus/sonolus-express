import { LocalizationText, ServerTextOption } from '@sonolus/core'
import { Localize } from '../../utils/localization'

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

export type ParsedTextOptionQuery = string

export const parseTextOptionQuery = (
    value: unknown,
    option: ServerTextOptionModel,
): ParsedTextOptionQuery => {
    if (typeof value !== 'string') return option.def

    return value
}

export const serializeTextOptionQuery = (
    value: ParsedTextOptionQuery,
    option: ServerTextOptionModel,
): string | undefined => (value !== option.def ? value : undefined)

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
