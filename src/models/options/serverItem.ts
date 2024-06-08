import { ItemType, LocalizationText, ServerServerItemOption } from '@sonolus/core'
import { Localize } from '../../utils/localization'

export type ServerServerItemOptionModel = {
    name: LocalizationText
    description?: LocalizationText
    required?: boolean
    type: 'serverItem'
    itemType: ItemType
}

export type ParsedServerItemOptionQuery = string | undefined

export const parseServerItemOptionQuery = (value: unknown): ParsedServerItemOptionQuery => {
    if (typeof value !== 'string') return

    return value
}

export const toServerServerItemOption = (
    localize: Localize,
    query: string,
    option: ServerServerItemOptionModel,
): ServerServerItemOption => ({
    query,
    name: localize(option.name),
    description: option.description && localize(option.description),
    required: option.required,
    type: option.type,
    itemType: option.itemType,
})
