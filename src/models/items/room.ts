import { DatabaseTag, LocalizationText, RoomItem, Srl } from '@sonolus/core'
import { toTags } from '../tag'
import { ToItem } from './item'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface RoomItemModel {
    name: string
    title: LocalizationText
    subtitle: LocalizationText
    master: LocalizationText
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
    tags: toTags(localize, item.tags),
    cover: item.cover,
    bgm: item.bgm,
    preview: item.preview,
})
