import { BackgroundItem, DatabaseBackgroundItem } from '@sonolus/core'
import { ToItem } from './item'
import { toTags } from './tag'

export const toBackgroundItem: ToItem<DatabaseBackgroundItem, BackgroundItem> = (
    sonolus,
    localize,
    item,
) => ({
    name: item.name,
    source: sonolus.address,
    version: item.version,
    title: localize(item.title),
    subtitle: localize(item.subtitle),
    author: localize(item.author),
    tags: toTags(localize, item.tags),
    thumbnail: item.thumbnail,
    data: item.data,
    image: item.image,
    configuration: item.configuration,
})
