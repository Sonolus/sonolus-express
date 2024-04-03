import { DatabaseReplayItem } from '@sonolus/core'
import { toReplayItem } from '../../../api/replay-item'
import { SonolusRouteHandler } from '../../sonolus'
import { DefaultItemInfoHandler, defaultItemInfoHandler, itemInfoRouteHandler } from '../item-info'

export const defaultReplayInfoHandler: DefaultItemInfoHandler<DatabaseReplayItem> = (sonolus) =>
    defaultItemInfoHandler(sonolus, sonolus.db.replays)

export const replayInfoRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemInfoRouteHandler(sonolus, sonolus.replayConfig, toReplayItem, session, req, res)
