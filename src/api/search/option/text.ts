import { LocalizationText, SearchTextOption } from 'sonolus-core'

export type SearchTextOptionInfo = {
    name: LocalizationText
    type: 'text'
    placeholder: LocalizationText
}

export const parseTextQuery = (value: unknown): string => {
    if (typeof value !== 'string') return ''

    return value
}

export const toSearchTextOption = (
    localize: (text: LocalizationText) => string,
    query: string,
    info: SearchTextOptionInfo,
): SearchTextOption => ({
    query,
    name: localize(info.name),
    type: 'text',
    placeholder: localize(info.placeholder),
})
