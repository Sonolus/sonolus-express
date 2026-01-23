import { DatabaseTag, LocalizationText, UserItem } from '@sonolus/core'
import { toTags } from '../tag.js'
import { ToItem } from './item.js'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface UserItemModel {
    name: string
    title: LocalizationText
    handle?: string
    tags: DatabaseTag[]
}

export const toUserItem: ToItem<UserItemModel, UserItem> = (sonolus, localize, item) => ({
    name: item.name,
    source: sonolus.address,
    title: localize(item.title),
    handle: item.handle,
    tags: toTags(localize, item.tags),
})
