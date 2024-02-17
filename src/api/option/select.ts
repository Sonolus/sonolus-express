import { LocalizationText, ServerSelectOption } from 'sonolus-core'
import { Localize } from '../localization'

export type ServerSelectOptionModel = {
    name: LocalizationText
    type: 'select'
    def: number
    values: LocalizationText[]
}

export type ParsedSelectOptionQuery = number

export const parseSelectQuery = (
    value: unknown,
    option: ServerSelectOptionModel,
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
    option: ServerSelectOptionModel,
): ServerSelectOption => ({
    query,
    name: localize(option.name),
    type: 'select',
    def: option.def,
    values: option.values.map(localize),
})
