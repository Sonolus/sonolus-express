import { LocalizationText, SearchSliderOption } from 'sonolus-core'
import { Localize } from '../../localization'

export type SearchSliderOptionModel = {
    name: LocalizationText
    type: 'slider'
    def: number
    min: number
    max: number
    step: number
    unit?: LocalizationText
}

export type ParsedSliderOptionQuery = number

export const parseSliderQuery = (
    value: unknown,
    option: SearchSliderOptionModel,
): ParsedSliderOptionQuery => {
    if (typeof value !== 'string') return option.def

    const parsed = +value
    if (Number.isNaN(parsed)) return option.def

    if (parsed < option.min) return option.min
    if (parsed > option.max) return option.max
    return parsed
}

export const toSearchSliderOption = (
    localize: Localize,
    query: string,
    option: SearchSliderOptionModel,
): SearchSliderOption => ({
    query,
    name: localize(option.name),
    type: 'slider',
    def: option.def,
    min: option.min,
    max: option.max,
    step: option.step,
    unit: option.unit && localize(option.unit),
})
