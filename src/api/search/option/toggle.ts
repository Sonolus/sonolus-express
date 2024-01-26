import { LocalizationText, SearchToggleOption } from 'sonolus-core'
import { Localize } from '../../localization'

export type SearchToggleOptionModel = {
    name: LocalizationText
    type: 'toggle'
    def: boolean
}

export type ParsedToggleOptionQuery = boolean

export const parseToggleQuery = (
    value: unknown,
    option: SearchToggleOptionModel,
): ParsedToggleOptionQuery => {
    if (typeof value !== 'string') return option.def

    return value !== '0'
}

export const toSearchToggleOption = (
    localize: Localize,
    query: string,
    option: SearchToggleOptionModel,
): SearchToggleOption => ({
    query,
    name: localize(option.name),
    type: 'toggle',
    def: option.def ? 1 : 0,
})
