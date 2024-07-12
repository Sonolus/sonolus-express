import {
    RawServerOptionsValue,
    ServerOptionsValue,
    parseRawServerOptionsValue,
    parseServerOptionsValue,
    serializeRawServerOptionValue,
} from '../options/value'
import { ServerFormModel, ServerFormsModel } from './form'

export type RawServerFormValue<K extends string, T extends ServerFormModel> = {
    type: K
    rawOptions: RawServerOptionsValue<T['options']>
}

export type ServerFormValue<K extends string, T extends ServerFormModel> = {
    type: K
    options: ServerOptionsValue<T['options']>
    rawOptions: RawServerOptionsValue<T['options']>
}

export const parseRawServerFormValue = <K extends string, T extends ServerFormModel>(
    value: Record<string, unknown>,
    type: K,
    form: T,
): RawServerFormValue<K, T> => ({
    type,
    rawOptions: parseRawServerOptionsValue(value, form.options),
})

export const parseServerFormValue = <K extends string, T extends ServerFormModel>(
    value: Record<string, unknown>,
    type: K,
    form: T,
): ServerFormValue<K, T> => ({
    type,
    options: parseServerOptionsValue(value, form.options),
    rawOptions: parseRawServerOptionsValue(value, form.options),
})

export const serializeRawServerFormValue = <K extends string, T extends ServerFormModel>(
    value: RawServerFormValue<K, T>,
    type: K,
    form: T,
): string =>
    new URLSearchParams([
        ['type', type],
        ...Object.entries(form.options)
            .map(([key, option]): [string, string] | undefined => {
                const rawValue = value.rawOptions[key]
                if (rawValue === undefined) return

                return [key, serializeRawServerOptionValue(rawValue, option)]
            })
            .filter((kvp) => kvp !== undefined),
    ]).toString()

export type RawServerFormsValue<T extends ServerFormsModel> = {
    [K in keyof T]: RawServerFormValue<K & string, T[K]>
}[keyof T]

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

export const serializeRawServerFormsValue = <T extends ServerFormsModel>(
    value: RawServerFormsValue<T>,
    forms: T,
): string =>
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    serializeRawServerFormValue(value, value.type, forms[value.type]!)

export type ServerSearchesValue<T extends ServerFormsModel> =
    | ServerFormsValue<T>
    | ServerFormValue<'quick', typeof quickForm>

const quickForm = {
    title: {},
    requireConfirmation: false,
    options: {
        keywords: {
            name: {},
            required: false,
            type: 'text',
            placeholder: {},
            def: '',
            limit: 0,
            shortcuts: [],
        },
    },
} satisfies ServerFormModel

export const parseServerSearchesValue = <T extends ServerFormsModel>(
    value: Record<string, unknown>,
    searches: T,
): ServerSearchesValue<T> => {
    const type = `${value.type}`

    if (type === 'quick') return parseServerFormValue(value, 'quick', quickForm)

    return parseServerFormsValue(value, searches) ?? parseServerFormValue({}, 'quick', quickForm)
}
