import { LocalizationText, ServerMultiOption } from '@sonolus/core'
import { Localize } from '../../../utils/localization'

export type ServerMultiOptionModel = {
    name: LocalizationText
    description?: LocalizationText
    required: boolean
    type: 'multi'
    values: ServerMultiOptionValueModel[]
}

export type ServerMultiOptionValueModel = {
    title: LocalizationText
    def: boolean
}

export type ServerMultiOptionValue = boolean[]

export const parseRawServerMultiOptionValue = (
    value: unknown,
): ServerMultiOptionValue | undefined => {
    if (typeof value !== 'string') return

    return [...value].map((flag) => flag !== '0')
}

export const normalizeServerMultiOptionValue = (
    value: ServerMultiOptionValue | undefined,
    option: ServerMultiOptionModel,
): ServerMultiOptionValue =>
    value?.length === option.values.length ? value : option.values.map(({ def }) => def)

export const serializeServerMultiOptionValue = (value: ServerMultiOptionValue): string =>
    value.map((value) => `${+value}`).join('')

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
    def: Object.values(option.values).map((value) => value.def),
    values: Object.values(option.values).map((value) => localize(value.title)),
})
