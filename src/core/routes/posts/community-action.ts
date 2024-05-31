import { SonolusRouteHandler } from '../../sonolus'
import { itemCommunityActionRouteHandler } from '../item-community-action'

export const postCommunityActionRouteHandler: SonolusRouteHandler = (sonolus, session, req, res) =>
    itemCommunityActionRouteHandler(sonolus, sonolus.postConfig, session, req, res)
