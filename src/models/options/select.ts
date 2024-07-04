import { LocalizationText, ServerSelectOption } from '@sonolus/core'
import { Localize } from '../../utils/localization'

export type ServerSelectOptionModel = {
    name: LocalizationText
    description?: LocalizationText
    required: boolean
    type: 'select'
    def: number
    values: LocalizationText[]
}

export type ParsedSelectOptionQuery = number

export const parseSelectOptionQuery = (
    value: unknown,
    option: ServerSelectOptionModel,
): ParsedSelectOptionQuery => {
    if (typeof value !== 'string') return option.def

    const parsed = +value
    if (Number.isNaN(parsed)) return option.def

    if (option.values[parsed] === undefined) return option.def
    return parsed
}

export const toServerSelectOption = (
    localize: Localize,
    query: string,
    option: ServerSelectOptionModel,
): ServerSelectOption => ({
    query,
    name: localize(option.name),
    description: option.description && localize(option.description),
    required: option.required,
    type: option.type,
    def: option.def,
    values: option.values.map(localize),
})
