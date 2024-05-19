import { LocalizationText, ServerTextOption } from '@sonolus/core'
import { Localize } from '../localization'

export type ServerTextOptionModel = {
    name: LocalizationText
    type: 'text'
    placeholder: LocalizationText
    limit?: number
}

export type ParsedTextOptionQuery = string

export const parseTextQuery = (value: unknown): ParsedTextOptionQuery => {
    if (typeof value !== 'string') return ''

    return value
}

export const toSearchTextOption = (
    localize: Localize,
    query: string,
    option: ServerTextOptionModel,
): ServerTextOption => ({
    query,
    name: localize(option.name),
    type: 'text',
    placeholder: localize(option.placeholder),
    limit: option.limit,
})
