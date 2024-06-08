import { LocalizationText, ServerTextAreaOption } from '@sonolus/core'
import { Localize } from '../../utils/localization'

export type ServerTextAreaOptionModel = {
    name: LocalizationText
    description?: LocalizationText
    required?: boolean
    type: 'textArea'
    placeholder: LocalizationText
    limit?: number
}

export type ParsedTextAreaOptionQuery = string

export const parseTextAreaOptionQuery = (value: unknown): ParsedTextAreaOptionQuery => {
    if (typeof value !== 'string') return ''

    return value
}

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
    limit: option.limit,
})
