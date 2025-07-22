import { Type } from '@sinclair/typebox'
import { ItemType, LocalizationText, ServerServerItemOption, Sil } from '@sonolus/core'
import { silSchema } from '../../../schemas/sil.js'
import { parse } from '../../../utils/json.js'
import { Localize } from '../../../utils/localization.js'

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

export const parseRawServerServerItemOptionValue = (
    value: unknown,
): ServerServerItemOptionValue | undefined => {
    if (typeof value !== 'string') return

    return parse(value, Type.Union([silSchema, Type.Null()]))
}

export const normalizeServerServerItemOptionValue = (
    value: ServerServerItemOptionValue | undefined,
    option: ServerServerItemOptionModel,
): ServerServerItemOptionValue => (value !== undefined ? value : option.def)

export const serializeServerServerItemOptionValue = (value: ServerServerItemOptionValue): string =>
    JSON.stringify(value)

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
