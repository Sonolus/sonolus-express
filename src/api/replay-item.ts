import { DatabaseReplayItem, ReplayItem } from '@sonolus/core'
import { Model, ToItem, getItem } from './item'
import { LevelItemModel, toLevelItem } from './level-item'
import { toTags } from './tag'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-interface
export interface ReplayItemModel
    extends Model<
        DatabaseReplayItem,
        {
            level: string | LevelItemModel
        }
    > {}

export const toReplayItem: ToItem<ReplayItemModel, ReplayItem> = (sonolus, localize, item) => ({
    name: item.name,
    source: sonolus.address,
    version: item.version,
    title: localize(item.title),
    subtitle: localize(item.subtitle),
    author: localize(item.author),
    tags: toTags(localize, item.tags),
    level: toLevelItem(
        sonolus,
        localize,
        getItem(sonolus.db.levels, item.level, `Replay/${item.name}`, '.level'),
    ),
    data: item.data,
    configuration: item.configuration,
})
