import { SonolusRouteHandler } from '../../sonolus'
import { itemCommunityActionRouteHandler } from '../item-community-action'

export const effectCommunityActionRouteHandler: SonolusRouteHandler = (
    sonolus,
    session,
    req,
    res,
) => itemCommunityActionRouteHandler(sonolus, sonolus.effectConfig, session, req, res)
