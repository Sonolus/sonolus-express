import { LocalizationText, SearchOption } from 'sonolus-core'
import { SearchInfo } from '..'
import {
    SearchQueryOfSelect,
    SearchSelectOptionInfo,
    toSearchSelectOption,
} from './select'
import {
    SearchQueryOfSlider,
    SearchSliderOptionInfo,
    toSearchSliderOption,
} from './slider'
import {
    SearchQueryOfText,
    SearchTextOptionInfo,
    toSearchTextOption,
} from './text'
import {
    SearchQueryOfToggle,
    SearchToggleOptionInfo,
    toSearchToggleOption,
} from './toggle'

export type SearchOptionInfo =
    | SearchTextOptionInfo
    | SearchSliderOptionInfo
    | SearchToggleOptionInfo
    | SearchSelectOptionInfo

export type SearchQuery<T extends SearchInfo> = SearchQueryOfText<T> &
    SearchQueryOfSlider<T> &
    SearchQueryOfToggle<T> &
    SearchQueryOfSelect<T>

export function toSearchOption(
    localize: (text: LocalizationText) => string,
    query: string,
    info: SearchOptionInfo
): SearchOption {
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
