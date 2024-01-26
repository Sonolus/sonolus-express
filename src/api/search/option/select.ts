import { LocalizationText, SearchSelectOption } from 'sonolus-core'
import { Localize } from '../../localization'

export type SearchSelectOptionModel = {
    name: LocalizationText
    type: 'select'
    def: number
    values: LocalizationText[]
}

export type ParsedSelectOptionQuery = number

export const parseSelectQuery = (
    value: unknown,
    option: SearchSelectOptionModel,
): ParsedSelectOptionQuery => {
    if (typeof value !== 'string') return option.def

    const parsed = +value
    if (Number.isNaN(parsed)) return option.def

    if (option.values[parsed] === undefined) return option.def
    return parsed
}

export const toSearchSelectOption = (
    localize: Localize,
    query: string,
    option: SearchSelectOptionModel,
): SearchSelectOption => ({
    query,
    name: localize(option.name),
    type: 'select',
    def: option.def,
    values: option.values.map(localize),
})
