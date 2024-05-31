import { SonolusRouteHandler } from '../../sonolus'
import { itemCommunityCommentListRouteHandler } from '../item-community-comment-list'

export const replayCommunityCommentListRouteHandler: SonolusRouteHandler = (
    sonolus,
    session,
    req,
    res,
) => itemCommunityCommentListRouteHandler(sonolus, sonolus.replayConfig, session, req, res)
