import {
    LocalizationText,
    OptionName,
    OptionPlaceholder,
    SearchTextOption,
} from 'sonolus-core'

export type SearchTextOptionInfo = {
    name: LocalizationText<OptionName>
    type: 'text'
    placeholder: LocalizationText<OptionPlaceholder>
}

export function parseTextQuery(value: unknown): string {
    if (typeof value !== 'string') return ''

    return value
}

export function toSearchTextOption(
    localize: (text: LocalizationText) => string,
    query: string,
    info: SearchTextOptionInfo
): SearchTextOption {
    return {
        query,
        name: localize(info.name) as OptionName,
        type: 'text',
        placeholder: localize(info.placeholder) as OptionPlaceholder,
    }
}
