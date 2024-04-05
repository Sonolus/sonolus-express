import { DatabasePlaylistItem } from '@sonolus/core'
import { toPlaylistItem } from '../../../api/playlist-item'
import { SonolusRouteHandler } from '../../sonolus'
import {
    DefaultItemDetailsHandler,
    defaultItemDetailsHandler,
    itemDetailsRouteHandler,
} from '../item-details'

export const defaultPlaylistDetailsHandler: DefaultItemDetailsHandler<DatabasePlaylistItem> = (
    sonolus,
    session,
    name,
) => defaultItemDetailsHandler(sonolus.db.playlists, name)

export const playlistDetailsRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemDetailsRouteHandler(sonolus, sonolus.playlistConfig, toPlaylistItem, session, req, res)
