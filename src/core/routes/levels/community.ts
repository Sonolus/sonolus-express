import { SonolusRouteHandler } from '../../sonolus'
import { itemCommunityRouteHandler } from '../item-community'

export const levelCommunityRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemCommunityRouteHandler(sonolus, sonolus.levelConfig, session, req, res)
