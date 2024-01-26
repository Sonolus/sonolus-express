import { DatabaseEngineItem } from 'sonolus-core'
import { toEngineItem } from '../../../api/engine-item'
import { SonolusRouteHandler } from '../../sonolus'
import {
    DefaultItemDetailsHandler,
    defaultItemDetailsHandler,
    itemDetailsRouteHandler,
} from '../item-details'

export const defaultEngineDetailsHandler: DefaultItemDetailsHandler<DatabaseEngineItem> = (
    sonolus,
    session,
    name,
) => defaultItemDetailsHandler(sonolus.db.engines, name)

export const engineDetailsRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemDetailsRouteHandler(sonolus, sonolus.engines, toEngineItem, session, req, res)
