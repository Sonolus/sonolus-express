import { BackgroundItem, DatabaseBackgroundItem } from '@sonolus/core'
import { Model, ToItem } from './item'
import { toTags } from './tag'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-interface
export interface BackgroundItemModel extends Model<DatabaseBackgroundItem, {}> {}

export const toBackgroundItem: ToItem<BackgroundItemModel, BackgroundItem> = (
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
