import { DatabaseRoomItem, toRoomItem } from '../../../api/room-item'
import { SonolusRouteHandler } from '../../sonolus'
import {
    DefaultItemListHandler,
    FilterItemsByKeyword,
    defaultItemListHandler,
    filterItemsByKeywords,
    itemListRouteHandler,
} from '../item-list'

export const defaultRoomListHandler: DefaultItemListHandler<DatabaseRoomItem> = (
    sonolus,
    session,
    query,
    page,
) => defaultItemListHandler(sonolus.db.rooms, filterRoomItemsByKeywords, query, page)

export const filterRoomItemsByKeywords: FilterItemsByKeyword<DatabaseRoomItem> = (
    items,
    keywords,
) => filterItemsByKeywords(items, ['name', 'title', 'subtitle', 'master', 'tags'], keywords)

export const roomListRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemListRouteHandler(sonolus, sonolus.roomConfig, toRoomItem, session, req, res)
