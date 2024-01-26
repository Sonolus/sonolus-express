import { LocalizationText, SearchTextOption } from 'sonolus-core'
import { Localize } from '../../localization'

export type SearchTextOptionModel = {
    name: LocalizationText
    type: 'text'
    placeholder: LocalizationText
}

export type ParsedTextOptionQuery = string

export const parseTextQuery = (value: unknown): ParsedTextOptionQuery => {
    if (typeof value !== 'string') return ''

    return value
}

export const toSearchTextOption = (
    localize: Localize,
    query: string,
    option: SearchTextOptionModel,
): SearchTextOption => ({
    query,
    name: localize(option.name),
    type: 'text',
    placeholder: localize(option.placeholder),
})
