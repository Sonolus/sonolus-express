import { ReplayItemModel, toReplayItem } from '../../../api/replay-item'
import { SonolusRouteHandler } from '../../sonolus'
import {
    DefaultItemDetailsHandler,
    defaultItemDetailsHandler,
    itemDetailsRouteHandler,
} from '../item-details'

export const defaultReplayDetailsHandler: DefaultItemDetailsHandler<ReplayItemModel> = (
    sonolus,
    session,
    name,
) => defaultItemDetailsHandler(sonolus.db.replays, name)

export const replayDetailsRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemDetailsRouteHandler(sonolus, sonolus.replayConfig, toReplayItem, session, req, res)
