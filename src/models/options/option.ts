import { ServerOption } from '@sonolus/core'
import { Localize } from '../../utils/localization'
import { ServerCollectionItemOptionModel, toServerCollectionItemOption } from './collectionItem'
import { ServerFileOptionModel, toServerFileOption } from './file'
import { ServerMultiOptionModel, toServerMultiOption } from './multi'
import { ServerSelectOptionModel, toServerSelectOption } from './select'
import { ServerServerItemOptionModel, toServerServerItemOption } from './serverItem'
import { ServerSliderOptionModel, toServerSliderOption } from './slider'
import { ServerTextOptionModel, toServerTextOption } from './text'
import { ServerTextAreaOptionModel, toServerTextAreaOption } from './textArea'
import { ServerToggleOptionModel, toServerToggleOption } from './toggle'

export type ServerOptionsModel = Record<string, ServerOptionModel>

export type ServerOptionModel =
    | ServerTextOptionModel
    | ServerTextAreaOptionModel
    | ServerSliderOptionModel
    | ServerToggleOptionModel
    | ServerSelectOptionModel
    | ServerMultiOptionModel
    | ServerServerItemOptionModel
    | ServerCollectionItemOptionModel
    | ServerFileOptionModel

export const optionsTypes = <T extends ServerOptionsModel>(options: T): (keyof T & string)[] =>
    Object.keys(options)

export const toServerOption = (
    localize: Localize,
    query: string,
    option: ServerOptionModel,
): ServerOption => {
    switch (option.type) {
        case 'text':
            return toServerTextOption(localize, query, option)
        case 'textArea':
            return toServerTextAreaOption(localize, query, option)
        case 'slider':
            return toServerSliderOption(localize, query, option)
        case 'toggle':
            return toServerToggleOption(localize, query, option)
        case 'select':
            return toServerSelectOption(localize, query, option)
        case 'multi':
            return toServerMultiOption(localize, query, option)
        case 'serverItem':
            return toServerServerItemOption(localize, query, option)
        case 'collectionItem':
            return toServerCollectionItemOption(localize, query, option)
        case 'file':
            return toServerFileOption(localize, query, option)
    }
}

export const toServerOptions = <T extends ServerOptionsModel>(
    localize: Localize,
    types: (keyof T & string)[],
    options: T,
): ServerOption[] =>
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    types.map((type) => toServerOption(localize, type, options[type]!))
