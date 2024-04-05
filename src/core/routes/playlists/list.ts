import { DatabasePlaylistItem } from '@sonolus/core'
import { toPlaylistItem } from '../../../api/playlist-item'
import { SonolusRouteHandler } from '../../sonolus'
import {
    DefaultItemListHandler,
    FilterItemsByKeyword,
    defaultItemListHandler,
    filterItemsByKeywords,
    itemListRouteHandler,
} from '../item-list'

export const defaultPlaylistListHandler: DefaultItemListHandler<DatabasePlaylistItem> = (
    sonolus,
    session,
    query,
    page,
) => defaultItemListHandler(sonolus.db.playlists, filterPlaylistItemsByKeywords, query, page)

export const filterPlaylistItemsByKeywords: FilterItemsByKeyword<DatabasePlaylistItem> = (
    items,
    keywords,
) =>
    filterItemsByKeywords(
        items,
        ['name', 'title', 'subtitle', 'author', 'tags', 'description'],
        keywords,
    )

export const playlistListRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemListRouteHandler(sonolus, sonolus.playlistConfig, toPlaylistItem, session, req, res)
