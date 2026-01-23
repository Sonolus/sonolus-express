import { DatabaseReplayItem, ReplayItem } from '@sonolus/core'
import { toTags } from '../tag.js'
import { Model, ToItem, getItem } from './item.js'
import { LevelItemModel, toLevelItem } from './level.js'
import { UserItemModel, toUserItem } from './user.js'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface ReplayItemModel extends Model<
    DatabaseReplayItem,
    {
        level: string | LevelItemModel
    }
> {
    authorUser?: string | UserItemModel
}

export const toReplayItem: ToItem<ReplayItemModel, ReplayItem> = (sonolus, localize, item) => ({
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
              getItem(sonolus.user.items, item.authorUser, `Replay/${item.name}`, '.authorUser'),
          )
        : undefined,
    tags: toTags(localize, item.tags),
    level: toLevelItem(
        sonolus,
        localize,
        getItem(sonolus.level.items, item.level, `Replay/${item.name}`, '.level'),
    ),
    data: item.data,
    configuration: item.configuration,
})
