import { DatabasePlaylistItem, PlaylistItem } from '@sonolus/core'
import { ToItem, getByName } from './item'
import { toLevelItem } from './level-item'
import { toTags } from './tag'

export const toPlaylistItem: ToItem<DatabasePlaylistItem, PlaylistItem> = (
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
    levels: item.levels.map((level, index) =>
        toLevelItem(
            sonolus,
            localize,
            getByName(sonolus.db.levels, level, `Playlist/${item.name}`, `.levels[${index}]`),
        ),
    ),
    thumbnail: item.thumbnail,
})
