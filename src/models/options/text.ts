import { LocalizationText, ServerTextOption } from '@sonolus/core'
import { Localize } from '../../utils/localization'

export type ServerTextOptionModel = {
    name: LocalizationText
    description?: LocalizationText
    required?: boolean
    type: 'text'
    placeholder: LocalizationText
    limit?: number
}

export type ParsedTextOptionQuery = string

export const parseTextOptionQuery = (value: unknown): ParsedTextOptionQuery => {
    if (typeof value !== 'string') return ''

    return value
}

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
    limit: option.limit,
})
