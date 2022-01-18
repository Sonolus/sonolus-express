import { LocalizationText, OptionName, SearchSliderOption } from 'sonolus-core'

export type SearchSliderOptionInfo = {
    name: LocalizationText<OptionName>
    type: 'slider'
    def: number
    min: number
    max: number
    step: number
    display: 'number' | 'percentage'
}

export function parseSliderQuery(
    value: unknown,
    option: SearchSliderOptionInfo
): number {
    if (typeof value !== 'string') return option.def

    const parsed = +value
    if (Number.isNaN(parsed)) return option.def

    if (parsed < option.min) return option.min
    if (parsed > option.max) return option.max
    return parsed
}

export function toSearchSliderOption(
    localize: (text: LocalizationText) => string,
    query: string,
    info: SearchSliderOptionInfo
): SearchSliderOption {
    return {
        query,
        name: localize(info.name) as OptionName,
        type: 'slider',
        def: info.def,
        min: info.min,
        max: info.max,
        step: info.step,
        display: info.display,
    }
}
