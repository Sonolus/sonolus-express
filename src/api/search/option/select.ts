import {
    LocalizationText,
    OptionName,
    OptionValue,
    SearchSelectOption,
} from 'sonolus-core'

export type SearchSelectOptionInfo = {
    name: LocalizationText<OptionName>
    type: 'select'
    def: number
    values: LocalizationText<OptionValue>[]
}

export function parseSelectQuery(
    value: unknown,
    option: SearchSelectOptionInfo
): number {
    if (typeof value !== 'string') return option.def

    const parsed = +value
    if (Number.isNaN(parsed)) return option.def

    if (option.values[parsed] === undefined) return option.def
    return parsed
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
        values: info.values.map(localize) as OptionValue[],
    }
}
