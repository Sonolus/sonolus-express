import { LevelItemModel, toLevelItem } from '../../../api/level-item'
import { SonolusRouteHandler } from '../../sonolus'
import { DefaultItemInfoHandler, defaultItemInfoHandler, itemInfoRouteHandler } from '../item-info'

export const defaultLevelInfoHandler: DefaultItemInfoHandler<LevelItemModel> = (sonolus) =>
    defaultItemInfoHandler(sonolus, sonolus.db.levels)

export const levelInfoRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemInfoRouteHandler(sonolus, sonolus.levelConfig, toLevelItem, session, req, res)
