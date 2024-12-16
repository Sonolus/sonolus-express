import { ServerOption } from '@sonolus/core'
import { Localize } from '../../../utils/localization'
import { ServerCollectionItemOptionModel, toServerCollectionItemOption } from './collectionItem'
import { ServerFileOptionModel, toServerFileOption } from './file'
import { ServerMultiOptionModel, toServerMultiOption } from './multi'
import { ServerSelectOptionModel, toServerSelectOption } from './select'
import { ServerServerItemOptionModel, toServerServerItemOption } from './serverItem'
import { ServerServerItemsOptionModel, toServerServerItemsOption } from './serverItems'
import { ServerSliderOptionModel, toServerSliderOption } from './slider'
import { ServerTextOptionModel, toServerTextOption } from './text'
import { ServerTextAreaOptionModel, toServerTextAreaOption } from './textArea'
import { ServerToggleOptionModel, toServerToggleOption } from './toggle'

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
