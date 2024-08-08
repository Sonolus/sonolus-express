import { DatabasePlaylistItem, PlaylistItem } from '@sonolus/core'
import { toTags } from '../tag'
import { Model, ToItem, getItem } from './item'
import { LevelItemModel, toLevelItem } from './level'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface PlaylistItemModel
    extends Model<
        DatabasePlaylistItem,
        {
            levels: (string | LevelItemModel)[]
        }
    > {}

export const toPlaylistItem: ToItem<PlaylistItemModel, PlaylistItem> = (
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
            getItem(sonolus.level.items, level, `Playlist/${item.name}`, `.levels[${index}]`),
        ),
    ),
    thumbnail: item.thumbnail,
})
