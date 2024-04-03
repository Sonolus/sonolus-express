import { DatabaseParticleItem, ParticleItem } from '@sonolus/core'
import { ToItem } from './item'
import { toTags } from './tag'

export const toParticleItem: ToItem<DatabaseParticleItem, ParticleItem> = (
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
