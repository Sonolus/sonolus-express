import { LocalizationText, ServerFileOption } from '@sonolus/core'
import { Localize } from '../../utils/localization'

export type ServerFileOptionModel = {
    name: LocalizationText
    description?: LocalizationText
    required: boolean
    type: 'file'
}

export type ParsedFileOptionQuery = string | undefined

export const parseFileOptionQuery = (value: unknown): ParsedFileOptionQuery => {
    if (typeof value !== 'string') return

    return value
}

export const serializeFileOptionQuery = (value: ParsedFileOptionQuery): string | undefined => value

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
})
