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

export const parseRawServerServerItemsOptionValue = (
    value: unknown,
): ServerServerItemsOptionValue | undefined => {
    if (typeof value !== 'string') return

    return parse(value, Type.Array(silSchema))
}

export const normalizeServerServerItemsOptionValue = (
    value: ServerServerItemsOptionValue | undefined,
    option: ServerServerItemsOptionModel,
): ServerServerItemsOptionValue =>
    value !== undefined && (option.limit === 0 || value.length <= option.limit) ? value : option.def

export const serializeServerServerItemsOptionValue = (
    value: ServerServerItemsOptionValue,
): string => JSON.stringify(value)

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
