import { DatabasePostItem, PostItem } from '@sonolus/core'
import { Model, ToItem } from './item'
import { toTags } from './tag'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-interface
export interface PostItemModel extends Model<DatabasePostItem, {}> {}

export const toPostItem: ToItem<PostItemModel, PostItem> = (sonolus, localize, item) => ({
    name: item.name,
    source: sonolus.address,
    version: item.version,
    title: localize(item.title),
    time: item.time,
    author: localize(item.author),
    tags: toTags(localize, item.tags),
    thumbnail: item.thumbnail,
})
