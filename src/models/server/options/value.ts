import {
    ServerCollectionItemOptionModel,
    ServerCollectionItemOptionValue,
    parseServerCollectionItemOptionValue,
    serializeServerCollectionItemOptionValue,
} from './collectionItem'
import {
    ServerFileOptionValue,
    parseServerFileOptionValue,
    serializeServerFileOptionValue,
} from './file'
import {
    ServerMultiOptionValue,
    parseServerMultiOptionValue,
    serializeServerMultiOptionValue,
} from './multi'
import { ServerOptionModel, ServerOptionsModel } from './option'
import {
    ServerSelectOptionValue,
    parseServerSelectOptionValue,
    serializeServerSelectOptionValue,
} from './select'
import {
    ServerServerItemOptionValue,
    parseServerServerItemOptionValue,
    serializeServerServerItemOptionValue,
} from './serverItem'
import {
    ServerServerItemsOptionValue,
    parseServerServerItemsOptionValue,
    serializeServerServerItemsOptionValue,
} from './serverItems'
import {
    ServerSliderOptionValue,
    parseServerSliderOptionValue,
    serializeServerSliderOptionValue,
} from './slider'
import {
    ServerTextOptionValue,
    parseServerTextOptionValue,
    serializeServerTextOptionValue,
} from './text'
import {
    ServerTextAreaOptionValue,
    parseServerTextAreaOptionValue,
    serializeServerTextAreaOptionValue,
} from './textArea'
import {
    ServerToggleOptionValue,
    parseServerToggleOptionValue,
    serializeServerToggleOptionValue,
} from './toggle'

export type ServerOptionValue<T extends ServerOptionModel> = {
    text: ServerTextOptionValue
    textArea: ServerTextAreaOptionValue
    slider: ServerSliderOptionValue
    toggle: ServerToggleOptionValue
    select: ServerSelectOptionValue
    multi: ServerMultiOptionValue
    serverItem: ServerServerItemOptionValue
    serverItems: ServerServerItemsOptionValue
    collectionItem: ServerCollectionItemOptionValue<T & ServerCollectionItemOptionModel>
    file: ServerFileOptionValue
}[T['type']]

export const parseServerOptionValue = <T extends ServerOptionModel>(
    value: unknown,
    option: T,
): ServerOptionValue<T> =>
    ({
        text: parseServerTextOptionValue,
        textArea: parseServerTextAreaOptionValue,
        slider: parseServerSliderOptionValue,
        toggle: parseServerToggleOptionValue,
        select: parseServerSelectOptionValue,
        multi: parseServerMultiOptionValue,
        serverItem: parseServerServerItemOptionValue,
        serverItems: parseServerServerItemsOptionValue,
        collectionItem: parseServerCollectionItemOptionValue,
        file: parseServerFileOptionValue,
    })[option.type](value, option as never) as never

export const serializeServerOptionValue = <T extends ServerOptionModel>(
    value: ServerOptionValue<T>,
    option: T,
): string | undefined =>
    ({
        text: serializeServerTextOptionValue,
        textArea: serializeServerTextAreaOptionValue,
        slider: serializeServerSliderOptionValue,
        toggle: serializeServerToggleOptionValue,
        select: serializeServerSelectOptionValue,
        multi: serializeServerMultiOptionValue,
        serverItem: serializeServerServerItemOptionValue,
        serverItems: serializeServerServerItemsOptionValue,
        collectionItem: serializeServerCollectionItemOptionValue,
        file: serializeServerFileOptionValue,
    })[option.type](value as never, option as never)

export type ServerOptionsValue<T extends ServerOptionsModel> = {
    [K in keyof T]: ServerOptionValue<T[K]>
}

export const parseServerOptionsValue = <T extends ServerOptionsModel>(
    value: Record<string, unknown>,
    options: T,
): ServerOptionsValue<T> =>
    Object.fromEntries(
        Object.entries(options).map(([key, option]) => [
            key,
            parseServerOptionValue(value[key], option),
        ]),
    ) as never
