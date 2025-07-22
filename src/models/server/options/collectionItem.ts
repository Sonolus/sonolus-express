import {
    BackgroundItem,
    EffectItem,
    EngineItem,
    ItemType,
    LevelItem,
    LocalizationText,
    ParticleItem,
    PlaylistItem,
    PostItem,
    ReplayItem,
    RoomItem,
    ServerCollectionItemOption,
    SkinItem,
} from '@sonolus/core'
import { backgroundItemSchema } from '../../../schemas/server/items/background.js'
import { effectItemSchema } from '../../../schemas/server/items/effect.js'
import { engineItemSchema } from '../../../schemas/server/items/engine.js'
import { levelItemSchema } from '../../../schemas/server/items/level.js'
import { particleItemSchema } from '../../../schemas/server/items/particle.js'
import { playlistItemSchema } from '../../../schemas/server/items/playlist.js'
import { postItemSchema } from '../../../schemas/server/items/post.js'
import { replayItemSchema } from '../../../schemas/server/items/replay.js'
import { roomItemSchema } from '../../../schemas/server/items/room.js'
import { skinItemSchema } from '../../../schemas/server/items/skin.js'
import { parse } from '../../../utils/json.js'
import { Localize } from '../../../utils/localization.js'

export type ServerCollectionItemOptionModel = {
    name: LocalizationText
    description?: LocalizationText
    required: boolean
    type: 'collectionItem'
    itemType: ItemType
}

export type ServerCollectionItemOptionValue<T = ServerCollectionItemOptionModel> =
    T extends ServerCollectionItemOptionModel
        ?
              | {
                    post: PostItem
                    playlist: PlaylistItem
                    level: LevelItem
                    skin: SkinItem
                    background: BackgroundItem
                    effect: EffectItem
                    particle: ParticleItem
                    engine: EngineItem
                    replay: ReplayItem
                    room: RoomItem
                }[T['itemType']]
              | undefined
        : never

const schemas = {
    post: postItemSchema,
    playlist: playlistItemSchema,
    level: levelItemSchema,
    skin: skinItemSchema,
    background: backgroundItemSchema,
    effect: effectItemSchema,
    particle: particleItemSchema,
    engine: engineItemSchema,
    replay: replayItemSchema,
    room: roomItemSchema,
}

export const parseRawServerCollectionItemOptionValue = (
    value: unknown,
    option: ServerCollectionItemOptionModel,
): ServerCollectionItemOptionValue | undefined => {
    if (typeof value !== 'string') return

    return parse(value, schemas[option.itemType])
}

export const normalizeServerCollectionItemOptionValue = (
    value: ServerCollectionItemOptionValue | undefined,
): ServerCollectionItemOptionValue => value

export const serializeServerCollectionItemOptionValue = (
    value: Exclude<ServerCollectionItemOptionValue, undefined>,
): string => JSON.stringify(value)

export const toServerCollectionItemOption = (
    localize: Localize,
    query: string,
    option: ServerCollectionItemOptionModel,
): ServerCollectionItemOption => ({
    query,
    name: localize(option.name),
    description: option.description && localize(option.description),
    required: option.required,
    type: option.type,
    itemType: option.itemType,
})
