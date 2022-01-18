import { LocalizationText, OptionName, SearchSelectOption } from 'sonolus-core'

export type SearchSelectOptionInfo = {
    name: LocalizationText
    type: 'select'
    def: number
    values: string[]
}

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
