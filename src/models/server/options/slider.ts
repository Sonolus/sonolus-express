import { LocalizationText, ServerSliderOption } from '@sonolus/core'
import { Localize } from '../../../utils/localization'

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

export type ServerSliderOptionValue = number

export const parseRawServerSliderOptionValue = (
    value: unknown,
): ServerSliderOptionValue | undefined => {
    if (typeof value !== 'string') return

    const parsed = +value
    if (Number.isNaN(parsed)) return

    return parsed
}

export const normalizeServerSliderOptionValue = (
    value: ServerSliderOptionValue | undefined,
    option: ServerSliderOptionModel,
): ServerSliderOptionValue =>
    value !== undefined && value >= option.min && value <= option.max ? value : option.def

export const serializeServerSliderOptionValue = (value: ServerSliderOptionValue): string =>
    `${value}`

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
