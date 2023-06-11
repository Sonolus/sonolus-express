import { LocalizationText, SearchOption } from 'sonolus-core'
import { SearchSelectOptionInfo, toSearchSelectOption } from './select'
import { SearchSliderOptionInfo, toSearchSliderOption } from './slider'
import { SearchTextOptionInfo, toSearchTextOption } from './text'
import { SearchToggleOptionInfo, toSearchToggleOption } from './toggle'

export type SearchOptionInfo =
    | SearchTextOptionInfo
    | SearchSliderOptionInfo
    | SearchToggleOptionInfo
    | SearchSelectOptionInfo

export const toSearchOption = (
    localize: (text: LocalizationText) => string,
    query: string,
    info: SearchOptionInfo,
): SearchOption => {
    switch (info.type) {
        case 'text':
            return toSearchTextOption(localize, query, info)
        case 'slider':
            return toSearchSliderOption(localize, query, info)
        case 'toggle':
            return toSearchToggleOption(localize, query, info)
        case 'select':
            return toSearchSelectOption(localize, query, info)
    }
}
