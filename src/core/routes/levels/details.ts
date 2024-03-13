import { DatabaseLevelItem } from 'sonolus-core'
import { toLevelItem } from '../../../api/level-item'
import { SonolusRouteHandler } from '../../sonolus'
import {
    DefaultItemDetailsHandler,
    defaultItemDetailsHandler,
    itemDetailsRouteHandler,
} from '../item-details'

export const defaultLevelDetailsHandler: DefaultItemDetailsHandler<DatabaseLevelItem> = (
    sonolus,
    session,
    name,
) => defaultItemDetailsHandler(sonolus.db.levels, name)

export const levelDetailsRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemDetailsRouteHandler(sonolus, sonolus.levelConfig, toLevelItem, session, req, res)
