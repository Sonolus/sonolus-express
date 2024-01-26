import { DatabaseReplayItem, ReplayItem } from 'sonolus-core'
import { ToItem, getByName } from './item'
import { toLevelItem } from './level-item'
import { toTags } from './tag'

export const toReplayItem: ToItem<DatabaseReplayItem, ReplayItem> = (sonolus, localize, item) => ({
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
        getByName(sonolus.db.levels, item.level, `Replay/${item.name}`, '.level'),
    ),
    data: item.data,
    configuration: item.configuration,
})
