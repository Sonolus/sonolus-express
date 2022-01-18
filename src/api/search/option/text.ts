import { LocalizationText, OptionName, SearchTextOption } from 'sonolus-core'

export type SearchTextOptionInfo = {
    name: LocalizationText
    type: 'text'
    placeholder: string
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
        placeholder: info.placeholder,
    }
}
