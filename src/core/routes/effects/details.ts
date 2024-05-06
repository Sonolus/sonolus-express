import { EffectItemModel, toEffectItem } from '../../../api/effect-item'
import { SonolusRouteHandler } from '../../sonolus'
import {
    DefaultItemDetailsHandler,
    defaultItemDetailsHandler,
    itemDetailsRouteHandler,
} from '../item-details'

export const defaultEffectDetailsHandler: DefaultItemDetailsHandler<EffectItemModel> = (
    sonolus,
    session,
    name,
) => defaultItemDetailsHandler(sonolus.db.effects, name)

export const effectDetailsRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemDetailsRouteHandler(sonolus, sonolus.effectConfig, toEffectItem, session, req, res)
