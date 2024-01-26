import { DatabaseReplayItem } from 'sonolus-core'
import { toReplayItem } from '../../../api/replay-item'
import { SonolusRouteHandler } from '../../sonolus'
import {
    DefaultItemDetailsHandler,
    defaultItemDetailsHandler,
    itemDetailsRouteHandler,
} from '../item-details'

export const defaultReplayDetailsHandler: DefaultItemDetailsHandler<DatabaseReplayItem> = (
    sonolus,
    session,
    name,
) => defaultItemDetailsHandler(sonolus.db.replays, name)

export const replayDetailsRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemDetailsRouteHandler(sonolus, sonolus.replays, toReplayItem, session, req, res)
