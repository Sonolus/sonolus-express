import { DatabaseEffectItem } from 'sonolus-core'
import { toEffectItem } from '../../../api/effect-item'
import { SonolusRouteHandler } from '../../sonolus'
import { DefaultItemInfoHandler, defaultItemInfoHandler, itemInfoRouteHandler } from '../item-info'

export const defaultEffectInfoHandler: DefaultItemInfoHandler<DatabaseEffectItem> = (sonolus) =>
    defaultItemInfoHandler(sonolus, sonolus.db.effects)

export const effectInfoRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemInfoRouteHandler(sonolus, sonolus.effects, toEffectItem, session, req, res)
