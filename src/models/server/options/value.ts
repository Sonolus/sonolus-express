import {
    ServerCollectionItemOptionValue,
    normalizeServerCollectionItemOptionValue,
    parseRawServerCollectionItemOptionValue,
    serializeServerCollectionItemOptionValue,
} from './collectionItem'
import {
    ServerFileOptionValue,
    normalizeServerFileOptionValue,
    parseRawServerFileOptionValue,
    serializeServerFileOptionValue,
} from './file'
import {
    ServerMultiOptionValue,
    normalizeServerMultiOptionValue,
    parseRawServerMultiOptionValue,
    serializeServerMultiOptionValue,
} from './multi'
import { ServerOptionModel, ServerOptionsModel } from './option'
import {
    ServerSelectOptionValue,
    normalizeServerSelectOptionValue,
    parseRawServerSelectOptionValue,
    serializeServerSelectOptionValue,
} from './select'
import {
    ServerServerItemOptionValue,
    normalizeServerServerItemOptionValue,
    parseRawServerServerItemOptionValue,
    serializeServerServerItemOptionValue,
} from './serverItem'
import {
    ServerServerItemsOptionValue,
    normalizeServerServerItemsOptionValue,
    parseRawServerServerItemsOptionValue,
    serializeServerServerItemsOptionValue,
} from './serverItems'
import {
    ServerSliderOptionValue,
    normalizeServerSliderOptionValue,
    parseRawServerSliderOptionValue,
    serializeServerSliderOptionValue,
} from './slider'
import {
    ServerTextOptionValue,
    normalizeServerTextOptionValue,
    parseRawServerTextOptionValue,
    serializeServerTextOptionValue,
} from './text'
import {
    ServerTextAreaOptionValue,
    normalizeServerTextAreaOptionValue,
    parseRawServerTextAreaOptionValue,
    serializeServerTextAreaOptionValue,
} from './textArea'
import {
    ServerToggleOptionValue,
    normalizeServerToggleOptionValue,
    parseRawServerToggleOptionValue,
    serializeServerToggleOptionValue,
} from './toggle'

export type RawServerOptionValue<T extends ServerOptionModel> = ServerOptionValue<T> | undefined

export type ServerOptionValue<T extends ServerOptionModel> = {
    text: ServerTextOptionValue
    textArea: ServerTextAreaOptionValue
    slider: ServerSliderOptionValue
    toggle: ServerToggleOptionValue
    select: ServerSelectOptionValue<T>
    multi: ServerMultiOptionValue<T>
    serverItem: ServerServerItemOptionValue
    serverItems: ServerServerItemsOptionValue
    collectionItem: ServerCollectionItemOptionValue<T>
    file: ServerFileOptionValue
}[T['type']]

const parseRawServerOptionValueByType = {
    text: parseRawServerTextOptionValue,
    textArea: parseRawServerTextAreaOptionValue,
    slider: parseRawServerSliderOptionValue,
    toggle: parseRawServerToggleOptionValue,
    select: parseRawServerSelectOptionValue,
    multi: parseRawServerMultiOptionValue,
    serverItem: parseRawServerServerItemOptionValue,
    serverItems: parseRawServerServerItemsOptionValue,
    collectionItem: parseRawServerCollectionItemOptionValue,
    file: parseRawServerFileOptionValue,
}

export const parseRawServerOptionValue = <T extends ServerOptionModel>(
    value: unknown,
    option: T,
): RawServerOptionValue<T> =>
    parseRawServerOptionValueByType[option.type](value, option as never) as never

const normalizeServerOptionValueByType = {
    text: normalizeServerTextOptionValue,
    textArea: normalizeServerTextAreaOptionValue,
    slider: normalizeServerSliderOptionValue,
    toggle: normalizeServerToggleOptionValue,
    select: normalizeServerSelectOptionValue,
    multi: normalizeServerMultiOptionValue,
    serverItem: normalizeServerServerItemOptionValue,
    serverItems: normalizeServerServerItemsOptionValue,
    collectionItem: normalizeServerCollectionItemOptionValue,
    file: normalizeServerFileOptionValue,
}

export const parseServerOptionValue = <T extends ServerOptionModel>(
    value: unknown,
    option: T,
): ServerOptionValue<T> =>
    normalizeServerOptionValueByType[option.type](
        parseRawServerOptionValue(value, option) as never,
        option as never,
    ) as never

export const serializeRawServerOptionValue = <T extends ServerOptionModel>(
    value: Exclude<RawServerOptionValue<T>, undefined>,
    option: T,
): string =>
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
    })[option.type](value as never)

export type RawServerOptionsValue<T extends ServerOptionsModel> = {
    [K in keyof T]?: RawServerOptionValue<T[K]>
}

export type ServerOptionsValue<T extends ServerOptionsModel> = {
    [K in keyof T]: ServerOptionValue<T[K]>
}

export const parseRawServerOptionsValue = <T extends ServerOptionsModel>(
    value: Record<string, unknown>,
    options: T,
): RawServerOptionsValue<T> =>
    Object.fromEntries(
        Object.entries(options).map(([key, option]) => [
            key,
            parseRawServerOptionValue(value[key], option),
        ]),
    ) as never

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
