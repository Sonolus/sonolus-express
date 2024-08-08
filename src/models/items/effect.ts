import { DatabaseEffectItem, EffectItem } from '@sonolus/core'
import { toTags } from '../tag'
import { Model, ToItem } from './item'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface EffectItemModel extends Model<DatabaseEffectItem, {}> {}

export const toEffectItem: ToItem<EffectItemModel, EffectItem> = (sonolus, localize, item) => ({
    name: item.name,
    source: sonolus.address,
    version: item.version,
    title: localize(item.title),
    subtitle: localize(item.subtitle),
    author: localize(item.author),
    tags: toTags(localize, item.tags),
    thumbnail: item.thumbnail,
    data: item.data,
    audio: item.audio,
})
