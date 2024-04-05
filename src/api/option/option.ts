import { ServerOption } from '@sonolus/core'
import { Localize } from '../localization'
import { ServerMultiOptionModel, toSearchMultiOption } from './multi'
import { ServerSelectOptionModel, toSearchSelectOption } from './select'
import { ServerSliderOptionModel, toSearchSliderOption } from './slider'
import { ServerTextOptionModel, toSearchTextOption } from './text'
import { ServerToggleOptionModel, toSearchToggleOption } from './toggle'

export type ServerOptionModel =
    | ServerTextOptionModel
    | ServerSliderOptionModel
    | ServerToggleOptionModel
    | ServerSelectOptionModel
    | ServerMultiOptionModel

export const toServerOption = (
    localize: Localize,
    query: string,
    option: ServerOptionModel,
): ServerOption => {
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
