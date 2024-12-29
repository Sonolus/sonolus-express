import { LocalizationText, ServerMultiOption } from '@sonolus/core'
import { Localize } from '../../../utils/localization'

export type ServerMultiOptionModel = {
    name: LocalizationText
    description?: LocalizationText
    required: boolean
    type: 'multi'
    values: Record<string, ServerMultiOptionValueModel>
}

export type ServerMultiOptionValueModel = {
    title: LocalizationText
    def: boolean
}

export type ServerMultiOptionValue<T = ServerMultiOptionModel> = T extends ServerMultiOptionModel
    ? Record<keyof T['values'], boolean>
    : never

export const parseRawServerMultiOptionValue = (
    value: unknown,
    option: ServerMultiOptionModel,
): ServerMultiOptionValue | undefined => {
    if (typeof value !== 'string') return

    const names = new Set(value.split(','))

    return Object.fromEntries(Object.keys(option.values).map((name) => [name, names.has(name)]))
}

export const normalizeServerMultiOptionValue = (
    value: ServerMultiOptionValue | undefined,
    option: ServerMultiOptionModel,
): ServerMultiOptionValue =>
    value ?? Object.fromEntries(Object.entries(option.values).map(([name, { def }]) => [name, def]))

export const serializeServerMultiOptionValue = (value: ServerMultiOptionValue): string =>
    Object.entries(value)
        .filter(([, value]) => value)
        .map(([name]) => name)
        .join(',')

export const toServerMultiOption = (
    localize: Localize,
    query: string,
    option: ServerMultiOptionModel,
): ServerMultiOption => ({
    query,
    name: localize(option.name),
    description: option.description && localize(option.description),
    required: option.required,
    type: option.type,
    def: Object.values(option.values).map(({ def }) => def),
    values: Object.entries(option.values).map(([name, { title }]) => ({
        name,
        title: localize(title),
    })),
})
