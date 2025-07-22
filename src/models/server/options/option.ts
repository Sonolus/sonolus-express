import { ServerOption } from '@sonolus/core'
import { Localize } from '../../../utils/localization.js'
import { ServerCollectionItemOptionModel, toServerCollectionItemOption } from './collectionItem.js'
import { ServerFileOptionModel, toServerFileOption } from './file.js'
import { ServerMultiOptionModel, toServerMultiOption } from './multi.js'
import { ServerSelectOptionModel, toServerSelectOption } from './select.js'
import { ServerServerItemOptionModel, toServerServerItemOption } from './serverItem.js'
import { ServerServerItemsOptionModel, toServerServerItemsOption } from './serverItems.js'
import { ServerSliderOptionModel, toServerSliderOption } from './slider.js'
import { ServerTextOptionModel, toServerTextOption } from './text.js'
import { ServerTextAreaOptionModel, toServerTextAreaOption } from './textArea.js'
import { ServerToggleOptionModel, toServerToggleOption } from './toggle.js'

export type ServerOptionsModel = Record<string, ServerOptionModel>

export type PickOptions<T extends ServerOptionsModel> = {
    [K in keyof T]?: boolean | T[K]
}

export type ServerOptionModel =
    | ServerTextOptionModel
    | ServerTextAreaOptionModel
    | ServerSliderOptionModel
    | ServerToggleOptionModel
    | ServerSelectOptionModel
    | ServerMultiOptionModel
    | ServerServerItemOptionModel
    | ServerServerItemsOptionModel
    | ServerCollectionItemOptionModel
    | ServerFileOptionModel

export const toServerOption = (
    localize: Localize,
    query: string,
    option: ServerOptionModel,
): ServerOption =>
    ({
        text: toServerTextOption,
        textArea: toServerTextAreaOption,
        slider: toServerSliderOption,
        toggle: toServerToggleOption,
        select: toServerSelectOption,
        multi: toServerMultiOption,
        serverItem: toServerServerItemOption,
        serverItems: toServerServerItemsOption,
        collectionItem: toServerCollectionItemOption,
        file: toServerFileOption,
    })[option.type](localize, query, option as never)

export const toServerOptions = <T extends ServerOptionsModel>(
    localize: Localize,
    pick: PickOptions<T>,
    options: T,
): ServerOption[] =>
    Object.entries(pick as Partial<Record<string, boolean | ServerOptionModel>>)
        .map(
            ([type, value]) =>
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                value && toServerOption(localize, type, value === true ? options[type]! : value),
        )
        .filter((form) => !!form)
