import { BackgroundItem, DatabaseBackgroundItem } from '@sonolus/core'
import { toTags } from '../tag.js'
import { getItem, Model, ToItem } from './item.js'
import { toUserItem, UserItemModel } from './user.js'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface BackgroundItemModel extends Model<DatabaseBackgroundItem, {}> {
    authorUser?: string | UserItemModel
}

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
    authorUser: item.authorUser
        ? toUserItem(
              sonolus,
              localize,
              getItem(
                  sonolus.user.items,
                  item.authorUser,
                  `Background/${item.name}`,
                  '.authorUser',
              ),
          )
        : undefined,
    tags: toTags(localize, item.tags),
    thumbnail: item.thumbnail,
    data: item.data,
    image: item.image,
    configuration: item.configuration,
})
