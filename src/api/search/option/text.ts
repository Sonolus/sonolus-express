import { LocalizationText, OptionName, SearchTextOption } from 'sonolus-core'
import { SearchInfo } from '..'
import { SearchQueryOf } from './utils'

export type SearchTextOptionInfo = {
    name: LocalizationText
    type: 'text'
    placeholder: string
}

export type SearchQueryOfText<T extends SearchInfo> = SearchQueryOf<
    T,
    SearchTextOptionInfo,
    string
>

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
