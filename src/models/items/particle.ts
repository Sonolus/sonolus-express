import { DatabaseParticleItem, ParticleItem } from '@sonolus/core'
import { toTags } from '../tag'
import { Model, ToItem } from './item'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface ParticleItemModel extends Model<DatabaseParticleItem, {}> {}

export const toParticleItem: ToItem<ParticleItemModel, ParticleItem> = (
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
    texture: item.texture,
})
