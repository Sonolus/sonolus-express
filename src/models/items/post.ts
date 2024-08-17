import { DatabasePostItem, PostItem } from '@sonolus/core'
import { toTags } from '../tag'
import { Model, ToItem } from './item'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
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
