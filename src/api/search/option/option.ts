import { SearchOption } from 'sonolus-core'
import { Localize } from '../../localization'
import { SearchMultiOptionModel, toSearchMultiOption } from './multi'
import { SearchSelectOptionModel, toSearchSelectOption } from './select'
import { SearchSliderOptionModel, toSearchSliderOption } from './slider'
import { SearchTextOptionModel, toSearchTextOption } from './text'
import { SearchToggleOptionModel, toSearchToggleOption } from './toggle'

export type SearchOptionModel =
    | SearchTextOptionModel
    | SearchSliderOptionModel
    | SearchToggleOptionModel
    | SearchSelectOptionModel
    | SearchMultiOptionModel

export const toSearchOption = (
    localize: Localize,
    query: string,
    option: SearchOptionModel,
): SearchOption => {
    switch (option.type) {
        case 'text':
            return toSearchTextOption(localize, query, option)
        case 'slider':
            return toSearchSliderOption(localize, query, option)
        case 'toggle':
            return toSearchToggleOption(localize, query, option)
        case 'select':
            return toSearchSelectOption(localize, query, option)
        case 'multi':
            return toSearchMultiOption(localize, query, option)
    }
}
