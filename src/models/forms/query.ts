import {
    ParsedCollectionItemOptionQuery,
    ServerCollectionItemOptionModel,
    parseServerCollectionItemOptionQuery,
    serializeCollectionItemOptionQuery,
} from '../options/collectionItem'
import {
    ParsedFileOptionQuery,
    parseFileOptionQuery,
    serializeFileOptionQuery,
} from '../options/file'
import {
    ParsedMultiOptionQuery,
    parseMultiOptionQuery,
    serializeMultiOptionQuery,
} from '../options/multi'
import { ServerOptionModel, ServerOptionsModel } from '../options/option'
import {
    ParsedSelectOptionQuery,
    parseSelectOptionQuery,
    serializeSelectOptionQuery,
} from '../options/select'
import {
    ParsedServerItemOptionQuery,
    parseServerItemOptionQuery,
    serializeServerItemOptionQuery,
} from '../options/serverItem'
import {
    ParsedServerItemsOptionQuery,
    parseServerItemsOptionQuery,
    serializeServerItemsOptionQuery,
} from '../options/serverItems'
import {
    ParsedSliderOptionQuery,
    parseSliderOptionQuery,
    serializeSliderOptionQuery,
} from '../options/slider'
import {
    ParsedTextOptionQuery,
    parseTextOptionQuery,
    serializeTextOptionQuery,
} from '../options/text'
import {
    ParsedTextAreaOptionQuery,
    parseTextAreaOptionQuery,
    serializeTextAreaOptionQuery,
} from '../options/textArea'
import {
    ParsedToggleOptionQuery,
    parseToggleOptionQuery,
    serializeToggleOptionQuery,
} from '../options/toggle'
import { ServerFormModel, ServerFormsModel } from './form'

export type ParsedOptionQuery<T extends ServerOptionModel> = {
    text: ParsedTextOptionQuery
    textArea: ParsedTextAreaOptionQuery
    slider: ParsedSliderOptionQuery
    toggle: ParsedToggleOptionQuery
    select: ParsedSelectOptionQuery
    multi: ParsedMultiOptionQuery
    serverItem: ParsedServerItemOptionQuery
    serverItems: ParsedServerItemsOptionQuery
    collectionItem: ParsedCollectionItemOptionQuery<T & ServerCollectionItemOptionModel>
    file: ParsedFileOptionQuery
}[T['type']]

export const parseOptionQuery = <T extends ServerOptionModel>(
    value: unknown,
    option: T,
): ParsedOptionQuery<T> =>
    ({
        text: parseTextOptionQuery,
        textArea: parseTextAreaOptionQuery,
        slider: parseSliderOptionQuery,
        toggle: parseToggleOptionQuery,
        select: parseSelectOptionQuery,
        multi: parseMultiOptionQuery,
        serverItem: parseServerItemOptionQuery,
        serverItems: parseServerItemsOptionQuery,
        collectionItem: parseServerCollectionItemOptionQuery,
        file: parseFileOptionQuery,
    })[option.type](value, option as never) as never

export const serializeOptionQuery = <T extends ServerOptionModel>(
    value: ParsedOptionQuery<T>,
    option: T,
): string | undefined =>
    ({
        text: serializeTextOptionQuery,
        textArea: serializeTextAreaOptionQuery,
        slider: serializeSliderOptionQuery,
        toggle: serializeToggleOptionQuery,
        select: serializeSelectOptionQuery,
        multi: serializeMultiOptionQuery,
        serverItem: serializeServerItemOptionQuery,
        serverItems: serializeServerItemsOptionQuery,
        collectionItem: serializeCollectionItemOptionQuery,
        file: serializeFileOptionQuery,
    })[option.type](value as never, option as never)

export type ParsedOptionsQuery<T extends ServerOptionsModel> = {
    [K in keyof T]: ParsedOptionQuery<T[K]>
}

export const parseOptionsQuery = <T extends ServerOptionsModel>(
    query: Record<string, unknown>,
    options: T,
): ParsedOptionsQuery<T> =>
    Object.fromEntries(
        Object.entries(options).map(([key, option]) => [key, parseOptionQuery(query[key], option)]),
    ) as never

export type ParsedFormQuery<K extends string, T extends ServerFormModel> = {
    type: K
} & ParsedOptionsQuery<T['options']>

export const parseFormQuery = <K extends string, T extends ServerFormModel>(
    query: Record<string, unknown>,
    type: K,
    form: T,
): ParsedFormQuery<K, T> =>
    ({
        type,
        ...parseOptionsQuery(query, form.options),
    }) as never

export const serializeFormQuery = <K extends string, T extends ServerFormModel>(
    query: ParsedFormQuery<K, T>,
    type: K,
    form: T,
): string =>
    new URLSearchParams([
        ['type', type],
        ...Object.entries(form.options)
            .map(([key, option]): [string, string] | undefined => {
                const value = serializeOptionQuery(query[key], option)
                if (value === undefined) return

                return [key, value]
            })
            .filter((kvp) => kvp !== undefined),
    ]).toString()

export type ParsedFormsQuery<T extends ServerFormsModel> = {
    [K in keyof T]: ParsedFormQuery<K & string, T[K]>
}[keyof T]

export const parseFormsQuery = <T extends ServerFormsModel>(
    query: Record<string, unknown>,
    forms: T,
): ParsedFormsQuery<T> | undefined => {
    const type = `${query.type}`

    const form = forms[type]
    if (!form) return

    return parseFormQuery(query, type, form)
}

export type ParsedSearchesQuery<T extends ServerFormsModel> =
    | ParsedFormsQuery<T>
    | {
          type: 'quick'
          keywords: string
      }

export const parseSearchesQuery = <T extends ServerFormsModel>(
    query: Record<string, unknown>,
    searches: T,
): ParsedSearchesQuery<T> => {
    const type = `${query.type}`

    if (type === 'quick')
        return {
            type: 'quick',
            keywords: parseTextOptionQuery(query.keywords, {
                name: {},
                required: false,
                type: 'text',
                placeholder: {},
                def: '',
                limit: 0,
                shortcuts: [],
            }),
        }

    return (
        parseFormsQuery(query, searches) ?? {
            type: 'quick',
            keywords: '',
        }
    )
}
