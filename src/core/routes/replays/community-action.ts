import { SonolusRouteHandler } from '../../sonolus'
import { itemCommunityActionRouteHandler } from '../item-community-action'

export const replayCommunityActionRouteHandler: SonolusRouteHandler = (
    sonolus,
    session,
    req,
    res,
) => itemCommunityActionRouteHandler(sonolus, sonolus.replayConfig, session, req, res)
