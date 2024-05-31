import { SonolusRouteHandler } from '../../sonolus'
import { itemCommunityActionRouteHandler } from '../item-community-action'

export const levelCommunityActionRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemCommunityActionRouteHandler(sonolus, sonolus.levelConfig, session, req, res)
