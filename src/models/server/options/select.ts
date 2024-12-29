import { LocalizationText, ServerSelectOption } from '@sonolus/core'
import { Localize } from '../../../utils/localization'

export type ServerSelectOptionModel = {
    name: LocalizationText
    description?: LocalizationText
    required: boolean
    type: 'select'
    def: string
    values: Record<string, LocalizationText>
}

export type ServerSelectOptionValue<T = ServerSelectOptionModel> = T extends ServerSelectOptionModel
    ? T['def'] | keyof T['values']
    : never

export const parseRawServerSelectOptionValue = (
    value: unknown,
    option: ServerSelectOptionModel,
): ServerSelectOptionValue | undefined => {
    if (typeof value !== 'string') return

    return option.values[value] ? value : undefined
}

export const normalizeServerSelectOptionValue = (
    value: ServerSelectOptionValue | undefined,
    option: ServerSelectOptionModel,
): ServerSelectOptionValue => value ?? option.def

export const serializeServerSelectOptionValue = (value: ServerSelectOptionValue): string => value

export const toServerSelectOption = (
    localize: Localize,
    query: string,
    option: ServerSelectOptionModel,
): ServerSelectOption => ({
    query,
    name: localize(option.name),
    description: option.description && localize(option.description),
    required: option.required,
    type: option.type,
    def: option.def,
    values: Object.entries(option.values).map(([name, title]) => ({
        name,
        title: localize(title),
    })),
})
