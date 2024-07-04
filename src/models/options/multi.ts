import { LocalizationText, ServerMultiOption } from '@sonolus/core'
import { Localize } from '../../utils/localization'

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

export type ParsedMultiOptionQuery = boolean[]

export const parseMultiOptionQuery = (
    value: unknown,
    option: ServerMultiOptionModel,
): ParsedMultiOptionQuery => {
    const values = option.values.map(({ def }) => def)

    if (typeof value !== 'string') return values

    for (const [index, flag] of [...value.slice(0, values.length)].entries()) {
        values[index] = flag !== '0'
    }

    return values
}

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
