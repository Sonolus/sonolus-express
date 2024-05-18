import { SonolusRouteHandler } from '../../sonolus'
import { itemCommunityActionRouteHandler } from '../item-community-action'

export const backgroundCommunityActionRouteHandler: SonolusRouteHandler = (
    sonolus,
    session,
    req,
    res,
) => itemCommunityActionRouteHandler(sonolus, sonolus.backgroundConfig, session, req, res)
