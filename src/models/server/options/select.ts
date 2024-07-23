import { LocalizationText, ServerSelectOption } from '@sonolus/core'
import { Localize } from '../../../utils/localization'

export type ServerSelectOptionModel = {
    name: LocalizationText
    description?: LocalizationText
    required: boolean
    type: 'select'
    def: number
    values: LocalizationText[]
}

export type ServerSelectOptionValue = number

export const parseRawServerSelectOptionValue = (
    value: unknown,
): ServerSelectOptionValue | undefined => {
    if (typeof value !== 'string') return

    const parsed = Number.parseInt(value, 10)
    if (!(parsed >= 0)) return

    return parsed
}

export const normalizeServerSelectOptionValue = (
    value: ServerSelectOptionValue | undefined,
    option: ServerSelectOptionModel,
): ServerSelectOptionValue => (value !== undefined && option.values[value] ? value : option.def)

export const serializeServerSelectOptionValue = (value: ServerSelectOptionValue): string =>
    `${value}`

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
