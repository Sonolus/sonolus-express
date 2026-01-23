import { DatabasePostItem, PostItem } from '@sonolus/core'
import { toTags } from '../tag.js'
import { getItem, Model, ToItem } from './item.js'
import { toUserItem, UserItemModel } from './user.js'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface PostItemModel extends Model<DatabasePostItem, {}> {
    authorUser?: string | UserItemModel
}

export const toPostItem: ToItem<PostItemModel, PostItem> = (sonolus, localize, item) => ({
    name: item.name,
    source: sonolus.address,
    version: item.version,
    title: localize(item.title),
    time: item.time,
    author: localize(item.author),
    authorUser: item.authorUser
        ? toUserItem(
              sonolus,
              localize,
              getItem(sonolus.user.items, item.authorUser, `Post/${item.name}`, '.authorUser'),
          )
        : undefined,
    tags: toTags(localize, item.tags),
    thumbnail: item.thumbnail,
})
