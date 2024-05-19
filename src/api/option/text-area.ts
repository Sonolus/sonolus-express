import { LocalizationText, ServerTextAreaOption } from '@sonolus/core'
import { Localize } from '../localization'

export type ServerTextAreaOptionModel = {
    name: LocalizationText
    type: 'textArea'
    placeholder: LocalizationText
    limit?: number
}

export type ParsedTextAreaOptionQuery = string

export const parseTextAreaQuery = (value: unknown): ParsedTextAreaOptionQuery => {
    if (typeof value !== 'string') return ''

    return value
}

export const toSearchTextAreaOption = (
    localize: Localize,
    query: string,
    option: ServerTextAreaOptionModel,
): ServerTextAreaOption => ({
    query,
    name: localize(option.name),
    type: 'textArea',
    placeholder: localize(option.placeholder),
    limit: option.limit,
})
