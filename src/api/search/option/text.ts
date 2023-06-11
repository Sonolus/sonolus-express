import { LocalizationText, SearchTextOption } from 'sonolus-core'

export type SearchTextOptionInfo = {
    name: LocalizationText
    type: 'text'
    placeholder: LocalizationText
}

export function parseTextQuery(value: unknown): string {
    if (typeof value !== 'string') return ''

    return value
}

export function toSearchTextOption(
    localize: (text: LocalizationText) => string,
    query: string,
    info: SearchTextOptionInfo,
): SearchTextOption {
    return {
        query,
        name: localize(info.name),
        type: 'text',
        placeholder: localize(info.placeholder),
    }
}
