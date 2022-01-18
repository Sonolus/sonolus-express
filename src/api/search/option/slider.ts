import { LocalizationText, OptionName, SearchSliderOption } from 'sonolus-core'
import { SearchInfo } from '..'
import { SearchQueryOf } from './utils'

export type SearchSliderOptionInfo = {
    name: LocalizationText
    type: 'slider'
    def: number
    min: number
    max: number
    step: number
    display: 'number' | 'percentage'
}

export type SearchQueryOfSlider<T extends SearchInfo> = SearchQueryOf<
    T,
    SearchSliderOptionInfo,
    number
>

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
