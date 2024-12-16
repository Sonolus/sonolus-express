import { LocalizationText, ServerFileOption } from '@sonolus/core'
import { Localize } from '../../../utils/localization'

export type ServerFileOptionModel = {
    name: LocalizationText
    description?: LocalizationText
    required: boolean
    type: 'file'
    def: string
}

export type ServerFileOptionValue = string

export const parseRawServerFileOptionValue = (
    value: unknown,
): ServerFileOptionValue | undefined => {
    if (typeof value !== 'string') return

    return value
}

export const normalizeServerFileOptionValue = (
    value: ServerFileOptionValue | undefined,
    option: ServerFileOptionModel,
): ServerFileOptionValue => value ?? option.def

export const serializeServerFileOptionValue = (value: ServerFileOptionValue): string => value

export const toServerFileOption = (
    localize: Localize,
    query: string,
    option: ServerFileOptionModel,
): ServerFileOption => ({
    query,
    name: localize(option.name),
    description: option.description && localize(option.description),
    required: option.required,
    type: option.type,
    def: option.def,
})
