import { LocalizationText, ServerSliderOption } from '@sonolus/core'
import { Localize } from '../../utils/localization'

export type ServerSliderOptionModel = {
    name: LocalizationText
    description?: LocalizationText
    required: boolean
    type: 'slider'
    def: number
    min: number
    max: number
    step: number
    unit?: LocalizationText
}

export type ParsedSliderOptionQuery = number

export const parseSliderOptionQuery = (
    value: unknown,
    option: ServerSliderOptionModel,
): ParsedSliderOptionQuery => {
    if (typeof value !== 'string') return option.def

    const parsed = +value
    if (Number.isNaN(parsed)) return option.def

    if (parsed < option.min) return option.min
    if (parsed > option.max) return option.max
    return parsed
}

export const serializeSliderOptionQuery = (
    value: ParsedSliderOptionQuery,
    option: ServerSliderOptionModel,
): string | undefined => (value !== option.def ? `${value}` : undefined)

export const toServerSliderOption = (
    localize: Localize,
    query: string,
    option: ServerSliderOptionModel,
): ServerSliderOption => ({
    query,
    name: localize(option.name),
    description: option.description && localize(option.description),
    required: option.required,
    type: option.type,
    def: option.def,
    min: option.min,
    max: option.max,
    step: option.step,
    unit: option.unit && localize(option.unit),
})
