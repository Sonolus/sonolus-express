import { DatabasePlaylistItem } from '@sonolus/core'
import { toPlaylistItem } from '../../../api/playlist-item'
import { SonolusRouteHandler } from '../../sonolus'
import { DefaultItemInfoHandler, defaultItemInfoHandler, itemInfoRouteHandler } from '../item-info'

export const defaultPlaylistInfoHandler: DefaultItemInfoHandler<DatabasePlaylistItem> = (sonolus) =>
    defaultItemInfoHandler(sonolus, sonolus.db.playlists)

export const playlistInfoRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemInfoRouteHandler(sonolus, sonolus.playlistConfig, toPlaylistItem, session, req, res)
