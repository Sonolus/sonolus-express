import { DatabaseTag, LocalizationText, RoomItem, Srl } from '@sonolus/core'
import { toTags } from '../tag.js'
import { getItem, ToItem } from './item.js'
import { toUserItem, UserItemModel } from './user.js'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface RoomItemModel {
    name: string
    title: LocalizationText
    subtitle: LocalizationText
    master: LocalizationText
    masterUser?: string | UserItemModel
    tags: DatabaseTag[]
    description?: LocalizationText
    cover?: Srl
    bgm?: Srl
    preview?: Srl
}

export const toRoomItem: ToItem<RoomItemModel, RoomItem> = (sonolus, localize, item) => ({
    name: item.name,
    title: localize(item.title),
    subtitle: localize(item.subtitle),
    master: localize(item.master),
    masterUser: item.masterUser
        ? toUserItem(
              sonolus,
              localize,
              getItem(sonolus.user.items, item.masterUser, `Engine/${item.name}`, '.masterUser'),
          )
        : undefined,
    tags: toTags(localize, item.tags),
    cover: item.cover,
    bgm: item.bgm,
    preview: item.preview,
})
