import { LocalizationText, ServerToggleOption } from '@sonolus/core'
import { Localize } from '../../../utils/localization'

export type ServerToggleOptionModel = {
    name: LocalizationText
    description?: LocalizationText
    required: boolean
    type: 'toggle'
    def: boolean
}

export type ServerToggleOptionValue = boolean

export const parseServerToggleOptionValue = (
    value: unknown,
    option: ServerToggleOptionModel,
): ServerToggleOptionValue => {
    if (typeof value !== 'string') return option.def

    return value !== '0'
}

export const serializeServerToggleOptionValue = (
    value: ServerToggleOptionValue,
    option: ServerToggleOptionModel,
): string | undefined => (value !== option.def ? `${+value}` : undefined)

export const toServerToggleOption = (
    localize: Localize,
    query: string,
    option: ServerToggleOptionModel,
): ServerToggleOption => ({
    query,
    name: localize(option.name),
    description: option.description && localize(option.description),
    required: option.required,
    type: option.type,
    def: option.def,
})
