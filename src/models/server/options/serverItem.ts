import { Type } from '@sinclair/typebox'
import { ItemType, LocalizationText, ServerServerItemOption, Sil } from '@sonolus/core'
import { silSchema } from '../../../schemas/sil'
import { parse } from '../../../utils/json'
import { Localize } from '../../../utils/localization'

export type ServerServerItemOptionModel = {
    name: LocalizationText
    description?: LocalizationText
    required: boolean
    type: 'serverItem'
    itemType: ItemType
    def: Sil | null
    allowOtherServers: boolean
}

export type ServerServerItemOptionValue = Sil | null

export const parseServerServerItemOptionValue = (
    value: unknown,
    option: ServerServerItemOptionModel,
): ServerServerItemOptionValue => {
    if (typeof value !== 'string') return option.def

    const parsed = parse(value, Type.Union([silSchema, Type.Null()]))
    if (parsed === undefined) return option.def

    return parsed
}

export const serializeServerServerItemOptionValue = (
    value: ServerServerItemOptionValue,
    option: ServerServerItemOptionModel,
): string | undefined =>
    value
        ? value.address !== option.def?.address || value.name !== option.def.name
            ? JSON.stringify(value)
            : undefined
        : option.def
          ? 'null'
          : undefined

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
    def: option.def,
    allowOtherServers: option.allowOtherServers,
})
