import { DatabaseEngineItem } from 'sonolus-core'
import { toEngineItem } from '../../../api/engine-item'
import { SonolusRouteHandler } from '../../sonolus'
import { DefaultItemInfoHandler, defaultItemInfoHandler, itemInfoRouteHandler } from '../item-info'

export const defaultEngineInfoHandler: DefaultItemInfoHandler<DatabaseEngineItem> = (sonolus) =>
    defaultItemInfoHandler(sonolus, sonolus.db.engines)

export const engineInfoRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemInfoRouteHandler(sonolus, sonolus.engineConfig, toEngineItem, session, req, res)
