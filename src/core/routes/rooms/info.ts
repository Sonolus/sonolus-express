import { RoomItemModel, toRoomItem } from '../../../api/room-item'
import { SonolusRouteHandler } from '../../sonolus'
import { DefaultItemInfoHandler, defaultItemInfoHandler, itemInfoRouteHandler } from '../item-info'

export const defaultRoomInfoHandler: DefaultItemInfoHandler<RoomItemModel> = (sonolus) =>
    defaultItemInfoHandler(sonolus, sonolus.db.rooms)

export const roomInfoRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemInfoRouteHandler(sonolus, sonolus.roomConfig, toRoomItem, session, req, res)
