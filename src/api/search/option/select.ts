import { LocalizationText, OptionName, SearchSelectOption } from 'sonolus-core'
import { SearchInfo } from '..'
import { SearchQueryOf } from './utils'

export type SearchSelectOptionInfo = {
    name: LocalizationText
    type: 'select'
    def: number
    values: string[]
}

export type SearchQueryOfSelect<T extends SearchInfo> = SearchQueryOf<
    T,
    SearchSelectOptionInfo,
    number
>

export function toSearchSelectOption(
    localize: (text: LocalizationText) => string,
    query: string,
    info: SearchSelectOptionInfo
): SearchSelectOption {
    return {
        query,
        name: localize(info.name) as OptionName,
        type: 'select',
        def: info.def,
        values: info.values,
    }
}
