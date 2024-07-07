import { parseServerTextOptionValue } from '../options/text'
import {
    ServerOptionsValue,
    parseServerOptionsValue,
    serializeServerOptionValue,
} from '../options/value'
import { ServerFormModel, ServerFormsModel } from './form'

export type ServerFormValue<K extends string, T extends ServerFormModel> = {
    type: K
} & ServerOptionsValue<T['options']>

export const parseServerFormValue = <K extends string, T extends ServerFormModel>(
    value: Record<string, unknown>,
    type: K,
    form: T,
): ServerFormValue<K, T> =>
    ({
        type,
        ...parseServerOptionsValue(value, form.options),
    }) as never

export const serializeServerFormValue = <K extends string, T extends ServerFormModel>(
    value: ServerFormValue<K, T>,
    type: K,
    form: T,
): string =>
    new URLSearchParams([
        ['type', type],
        ...Object.entries(form.options)
            .map(([key, option]): [string, string] | undefined => {
                const serialized = serializeServerOptionValue(value[key], option)
                if (serialized === undefined) return

                return [key, serialized]
            })
            .filter((kvp) => kvp !== undefined),
    ]).toString()

export type ServerFormsValue<T extends ServerFormsModel> = {
    [K in keyof T]: ServerFormValue<K & string, T[K]>
}[keyof T]

export const parseServerFormsValue = <T extends ServerFormsModel>(
    value: Record<string, unknown>,
    forms: T,
): ServerFormsValue<T> | undefined => {
    const type = `${value.type}`

    const form = forms[type]
    if (!form) return

    return parseServerFormValue(value, type, form)
}

export type ServerSearchesValue<T extends ServerFormsModel> =
    | ServerFormsValue<T>
    | {
          type: 'quick'
          keywords: string
      }

export const serializeServerFormsValue = <T extends ServerFormsModel>(
    value: ServerFormsValue<T>,
    forms: T,
): string =>
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    serializeServerFormValue(value, value.type, forms[value.type]!)

export const parseServerSearchesValue = <T extends ServerFormsModel>(
    value: Record<string, unknown>,
    searches: T,
): ServerSearchesValue<T> => {
    const type = `${value.type}`

    if (type === 'quick')
        return {
            type: 'quick',
            keywords: parseServerTextOptionValue(value.keywords, {
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
        parseServerFormsValue(value, searches) ?? {
            type: 'quick',
            keywords: '',
        }
    )
}
