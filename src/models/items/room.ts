import { DatabaseTag, LocalizationText, RoomItem, SRL } from '@sonolus/core'
import { ToItem } from './item'
import { toTags } from './tag'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface RoomItemModel {
    name: string
    title: LocalizationText
    subtitle: LocalizationText
    master: LocalizationText
    tags: DatabaseTag[]
    description: LocalizationText
    cover?: SRL
    bgm?: SRL
    preview?: SRL
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
