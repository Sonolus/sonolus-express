import { SkinItemModel, toSkinItem } from '../../../api/skin-item'
import { SonolusRouteHandler } from '../../sonolus'
import { DefaultItemInfoHandler, defaultItemInfoHandler, itemInfoRouteHandler } from '../item-info'

export const defaultSkinInfoHandler: DefaultItemInfoHandler<SkinItemModel> = (sonolus) =>
    defaultItemInfoHandler(sonolus, sonolus.db.skins)

export const skinInfoRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemInfoRouteHandler(sonolus, sonolus.skinConfig, toSkinItem, session, req, res)
