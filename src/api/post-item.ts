import { DatabasePostItem, PostItem } from '@sonolus/core'
import { ToItem } from './item'
import { toTags } from './tag'

export const toPostItem: ToItem<DatabasePostItem, PostItem> = (sonolus, localize, item) => ({
    name: item.name,
    source: sonolus.address,
    version: item.version,
    title: localize(item.title),
    time: item.time,
    author: localize(item.author),
    tags: toTags(localize, item.tags),
    thumbnail: item.thumbnail,
})
