import { EngineItemModel, toEngineItem } from '../../../api/engine-item'
import { SonolusRouteHandler } from '../../sonolus'
import {
    DefaultItemDetailsHandler,
    defaultItemDetailsHandler,
    itemDetailsRouteHandler,
} from '../item-details'

export const defaultEngineDetailsHandler: DefaultItemDetailsHandler<EngineItemModel> = (
    sonolus,
    session,
    name,
) => defaultItemDetailsHandler(sonolus.db.engines, name)

export const engineDetailsRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemDetailsRouteHandler(sonolus, sonolus.engineConfig, toEngineItem, session, req, res)
