import { DatabaseSkinItem } from '@sonolus/core'
import { toSkinItem } from '../../../api/skin-item'
import { SonolusRouteHandler } from '../../sonolus'
import {
    DefaultItemDetailsHandler,
    defaultItemDetailsHandler,
    itemDetailsRouteHandler,
} from '../item-details'

export const defaultSkinDetailsHandler: DefaultItemDetailsHandler<DatabaseSkinItem> = (
    sonolus,
    session,
    name,
) => defaultItemDetailsHandler(sonolus.db.skins, name)

export const skinDetailsRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemDetailsRouteHandler(sonolus, sonolus.skinConfig, toSkinItem, session, req, res)
