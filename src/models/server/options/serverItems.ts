import { Type } from '@sinclair/typebox'
import { ItemType, LocalizationText, ServerServerItemsOption, Sil } from '@sonolus/core'
import { silSchema } from '../../../schemas/sil'
import { parse } from '../../../utils/json'
import { Localize } from '../../../utils/localization'

export type ServerServerItemsOptionModel = {
    name: LocalizationText
    description?: LocalizationText
    required: boolean
    type: 'serverItems'
    itemType: ItemType
    def: Sil[]
    allowOtherServers: boolean
    limit: number
}

export type ServerServerItemsOptionValue = Sil[]

export const parseServerServerItemsOptionValue = (
    value: unknown,
    option: ServerServerItemsOptionModel,
): ServerServerItemsOptionValue => {
    if (typeof value !== 'string') return option.def

    const parsed = parse(value, Type.Array(silSchema))
    if (!parsed) return option.def

    return parsed
}

export const serializeServerServerItemsOptionValue = (
    value: ServerServerItemsOptionValue,
    option: ServerServerItemsOptionModel,
): string | undefined =>
    value.length !== option.def.length ||
    value.some(
        (value, index) =>
            value.address !== option.def[index]?.address || value.name !== option.def[index].name,
    )
        ? JSON.stringify(value)
        : undefined

export const toServerServerItemsOption = (
    localize: Localize,
    query: string,
    option: ServerServerItemsOptionModel,
): ServerServerItemsOption => ({
    query,
    name: localize(option.name),
    description: option.description && localize(option.description),
    required: option.required,
    type: option.type,
    itemType: option.itemType,
    def: option.def,
    allowOtherServers: option.allowOtherServers,
    limit: option.limit,
})
