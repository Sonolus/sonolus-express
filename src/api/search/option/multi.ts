import { LocalizationText, SearchMultiOption } from 'sonolus-core'
import { Localize } from '../../localization'

export type SearchMultiOptionModel = {
    name: LocalizationText
    type: 'multi'
    values: SearchMultiOptionValueModel[]
}

export type SearchMultiOptionValueModel = {
    title: LocalizationText
    def: boolean
}

export type ParsedMultiOptionQuery = boolean[]

export const parseMultiQuery = (
    value: unknown,
    option: SearchMultiOptionModel,
): ParsedMultiOptionQuery => {
    const values = option.values.map(({ def }) => def)

    if (typeof value !== 'string') return values

    for (const [index, flag] of [...value.slice(0, values.length)].entries()) {
        values[index] = flag !== '0'
    }

    return values
}

export const toSearchMultiOption = (
    localize: Localize,
    query: string,
    option: SearchMultiOptionModel,
): SearchMultiOption => ({
    query,
    name: localize(option.name),
    type: 'multi',
    defs: Object.values(option.values).map((value) => value.def),
    values: Object.values(option.values).map((value) => localize(value.title)),
})
