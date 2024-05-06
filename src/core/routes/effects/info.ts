import { EffectItemModel, toEffectItem } from '../../../api/effect-item'
import { SonolusRouteHandler } from '../../sonolus'
import { DefaultItemInfoHandler, defaultItemInfoHandler, itemInfoRouteHandler } from '../item-info'

export const defaultEffectInfoHandler: DefaultItemInfoHandler<EffectItemModel> = (sonolus) =>
    defaultItemInfoHandler(sonolus, sonolus.db.effects)

export const effectInfoRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemInfoRouteHandler(sonolus, sonolus.effectConfig, toEffectItem, session, req, res)
