import { DatabaseParticleItem, ParticleItem } from '@sonolus/core'
import { toTags } from '../tag.js'
import { getItem, Model, ToItem } from './item.js'
import { toUserItem, UserItemModel } from './user.js'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface ParticleItemModel extends Model<DatabaseParticleItem, {}> {
    authorUser?: string | UserItemModel
}

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
    authorUser: item.authorUser
        ? toUserItem(
              sonolus,
              localize,
              getItem(sonolus.user.items, item.authorUser, `Particle/${item.name}`, '.authorUser'),
          )
        : undefined,
    tags: toTags(localize, item.tags),
    thumbnail: item.thumbnail,
    data: item.data,
    texture: item.texture,
})
