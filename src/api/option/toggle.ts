import { LocalizationText, ServerToggleOption } from 'sonolus-core'
import { Localize } from '../localization'

export type ServerToggleOptionModel = {
    name: LocalizationText
    type: 'toggle'
    def: boolean
}

export type ParsedToggleOptionQuery = boolean

export const parseToggleQuery = (
    value: unknown,
    option: ServerToggleOptionModel,
): ParsedToggleOptionQuery => {
    if (typeof value !== 'string') return option.def

    return value !== '0'
}

export const toSearchToggleOption = (
    localize: Localize,
    query: string,
    option: ServerToggleOptionModel,
): ServerToggleOption => ({
    query,
    name: localize(option.name),
    type: 'toggle',
    def: option.def ? 1 : 0,
})
