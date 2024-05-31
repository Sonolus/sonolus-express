import { SonolusRouteHandler } from '../../sonolus'
import { itemCommunityActionRouteHandler } from '../item-community-action'

export const skinCommunityActionRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemCommunityActionRouteHandler(sonolus, sonolus.skinConfig, session, req, res)
