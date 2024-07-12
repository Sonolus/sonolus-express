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

export const parseRawServerToggleOptionValue = (
    value: unknown,
): ServerToggleOptionValue | undefined => {
    if (typeof value !== 'string') return

    return value !== '0'
}

export const normalizeServerToggleOptionValue = (
    value: ServerToggleOptionValue | undefined,
    option: ServerToggleOptionModel,
): ServerToggleOptionValue => value ?? option.def

export const serializeServerToggleOptionValue = (value: ServerToggleOptionValue): string =>
    `${+value}`

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
