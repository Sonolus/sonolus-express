import { BackgroundItemModel, toBackgroundItem } from '../../../api/background-item'
import { SonolusRouteHandler } from '../../sonolus'
import { DefaultItemInfoHandler, defaultItemInfoHandler, itemInfoRouteHandler } from '../item-info'

export const defaultBackgroundInfoHandler: DefaultItemInfoHandler<BackgroundItemModel> = (
    sonolus,
) => defaultItemInfoHandler(sonolus, sonolus.db.backgrounds)

export const backgroundInfoRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemInfoRouteHandler(sonolus, sonolus.backgroundConfig, toBackgroundItem, session, req, res)
