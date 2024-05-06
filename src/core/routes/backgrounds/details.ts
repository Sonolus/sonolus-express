import { BackgroundItemModel, toBackgroundItem } from '../../../api/background-item'
import { SonolusRouteHandler } from '../../sonolus'
import {
    DefaultItemDetailsHandler,
    defaultItemDetailsHandler,
    itemDetailsRouteHandler,
} from '../item-details'

export const defaultBackgroundDetailsHandler: DefaultItemDetailsHandler<BackgroundItemModel> = (
    sonolus,
    session,
    name,
) => defaultItemDetailsHandler(sonolus.db.backgrounds, name)

export const backgroundDetailsRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemDetailsRouteHandler(sonolus, sonolus.backgroundConfig, toBackgroundItem, session, req, res)
